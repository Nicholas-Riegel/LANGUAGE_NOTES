namespace F31;

// =============================================
// FILE I/O
// =============================================

public static class FileIO
{
    static readonly string TestDir  = Path.Combine(Path.GetTempPath(), "csharp_notes_test");
    static readonly string TestFile = Path.Combine(TestDir, "sample.txt");

    public static void Run()
    {
        // Ensure clean test directory
        Directory.CreateDirectory(TestDir);

        // =============================================
        // FILE CLASS  (static — quick one-liners)
        // =============================================

        // Write (overwrites if exists)
        File.WriteAllText(TestFile, "Hello\nLine 2\nLine 3");

        // Read all at once
        string content = File.ReadAllText(TestFile);
        Console.WriteLine(content);

        // Read all lines
        string[] lines = File.ReadAllLines(TestFile);
        Console.WriteLine(lines.Length);         // 3
        Console.WriteLine(lines[0]);             // Hello

        // Append
        File.AppendAllText(TestFile, "\nLine 4");
        Console.WriteLine(File.ReadAllLines(TestFile).Length);  // 4

        // Write multiple lines at once
        File.WriteAllLines(TestFile, new[] { "Alpha", "Beta", "Gamma" });

        // Check existence
        Console.WriteLine(File.Exists(TestFile));   // True

        // File info
        FileInfo info = new FileInfo(TestFile);
        Console.WriteLine(info.Length);             // byte size
        Console.WriteLine(info.LastWriteTime);

        // Copy / Move / Delete
        string copyPath = Path.Combine(TestDir, "copy.txt");
        File.Copy(TestFile, copyPath, overwrite: true);
        File.Delete(copyPath);

        // =============================================
        // STREAMREADER / STREAMWRITER  (for large files — read line by line)
        // =============================================

        // Write with StreamWriter
        using (var writer = new StreamWriter(TestFile, append: false))
        {
            writer.WriteLine("StreamWriter line 1");
            writer.WriteLine("StreamWriter line 2");
            writer.Write("No newline at end");
        }   // Dispose() flushes and closes the file

        // Read with StreamReader
        using (var reader = new StreamReader(TestFile))
        {
            string? line;
            while ((line = reader.ReadLine()) != null)
            {
                Console.WriteLine(line);
            }
        }

        // using declaration (C# 8+) — cleaner
        using var reader2 = new StreamReader(TestFile);
        Console.WriteLine(reader2.ReadLine());   // StreamWriter line 1

        // =============================================
        // ASYNC FILE I/O  (don't block the thread)
        // =============================================

        ReadAndWriteAsync().GetAwaiter().GetResult();

        // =============================================
        // PATH CLASS  (cross-platform path manipulation)
        // =============================================

        string fullPath = @"C:\Users\Nicholas\Documents\notes.txt";

        Console.WriteLine(Path.GetFileName(fullPath));        // notes.txt
        Console.WriteLine(Path.GetFileNameWithoutExtension(fullPath)); // notes
        Console.WriteLine(Path.GetExtension(fullPath));       // .txt
        Console.WriteLine(Path.GetDirectoryName(fullPath));   // C:\Users\Nicholas\Documents

        // Combine — cross-platform (uses / on Unix, \ on Windows)
        string combined = Path.Combine("folder", "subfolder", "file.txt");
        Console.WriteLine(combined);   // folder/subfolder/file.txt  (or \ on Windows)

        string temp = Path.GetTempFileName();   // creates a temp file and returns the path
        Console.WriteLine(Path.GetTempPath());  // temp folder

        // =============================================
        // DIRECTORY CLASS
        // =============================================

        string subDir = Path.Combine(TestDir, "subdir");
        Directory.CreateDirectory(subDir);               // creates all intermediate dirs
        Console.WriteLine(Directory.Exists(subDir));     // True

        // List files
        File.WriteAllText(Path.Combine(TestDir, "a.txt"), "a");
        File.WriteAllText(Path.Combine(TestDir, "b.txt"), "b");

        string[] txtFiles = Directory.GetFiles(TestDir, "*.txt");
        foreach (string f in txtFiles)
            Console.WriteLine(Path.GetFileName(f));

        // Recursive file search
        string[] allFiles = Directory.GetFiles(TestDir, "*", SearchOption.AllDirectories);
        Console.WriteLine($"Total files: {allFiles.Length}");

        // =============================================
        // CLEANUP
        // =============================================

        Directory.Delete(TestDir, recursive: true);
        Console.WriteLine(Directory.Exists(TestDir));    // False
    }

    static async Task ReadAndWriteAsync()
    {
        // Async write
        await File.WriteAllTextAsync(TestFile, "Async content\nSecond line");

        // Async read
        string content = await File.ReadAllTextAsync(TestFile);
        Console.WriteLine(content);

        // Async line-by-line with StreamReader
        using var reader = new StreamReader(TestFile);
        while (!reader.EndOfStream)
        {
            string? line = await reader.ReadLineAsync();
            Console.WriteLine(line);
        }
    }
}
