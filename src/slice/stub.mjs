/**
 * Stubbed AI "completion" for the vertical slice.
 *
 * Pure ES module with no Node or browser APIs, so the SAME file runs in the
 * browser (imported by ask.html) and in Node (imported by stub.test.ts). It
 * fakes an AI-shaped response with zero network calls, keys, or cost — proving
 * the spine (prompt in → AI-shaped response out → rendered). Swap this for a
 * real provider call (via a server/serverless function, since keys can't ship
 * to the browser) when we're ready to spend.
 *
 * @param {string} prompt   the user's prompt
 * @param {number} nowMs    epoch millis (injectable for deterministic tests)
 * @param {number} seq      monotonic sequence number for a unique id
 * @returns {{id: string, model: string, prompt: string, completion: string, createdAt: string, stubbed: true}}
 */
export function stubComplete(prompt, nowMs = Date.now(), seq = 0) {
  const trimmed = String(prompt ?? '').trim();
  const completion =
    trimmed.length === 0
      ? "I didn't receive a prompt — try typing a question."
      : `You asked: "${trimmed}". This is a stubbed response — no real model was ` +
        'called yet, but the request → AI → render path works end to end.';

  return {
    id: `stub-${nowMs}-${seq}`,
    model: 'stub-echo-v0',
    prompt: trimmed,
    completion,
    createdAt: new Date(nowMs).toISOString(),
    stubbed: true,
  };
}
