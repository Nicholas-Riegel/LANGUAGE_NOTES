
@SuppressWarnings("unused")
public class j09_FindingFiles {
    public static void main(String[] args) throws Exception {

        // There are three common ways to locate a file in Java.
        // Which one you use depends on where the file lives.


        // ── 1. HARDCODED PATH ─────────────────────────────────────────────────
        // Simple, but fragile. Works only when the JVM's working directory is
        // exactly what you expect — which is often not the case when running
        // tests, packaging a jar, or deploying anywhere.
        // Rule: never use this in real projects.

        java.io.File hardcoded = new java.io.File("src/test/resources/login-data.xlsx");
        // Breaks the moment the working directory differs from what you assumed.


        // ── 2. CLASSLOADER (standard for bundled files) ───────────────────────
        // The ClassLoader knows about the classpath — all the directories and jars
        // the JVM was told about at startup.  Any file placed inside
        // src/main/resources or src/test/resources ends up on the classpath
        // automatically in Maven/Gradle projects, and getResource() will find it.

        // getClass()           → the Class object for the current class
        // .getClassLoader()    → the loader that loaded this class
        // .getResource("...")  → searches the entire classpath for the file name;
        //                        returns a URL, or null if not found
        // .getPath()           → converts the URL to a plain file-system path string

        String path = j09_FindingFiles.class
                .getClassLoader()
                .getResource("login-data.xlsx")  // just the filename — no src/... prefix
                .getPath();

        java.io.File bundled = new java.io.File(path);

        // This works regardless of:
        //   • which directory you launched from
        //   • whether the file is inside a jar
        //   • whether you're running locally, in CI, or deployed
        // Use this for: test data, config files, templates — anything packaged with your app.


        // ── 3. ENVIRONMENT VARIABLE / SYSTEM PROPERTY ────────────────────────
        // For files that live *outside* the project and whose location varies
        // per environment (local machine, CI server, production, etc.).

        // Environment variable (set in the shell before running the JVM):
        //   export TEST_DATA_PATH=/data/login-data.xlsx
        String envPath = System.getenv("TEST_DATA_PATH");

        // System property (passed on the command line with -D):
        //   java -DtestDataPath=/data/login-data.xlsx ...
        String sysProp = System.getProperty("testDataPath");

        // Use this for: secrets, paths that differ between environments,
        // anything you don't want checked into source control.


        // ── QUICK DECISION GUIDE ──────────────────────────────────────────────
        // File lives inside your project (resources folder)?  → ClassLoader
        // File lives outside the project, path varies?        → env var / system property
        // Quick throwaway script, nothing real?               → hardcoded path (fine locally)
    }
}
