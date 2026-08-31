import java.util.*;

@SuppressWarnings("unused")
public class j02_Arrays {
    public static void main(String[] args) {

        // ── BASICS ────────────────────────────────────────────────────────────
        // Arrays have a fixed size set at creation — unlike ArrayLists they cannot grow.
        // The type is written as Type[], e.g. int[], String[], boolean[].

        // Declare and initialise with literal values
        int[] numbers = { 3, 1, 4, 1, 5, 9 };
        String[] fruits = { "apple", "banana", "cherry" };

        // Declare with a fixed size (all slots start at the default value:
        //   0 for numeric types, false for boolean, null for objects)
        int[] zeros = new int[5];       // [0, 0, 0, 0, 0]
        String[] empty = new String[3]; // [null, null, null]


        // ── ACCESS & MODIFY ───────────────────────────────────────────────────
        // System.out.println(numbers[0]);   // 3  (first element)
        // System.out.println(numbers[numbers.length - 1]); // 9  (last element)

        numbers[0] = 99;  // modify in place


        // ── LENGTH ────────────────────────────────────────────────────────────
        // Arrays use .length (a field, not a method — no parentheses)
        // System.out.println(fruits.length);  // 3


        // ── PRINTING ──────────────────────────────────────────────────────────
        // System.out.println(numbers) prints the memory address — not helpful.
        // Use Arrays.toString() to get a readable string.
        // System.out.println(
        //     Arrays.toString(numbers)
        // ); // [99, 1, 4, 1, 5, 9]


        // ── ITERATING ─────────────────────────────────────────────────────────
        // For-each loop (read-only, simplest)
        // for (String fruit : fruits) {
        //     System.out.println(fruit);
        // }

        // Traditional for loop (needed when you need the index)
        // for (int i = 0; i < numbers.length; i++) {
        //     System.out.println(i + ": " + numbers[i]);
        // }


        // ── SORTING & SEARCHING ───────────────────────────────────────────────
        int[] toSort = { 5, 2, 8, 1, 9 };
        Arrays.sort(toSort);                   // sorts in place: [1, 2, 5, 8, 9]

        int index = Arrays.binarySearch(toSort, 5); // 2  (array must be sorted first)


        // ── COPYING ───────────────────────────────────────────────────────────
        // Simple assignment just copies the reference — both variables point at the same array.
        int[] sameArray = toSort;       // NOT a copy
        int[] realCopy  = Arrays.copyOf(toSort, toSort.length); // actual copy

        // Copy a slice (from index 1 up to but not including index 4)
        int[] slice = Arrays.copyOfRange(toSort, 1, 4); // [2, 5, 8]


        // ── 2D ARRAYS ─────────────────────────────────────────────────────────
        // A 2D array is just an array whose elements are themselves arrays.
        // Think of it as a table: first index = row, second index = column.
        //
        // Type[][]  — two pairs of brackets means "array of arrays of Type"

        int[][] grid = {
            { 1, 2, 3 },
            { 4, 5, 6 },
            { 7, 8, 9 }
        };

        // System.out.println(grid[0][0]); // 1  (row 0, col 0)
        // System.out.println(grid[1][2]); // 6  (row 1, col 2)
        // System.out.println(grid.length);    // 3  (number of rows)
        // System.out.println(grid[0].length); // 3  (number of columns in row 0)

        // Iterating a 2D array
        // for (int[] row : grid) {
        //     for (int cell : row) {
        //         System.out.print(cell + " ");
        //     }
        //     System.out.println();
        // }

        // Printing a 2D array readably
        // System.out.println(java.util.Arrays.deepToString(grid)); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

        // Rows don't have to be the same length ("jagged" arrays)
        int[][] jagged = {
            { 1 },
            { 2, 3 },
            { 4, 5, 6 }
        };


        // ── Object[][] — WHY YOU SEE IT IN TEST CODE ──────────────────────────
        // Object is the root class of everything in Java, so Object[] can hold
        // a mix of Strings, ints (autoboxed to Integer), booleans, etc.
        //
        // Object[][] is therefore a 2D array where each row can contain
        // a mixed set of values — exactly what a test data table needs.
        //
        // Example from a TestNG @DataProvider:
        //
        //   public Object[][] loginCredentials() {
        //       return new Object[][] {
        //           { "standard_user",   "secret_sauce", true  },  // row 0
        //           { "locked_out_user", "secret_sauce", false },  // row 1
        //           { "invalid_user",    "wrong_pass",   false }   // row 2
        //       };
        //   }
        //
        // Each inner array { ... } is one test case (one row).
        // TestNG reads row 0, pulls out element [0] as the username,
        // element [1] as the password, element [2] as the expected result,
        // and passes them as arguments to the test method.
        // Then it repeats for rows 1 and 2, running the test three times total.

        Object[][] credentials = {
            { "standard_user",   "secret_sauce", true  },
            { "locked_out_user", "secret_sauce", false },
            { "invalid_user",    "wrong_pass",   false }
        };

        // Accessing individual values — note the cast back to the real type
        String username      = (String)  credentials[0][0]; // "standard_user"
        String password      = (String)  credentials[0][1]; // "secret_sauce"
        boolean shouldPass   = (boolean) credentials[0][2]; // true

        // System.out.println(username + " / " + password + " → " + shouldPass);
    }
}

