/**
 * Stub for the `server-only` package under vitest.
 *
 * The real package throws unless resolved with React's `react-server`
 * condition, which the test runner does not set. The guard still applies in
 * the Next.js build — this only lets the server modules it protects be
 * imported by a unit test.
 */
export {};
