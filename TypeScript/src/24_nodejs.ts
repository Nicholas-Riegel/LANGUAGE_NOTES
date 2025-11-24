/**
 * TypeScript with Node.js
 * Essential patterns for backend TypeScript development
 */

import * as fs from "fs/promises";
import * as path from "path";

// ============================================================================
// 1. BASIC NODE.JS TYPES
// ============================================================================

// Process and environment
const nodeEnv: string = process.env.NODE_ENV || "development";
const port: number = parseInt(process.env.PORT || "3000", 10);

// Process events
process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

// ============================================================================
// 2. FILE SYSTEM OPERATIONS
// ============================================================================

async function readFileExample(filePath: string): Promise<string> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
    throw error;
  }
}

async function writeFileExample(filePath: string, data: string): Promise<void> {
  await fs.writeFile(filePath, data, "utf-8");
}

async function listFiles(dirPath: string): Promise<string[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  return entries
    .filter(entry => entry.isFile())
    .map(entry => entry.name);
}

async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

// ============================================================================
// 3. PATH OPERATIONS
// ============================================================================

function getAbsolutePath(relativePath: string): string {
  return path.resolve(process.cwd(), relativePath);
}

function getFileName(filePath: string): string {
  return path.basename(filePath);
}

function getFileExtension(filePath: string): string {
  return path.extname(filePath);
}

function joinPaths(...segments: string[]): string {
  return path.join(...segments);
}

// ============================================================================
// 4. HTTP SERVER (NATIVE)
// ============================================================================

import * as http from "http";

interface RequestHandler {
  (req: http.IncomingMessage, res: http.ServerResponse): void;
}

const handler: RequestHandler = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  
  if (req.url === "/api/health") {
    res.statusCode = 200;
    res.end(JSON.stringify({ status: "ok" }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }
};

function createServer(): http.Server {
  return http.createServer(handler);
}

// ============================================================================
// 5. ENVIRONMENT VARIABLES
// ============================================================================

interface Config {
  port: number;
  dbUrl: string;
  apiKey: string;
  environment: "development" | "production" | "test";
}

function loadConfig(): Config {
  const env = process.env.NODE_ENV as Config["environment"] || "development";
  
  return {
    port: parseInt(process.env.PORT || "3000", 10),
    dbUrl: process.env.DATABASE_URL || "postgresql://localhost/mydb",
    apiKey: process.env.API_KEY || "",
    environment: env,
  };
}

// Type-safe environment variable access
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

// ============================================================================
// 6. STREAMS
// ============================================================================

import { Readable, Transform } from "stream";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

// Read large file with streams
async function processLargeFile(inputPath: string, outputPath: string): Promise<void> {
  const readable = createReadStream(inputPath);
  const writable = createWriteStream(outputPath);
  
  const uppercase = new Transform({
    transform(chunk: any, _encoding: any, callback: any) {
      const text = chunk.toString().toUpperCase();
      callback(null, text);
    }
  });
  
  await pipeline(readable, uppercase, writable);
}

// Custom readable stream
class NumberStream extends Readable {
  private current = 0;
  
  constructor(private max: number) {
    super({ objectMode: true });
  }
  
  _read() {
    if (this.current < this.max) {
      this.push(this.current++);
    } else {
      this.push(null);
    }
  }
}

// ============================================================================
// 7. TIMERS & INTERVALS
// ============================================================================

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class PeriodicTask {
  private intervalId: NodeJS.Timeout | null = null;
  
  start(fn: () => void, intervalMs: number): void {
    this.intervalId = setInterval(fn, intervalMs);
  }
  
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// ============================================================================
// 8. EVENT EMITTER
// ============================================================================

import { EventEmitter } from "events";

interface TaskEvents {
  start: (taskId: string) => void;
  complete: (taskId: string, result: unknown) => void;
  error: (taskId: string, error: Error) => void;
}

class TaskManager extends EventEmitter {
  async runTask(taskId: string, fn: () => Promise<unknown>): Promise<void> {
    this.emit("start", taskId);
    
    try {
      const result = await fn();
      this.emit("complete", taskId, result);
    } catch (error) {
      this.emit("error", taskId, error as Error);
    }
  }
}

// Type-safe event emitter
interface TypedEventEmitter<T extends Record<string, any[]>> {
  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this;
  emit<K extends keyof T>(event: K, ...args: T[K]): boolean;
}

// ============================================================================
// 9. CHILD PROCESSES
// ============================================================================

import { exec, spawn } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runCommand(command: string): Promise<string> {
  const { stdout, stderr } = await execAsync(command);
  if (stderr) {
    console.error("Command stderr:", stderr);
  }
  return stdout;
}

function runLongProcess(command: string, args: string[]): Promise<number> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);
    
    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    
    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
    
    child.on("close", (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

// ============================================================================
// 10. PRACTICAL PATTERNS
// ============================================================================

// Logger utility
class Logger {
  private level: "debug" | "info" | "warn" | "error";
  
  constructor(level: Logger["level"] = "info") {
    this.level = level;
  }
  
  debug(message: string, ...args: any[]): void {
    if (this.shouldLog("debug")) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }
  
  info(message: string, ...args: any[]): void {
    if (this.shouldLog("info")) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }
  
  warn(message: string, ...args: any[]): void {
    if (this.shouldLog("warn")) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }
  
  error(message: string, error?: Error): void {
    console.error(`[ERROR] ${message}`, error);
  }
  
  private shouldLog(level: Logger["level"]): boolean {
    const levels = ["debug", "info", "warn", "error"];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }
}

// Graceful shutdown handler
class GracefulShutdown {
  private shutdownHandlers: Array<() => Promise<void>> = [];
  
  register(handler: () => Promise<void>): void {
    this.shutdownHandlers.push(handler);
  }
  
  async shutdown(): Promise<void> {
    console.log("Starting graceful shutdown...");
    
    for (const handler of this.shutdownHandlers) {
      try {
        await handler();
      } catch (error) {
        console.error("Shutdown handler error:", error);
      }
    }
    
    console.log("Shutdown complete");
    process.exit(0);
  }
  
  setup(): void {
    process.on("SIGTERM", () => this.shutdown());
    process.on("SIGINT", () => this.shutdown());
  }
}

// Simple in-memory cache
class Cache<T> {
  private store = new Map<string, { value: T; expires: number }>();
  
  set(key: string, value: T, ttlMs: number): void {
    const expires = Date.now() + ttlMs;
    this.store.set(key, { value, expires });
  }
  
  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expires) {
      this.store.delete(key);
      return null;
    }
    
    return entry.value;
  }
  
  delete(key: string): boolean {
    return this.store.delete(key);
  }
  
  clear(): void {
    this.store.clear();
  }
}

// ============================================================================
// 11. BEST PRACTICES
// ============================================================================

/*
✅ DO:
- Use async/await for file operations
- Handle process signals for graceful shutdown
- Use streams for large files
- Validate environment variables at startup
- Use path.join() for cross-platform paths
- Type process.env access
- Use EventEmitter for pub/sub patterns
- Implement proper logging
- Handle uncaught exceptions

❌ DON'T:
- Use synchronous fs methods in production
- Ignore error events on streams
- Hardcode file paths
- Leave promises unhandled
- Use process.exit() without cleanup
- Assume environment variables exist
- Block the event loop with CPU-intensive tasks

💡 TIPS:
- Install @types/node for Node.js types
- Use dotenv for environment variables
- Consider winston or pino for logging
- Use PM2 or similar for process management
- Cluster module for multi-core utilization
*/

export {
  readFileExample,
  writeFileExample,
  listFiles,
  createServer,
  loadConfig,
  delay,
  Logger,
  Cache,
  GracefulShutdown,
  TaskManager,
  ensureDir,
  getAbsolutePath,
  getFileName,
  getFileExtension,
  joinPaths,
  getEnvVar,
  processLargeFile,
  NumberStream,
  PeriodicTask,
  runCommand,
  runLongProcess,
  nodeEnv,
  port,
};

export type { TaskEvents, TypedEventEmitter };
