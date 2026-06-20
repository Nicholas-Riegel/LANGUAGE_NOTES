namespace F16;

public static class Lists
{
    public static void Run()
    {
        // =============================================
        // LIST<T>  — dynamic array (most common collection in C#)
        // =============================================

        // Create
        var fruits = new List<string>();
        fruits.Add("apple");
        fruits.Add("banana");
        fruits.Add("cherry");

        // Collection initialiser
        var numbers = new List<int> { 10, 20, 30, 40, 50 };

        // ---- Access ----
        Console.WriteLine(fruits[0]);          // apple
        Console.WriteLine(fruits[^1]);         // cherry  (index from end)
        Console.WriteLine(fruits.Count);       // 3  (Count not Length for collections)

        // ---- Add / Insert ----
        fruits.Add("date");                    // append to end
        fruits.Insert(1, "avocado");           // insert at index 1
        fruits.AddRange(new[] { "elderberry", "fig" });  // add multiple
        Console.WriteLine(string.Join(", ", fruits));

        // ---- Remove ----
        fruits.Remove("banana");               // remove first matching value
        fruits.RemoveAt(0);                    // remove by index
        fruits.RemoveRange(0, 2);              // remove 2 elements starting at index 0
        fruits.RemoveAll(f => f.Length > 6);   // remove all matching predicate

        // ---- Search ----
        var list = new List<int> { 5, 3, 8, 1, 9, 2, 7 };
        Console.WriteLine(list.Contains(8));        // True
        Console.WriteLine(list.IndexOf(9));         // 4
        Console.WriteLine(list.LastIndexOf(3));     // 1
        Console.WriteLine(list.Exists(n => n > 8)); // True
        int found = list.Find(n => n > 7);          // 8  (first match)
        Console.WriteLine(found);

        // ---- Sort ----
        list.Sort();                               // in-place ascending
        Console.WriteLine(string.Join(", ", list));  // 1, 2, 3, 5, 7, 8, 9

        list.Sort((a, b) => b.CompareTo(a));       // descending (custom comparer)
        Console.WriteLine(string.Join(", ", list));  // 9, 8, 7, 5, 3, 2, 1

        list.Reverse();                            // in-place reverse
        Console.WriteLine(string.Join(", ", list));  // 1, 2, 3, 5, 7, 8, 9

        // ---- Convert ----
        int[] array = list.ToArray();
        var copy    = new List<int>(list);          // copy constructor

        // ---- ForEach ----
        list.ForEach(n => Console.Write(n + " "));   // 1 2 3 5 7 8 9
        Console.WriteLine();

        // ---- LINQ on List ----
        var evens   = list.Where(n => n % 2 == 0).ToList();
        var doubled = list.Select(n => n * 2).ToList();
        int sum     = list.Sum();
        Console.WriteLine(string.Join(", ", evens));    // 2, 8
        Console.WriteLine(sum);                          // 35

        // =============================================
        // LINKEDLIST<T>  — doubly-linked list
        // =============================================

        // Use when you need frequent insertions/deletions in the middle
        // Random access (indexing) is O(n) — avoid if you need that

        var linked = new LinkedList<string>();
        linked.AddLast("B");
        linked.AddLast("C");
        linked.AddFirst("A");           // A ↔ B ↔ C

        Console.WriteLine(string.Join(" → ", linked));  // A → B → C

        // Navigate nodes
        LinkedListNode<string>? node = linked.Find("B");
        if (node != null)
        {
            linked.AddAfter(node, "B2");    // A ↔ B ↔ B2 ↔ C
            linked.AddBefore(node, "A2");   // A ↔ A2 ↔ B ↔ B2 ↔ C
        }
        Console.WriteLine(string.Join(" → ", linked));

        linked.Remove("A2");
        Console.WriteLine(linked.First?.Value);  // A
        Console.WriteLine(linked.Last?.Value);   // C
        Console.WriteLine(linked.Count);         // 4
    }
}
