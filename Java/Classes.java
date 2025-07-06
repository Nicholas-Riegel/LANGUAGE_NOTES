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
