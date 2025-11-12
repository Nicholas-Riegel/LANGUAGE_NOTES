// ========================================
// EQUALS (.equals()) vs DOUBLE EQUALS (==)
// ========================================
//
// This is one of the most common sources of bugs in Java!
// Understanding when to use each is CRITICAL.

public class EqualsVsDoubleEquals {
    public static void main(String[] args) {
        demonstrateDoubleEquals();
        demonstrateDotEquals();
        demonstrateStringGotcha();
        demonstrateNullSafety();
        demonstrateCommonMistakes();
    }
    
    // ===== DOUBLE EQUALS (==) =====
    // USE FOR: Primitives and reference identity
    static void demonstrateDoubleEquals() {
        System.out.println("\n===== DOUBLE EQUALS (==) =====");
        System.out.println("Compares: Memory addresses (for objects) or values (for primitives)\n");
        
        // 1. PRIMITIVES - Use ==
        int a = 5;
        int b = 5;
        System.out.println("Primitives:");
        System.out.println("int a = 5, b = 5");
        System.out.println("a == b: " + (a == b));  // true - compares VALUES
        
        double x = 3.14;
        double y = 3.14;
        System.out.println("\ndouble x = 3.14, y = 3.14");
        System.out.println("x == y: " + (x == y));  // true - compares VALUES
        
        boolean flag1 = true;
        boolean flag2 = true;
        System.out.println("\nboolean flag1 = true, flag2 = true");
        System.out.println("flag1 == flag2: " + (flag1 == flag2));  // true
        
        // 2. REFERENCE IDENTITY - Use ==
        System.out.println("\nReference Identity:");
        String s1 = new String("hello");
        String s2 = new String("hello");
        String s3 = s1;  // s3 points to same object as s1
        
        System.out.println("String s1 = new String(\"hello\")");
        System.out.println("String s2 = new String(\"hello\")");
        System.out.println("String s3 = s1");
        System.out.println("s1 == s2: " + (s1 == s2));  // false - DIFFERENT objects in memory
        System.out.println("s1 == s3: " + (s1 == s3));  // true - SAME object in memory
        
        // 3. NULL CHECKING - Use ==
        System.out.println("\nNull Checking:");
        String nullStr = null;
        System.out.println("nullStr == null: " + (nullStr == null));  // true
        System.out.println("s1 == null: " + (s1 == null));            // false
        
        System.out.println("\n✓ Use == for: primitives, checking if same object, null checks");
    }
    
    // ===== DOT EQUALS (.equals()) =====
    // USE FOR: Comparing object CONTENT/VALUE
    static void demonstrateDotEquals() {
        System.out.println("\n===== DOT EQUALS (.equals()) =====");
        System.out.println("Compares: Object CONTENT (if properly implemented)\n");
        
        // 1. STRINGS - ALWAYS use .equals()
        System.out.println("Strings:");
        String str1 = new String("Java");
        String str2 = new String("Java");
        String str3 = new String("Python");
        
        System.out.println("String str1 = new String(\"Java\")");
        System.out.println("String str2 = new String(\"Java\")");
        System.out.println("String str3 = new String(\"Python\")");
        System.out.println("str1.equals(str2): " + str1.equals(str2));  // true - same content
        System.out.println("str1.equals(str3): " + str1.equals(str3));  // false - different content
        
        // 2. WRAPPER CLASSES - Use .equals()
        System.out.println("\nWrapper Classes:");
        Integer num1 = new Integer(100);
        Integer num2 = new Integer(100);
        
        System.out.println("Integer num1 = new Integer(100)");
        System.out.println("Integer num2 = new Integer(100)");
        System.out.println("num1 == num2: " + (num1 == num2));          // false - different objects
        System.out.println("num1.equals(num2): " + num1.equals(num2));  // true - same value
        
        // 3. CUSTOM OBJECTS - Use .equals() if overridden
        System.out.println("\nCustom Objects:");
        Person p1 = new Person("Alice", 25);
        Person p2 = new Person("Alice", 25);
        Person p3 = new Person("Bob", 30);
        
        System.out.println("Person p1 = new Person(\"Alice\", 25)");
        System.out.println("Person p2 = new Person(\"Alice\", 25)");
        System.out.println("Person p3 = new Person(\"Bob\", 30)");
        System.out.println("p1 == p2: " + (p1 == p2));          // false - different objects
        System.out.println("p1.equals(p2): " + p1.equals(p2));  // true - same content (equals overridden)
        System.out.println("p1.equals(p3): " + p1.equals(p3));  // false - different content
        
        System.out.println("\n✓ Use .equals() for: Strings, wrappers, comparing object content");
    }
    
    // ===== STRING COMPARISON GOTCHA =====
    // String literals are INTERNED - reused from a pool
    static void demonstrateStringGotcha() {
        System.out.println("\n===== STRING LITERAL GOTCHA =====");
        System.out.println("String literals are stored in a String pool and reused!\n");
        
        // String literals (without 'new') are interned
        String literal1 = "hello";
        String literal2 = "hello";
        
        System.out.println("String literal1 = \"hello\"  (no 'new')");
        System.out.println("String literal2 = \"hello\"  (no 'new')");
        System.out.println("literal1 == literal2: " + (literal1 == literal2));  // true! Same object from pool
        System.out.println("literal1.equals(literal2): " + literal1.equals(literal2));  // true
        
        // Strings created with 'new' are different objects
        String newStr1 = new String("hello");
        String newStr2 = new String("hello");
        
        System.out.println("\nString newStr1 = new String(\"hello\")  (with 'new')");
        System.out.println("String newStr2 = new String(\"hello\")  (with 'new')");
        System.out.println("newStr1 == newStr2: " + (newStr1 == newStr2));  // false - different objects
        System.out.println("newStr1.equals(newStr2): " + newStr1.equals(newStr2));  // true - same content
        
        // Mixed comparison
        System.out.println("\nliteral1 == newStr1: " + (literal1 == newStr1));  // false - different objects
        System.out.println("literal1.equals(newStr1): " + literal1.equals(newStr1));  // true - same content
        
        System.out.println("\n⚠️  TAKEAWAY: For strings, ALWAYS use .equals() to compare content!");
        System.out.println("    Using == with strings is unreliable and error-prone.");
    }
    
    // ===== NULL SAFETY =====
    // Calling .equals() on null throws NullPointerException!
    static void demonstrateNullSafety() {
        System.out.println("\n===== NULL SAFETY =====");
        System.out.println("Calling .equals() on null causes NullPointerException!\n");
        
        String str1 = "hello";
        String str2 = null;
        
        // SAFE: Using ==
        System.out.println("Safe null check:");
        System.out.println("str2 == null: " + (str2 == null));  // true
        System.out.println("str1 == null: " + (str1 == null));  // false
        
        // UNSAFE: Calling .equals() on null
        System.out.println("\nUnsafe .equals() on null:");
        try {
            System.out.println("str2.equals(str1): ");
            str2.equals(str1);  // NullPointerException!
        } catch (NullPointerException e) {
            System.out.println("  ⚠️  NullPointerException thrown!");
        }
        
        // SAFE: Check null first, or use constant/literal first
        System.out.println("\nSafe patterns:");
        System.out.println("1. Check null first:");
        System.out.println("   str1 != null && str1.equals(str2): " + (str1 != null && str1.equals(str2)));
        
        System.out.println("\n2. Put known non-null value first (Yoda condition):");
        System.out.println("   \"hello\".equals(str2): " + "hello".equals(str2));  // false, no exception!
        System.out.println("   \"hello\".equals(str1): " + "hello".equals(str1));  // true
        
        System.out.println("\n3. Use Objects.equals() (Java 7+):");
        System.out.println("   Objects.equals(str1, str2): " + java.util.Objects.equals(str1, str2));  // null-safe!
        
        System.out.println("\n✓ Always check for null before calling .equals(), or use safe patterns!");
    }
    
    // ===== COMMON MISTAKES =====
    static void demonstrateCommonMistakes() {
        System.out.println("\n===== COMMON MISTAKES =====\n");
        
        // Mistake 1: Using == for Strings
        System.out.println("❌ MISTAKE 1: Using == to compare strings");
        String input = new String("yes");  // Simulating user input
        if (input == "yes") {  // WRONG! Compares references
            System.out.println("  This might not execute even if input is 'yes'!");
        } else {
            System.out.println("  ⚠️  Failed! input == \"yes\" is false (different objects)");
        }
        
        System.out.println("✓ CORRECT: Use .equals()");
        if (input.equals("yes")) {
            System.out.println("  Success! This executes correctly.");
        }
        
        // Mistake 2: Using .equals() for primitives
        System.out.println("\n❌ MISTAKE 2: Trying to use .equals() on primitives");
        System.out.println("  int x = 5;");
        System.out.println("  // x.equals(5);  <- Won't compile! int is primitive");
        System.out.println("✓ CORRECT: Use == for primitives");
        int x = 5;
        System.out.println("  x == 5: " + (x == 5));
        
        // Mistake 3: Forgetting to override .equals()
        System.out.println("\n❌ MISTAKE 3: Forgetting to override .equals() in custom class");
        BadPerson bp1 = new BadPerson("John");
        BadPerson bp2 = new BadPerson("John");
        System.out.println("  bp1.equals(bp2): " + bp1.equals(bp2) + " (should be true but isn't!)");
        System.out.println("✓ CORRECT: Override .equals() for content comparison (see Person class)");
        
        // Mistake 4: Not checking null
        System.out.println("\n❌ MISTAKE 4: Not checking for null");
        String nullStr = null;
        try {
            System.out.println("  nullStr.equals(\"hello\"): ");
            nullStr.equals("hello");
        } catch (NullPointerException e) {
            System.out.println("  ⚠️  Crashed with NullPointerException!");
        }
        System.out.println("✓ CORRECT: Check null first or use safe patterns (see above)");
    }
}

// Example class WITH proper .equals() override
class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person other = (Person) obj;
        return age == other.age && 
               (name == null ? other.name == null : name.equals(other.name));
    }
    
    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + age;
        return result;
    }
}

// Example class WITHOUT .equals() override (uses default == behavior)
class BadPerson {
    private String name;
    
    public BadPerson(String name) {
        this.name = name;
    }
    
    // No .equals() override - will use default (== comparison)
}

// ========================================
// QUICK REFERENCE GUIDE
// ========================================
//
// USE == WHEN:
// ✓ Comparing primitives (int, char, boolean, double, etc.)
// ✓ Checking if two references point to SAME object (identity)
// ✓ Comparing with null (if (obj == null))
// ✓ Checking if two variables refer to same array/object in memory
//
// USE .equals() WHEN:
// ✓ Comparing String content (ALWAYS!)
// ✓ Comparing wrapper objects (Integer, Double, Boolean, etc.)
// ✓ Comparing custom object content (if .equals() is overridden)
// ✓ Checking logical equality (do two objects have same value?)
//
// IMPORTANT RULES:
// 1. For Strings: ALWAYS use .equals() for content comparison
// 2. For primitives: ALWAYS use ==
// 3. For objects: Use .equals() for content, == for identity
// 4. ALWAYS check for null before calling .equals()
// 5. When you override .equals(), you MUST override hashCode()
//
// SAFE NULL PATTERNS:
// 1. if (obj != null && obj.equals(other))
// 2. if ("constant".equals(variable))  // Yoda condition
// 3. if (Objects.equals(obj1, obj2))   // Java 7+
//
// COMMON BUG:
// if (userInput == "yes")  // ❌ WRONG! May fail unexpectedly
// if (userInput.equals("yes"))  // ✓ CORRECT!
//
// MEMORY DIAGRAM:
//
// String s1 = new String("hello");   → [Object @ 0x1234] → "hello"
// String s2 = new String("hello");   → [Object @ 0x5678] → "hello"
// String s3 = s1;                    → [Object @ 0x1234] → "hello"
//
// s1 == s2  → false (different memory addresses: 0x1234 vs 0x5678)
// s1.equals(s2)  → true (same content: "hello")
// s1 == s3  → true (same memory address: 0x1234)
//
