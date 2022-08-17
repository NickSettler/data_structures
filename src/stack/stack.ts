import { StackOverflowError, StackSwapError } from "./errors";

/**
 * Name:  {@link TStackOptions}
 *
 * Options of the stack.
 */
export type TStackOptions = {
  /**
   * Name:  {@link TStackOptions.size}
   *
   * Size of the stack.
   */
  size?: number;
  /**
   * Name:  {@link TStackOptions.strictSize}
   *
   * Setting size to strict option, that will prevent stack overflow.
   */
  strictSize?: boolean;
};

const defaultOptions: Required<TStackOptions> = {
  size: Infinity,
  strictSize: false,
};

/**
 * Name:  {@link Stack}
 *
 * Stack class. The class is used to manage stack.
 *
 * @template T
 */
export default class Stack<T> implements Iterable<T> {
  private readonly _items: Array<T> = [];

  private readonly _size: number;

  private readonly _strictSize: boolean;

  /**
   * Name:  {@link Stack.constructor}
   *
   * Stack constructor. Fills the stack with items from the parameters. Applied options are applied to the stack.
   *
   * @param {Array<T> | T} items The items to initialize the stack with.
   * @param {TStackOptions} options The {@link TStackOptions|options} of the stack.
   */
  constructor(items?: Array<T> | T, options: TStackOptions = defaultOptions) {
    if (items) this._items = Array.isArray(items) ? items : [items];

    this._size = options.size || defaultOptions.size;
    this._strictSize = options.strictSize || defaultOptions.strictSize;

    if (this._strictSize && this._items.length > this._size)
      throw new StackOverflowError(
        `Array size is ${this._size}. Attempt to init stack with ${this._items.length} items.`
      );
    else this._items.splice(0, this._items.length - this._size);
  }

  /**
   * Name:  {@link Stack.push}
   *
   * Pushes item to the stack.
   * If item exceeds the stack size, the stack will be truncated to store only the last items.
   * If the stack size is strict, method will throw an error indicating that the stack is overflowed.
   *
   * @param {T} item The item to push to the stack.
   * @throws {StackOverflowError} If the stack size is strict and the stack is full.
   * @returns {void}
   */
  push(item: T): void {
    if (this._items.length + 1 > this._size)
      if (this._strictSize)
        throw new StackOverflowError(
          `Array size is ${this._size}. Attempt to push item to full stack.`
        );
      else this._items.shift();

    this._items.push(item);
  }

  /**
   * Name:  {@link Stack.pop}
   *
   * Pops item from the stack.
   *
   * @returns {T | undefined} The popped item.
   */
  pop(): T | undefined {
    return this._items.pop();
  }

  /**
   * Name:  {@link Stack.isEmpty}
   *
   * Checks if the stack is empty.
   *
   * @returns {boolean} True if the stack is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this._items.length === 0;
  }

  /**
   * Name:  {@link Stack.isFull}
   *
   * Checks if the stack is full.
   *
   * @returns {boolean} True if the stack is full, false otherwise.
   */
  isFull(): boolean {
    return this._items.length === this._size;
  }

  /**
   * Name:  {@link Stack.peek}
   *
   * Returns the last item of the stack without removing it.
   *
   * @returns {T | undefined} The last item of the stack.
   */
  peek(): T | undefined {
    return this._items[this._items.length - 1];
  }

  /**
   * Name:  {@link Stack.swap}
   *
   * Swaps two items in the stack.
   * In case of primitive types, the items are swapped by value.
   * In case of objects, the items are swapped by reference.
   *
   * @param {T} item1 The first item to swap.
   * @param {T} item2 The second item to swap.
   * @throws {StackSwapError} If the items are not found in the stack.
   * @returns {void}
   */
  swap(item1: T, item2: T): void {
    const index1 = this._items.indexOf(item1);
    const index2 = this._items.indexOf(item2);

    if (index1 > -1 && index2 > -1) this.swapByIndex(index1, index2);
    else throw new StackSwapError("Items not found");
  }

  /**
   * Name:  {@link Stack.swapByIndex}
   *
   * Swaps two items in the stack by their indexes.
   *
   * @param {number} index1 The index of the first item to swap.
   * @param {number} index2 The index of the second item to swap.
   * @throws {StackSwapError} If the indexes are out of bounds.
   * @returns {void}
   */
  swapByIndex(index1: number, index2: number): void {
    if (
      index1 < 0 ||
      index2 < 0 ||
      index1 >= this._items.length ||
      index2 >= this._items.length
    )
      throw new StackSwapError("Invalid indexes");

    [this._items[index1], this._items[index2]] = [
      this._items[index2],
      this._items[index1],
    ];
  }

  /**
   * Name:  {@link Stack.items}
   *
   * Returns the items of the stack.
   *
   * @returns {Array<T>} The items of the stack.
   */
  get items(): Array<T> {
    return this._items;
  }

  /**
   * Name:  {@link Stack.size}
   *
   * Returns the size of the stack.
   *
   * @returns {number} The size of the stack.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Name:  {@link Stack.strictSize}
   *
   * Returns the strict size of the stack.
   *
   * @returns {boolean} True if the stack size is strict, false otherwise.
   */
  get strictSize(): boolean {
    return this._strictSize;
  }

  /**
   * Name:  {@link Stack.[Symbol.iterator]}
   *
   * Returns an iterator over the items of the stack.
   *
   * @returns {Iterator<T>} An iterator over the items of the stack.
   */
  [Symbol.iterator](): Iterator<T, T, T> {
    return this._items[Symbol.iterator]();
  }
}
