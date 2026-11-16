// Creating files and directories with java.nio.file
//
// Run it:  java j10_createFiles.java
// It creates a temporary folder called "demo_uploads" in the current directory
// and deletes it again at the end.

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.UUID;
import java.util.stream.Stream;

@SuppressWarnings("unused")
public class j10_createFiles {
    public static void main(String[] args) throws IOException {

        // ── 1. PATH.OF ────────────────────────────────────────────────────────
        // A Path is just a location, not a file or folder. It does no disk I/O,
        // so the folder it points to may or may not exist.
        // Relative paths resolve against the JVM's working directory (where you
        // launched java), not against the source file.
        // Path.of(...) was added in Java 11 and replaces Paths.get(...).
        // Path uploads = Path.of("demo_uploads");

        // System.out.println(uploads);                      // demo_uploads
        // System.out.println(uploads.toAbsolutePath());     // working directory + demo_uploads
        // System.out.println(Files.exists(uploads));        // false: the Path exists, the folder doesn't

        // Several segments are joined with the OS separator (/ on macOS/Linux, \ on Windows)
        Path nested = Path.of("demo_uploads", "images", "2026");
        // System.out.println(nested);                       // demo_uploads/images/2026
        // getFileName() is misleadingly named: it returns the LAST segment of the
        // path, whether that is a file or a directory (here, the directory "2026").
        // A Path doesn't know which it is; only Files.isDirectory() and
        // Files.isRegularFile() check the disk.
        // System.out.println(nested.getFileName());         // 2026
        // System.out.println(nested.getParent());           // demo_uploads/images (all but the last segment)


        // ── 2. FILES.CREATEDIRECTORIES ────────────────────────────────────────
        // Like `mkdir -p`: creates the folder and any missing parents.
        Files.createDirectories(nested);
        System.out.println(Files.exists(nested));         // true
        System.out.println(Files.isDirectory(nested));    // true

        // Calling it again is safe: if the folder exists, nothing happens.
        // That's why an upload endpoint can call it on every request.
        // Files.createDirectories(nested);
        // System.out.println("Second call did not throw");

        // Files.createDirectory (singular) creates only the last segment.
        // It throws if the folder already exists...
        // try {
            // Files.createDirectory(nested);
        // } catch (FileAlreadyExistsException e) {
            // System.out.println("createDirectory threw: " + e);
        // }

        // ...and also if a parent is missing.
        // try {
        //     Files.createDirectory(Path.of("demo_uploads", "missing", "child"));
        // } catch (IOException e) {
        //     System.out.println("createDirectory threw: " + e);   // NoSuchFileException
        // }


        // ── 3. RESOLVE ────────────────────────────────────────────────────────
        // resolve() appends a segment to a Path (still no disk access).
        // Path file = uploads.resolve("hello.txt");
        // System.out.println(file);                         // demo_uploads/hello.txt

        // Writing a file needs the folder to exist, which is why we create
        // directories first.
        // Files.writeString(file, "Hello, files!");
        // System.out.println(Files.readString(file));       // Hello, files!
        // System.out.println(Files.size(file));             // 13 (bytes)

        // A regular file already at that path makes createDirectories fail.
        // try {
        //     Files.createDirectories(file);
        // } catch (IOException e) {
        //     System.out.println("createDirectories threw: " + e);   // FileAlreadyExistsException
        // }


        // ── 4. RANDOM FILENAMES (as used for uploads) ─────────────────────────
        // A UUID avoids collisions and is hard to guess; the original extension is kept.
        // String originalName = "photo.holiday.png";
        // String extension = originalName.contains(".")
        //         ? originalName.substring(originalName.lastIndexOf('.'))
        //         : "";
        // String filename = UUID.randomUUID() + extension;
        // System.out.println(filename);                     // e.g. 3f2a...-....png

        // Files.writeString(uploads.resolve(filename), "pretend image bytes");


        // ── 5. LISTING AND DELETING ───────────────────────────────────────────
        // Files.walk visits the folder and everything inside it.
        // try (Stream<Path> paths = Files.walk(uploads)) {
        //     paths.forEach(System.out::println);
        // }

        // A folder must be empty before it can be deleted, so delete children
        // first (reverse order puts the deepest paths first).
        // try (Stream<Path> paths = Files.walk(uploads)) {
        //     paths.sorted(Comparator.reverseOrder()).forEach(p -> {
        //         try {
        //             Files.delete(p);
        //         } catch (IOException e) {
        //             throw new RuntimeException(e);
        //         }
        //     });
        // }
        // System.out.println(Files.exists(uploads));        // false: cleaned up
    }
}
