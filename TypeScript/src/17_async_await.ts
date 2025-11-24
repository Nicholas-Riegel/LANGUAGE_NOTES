/**
 * TypeScript Async/Await
 * 
 * Working with asynchronous code using Promises,
 * async/await syntax, and error handling.
 */

// ============================================
// BASIC PROMISES
// ============================================

// Creating a promise
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Using .then()
delay(100).then(() => {
  console.log("Delayed execution");
});

// Promise with value
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User${id}` });
    }, 100);
  });
}

fetchUser(1).then((user) => {
  console.log(`User: ${user.name}`);
});

// ============================================
// ASYNC/AWAIT
// ============================================

// Async function always returns a Promise
async function getUser(id: number): Promise<{ id: number; name: string }> {
  await delay(100);
  return { id, name: `User${id}` };
}

// Using await
async function example1(): Promise<void> {
  const user = await getUser(1);
  console.log(`\nAsync user: ${user.name}`);
}

example1();

// ============================================
// ERROR HANDLING
// ============================================

// Promise rejection
function fetchData(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes("error")) {
        reject(new Error("Failed to fetch"));
      } else {
        resolve("Data from " + url);
      }
    }, 100);
  });
}

// Try/catch with async/await
async function example2(): Promise<void> {
  try {
    const data = await fetchData("https://api.example.com");
    console.log(`\n${data}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
  }
}

example2();

// Multiple awaits
// async function example3(): Promise<void> {
//   try {
//     const user = await getUser(1);
//     const data = await fetchData("https://api.example.com");
//     console.log(`${user.name}: ${data}`);
//   } catch (error) {
//     console.log("Error in example3");
//   }
// }

// ============================================
// PARALLEL EXECUTION
// ============================================

// Sequential (slower)
async function sequential(): Promise<void> {
  const user1 = await getUser(1);
  const user2 = await getUser(2);
  const user3 = await getUser(3);
  
  console.log(`\nSequential: ${user1.name}, ${user2.name}, ${user3.name}`);
}

// Parallel with Promise.all (faster)
async function parallel(): Promise<void> {
  const [user1, user2, user3] = await Promise.all([
    getUser(1),
    getUser(2),
    getUser(3)
  ]);
  
  console.log(`Parallel: ${user1.name}, ${user2.name}, ${user3.name}`);
}

sequential();
parallel();

// ============================================
// PROMISE UTILITIES
// ============================================

// Promise.all - waits for all to complete
async function example4(): Promise<void> {
  const users = await Promise.all([
    getUser(1),
    getUser(2),
    getUser(3)
  ]);
  
  console.log(`\nAll users: ${users.map(u => u.name).join(", ")}`);
}

example4();

// Promise.race - returns first to complete
async function example5(): Promise<void> {
  const fastest = await Promise.race([
    delay(100).then(() => "Slow"),
    delay(50).then(() => "Fast"),
    delay(200).then(() => "Slowest")
  ]);
  
  console.log(`Fastest: ${fastest}`);
}

example5();

// Promise.allSettled - waits for all, doesn't fail on rejection
async function example6(): Promise<void> {
  const results = await Promise.allSettled([
    fetchData("https://api.example.com"),
    fetchData("https://api.example.com/error"),
    fetchData("https://api.example.com/data")
  ]);
  
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`Result ${i}: ${result.value}`);
    } else {
      console.log(`Result ${i}: Error - ${result.reason.message}`);
    }
  });
}

example6();

// Promise.any - returns first fulfilled (ignores rejections)
async function example7(): Promise<void> {
  try {
    const result = await Promise.any([
      fetchData("https://api.example.com/error"),
      fetchData("https://api.example.com"),
      fetchData("https://api.example.com/data")
    ]);
    
    console.log(`\nFirst success: ${result}`);
  } catch (error) {
    console.log("All promises rejected");
  }
}

example7();

// ============================================
// TYPED PROMISES
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchUserApi(id: number): Promise<ApiResponse<User>> {
  await delay(100);
  return {
    data: {
      id,
      name: `User${id}`,
      email: `user${id}@example.com`
    },
    status: 200,
    message: "Success"
  };
}

async function example8(): Promise<void> {
  const response = await fetchUserApi(1);
  console.log(`\nAPI Response: ${response.data.name} (${response.message})`);
}

example8();

// ============================================
// GENERIC ASYNC FUNCTIONS
// ============================================

// async function fetchJson<T>(_url: string): Promise<T> {
//   await delay(50);
//   // Simulated JSON response
//   return { data: "example" } as T;
// }

// async function example9(): Promise<void> {
//   const user = await fetchJson<User>("https://api.example.com/users/1");
//   console.log(`Fetched: ${user.id}`);
// }

// Retry logic
async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error = new Error("Unknown error");
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (i < maxRetries - 1) {
        await delay(delayMs);
      }
    }
  }
  
  throw lastError;
}

async function example10(): Promise<void> {
  try {
    const data = await retry(
      () => fetchData("https://api.example.com"),
      3,
      100
    );
    console.log(`\nRetry result: ${data}`);
  } catch (error) {
    console.log("Failed after retries");
  }
}

example10();

// ============================================
// TIMEOUT PATTERN
// ============================================

async function timeout<T>(
  promise: Promise<T>,
  ms: number
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), ms);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

// async function example11(): Promise<void> {
//   try {
//     const data = await timeout(
//       fetchData("https://api.example.com"),
//       5000
//     );
//     console.log(`With timeout: ${data}`);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`Timeout error: ${error.message}`);
//     }
//   }
// }

// ============================================
// ASYNC GENERATORS
// ============================================

async function* fetchPages(count: number): AsyncGenerator<number, void, unknown> {
  for (let i = 1; i <= count; i++) {
    await delay(50);
    yield i;
  }
}

async function example12(): Promise<void> {
  console.log("\nFetching pages:");
  for await (const page of fetchPages(3)) {
    console.log(`Page ${page}`);
  }
}

example12();

// ============================================
// PRACTICAL PATTERNS
// ============================================

// API Client
class ApiClient {
  constructor(private baseUrl: string) {}

  async get<T>(_endpoint: string): Promise<T> {
    await delay(50);
    return { data: "example" } as T;
  }

  async post<T>(_endpoint: string, _data: any): Promise<T> {
    await delay(50);
    return { success: true } as T;
  }

  async delete(_endpoint: string): Promise<void> {
    await delay(50);
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}

const client = new ApiClient("https://api.example.com");

async function example13(): Promise<void> {
  const user = await client.get<User>("/users/1");
  console.log(`\nAPI Client: ${user.id}`);
}

example13();

// Queue processor
class AsyncQueue<T> {
  private queue: T[] = [];
  private processing = false;

  add(item: T): void {
    this.queue.push(item);
    this.process();
  }

  private async process(): Promise<void> {
    if (this.processing) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (item !== undefined) {
        await this.processItem(item);
      }
    }
    
    this.processing = false;
  }

  private async processItem(item: T): Promise<void> {
    await delay(100);
    console.log(`Processed: ${item}`);
  }
}

const queue = new AsyncQueue<string>();
queue.add("task1");
queue.add("task2");
queue.add("task3");

// Cache with expiration
class AsyncCache<K, V> {
  private cache = new Map<K, { value: V; expires: number }>();

  async get(
    key: K,
    fetcher: () => Promise<V>,
    ttl: number = 60000
  ): Promise<V> {
    const cached = this.cache.get(key);
    
    if (cached && cached.expires > Date.now()) {
      return cached.value;
    }
    
    const value = await fetcher();
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl
    });
    
    return value;
  }

  clear(): void {
    this.cache.clear();
  }
}

async function example14(): Promise<void> {
  const userCache = new AsyncCache<number, { id: number; name: string }>();
  const user1 = await userCache.get(1, () => getUser(1), 1000);
  const user2 = await userCache.get(1, () => getUser(1), 1000); // Cached
  
  console.log(`\nCache: ${user1.name}, ${user2.name}`);
}

example14();

// Batch processor
async function batchProcess<T, U>(
  items: T[],
  processor: (item: T) => Promise<U>,
  batchSize: number = 5
): Promise<U[]> {
  const results: U[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    results.push(...batchResults);
  }
  
  return results;
}

async function example15(): Promise<void> {
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const users = await batchProcess(ids, getUser, 3);
  
  console.log(`\nBatch processed: ${users.length} users`);
}

example15();

// ============================================
// ERROR HANDLING PATTERNS
// ============================================

// Result type
type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

async function safeAsync<T>(
  fn: () => Promise<T>
): Promise<Result<T>> {
  try {
    const value = await fn();
    return { success: true, value };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
}

async function example16(): Promise<void> {
  const result = await safeAsync(() => fetchData("https://api.example.com"));
  
  if (result.success) {
    console.log(`\nSafe result: ${result.value}`);
  } else {
    console.log(`Safe error: ${result.error.message}`);
  }
}

example16();

// ============================================
// BEST PRACTICES
// ============================================

// ✅ GOOD: Always await in try/catch
// async function goodPractice1(): Promise<void> {
//   try {
//     const data = await fetchData("url");
//     console.log(data);
//   } catch (error) {
//     console.log("Error handled");
//   }
// }

// ✅ GOOD: Use Promise.all for parallel operations
// async function goodPractice2(): Promise<void> {
//   const [user, data] = await Promise.all([
//     getUser(1),
//     fetchData("url")
//   ]);
//   console.log(user, data);
// }

// ❌ BAD: Mixing async/await with .then()
// async function badPractice1(): Promise<void> {
//   const user = await getUser(1);
//   user.name; // Avoid mixing patterns
// }

console.log("\nAsync/await examples running...");

// ============================================
// EXPORTED TYPES AND FUNCTIONS
// ============================================

export type { User, ApiResponse, Result };
export { 
  delay, fetchUser, getUser, 
  retry, timeout, batchProcess, safeAsync,
  ApiClient, AsyncQueue, AsyncCache 
};
