import { LoadScene } from '../scenes/LoadScene';
import { MenuScene } from '../scenes/MenuScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { Scene1 } from '../scenes/Scene1';
import { Scene2 } from '../scenes/Scene2';

export abstract class SceneUtils {
  public static getScenes(): any[] {
    return [
      PreloadScene,
      LoadScene,
      MenuScene,
      Scene1,
      Scene2,
    ];
  }
}
