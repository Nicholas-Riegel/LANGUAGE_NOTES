public class Strings {
    public static void main(String[] args) {

        // String concatenation
        String text = "Hello " + "World";
        String name = "Alice";
        String message = String.format("Hello %s!", name);
        
        // String methods
        System.out.println(text.toUpperCase());     // "HELLO WORLD"
        System.out.println(text.toLowerCase());     // "hello world"
        System.out.println(capitalize(text));       // "Hello world"
        
        // String searching
        System.out.println(text.indexOf("World"));     // 6 (index of first occurrence)
        
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
        
        // String slicing (using substring)
        System.out.println(text.substring(0, 5));      // "Hello"
        System.out.println(text.substring(6));         // "World"
        System.out.println(text.substring(text.length() - 5)); // "World"
        System.out.println(reverse(text));             // "dlroW olleH"
        
        // String length
        System.out.println(text.length());             // 11
        
        // String membership
        System.out.println(text.contains("World"));    // true
        System.out.println(!text.contains("Python"));  // true
        
        // Multiple values
        String personName = "Bob";
        int personAge = 30;
        String info = String.format("Name: %s, Age: %d", personName, personAge);
        
        // Check if string is empty
        String empty = "";
        System.out.println(empty.length() == 0);        // true
        System.out.println(empty.isEmpty());            // true
        
        // Additional useful methods
        System.out.println(text.charAt(0));             // 'H' (character at index)
        
        // StringBuilder for efficient concatenation
        StringBuilder sb = new StringBuilder();
        sb.append("Hello");
        sb.append(" ");
        sb.append("World");
        System.out.println(sb.toString());              // "Hello World"
        
        // StringBuilder main methods demonstration
        StringBuilder builder = new StringBuilder("Java Programming");
        System.out.println("Original: " + builder.toString());  // "Java Programming"
        
        // append() - add to the end
        builder.append(" Language");
        System.out.println("After append: " + builder.toString());  // "Java Programming Language"
        
        // insert() - add at specific position
        builder.insert(5, "Awesome ");
        System.out.println("After insert: " + builder.toString());  // "Java Awesome Programming Language"
        
        // delete() - remove characters between indices
        builder.delete(5, 13);  // Remove "Awesome "
        System.out.println("After delete: " + builder.toString());  // "Java Programming Language"
        
        // deleteCharAt() - remove character at specific index
        builder.deleteCharAt(builder.length() - 1);  // Remove last character
        System.out.println("After deleteCharAt: " + builder.toString());  // "Java Programming Languag"
        
        // replace() - replace substring
        builder.replace(5, 16, "Coding");  // Replace "Programming" with "Coding"
        System.out.println("After replace: " + builder.toString());  // "Java Coding Languag"
        
        // reverse() - reverse the entire string
        StringBuilder reversed = new StringBuilder(builder).reverse();
        System.out.println("Reversed: " + reversed.toString());  // "gaugnaL gnidoC avaJ"
        
        // setCharAt() - change character at specific position
        builder.setCharAt(0, 'j');  // Change 'J' to 'j'
        System.out.println("After setCharAt: " + builder.toString());  // "java Coding Languag"
        
        // substring() - extract part of the string (creates new String)
        StringBuilder sub = new StringBuilder("Hello World");
        System.out.println("Substring(0,5): " + sub.substring(0, 5));  // "Hello"
        System.out.println("Substring(6): " + sub.substring(6));        // "World"
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
