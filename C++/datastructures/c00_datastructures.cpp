// For all STL data structures, you must include the appropriate header file (e.g., <vector>, <list>, <map>, etc.).

// Vector: Stores elements like an array but can dynamically change in size.
//         Adding and removing elements is usually done at the end. Elements can be accessed by index.

// List: Stores elements sequentially, where each element is connected to the next.
//       Adding and removing elements can be done at both ends. Not accessible by index.

//       Advantage over Vector: Fast insertion and removal anywhere in the list (especially in the middle or at the ends),
//       since it does not require shifting elements. Use List when you need frequent insertions/removals not just at the end.

//       Disadvantage vs Vector: Much slower random access (no direct access by index),
//       and higher memory overhead due to storing pointers for links between elements.

// Deque: Double-ended queue. Elements can be added and removed from both ends.
//        Elements can be accessed by index.

//        Advantage over Vector: Fast insertion and removal at both the front and back (unlike Vector, which is fast only at the back).
//        Use Deque when you need efficient push/pop at both ends, but still want random access by index.

//        Disadvantage vs Vector: Slightly slower random access and iteration than Vector, and more complex memory layout.

// Stack: Stores elements in a specific order, called LIFO (Last In, First Out).
//        Elements can only be added and removed from the top. Not accessible by index.

// Queue: Stores elements in a specific order, called FIFO (First In, First Out).
//        Elements are added at the end and removed from the front. Not accessible by index.

// Set: Stores unique elements. Not accessible by index.

// Map: Stores elements in key/value pairs. Accessible by keys (not by index).