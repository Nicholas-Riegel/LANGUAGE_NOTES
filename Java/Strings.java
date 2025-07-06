public class Strings {
    public static void main(String[] args) {
        // String creation
        String text = "Hello World";
        String multiline = "This is a\nmultiline string";
        
        // String concatenation
        String greeting = "Hello" + " " + "World";
        String name = "Alice";
        String message = String.format("Hello %s!", name);
        
        // String methods
        System.out.println(text.toUpperCase());     // "HELLO WORLD"
        System.out.println(text.toLowerCase());     // "hello world"
        System.out.println(capitalize(text));       // "Hello world"
        
        // String checking
        System.out.println(text.startsWith("Hello"));  // true
        System.out.println(text.endsWith("World"));    // true
        System.out.println(isDigit("123"));             // true
        System.out.println(isAlpha("abc"));             // true
        System.out.println(isAlnum("abc123"));          // true
        
        // String searching
        System.out.println(text.indexOf("World"));     // 6 (index of first occurrence)
        System.out.println(countOccurrences(text, "l")); // 3 (count occurrences)
        
        // String replacement
        String newText = text.replace("World", "Java");
        System.out.println(newText);  // "Hello Java"
        
        // Replace all occurrences
        String replaceAll = text.replace("l", "L");
        System.out.println(replaceAll);  // "HeLLo WorLd"
        
        // String splitting and joining
        String[] words = text.split(" ");              // ["Hello", "World"]
        String rejoined = String.join(" ", words);     // "Hello World"
        
        String csvData = "apple,banana,cherry";
        String[] fruits = csvData.split(",");          // ["apple", "banana", "cherry"]
        
        // String trimming
        String spaced = "  Hello World  ";
        System.out.println(spaced.trim());             // "Hello World"
        // Note: stripLeading() and stripTrailing() available in Java 11+
        
        // String slicing (using substring)
        System.out.println(text.substring(0, 5));      // "Hello"
        System.out.println(text.substring(0, 5));      // "Hello"
        System.out.println(text.substring(6));         // "World"
        System.out.println(text.substring(text.length() - 5)); // "World"
        System.out.println(reverse(text));             // "dlroW olleH"
        
        // String length
        System.out.println(text.length());             // 11
        
        // String membership
        System.out.println(text.contains("World"));    // true
        System.out.println(!text.contains("Python"));  // true
        
        // String formatting
        int age = 25;
        String formatted = String.format("I am %d years old", age);
        
        // Multiple values
        String personName = "Bob";
        int personAge = 30;
        String info = String.format("Name: %s, Age: %d", personName, personAge);
        
        // String escape characters
        String escaped = "He said \"Hello\"";
        String newline = "Line 1\nLine 2";
        String tab = "Column1\tColumn2";
        
        // String comparison
        System.out.println("apple".compareTo("banana") < 0);  // true (alphabetical order)
        System.out.println("Apple".compareTo("apple") < 0);   // true (uppercase comes first)
        
        // String repetition
        String repeated = repeatString("Ha", 3);        // "HaHaHa"
        
        // Check if string is empty
        String empty = "";
        System.out.println(empty.length() == 0);        // true
        System.out.println(empty.isEmpty());            // true
        // Note: isBlank() available in Java 11+
        
        // Additional useful methods
        System.out.println(text.charAt(0));             // 'H' (character at index)
        System.out.println((int) text.charAt(0));       // 72 (ASCII code)
        
        // String builder for efficient concatenation
        StringBuilder sb = new StringBuilder();
        sb.append("Hello");
        sb.append(" ");
        sb.append("World");
        System.out.println(sb.toString());              // "Hello World"
    }
    
    // Helper methods
    public static String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }
    
    public static boolean isDigit(String str) {
        return str.matches("\\d+");
    }
    
    public static boolean isAlpha(String str) {
        return str.matches("[a-zA-Z]+");
    }
    
    public static boolean isAlnum(String str) {
        return str.matches("[a-zA-Z0-9]+");
    }
    
    public static int countOccurrences(String text, String target) {
        int count = 0;
        int index = 0;
        while ((index = text.indexOf(target, index)) != -1) {
            count++;
            index += target.length();
        }
        return count;
    }
    
    public static String reverse(String str) {
        return new StringBuilder(str).reverse().toString();
    }
    
    public static String repeatString(String str, int count) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < count; i++) {
            sb.append(str);
        }
        return sb.toString();
    }
}
