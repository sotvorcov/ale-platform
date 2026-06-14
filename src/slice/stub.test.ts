import { test } from 'node:test';
import assert from 'node:assert/strict';
// The same module the browser imports (src/slice/stub.mjs).
import { stubComplete } from './stub.mjs';

test('returns an AI-shaped, stubbed completion', () => {
  const r = stubComplete('what is the spine?', 1_700_000_000_000, 1);
  assert.equal(r.stubbed, true);
  assert.equal(r.model, 'stub-echo-v0');
  assert.equal(r.prompt, 'what is the spine?');
  assert.match(r.completion, /stubbed response/);
  assert.equal(r.id, 'stub-1700000000000-1');
  assert.equal(r.createdAt, new Date(1_700_000_000_000).toISOString());
});

test('handles an empty prompt gracefully', () => {
  const r = stubComplete('   ', 1_700_000_000_000, 0);
  assert.equal(r.prompt, '');
  assert.match(r.completion, /didn't receive a prompt/);
});

test('reflects the prompt back in the answer', () => {
  const r = stubComplete('hello there', 1_700_000_000_000, 2);
  assert.match(r.completion, /You asked: "hello there"/);
});
