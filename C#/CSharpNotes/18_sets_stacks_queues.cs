namespace F18;

public static class SetStacksQueues
{
    public static void Run()
    {
        // =============================================
        // HASHSET<T>  — unordered, unique elements, O(1) operations
        // =============================================

        var setA = new HashSet<int> { 1, 2, 3, 4, 5 };
        var setB = new HashSet<int> { 3, 4, 5, 6, 7 };

        setA.Add(6);                          // add element
        setA.Add(3);                          // duplicate — silently ignored
        Console.WriteLine(setA.Count);        // 6  (not 7 — 3 already existed)
        Console.WriteLine(setA.Contains(4));  // True

        // Set operations
        var union = new HashSet<int>(setA);
        union.UnionWith(setB);                // A ∪ B
        Console.WriteLine(string.Join(", ", union));     // 1,2,3,4,5,6,7

        var intersect = new HashSet<int>(setA);
        intersect.IntersectWith(setB);        // A ∩ B
        Console.WriteLine(string.Join(", ", intersect)); // 3,4,5,6

        var diff = new HashSet<int>(setA);
        diff.ExceptWith(setB);               // A - B  (in A but not B)
        Console.WriteLine(string.Join(", ", diff));      // 1,2

        var symDiff = new HashSet<int>(setA);
        symDiff.SymmetricExceptWith(setB);   // in A or B but not both
        Console.WriteLine(string.Join(", ", symDiff));

        Console.WriteLine(setA.IsSubsetOf(union));       // True
        Console.WriteLine(setA.IsSupersetOf(intersect)); // True

        // ---- Practical: fast duplicate removal ----
        int[] withDups = { 1, 2, 2, 3, 3, 3, 4 };
        var unique = new HashSet<int>(withDups);
        Console.WriteLine(string.Join(", ", unique));    // 1, 2, 3, 4

        // ---- SortedSet: ordered unique elements ----
        var sorted = new SortedSet<string> { "banana", "apple", "cherry" };
        Console.WriteLine(string.Join(", ", sorted));    // apple, banana, cherry

        // =============================================
        // STACK<T>  — LIFO (Last In, First Out)
        // =============================================

        var stack = new Stack<string>();
        stack.Push("first");
        stack.Push("second");
        stack.Push("third");

        Console.WriteLine(stack.Peek());    // "third"  (look without removing)
        Console.WriteLine(stack.Pop());     // "third"  (remove and return)
        Console.WriteLine(stack.Pop());     // "second"
        Console.WriteLine(stack.Count);     // 1

        Console.WriteLine(stack.Contains("first")); // True

        // TryPop (safe — no exception on empty stack)
        if (stack.TryPop(out string? top))
            Console.WriteLine(top);         // first

        // ---- Use case: undo history, expression parsing ----
        // Balance-check brackets
        bool IsBalanced(string s)
        {
            var stk = new Stack<char>();
            foreach (char c in s)
            {
                if (c == '(' || c == '[' || c == '{') stk.Push(c);
                else if (c == ')' || c == ']' || c == '}')
                {
                    if (stk.Count == 0) return false;
                    char open = stk.Pop();
                    if ((c == ')' && open != '(') ||
                        (c == ']' && open != '[') ||
                        (c == '}' && open != '{')) return false;
                }
            }
            return stk.Count == 0;
        }
        Console.WriteLine(IsBalanced("({[]})"));  // True
        Console.WriteLine(IsBalanced("({[})"));   // False

        // =============================================
        // QUEUE<T>  — FIFO (First In, First Out)
        // =============================================

        var queue = new Queue<string>();
        queue.Enqueue("Alice");    // add to back
        queue.Enqueue("Bob");
        queue.Enqueue("Carol");

        Console.WriteLine(queue.Peek());     // "Alice"  (look without removing)
        Console.WriteLine(queue.Dequeue());  // "Alice"  (remove from front)
        Console.WriteLine(queue.Dequeue());  // "Bob"
        Console.WriteLine(queue.Count);      // 1

        queue.TryDequeue(out string? next);
        Console.WriteLine(next);             // Carol

        // ---- Use case: task processing, BFS ----

        // =============================================
        // PRIORITYQUEUE<TElement, TPriority>  (C# 10+)
        // =============================================

        // Lower priority number = dequeued first (min-heap by default)
        var pq = new PriorityQueue<string, int>();
        pq.Enqueue("Low priority task",    3);
        pq.Enqueue("High priority task",   1);
        pq.Enqueue("Medium priority task", 2);

        while (pq.Count > 0)
        {
            Console.WriteLine(pq.Dequeue());
        }
        // High priority task
        // Medium priority task
        // Low priority task
    }
}
