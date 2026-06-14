/**
 * Trivial runnable entrypoint.
 *
 * This exists so CI, deploy, and the first vertical slice have something
 * concrete to build and exercise. Replace the body with real application
 * code as the product takes shape.
 */

export function greeting(name = 'world'): string {
  return `Hello, ${name}!`;
}

export function main(): void {
  console.log(greeting());
}

// Run main() only when executed directly (node dist/index.js), not when imported.
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
