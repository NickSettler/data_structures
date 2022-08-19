import { Stack, StackOverflowError, StackSwapError } from "../src";

describe("Stack tests", () => {
  describe("Stack initialization", () => {
    test("Stack initialization without options", () => {
      const stack = new Stack();

      expect(stack.items.length).toBe(0);
    });

    test("Stack initialization with one value", () => {
      const stack = new Stack(1);

      expect(stack.items.length).toBe(1);
      expect(stack.items[0]).toBe(1);
    });

    test("Stack initialization with multiple values", () => {
      const stack = new Stack([1, 2, 3]);

      expect(stack.items.length).toBe(3);
      expect(stack.items[0]).toBe(1);
      expect(stack.items[1]).toBe(2);
      expect(stack.items[2]).toBe(3);
    });

    test("Stack initialization with options", () => {
      const stack = new Stack([], {
        size: 3,
        strictSize: true,
      });

      expect(stack.items.length).toBe(0);
      expect(stack.size).toBe(3);
      expect(stack.strictSize).toBe(true);
    });

    test("Stack initialization with overflowed values", () => {
      expect(
        () => new Stack([1, 2, 3], { size: 2, strictSize: true })
      ).toThrowError(StackOverflowError);
    });
  });

  describe("Stack manipulation", () => {
    describe("Stack push", () => {
      test("Stack push without limits", () => {
        const stack = new Stack();

        stack.push(1);

        expect(stack.items.length).toBe(1);
        expect(stack.items[0]).toBe(1);
      });

      test("Stack push with fixed size", () => {
        const stack = new Stack([], {
          size: 1,
        });

        stack.push(1);
        stack.push(2);

        expect(stack.items.length).toBe(1);
        expect(stack.items[0]).toBe(2);
      });

      test("Stack push with strict size", () => {
        const stack = new Stack([], {
          size: 1,
          strictSize: true,
        });

        stack.push(1);
        expect(() => stack.push(2)).toThrowError(StackOverflowError);
      });
    });

    test("Stack pop", () => {
      const stack = new Stack([1, 2]);

      expect(stack.pop()).toBe(2);
      expect(stack.items.length).toBe(1);

      expect(stack.pop()).toBe(1);
      expect(stack.items.length).toBe(0);
    });

    test("Stack isEmpty", () => {
      const stack = new Stack();

      expect(stack.items.length).toBe(0);
      expect(stack.isEmpty()).toBe(true);
    });

    test("Stack isFull", () => {
      const stack = new Stack([1, 2], {
        size: 2,
      });

      expect(stack.items.length).toBe(2);
      expect(stack.isFull()).toBe(true);
    });

    test("Stack peek", () => {
      const stack = new Stack([1]);

      expect(stack.peek()).toBe(1);
      expect(stack.items.length).toBe(1);
    });

    describe("Stack swap", () => {
      test("Stack swap with correct values", () => {
        const stack = new Stack([1, 2]);

        stack.swap(1, 2);
        expect(stack.items[0]).toBe(2);
        expect(stack.items[1]).toBe(1);
      });

      test("Stack swap with incorrect values", () => {
        const stack = new Stack([1, 2]);

        expect(() => stack.swap(1, 3)).toThrowError(StackSwapError);
        expect(() => stack.swap(3, 1)).toThrowError(StackSwapError);
      });

      test("Stack swap with correct indexes", () => {
        const stack = new Stack([1, 2]);

        stack.swapByIndex(0, 1);
        expect(stack.items[0]).toBe(2);
        expect(stack.items[1]).toBe(1);
      });

      test("Stack swap with incorrect indexes", () => {
        const stack = new Stack([1, 2]);

        expect(() => stack.swapByIndex(0, 2)).toThrowError(StackSwapError);
        expect(() => stack.swapByIndex(2, 0)).toThrowError(StackSwapError);
      });
    });

    test("Stack Symbol.iterator", () => {
      const stack = new Stack([1, 2]);

      expect([...stack]).toEqual([2, 1]);
    });
  });
});
