import java.util.*;

// One small thing I'd point out: you can declare a record inside main() as well as inside the class, as I did with Employee, Person2, etc. That's convenient for experimenting, but in normal code you'd generally declare your records at the class/package level rather than burying them inside main().

// A record is a concise, immutable class intended primarily to represent a fixed set of data.

// Create a record
record Person(String name, int age) {}


@SuppressWarnings("unused")
public class j10_Records {    

    public static void main(String[] args) {

        // Create records
        Person person1 = new Person("John", 26);
        Person person2 = new Person("Alice", 30);

        // Access fields
        // Records use methods with the same name as the fields.
        System.out.println(person1.name());
        System.out.println(person1.age());

        // Records are immutable
        // person1.age = 27;       // ❌
        // person1.setAge(27);     // ❌

        // Instead, create a new record
        person1 = new Person("John", 27);

        // toString()
        // Records automatically provide a useful toString()
        System.out.println(person1);
        // Person[name=John, age=27]

        // equals()
        // Records automatically compare their contents
        Person person3 = new Person("John", 27);
        System.out.println(person1.equals(person3));  // true

        // hashCode()
        // Records automatically provide hashCode() based on their fields
        System.out.println(person1.hashCode());

        // Record with multiple fields
        record Employee(String name, int age, String department) {}

        Employee employee = new Employee(
            "Fred",
            35,
            "Engineering"
        );

        System.out.println(employee.name());
        System.out.println(employee.department());

        // Records can have methods
        record Person2(String name, int age) {
            boolean isAdult() {
                return age >= 18;
            }
        }

        Person2 person4 = new Person2("Mary", 25);
        System.out.println(person4.isAdult());  // true

        // Custom constructor validation
        record Person3(String name, int age) {
            Person3 {
                if (age < 0) {
                    throw new IllegalArgumentException(
                        "Age cannot be negative"
                    );
                }
            }
        }

        Person3 person5 = new Person3("Steve", 40);

        // HashMap vs. Record
        //
        // HashMap: key → value lookup
        HashMap<String, Integer> personIds = new HashMap<>();
        personIds.put("John", 23);
        personIds.put("Alice", 30);

        // Record: fixed structure for a piece of data
        Person person6 = new Person("John", 26);

        // A record can be used in collections
        List<Person> people = new ArrayList<>();
        people.add(new Person("John", 26));
        people.add(new Person("Alice", 30));
        people.add(new Person("Fred", 35));

        for (Person person : people) {
            System.out.println(person.name() + ": " + person.age());
        }

        // Record syntax:
        //
        // record RecordName(Type field1, Type field2) {}
        //
        // Example:
        //
        // record Point(int x, int y) {}
        //
        // Point p = new Point(10, 20);
        // System.out.println(p.x());
        // System.out.println(p.y());
    }
}

