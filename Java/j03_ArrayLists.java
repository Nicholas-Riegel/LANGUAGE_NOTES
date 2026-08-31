import java.util.*;

@SuppressWarnings("unused")
public class j03_ArrayLists {
    public static void main(String[] args) {
        
        // Create
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("apple");
        fruits.add("banana");
        fruits.add("cherry");
        
        // Access
        // System.out.println(fruits.get(0));      // 'apple'
        // System.out.println(fruits.get(fruits.size() - 1));  // 'cherry'
        
        // Modify
        fruits.set(1, "blueberry");
        // System.out.println(fruits);  // ['apple', 'blueberry', 'cherry']

        // Add
        fruits.add("date");           // equivalent to append
        fruits.add(1, "kiwi");        // insert at index 1
        
        // Remove
        // fruits.remove("apple");       // remove by value
        // fruits.remove(fruits.size() - 1);  // remove last item
        // fruits.remove(0);             // remove by index
        
        // Sublist (equivalent to slice)
        List<String> subList = fruits.subList(1, 3);  // elements 1 and 2
        // System.out.println(subList);
        
        // Iterate
        // for (String fruit : fruits) {
        //     System.out.println(fruit);
        // }
        
        // Check
        // if (fruits.contains("banana")) {
        //     System.out.println("yes");
        // }
        
        // Length
        // System.out.println(fruits.size());
        
        // Count occurrences
        ArrayList<String> fruitsWithDuplicates = new ArrayList<>();
        fruitsWithDuplicates.add("apple");
        fruitsWithDuplicates.add("banana");
        fruitsWithDuplicates.add("apple");
        fruitsWithDuplicates.add("cherry");
        
        long appleCount = fruitsWithDuplicates.stream()
            .filter(fruit -> fruit.equals("apple"))
            .count();
        // System.out.println(appleCount);  // Returns 2
        
        // Find index of item
        // System.out.println(fruitsWithDuplicates.indexOf("banana"));  // Returns 1
        
        // Extend with another list
        ArrayList<String> moreFruits = new ArrayList<>();
        moreFruits.add("grape");
        moreFruits.add("mango");
        fruits.addAll(moreFruits);
        
        // Sort list
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(3);
        numbers.add(1);
        numbers.add(4);
        numbers.add(1);
        numbers.add(5);
        Collections.sort(numbers);  // Sorts in place
        // System.out.println(numbers);
        
        // Sort without modifying original
        ArrayList<Integer> originalNumbers = new ArrayList<>();
        originalNumbers.add(3);
        originalNumbers.add(1);
        originalNumbers.add(4);
        originalNumbers.add(1);
        originalNumbers.add(5);
        ArrayList<Integer> sortedNumbers = new ArrayList<>(originalNumbers);
        Collections.sort(sortedNumbers);
        // System.out.println(sortedNumbers);
        
        // Reverse list
        Collections.reverse(numbers);  // Reverses in place
        // System.out.println(numbers);
        
        // Clear all items
        // fruits.clear();  // Removes all items
        
        // Copy list
        ArrayList<String> fruitsCopy = new ArrayList<>(fruits);
        
        // Min, max, sum (for numeric lists)
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(10);
        nums.add(5);
        nums.add(8);
        nums.add(3);
        nums.add(9);
        
        // System.out.println(Collections.min(nums));
        // System.out.println(Collections.max(nums));
        int sum = nums.stream().mapToInt(Integer::intValue).sum();
        // Integer::intValue  ⟷  x -> x.intValue()
        // Class::methodName means "call this method on each element"
        // System.out.println(sum);
        
        // List comprehension equivalent (using Streams)
        List<Integer> squares = new ArrayList<>();
        for (int x = 0; x < 5; x++) {
            squares.add(x * x);
        }
        
        // Combine lists
        ArrayList<Integer> list1 = new ArrayList<>();
        list1.add(1);
        list1.add(2);
        list1.add(3);
        
        ArrayList<Integer> list2 = new ArrayList<>();
        list2.add(4);
        list2.add(5);
        list2.add(6);
        
        ArrayList<Integer> combined = new ArrayList<>();
        combined.addAll(list1);
        combined.addAll(list2);  // [1, 2, 3, 4, 5, 6]
        
        // 1. ITERATION (most important — you use this constantly)
        // ────────────────────────────────────────────────────────────────────────
        ArrayList<String> list0 = new ArrayList<>(Arrays.asList("a", "b", "c"));
        
        // for-each loop (simplest, most common)
        // for (String item : list0) {
        //     System.out.println(item);
        // }
        
        // traditional for loop with index (when you need the index)
        // for (int i = 0; i < list0.size(); i++) {
        //     System.out.println(i + ": " + list0.get(i));
        // }
        
        // iterator (less common, but good to know)
        // Iterator<String> it = list0.iterator();
        // while (it.hasNext()) {
        //     System.out.println(it.next());
        // }
        
        // stream with forEach (modern approach)
        // list0.stream().forEach(item -> System.out.println(item));
        
        
        // ────────────────────────────────────────────────────────────────────────
        // 2. CHECKING MEMBERSHIP (fundamental for searching)
        // ────────────────────────────────────────────────────────────────────────
        ArrayList<String> list3 = new ArrayList<>(Arrays.asList("apple", "banana", "cherry"));
        
        // contains() — returns true/false
        // System.out.println(list3.contains("apple"));    // true
        // System.out.println(list3.contains("grape"));    // false
        
        // indexOf() — returns index or -1 if not found
        // System.out.println(list3.indexOf("banana"));    // 1
        // System.out.println(list3.indexOf("grape"));     // -1
        
        
        // ────────────────────────────────────────────────────────────────────────
        // 3. CHECKING EMPTINESS
        // ────────────────────────────────────────────────────────────────────────
        ArrayList<String> emptyTest = new ArrayList<>();
        
        // isEmpty() method
        // System.out.println(emptyTest.isEmpty());             // true
        
        // size() == 0 (also works)
        // System.out.println(emptyTest.size() == 0);           // true
        
        // After adding items
        emptyTest.add("item");
        // System.out.println(emptyTest.isEmpty());             // false
        
        
        // ────────────────────────────────────────────────────────────────────────
        // 4. CLEARING VS REMOVING (important distinction)
        // ────────────────────────────────────────────────────────────────────────
        ArrayList<String> removeTest = new ArrayList<>(Arrays.asList("a", "b", "c", "d"));
        
        // remove by value — removes only FIRST occurrence
        // removeTest.remove("b");        // ["a", "c", "d"]
        
        // remove by index
        // removeTest.remove(0);          // removes element at index 0
        
        // clear() — removes ALL elements
        // removeTest.clear();            // []
        
        
        // ────────────────────────────────────────────────────────────────────────
        // 5. CONVERTING ArrayList TO ARRAY
        // ────────────────────────────────────────────────────────────────────────
        ArrayList<String> toArrayTest = new ArrayList<>(Arrays.asList("x", "y", "z"));
        
        // Convert to String array
        String[] arr = toArrayTest.toArray(new String[0]);
        // System.out.println(Arrays.toString(arr));  // [x, y, z]
        
        
        // ────────────────────────────────────────────────────────────────────────
        // 6. SHALLOW VS DEEP COPY (tricky!)
        // ────────────────────────────────────────────────────────────────────────
        ArrayList<String> original = new ArrayList<>(Arrays.asList("a", "b", "c"));
        
        // Shallow copy — creates new ArrayList, but points to same elements
        // (for Strings this is fine; for mutable objects it's a trap!)
        ArrayList<String> shallowCopy = new ArrayList<>(original);
        // shallowCopy.add("d");          // affects only shallowCopy
        // shallowCopy.set(0, "z");       // affects both
        
        // Test: modify original and see if copy is affected
        // ArrayList<String> orig = new ArrayList<>(Arrays.asList("1", "2", "3"));
        // ArrayList<String> copy = new ArrayList<>(orig);
        // orig.add("4");
        // System.out.println("Original: " + orig);  // [1, 2, 3, 4]
        // System.out.println("Copy: " + copy);      // [1, 2, 3] — NOT affected
        
        // KEY INSIGHT: Why shallow copy is fine for Strings but NOT for mutable objects
        //
        // STRINGS ARE IMMUTABLE — once created, they can NEVER be changed.
        // Example:
        //   String s = "hello";
        //   s = s + " world";  // Creates a NEW String object, doesn't modify the old one
        //   s.toUpperCase();   // Creates a NEW String, doesn't change s
        //
        // So if both lists point to the same String objects, it doesn't matter:
        //   ArrayList original = ["apple", "banana"]
        //   ArrayList copy = ["apple", "banana"]  (shallow copy — same String objects)
        //   // Both lists still point to the same "apple" and "banana" objects, but:
        //   // You can NEVER change those String objects. They're locked in.
        //
        // BUT FOR MUTABLE OBJECTS — a trap!
        // Example: ArrayList of custom Person objects
        //   ArrayList<Person> original = [Person(name="Alice", age=30)]
        //   ArrayList<Person> copy = new ArrayList<>(original);  // Shallow copy
        //   
        //   // Both lists point to the SAME Person object!
        //   original.get(0).setAge(31);
        //   System.out.println(copy.get(0).getAge());  // 31! (unexpected — copy changed too!)
        //
        // This is why you need deep copy for mutable objects.

        // DEEP COPY — creates entirely independent lists (rarely needed for Strings)
        // For ArrayLists of Strings, shallow copy is fine because Strings are immutable.
        // But here's how you'd do a deep copy for completeness:
        // 
        // Option 1: Using streams (modern)
        ArrayList<String> deepCopy = original.stream()
            .collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        //
        // Option 2: Manual copying
        // ArrayList<String> deepCopy = new ArrayList<>();
        // for (String s : original) {
        //     deepCopy.add(new String(s));  // Create new String object
        // }
        //
        // KEY INSIGHT: For Strings it doesn't matter (immutable).
        // For mutable objects (e.g., ArrayList of custom objects), 
        // shallow copy = trap! Both copies reference same objects.
        // ────────────────────────────────────────────────────────────────────────
        // 7. Collections UTILITIES
        // ────────────────────────────────────────────────────────────────────────
        ArrayList<Integer> collectionsTest = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
        
        // sort() — sorts in place
        // Collections.sort(collectionsTest);
        // System.out.println(collectionsTest);  // [1, 2, 5, 8, 9]
        
        // reverse() — reverses in place
        // Collections.reverse(collectionsTest);
        // System.out.println(collectionsTest);  // [9, 8, 5, 2, 1]
        
        // min() and max()
        // System.out.println(Collections.min(collectionsTest));  // 1
        // System.out.println(Collections.max(collectionsTest));  // 9
    }   
}