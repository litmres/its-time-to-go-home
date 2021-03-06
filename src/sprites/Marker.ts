import { AudioManager } from '../managers/audio/AudioManager.ts';
import { Controls } from '../managers/input/Controls';
import { SceneBase } from '../scenes/base/SceneBase';

export class Marker {
  private scene: SceneBase;
  private onActivate: (done: () => void) => void;
  private isActive: boolean = false;
  private isActivated: boolean = false;
  private marker!: Phaser.Physics.Matter.Sprite;
  private markerId: number = 0;
  private enabled: boolean = true;

  constructor(scene: SceneBase, onActivate: (done: () => void) => any) {
    this.scene = scene;
    this.onActivate = onActivate;

    // Create the marker sprite.
    this.marker = this.scene.matter.add.sprite(0, 0, 'player');
    scene.add.existing(this.marker);

    // Collision.
    // @ts-ignore
    const M = Phaser.Physics.Matter.Matter;
    const sensor = M.Bodies.rectangle(0, 0, 16, 64, { isSensor: true, label: 'marker' });
    this.marker.setExistingBody(sensor);
    this.marker.setScale(4).setDepth(300);
    this.marker.setIgnoreGravity(true);
    this.marker.play('info');

    // What to do when the marker is activated.
    const pressRef = this.scene.inputManager.onPress(Controls.Activate, () => {
      // If the marker is 'active' and it isn't already activated,
      // then run its 'onActivate' function.

      if (this.isActive && !this.isActivated) {
        AudioManager.play('activate');
        this.isActivated = true;
        this.onActivate(() => {
          // When the 'done()' callback is called, we know the marker's
          // 'onActivate' function is complete, so we deactivate the
          // marker.
          this.isActivated = false;
        });
      }
    });

    this.marker.once('destroy', () => {
      this.scene.inputManager.removeOnPress(Controls.Activate, pressRef);
    });
  }

  public setPos(x: number, y: number) {
    this.marker.setPosition(x, y);
  }

  public setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }

  public getMarkerId() {
    return this.markerId;
  }

  public setMarkerId(id: number) {
    this.markerId = id;
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;

    if (this.enabled) {
      this.marker.alpha = 1;
    } else {
      this.marker.alpha = 0.5;
    }
  }

  public isEnabled() {
    return this.enabled;
  }

  public getSprite() {
    return this.marker;
  }
}
