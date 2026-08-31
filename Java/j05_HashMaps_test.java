import java.util.*;

class j05_HashMaps_test {

    public static void main(String[] args) {
        
        // create a HashMap
        HashMap<String, Integer> personId = new HashMap<>();
        
        // add to it
        personId.put("John", 43);
        personId.put("Alice", 26);
        

        // modify entry
        personId.put("Alice", 27);

        // remove from it
        // personId.remove("Alice");

        // get an entry
        // System.out.println(personId.get("John"));

        // check for key
        // System.out.println(personId.containsKey(
            // "John"
        // ));

        // check for a value
        // System.out.println(personId.containsValue(27));

        // print all the keys
        // for (String key : personId.keySet()){
        //     System.out.println(key);
        // }

        // print all the values
        // for (Object value : personId.values()){
        //     System.out.println(value);
        // }

        // print all the keys and values
        for (Map.Entry<String, Integer> entry : personId.entrySet()){
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // System.out.println(personId);       
        // System.out.println(personId.entrySet());
    }
}