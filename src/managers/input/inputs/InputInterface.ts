/**
 * Inputs that are used in the input manager must implement this interface.
 */
export interface InputInterface {
  /**
   * Return a number representing how much an input is 'pressed'. Typically,
   * this will be a `0` if the input is not pressed, and a `1` if it is.
   */
  isPressed(): number;

  /**
   * Adds a function that runs when the input is 'pressed'.
   *
   * @param reference A unique string from the `InputManager`. This unique string
   *                  will also be passed into the `removeOnPress()` method, so you
   *                  know which listener to remove.
   * @param fn The function to run when the input is 'pressed'.
   */
  onPress(reference: string, fn: () => void): void;

  /**
   * Removes a listener added using `onPress()`.
   *
   * @param reference The reference string passed into onPress when the listener
   *                  was created.
   */
  removeOnPress(reference: string): void;

  /**
   * Returns if the input is enabled.
   */
  isEnabled(): boolean;

  /**
   * Sets whether to enable or disable the input.
   *
   * @param enabled Are we enabling or disabling the control?
   */
  setEnabled(enabled: boolean): void;
}
