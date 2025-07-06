import java.util.*;

public class HashMaps {
    public static void main(String[] args) {
        // Create HashMap (Java equivalent of Python dictionaries)
        HashMap<String, Object> person = new HashMap<>();
        person.put("name", "Alice");
        person.put("age", 30);
        
        HashMap<String, Object> person2 = new HashMap<>();
        person2.put("name", "Bob");
        person2.put("age", 25);
        
        // Access
        System.out.println(person.get("name"));
        System.out.println(person.getOrDefault("email", "Not Found!"));
        
        // Modify
        person.put("age", 31);
        
        // Add
        person.put("email", "alice@example.com");
        
        // Remove
        person.remove("age");
        person.remove("name");
        
        // Check
        if (person.containsKey("email")) {
            System.out.println("yes");
        }
        
        // Keys, values, entrySet
        System.out.println(person.keySet());
        System.out.println(person.values());
        System.out.println(person.entrySet());
        
        // Iterate over entries
        for (Map.Entry<String, Object> entry : person.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Iterate over keys only
        for (String key : person.keySet()) {
            System.out.println(key);
        }
        
        // Iterate over values only
        for (Object value : person.values()) {
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
