import java.util.HashMap;
import java.util.Map;

class HashMaps_test {

    public static void main(String[] args) {
        
        // create a HashMap
        HashMap<String, Object> map0 = new HashMap<>();   
        
        // add to it
        map0.put("name", "john");
        map0.put("age", 32);
        
        // modify entry
        map0.put("name", "John");

        // remove from it
        map0.remove("age");

        // get an entry
        System.out.println(map0.get("name"));

        // check for key
        if (map0.containsKey("age")){
            System.out.println(true);
        }

        // check for a value
        if (map0.containsValue("John")){
            System.out.println(true);
        }

        // print all the keys
        for (String key : map0.keySet()){
            System.out.println(key);
        }
        System.out.println(map0.keySet());

        // print all the values
        for (Object value : map0.values()){
            System.out.println(value);
        }
        System.out.println(map0.values());

        // print all the keys and values
        
        for (Map.Entry<String, Object> entry : map0.entrySet()){
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        map0.forEach((key, val) -> {
            System.out.println(key + ": " + val);
        });

        System.out.println(map0.entrySet());
        System.out.println(map0);
    }
}