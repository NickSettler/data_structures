/**
 * Name:  {@link StackOverflowError}
 *
 * The error that is thrown when the stack is full and an attempt to push an item to the stack is made.
 */
export class StackOverflowError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "StackOverflowError";
  }
}

/**
 * Name:  {@link StackSwapError}
 *
 * The error that is thrown when the swap operation is attempted with wrong indexes.
 */
export class StackSwapError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "StackSwapError";
  }
}
