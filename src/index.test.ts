import { test } from 'node:test';
import assert from 'node:assert/strict';
import { greeting } from './index.ts';

test('greeting defaults to world', () => {
  assert.equal(greeting(), 'Hello, world!');
});

test('greeting uses the provided name', () => {
  assert.equal(greeting('Atlas'), 'Hello, Atlas!');
});
