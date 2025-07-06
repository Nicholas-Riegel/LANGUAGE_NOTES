import java.util.*;

public class Sandbox {
    public static void main(String[] args) {
        // create an array list
        ArrayList<String> arr0 = new ArrayList<>();
        arr0.add("apple");
        arr0.add("orange");
        
        // add to end
        arr0.add("banana");
        
        // add to beginning
        arr0.add(0, "kiwi");
        
        // remove from end
        // arr0.remove(arr0.size() - 1);
        
        // remove from beginning
        // arr0.remove(0);
        
        // remove by name
        // arr0.remove("apple");
        
        // sublist (equivalent to slice)
        // List<String> arr1 = arr0.subList(1, 3);
        // List<String> arr1 = arr0.subList(1, arr0.size());
        // List<String> arr1 = arr0.subList(0, 2);
        
        System.out.println(arr0);
        // System.out.println(arr1);
    }
}
