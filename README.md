# Data Structures library

<!-- TOC -->
* [Data Structures library](#data-structures-library)
  * [Stack](#stack)
    * [Constructor](#constructor)
    * [Push](#push)
    * [Pop](#pop)
    * [Is Empty](#is-empty)
    * [Is Full](#is-full)
    * [Peek](#peek)
    * [Swap](#swap)
    * [Swap by index](#swap-by-index)
    * [Getters](#getters)
<!-- TOC -->

## Stack

Stack is a data structure that can be used to store and manipulate a list of elements in a LIFO (last in, first out)
fashion.

### Constructor

Stack initialization is done by passing an array of elements to the constructor.
Second parameter contains stack options

**Options**

| Name       | Description                                                                       | Type    | Default value |
|------------|-----------------------------------------------------------------------------------|---------|---------------|
| size       | Size of the stack                                                                 | number  | Infinity      |
| strictSize | Sets size to be maximum size. Throws an error while attempt to push to full stack | boolean | false         |

```Stack(items?: Array<T> | T, options: TStackOptions = defaultOptions)```

```typescript
const stack = new Stack(
    [1, 2, 3],
    {
      size: 5,
      strictSize: true,
    }
);
```

### Push

Push an element to the stack.

```typescript
stack.push(4); // stack: [1, 2, 3, 4]
```

### Pop

Pop an element from the stack.

```typescript
stack.pop(); // returns 4, stack: [1, 2, 3]
```

### Is Empty

Check if the stack is empty.

```typescript
stack.isEmpty(); // false
```

### Is Full

Check if the stack is full.

```typescript
stack.isFull(); // false
```

### Peek

Peek the last element of the stack without removing it.

```typescript
stack.peek(); // returns 3, stack: [1, 2, 3]
```

### Swap

Swaps the two elements from the params.

```typescript
stack.swap(1, 2); // stack: [2, 1, 3]
```

### Swap by index

Swaps the two elements from the params by their indexes.

```typescript
stack.swapByIndex(0, 1); // stack: [1, 2, 3]
```

### Getters

| Name       | Returns                     |
|------------|-----------------------------|
| items      | Array of items in the stack |
| size       | Size of the stack           |
| strictSize | Is array strict size        |


