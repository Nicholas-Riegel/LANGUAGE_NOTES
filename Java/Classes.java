// Define a class
class Dog {
    // Instance variables
    private String name;
    private int age;
    
    // Constructor
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Method
    public String speak(String sound) {
        return this.name + " says " + sound;
    }
    
    // Getters
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
}

// Create an object and test
public class Classes {
    public static void main(String[] args) {
        Dog fido = new Dog("Fido", 5);
        
        // Access attributes/methods
        System.out.println(fido.getName());        // 'Fido'
        System.out.println(fido.speak("woof"));    // 'Fido says woof'
        
        // Test inheritance
        Puppy puppy = new Puppy("Rex", 1);
        System.out.println(puppy.speak("yip"));
        
        // Test counter
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        System.out.println(Counter.getCount());  // 2
        
        // Test Person toString
        Person person = new Person("Nick");
        System.out.println(person.toString());  // Person(Nick)
        
        // Test equality vs identity
        EqualityDemo.demonstrate();
    }
}

// Inheritance
class Puppy extends Dog {
    public Puppy(String name, int age) {
        super(name, age);
    }
    
    @Override
    public String speak(String sound) {
        if (sound == null) sound = "yip";
        return super.speak(sound);
    }
    
    public String speak() {
        return speak("yip");
    }
}

// Class variables (static)
class Counter {
    private static int count = 0;
    
    public Counter() {
        Counter.count++;
    }
    
    public static int getCount() {
        return count;
    }
}

// toString method
class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    @Override
    public String toString() {
        return "Person(" + this.name + ")";
    }
}

// ===== OBJECT EQUALITY vs IDENTITY =====
// 
// IDENTITY (==): Checks if two references point to the SAME object in memory
// EQUALITY (.equals()): Checks if two objects have the SAME content/value
//
// Key Difference:
// - == compares memory addresses (reference equality)
// - .equals() compares object content (logical equality)
//
// Default behavior: .equals() uses == (checks reference)
// Must override .equals() to compare content instead!

class Book {
    private String title;
    private String author;
    
    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }
    
    // Without overriding equals(), Book uses default (== comparison)
    // This means two Book objects with same title/author are NOT equal!
    
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
}

class BookWithEquals {
    private String title;
    private String author;
    
    public BookWithEquals(String title, String author) {
        this.title = title;
        this.author = author;
    }
    
    // Override equals() to compare content, not references
    @Override
    public boolean equals(Object obj) {
        // 1. Check if same reference (identity) - quick optimization
        if (this == obj) return true;
        
        // 2. Check if obj is null or different class
        if (obj == null || getClass() != obj.getClass()) return false;
        
        // 3. Cast and compare fields
        BookWithEquals other = (BookWithEquals) obj;
        
        // 4. Compare all relevant fields
        if (title == null) {
            if (other.title != null) return false;
        } else if (!title.equals(other.title)) {
            return false;
        }
        
        if (author == null) {
            if (other.author != null) return false;
        } else if (!author.equals(other.author)) {
            return false;
        }
        
        return true;  // All fields match - objects are equal!
    }
    
    // IMPORTANT: When you override equals(), you MUST also override hashCode()!
    // Rule: If two objects are equal, they must have the same hash code
    // This is critical for HashMap, HashSet to work correctly
    @Override
    public int hashCode() {
        int result = 17;  // Start with prime number
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (author != null ? author.hashCode() : 0);
        return result;
    }
    
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
}

// Example testing equality vs identity
class EqualityDemo {
    public static void demonstrate() {
        System.out.println("\n===== EQUALITY vs IDENTITY =====");
        
        // ===== IDENTITY (==) =====
        Book book1 = new Book("1984", "Orwell");
        Book book2 = new Book("1984", "Orwell");
        Book book3 = book1;  // Same reference as book1
        
        System.out.println("Identity (==) tests:");
        System.out.println("book1 == book2: " + (book1 == book2));  // false (different objects)
        System.out.println("book1 == book3: " + (book1 == book3));  // true (same object)
        
        // ===== EQUALITY without .equals() override =====
        System.out.println("\nEquality without override:");
        System.out.println("book1.equals(book2): " + book1.equals(book2));  // false! Uses ==
        System.out.println("book1.equals(book3): " + book1.equals(book3));  // true (same ref)
        
        // ===== EQUALITY with .equals() override =====
        BookWithEquals bwe1 = new BookWithEquals("1984", "Orwell");
        BookWithEquals bwe2 = new BookWithEquals("1984", "Orwell");
        BookWithEquals bwe3 = bwe1;
        
        System.out.println("\nEquality with override:");
        System.out.println("bwe1 == bwe2: " + (bwe1 == bwe2));          // false (different objects)
        System.out.println("bwe1.equals(bwe2): " + bwe1.equals(bwe2));  // true! Compares content
        System.out.println("bwe1.equals(bwe3): " + bwe1.equals(bwe3));  // true (content & ref)
        
        // ===== STRING COMPARISON (Common Gotcha!) =====
        System.out.println("\nString comparison:");
        
        String s1 = new String("hello");
        String s2 = new String("hello");
        String s3 = "hello";  // String literal
        String s4 = "hello";  // Same literal (interned)
        
        System.out.println("s1 == s2: " + (s1 == s2));          // false (different objects)
        System.out.println("s1.equals(s2): " + s1.equals(s2));  // true (same content)
        System.out.println("s3 == s4: " + (s3 == s4));          // true (same literal, interned!)
        System.out.println("s1 == s3: " + (s1 == s3));          // false (different objects)
        
        System.out.println("\nTakeaway: For objects, use .equals() not ==!");
        System.out.println("For strings, ALWAYS use .equals() for content comparison");
    }
}

// Quick Reference:
//
// WHEN TO USE ==:
// - Comparing primitives (int, char, boolean, etc.)
// - Checking if two references point to same object (identity)
// - Comparing with null: if (obj == null)
//
// WHEN TO USE .equals():
// - Comparing object content (String, custom objects)
// - Logical equality (two objects with same data)
//
// OVERRIDE .equals() WHEN:
// - You need content-based comparison for your class
// - You plan to use objects in HashMap, HashSet
// - Two instances with same field values should be "equal"
//
// REMEMBER:
// - Override .equals() → MUST override .hashCode()
// - .equals() must be: reflexive, symmetric, transitive, consistent
// - null.equals(anything) throws NullPointerException!
// - Use obj != null && obj.equals(other) to be safe

