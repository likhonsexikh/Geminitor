import { describe, expect, it, beforeEach } from 'vitest';

import { POST } from '../app/api/chat/route';

describe('POST /api/chat', () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('returns 400 when request body is null', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'null',
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.text()).toBe('Invalid request body');
  });
});
