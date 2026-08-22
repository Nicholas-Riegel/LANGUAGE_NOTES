import java.util.*;
import java.util.Arrays;

/**
 * HashSet Notes: Comprehensive Guide to Java HashSets
 * 
 * A HashSet is a collection that stores unique elements using a hash table.
 * It's the Java equivalent of Python's set data structure.
 * 
 * Key Characteristics:
 * - Stores unique elements only (no duplicates)
 * - No guaranteed order of elements
 * - Fast O(1) average time for basic operations (add, remove, contains)
 * - Allows one null value
 * - Not thread-safe (use Collections.synchronizedSet() or ConcurrentHashMap.newKeySet())
 */
@SuppressWarnings("unused")
class HashSetNotes {
    
    public static void main(String[] args) {
        
        // ===== CREATION AND INITIALIZATION =====
        System.out.println("=== HashSet Creation ===");
        
        // 1. Empty HashSet
        Set<String> colors = new HashSet<>();
        System.out.println("Empty set: " + colors);
        
        // 2. HashSet with initial capacity (for performance optimization)
        Set<Integer> numbers = new HashSet<>(16); // Initial capacity of 16
        
        // 3. HashSet from another collection
        List<String> fruits = Arrays.asList("apple", "banana", "apple", "orange");
        Set<String> fruitSet = new HashSet<>(fruits); // Duplicates automatically removed
        System.out.println("From list: " + fruitSet);
        
        // 4. HashSet using Set.of() (Java 9+) - Creates immutable set
        Set<String> daysOfWeek = Set.of("Monday", "Tuesday", "Wednesday");
        System.out.println("Immutable set: " + daysOfWeek);
        
        
        // ===== ADDING ELEMENTS =====
        System.out.println("\n=== Adding Elements ===");
        
        // add() method returns true if element was added, false if already existed
        boolean added1 = colors.add("red");
        boolean added2 = colors.add("blue");
        boolean added3 = colors.add("red"); // Duplicate - won't be added
        
        System.out.println("Added 'red': " + added1);    // true
        System.out.println("Added 'blue': " + added2);   // true
        System.out.println("Added 'red' again: " + added3); // false
        System.out.println("Colors set: " + colors);
        
        // Adding multiple elements
        colors.addAll(Arrays.asList("green", "yellow", "purple"));
        System.out.println("After adding multiple: " + colors);
        
        
        // ===== CHECKING MEMBERSHIP =====
        System.out.println("\n=== Checking Membership ===");
        
        // contains() method
        System.out.println("Contains 'red': " + colors.contains("red"));
        System.out.println("Contains 'black': " + colors.contains("black"));
        
        // containsAll() for multiple elements
        List<String> checkColors = Arrays.asList("red", "blue");
        System.out.println("Contains red and blue: " + colors.containsAll(checkColors));
        
        
        // ===== SIZE AND EMPTINESS =====
        System.out.println("\n=== Size and Emptiness ===");
        
        System.out.println("Size of colors: " + colors.size());
        System.out.println("Is empty: " + colors.isEmpty());
        
        Set<String> emptySet = new HashSet<>();
        System.out.println("Empty set size: " + emptySet.size());
        System.out.println("Empty set is empty: " + emptySet.isEmpty());
        
        
        // ===== REMOVING ELEMENTS =====
        System.out.println("\n=== Removing Elements ===");
        
        // remove() method returns true if element was removed
        boolean removed1 = colors.remove("yellow");
        boolean removed2 = colors.remove("black"); // Not in set
        
        System.out.println("Removed 'yellow': " + removed1); // true
        System.out.println("Removed 'black': " + removed2);  // false
        System.out.println("After removal: " + colors);
        
        // removeAll() - removes all specified elements
        colors.removeAll(Arrays.asList("red", "blue"));
        System.out.println("After removeAll: " + colors);
        
        // retainAll() - keeps only specified elements (intersection)
        colors.addAll(Arrays.asList("red", "blue", "orange"));
        colors.retainAll(Arrays.asList("green", "purple", "orange"));
        System.out.println("After retainAll: " + colors);
        
        // clear() - removes all elements
        Set<String> tempSet = new HashSet<>(colors);
        tempSet.clear();
        System.out.println("After clear: " + tempSet);
        
        
        // ===== ITERATING OVER HASHSET =====
        System.out.println("\n=== Iteration Methods ===");
        
        Set<String> animals = new HashSet<>();
        animals.addAll(Arrays.asList("dog", "cat", "bird", "fish"));
        
        // 1. Enhanced for loop (most common)
        System.out.print("Enhanced for loop: ");
        for (String animal : animals) {
            System.out.print(animal + " ");
        }
        System.out.println();
        
        // 2. Iterator
        System.out.print("Iterator: ");
        Iterator<String> iter = animals.iterator();
        while (iter.hasNext()) {
            System.out.print(iter.next() + " ");
        }
        System.out.println();
        
        // 3. Stream API (Java 8+)
        System.out.print("Stream forEach: ");
        animals.stream().forEach(animal -> System.out.print(animal + " "));
        System.out.println();
        
        // 4. Direct forEach (Java 8+)
        System.out.print("Direct forEach: ");
        animals.forEach(animal -> System.out.print(animal + " "));
        System.out.println();
        
        
        // ===== SET OPERATIONS =====
        System.out.println("\n=== Set Operations ===");
        
        Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        Set<Integer> set2 = new HashSet<>(Arrays.asList(4, 5, 6, 7, 8));
        
        // Union (combine all unique elements)
        Set<Integer> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("Set1: " + set1);
        System.out.println("Set2: " + set2);
        System.out.println("Union: " + union);
        
        // Intersection (common elements)
        Set<Integer> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        System.out.println("Intersection: " + intersection);
        
        // Difference (elements in set1 but not in set2)
        Set<Integer> difference = new HashSet<>(set1);
        difference.removeAll(set2);
        System.out.println("Difference (set1 - set2): " + difference);
        
        // Symmetric difference (elements in either set but not in both)
        Set<Integer> symDiff = new HashSet<>(union);
        symDiff.removeAll(intersection);
        System.out.println("Symmetric difference: " + symDiff);
        
        
        // ===== PRACTICAL EXAMPLES =====
        System.out.println("\n=== Practical Examples ===");
        
        // Example 1: Remove duplicates from a list
        List<String> listWithDuplicates = Arrays.asList("apple", "banana", "apple", "orange", "banana");
        Set<String> uniqueItems = new HashSet<>(listWithDuplicates);
        System.out.println("Original list: " + listWithDuplicates);
        System.out.println("Unique items: " + uniqueItems);
        
        // Example 2: Find unique characters in a string
        String text = "hello world";
        Set<Character> uniqueChars = new HashSet<>();
        for (char c : text.toCharArray()) {
            if (c != ' ') uniqueChars.add(c);
        }
        System.out.println("Unique characters in '" + text + "': " + uniqueChars);
        
        // Example 3: Check if two lists have common elements
        List<String> list1 = Arrays.asList("java", "python", "javascript");
        List<String> list2 = Arrays.asList("c++", "python", "go");
        
        Set<String> set1Languages = new HashSet<>(list1);
        boolean hasCommon = false;
        for (String lang : list2) {
            if (set1Languages.contains(lang)) {
                hasCommon = true;
                break;
            }
        }
        System.out.println("Lists have common elements: " + hasCommon);
        
        
        // ===== PERFORMANCE NOTES =====
        System.out.println("\n=== Performance Characteristics ===");
        System.out.println("• Add: O(1) average, O(n) worst case");
        System.out.println("• Remove: O(1) average, O(n) worst case");
        System.out.println("• Contains: O(1) average, O(n) worst case");
        System.out.println("• Size: O(1)");
        System.out.println("• Iteration: O(n)");
        
        
        // ===== IMPORTANT CONSIDERATIONS =====
        System.out.println("\n=== Important Considerations ===");
        System.out.println("1. Elements must properly implement hashCode() and equals()");
        System.out.println("2. No guaranteed order of elements");
        System.out.println("3. Not thread-safe - use Collections.synchronizedSet() for thread safety");
        System.out.println("4. Can contain at most one null element");
        System.out.println("5. Initial capacity and load factor affect performance");
        
        
        // ===== ALTERNATIVES =====
        System.out.println("\n=== HashSet Alternatives ===");
        
        // LinkedHashSet - maintains insertion order
        Set<String> linkedSet = new LinkedHashSet<>();
        linkedSet.addAll(Arrays.asList("first", "second", "third"));
        System.out.println("LinkedHashSet (maintains order): " + linkedSet);
        
        // TreeSet - maintains sorted order
        Set<String> treeSet = new TreeSet<>();
        treeSet.addAll(Arrays.asList("zebra", "apple", "banana"));
        System.out.println("TreeSet (sorted order): " + treeSet);
        
        // EnumSet - for enum types (most efficient)
        enum Color { RED, GREEN, BLUE }
        Set<Color> enumSet = EnumSet.of(Color.RED, Color.BLUE);
        System.out.println("EnumSet: " + enumSet);
    }
}
