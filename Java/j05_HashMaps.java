import java.util.*;

@SuppressWarnings("unused")
public class j05_HashMaps {
    public static void main(String[] args) {
        
        // Create HashMap (Java equivalent of Python dictionaries)
        HashMap<String, Integer> personIds = new HashMap<>();
        personIds.put("John", 23);
        personIds.put("Alice", 30);
        
        // Access
        System.out.println(personIds.get("John"));
        System.out.println(personIds.getOrDefault("Alice", -1));
        
        // Modify
        personIds.put("Alice", 31);
        
        // Add
        personIds.put("Fred", 98);
        
        // Remove
        personIds.remove("Fred");
        
        // Check
        if (personIds.containsKey("John")) {
            System.out.println("yes");
        }
        
        // Keys, values, entrySet
        System.out.println(personIds.keySet());
        System.out.println(personIds.values());
        System.out.println(personIds.entrySet());
        
        // Iterate over entries
        for (Map.Entry<String, Integer> entry : personIds.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Iterate over keys only
        for (String key : personIds.keySet()) {
            System.out.println(key);
        }
        
        // Iterate over values only
        for (int value : personIds.values()) {
            System.out.println(value);
        }
        
        // Map comprehension equivalent (using Streams)
        Map<Integer, Integer> squares = new HashMap<>();
        for (int x = 0; x < 5; x++) {
            squares.put(x, x * x);
        }
        
        // Alternative using Streams (Java 8+)
        Map<Integer, Integer> squares2 = java.util.stream.IntStream.range(0, 5)
            .boxed()
            .collect(java.util.stream.Collectors.toMap(x -> x, x -> x * x));
    }
}
