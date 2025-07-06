import java.util.*;

public class ArrayLists {
    public static void main(String[] args) {
        // Create
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("apple");
        fruits.add("banana");
        fruits.add("cherry");
        
        // Access
        System.out.println(fruits.get(0));      // 'apple'
        System.out.println(fruits.get(fruits.size() - 1));  // 'cherry'
        
        // Modify
        fruits.set(1, "blueberry");
        
        // Add
        fruits.add("date");           // equivalent to append
        fruits.add(1, "kiwi");        // insert at index 1
        
        // Remove
        fruits.remove("apple");       // remove by value
        fruits.remove(fruits.size() - 1);  // remove last item
        fruits.remove(0);             // remove by index
        
        // Sublist (equivalent to slice)
        List<String> subList = fruits.subList(1, 3);  // elements 1 and 2
        System.out.println(subList);
        
        // Iterate
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
        
        // Check
        if (fruits.contains("banana")) {
            System.out.println("yes");
        }
        
        // Length
        System.out.println(fruits.size());
        
        // Count occurrences
        ArrayList<String> fruitsWithDuplicates = new ArrayList<>();
        fruitsWithDuplicates.add("apple");
        fruitsWithDuplicates.add("banana");
        fruitsWithDuplicates.add("apple");
        fruitsWithDuplicates.add("cherry");
        
        long appleCount = fruitsWithDuplicates.stream()
            .filter(fruit -> fruit.equals("apple"))
            .count();
        System.out.println(appleCount);  // Returns 2
        
        // Find index of item
        System.out.println(fruitsWithDuplicates.indexOf("banana"));  // Returns 1
        
        // Extend with another list
        ArrayList<String> moreFruits = new ArrayList<>();
        moreFruits.add("grape");
        moreFruits.add("mango");
        fruits.addAll(moreFruits);
        
        // Sort list
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(3);
        numbers.add(1);
        numbers.add(4);
        numbers.add(1);
        numbers.add(5);
        Collections.sort(numbers);  // Sorts in place
        System.out.println(numbers);
        
        // Sort without modifying original
        ArrayList<Integer> originalNumbers = new ArrayList<>();
        originalNumbers.add(3);
        originalNumbers.add(1);
        originalNumbers.add(4);
        originalNumbers.add(1);
        originalNumbers.add(5);
        ArrayList<Integer> sortedNumbers = new ArrayList<>(originalNumbers);
        Collections.sort(sortedNumbers);
        System.out.println(sortedNumbers);
        
        // Reverse list
        Collections.reverse(numbers);  // Reverses in place
        System.out.println(numbers);
        
        // Clear all items
        // fruits.clear();  // Removes all items
        
        // Copy list
        ArrayList<String> fruitsCopy = new ArrayList<>(fruits);
        
        // Min, max, sum (for numeric lists)
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(10);
        nums.add(5);
        nums.add(8);
        nums.add(3);
        nums.add(9);
        
        System.out.println(Collections.min(nums));
        System.out.println(Collections.max(nums));
        int sum = nums.stream().mapToInt(Integer::intValue).sum();
        System.out.println(sum);
        
        // List comprehension equivalent (using Streams)
        List<Integer> squares = new ArrayList<>();
        for (int x = 0; x < 5; x++) {
            squares.add(x * x);
        }
        
        // Combine lists
        ArrayList<Integer> list1 = new ArrayList<>();
        list1.add(1);
        list1.add(2);
        list1.add(3);
        
        ArrayList<Integer> list2 = new ArrayList<>();
        list2.add(4);
        list2.add(5);
        list2.add(6);
        
        ArrayList<Integer> combined = new ArrayList<>();
        combined.addAll(list1);
        combined.addAll(list2);  // [1, 2, 3, 4, 5, 6]
        
        // Function with variable arguments (varargs)
        System.out.println(addThree(1, 2, 3));
    }
    
    public static int addThree(int a, int b, int c) {
        return a + b + c;
    }
}
