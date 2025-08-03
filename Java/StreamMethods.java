import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.OptionalDouble;
import java.util.OptionalInt;
import java.util.Set;
import java.util.stream.Collectors;

public class StreamMethods {

    public static void main(String[] args) {
        
        System.out.println("\n=== Stream Methods ===");
        
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.addAll(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        
        ArrayList<String> names = new ArrayList<>();
        names.addAll(Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve"));
        
        // filter() - keep elements that match condition
        List<Integer> evenNumbers = numbers.stream()
        .filter(n -> n % 2 == 0)
        .collect(Collectors.toList());
        System.out.println("Even numbers: " + evenNumbers);  // [2, 4, 6, 8, 10]
        
        // map() - transform each element
        List<Integer> doubled = numbers.stream()
        .map(n -> n * 2)
        .collect(Collectors.toList());
        System.out.println("Doubled: " + doubled);  // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
        
        // map() with strings
        List<String> upperNames = names.stream()
        .map(String::toUpperCase)
        .collect(Collectors.toList());
        System.out.println("Upper names: " + upperNames);  // [ALICE, BOB, CHARLIE, DAVID, EVE]
        
        // forEach() - perform action on each element
        System.out.print("Names: ");
        names.stream().forEach(name -> System.out.print(name + " "));
        System.out.println();
        
        // reduce() - combine elements into single result
        int sum = numbers.stream()
        .reduce(0, (a, b) -> a + b);
        System.out.println("Sum: " + sum);  // 55
        
        // reduce() with method reference
        int product = numbers.stream()
        .reduce(1, Integer::max);
        System.out.println("Max: " + product);  // 10
        
        // count() - count elements
        long count = numbers.stream()
        .filter(n -> n > 5)
        .count();
        System.out.println("Numbers > 5: " + count);  // 5
        
        // anyMatch() - check if any element matches
        boolean hasEven = numbers.stream()
        .anyMatch(n -> n % 2 == 0);
        System.out.println("Has even number: " + hasEven);  // true
        
        // allMatch() - check if all elements match
        boolean allPositive = numbers.stream()
        .allMatch(n -> n > 0);
        System.out.println("All positive: " + allPositive);  // true
        
        // noneMatch() - check if no elements match
        boolean noNegative = numbers.stream()
        .noneMatch(n -> n < 0);
        System.out.println("No negative: " + noNegative);  // true
        
        // findFirst() - get first element (returns Optional)
        Optional<Integer> first = numbers.stream()
        .filter(n -> n > 5)
        .findFirst();
        System.out.println("First > 5: " + first.orElse(-1));  // 6
        
        // findAny() - get any element (returns Optional)
        Optional<String> anyName = names.stream()
        .filter(name -> name.startsWith("A"))
        .findAny();
        System.out.println("Name starting with A: " + anyName.orElse("None"));  // Alice
        
        // distinct() - remove duplicates
        ArrayList<Integer> withDuplicates = new ArrayList<>();
        withDuplicates.addAll(Arrays.asList(1, 2, 2, 3, 3, 3, 4, 4, 5));
        List<Integer> unique = withDuplicates.stream()
        .distinct()
        .collect(Collectors.toList());
        System.out.println("Unique: " + unique);  // [1, 2, 3, 4, 5]
        
        // sorted() - sort elements
        List<String> sortedNames = names.stream()
        .sorted()
        .collect(Collectors.toList());
        System.out.println("Sorted names: " + sortedNames);  // [Alice, Bob, Charlie, David, Eve]
        
        // sorted() with custom comparator
        List<String> sortedByLength = names.stream()
        .sorted(Comparator.comparing(String::length))
        .collect(Collectors.toList());
        System.out.println("Sorted by length: " + sortedByLength);  // [Bob, Eve, Alice, David, Charlie]
        
        // limit() - take first n elements
        List<Integer> firstThree = numbers.stream()
        .limit(3)
        .collect(Collectors.toList());
        System.out.println("First 3: " + firstThree);  // [1, 2, 3]
        
        // skip() - skip first n elements
        List<Integer> afterThree = numbers.stream()
        .skip(3)
        .collect(Collectors.toList());
        System.out.println("After skipping 3: " + afterThree);  // [4, 5, 6, 7, 8, 9, 10]
        
        // Chaining multiple operations
        List<Integer> complexResult = numbers.stream()
        .filter(n -> n % 2 == 1)      // odd numbers
        .map(n -> n * n)              // square them
        .filter(n -> n > 10)          // keep only > 10
        .sorted()                     // sort
        .collect(Collectors.toList());
        System.out.println("Odd squares > 10: " + complexResult);  // [25, 49, 81]
        
        // Common aggregation operations
        OptionalInt max = numbers.stream().mapToInt(Integer::intValue).max();
        OptionalInt min = numbers.stream().mapToInt(Integer::intValue).min();
        OptionalDouble average = numbers.stream().mapToInt(Integer::intValue).average();
        
        System.out.println("Max: " + max.orElse(0));
        System.out.println("Min: " + min.orElse(0));
        System.out.println("Average: " + average.orElse(0.0));
        
        // Collecting to different data structures
        Set<Integer> numberSet = numbers.stream()
        .collect(Collectors.toSet());
        
        Map<Boolean, List<Integer>> partitioned = numbers.stream()
        .collect(Collectors.partitioningBy(n -> n % 2 == 0));
        System.out.println("Even: " + partitioned.get(true));
        System.out.println("Odd: " + partitioned.get(false));
    }
}   