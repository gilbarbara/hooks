import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// @ts-ignore
HttpResponse.json = (data, options) => {
  const body = JSON.stringify(data);

  return new HttpResponse(
    new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(body));
        controller.close();
      },
    }),
    options,
  );
};

export interface Handler {
  data?: any;
  delayMs?: number;
  errorType?: 'hard' | 'soft';
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
}

async function readableStreamToJSON(body: ReadableStream) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const chunks: string[] = [];

  async function read() {
    const { done, value } = await reader.read();

    // all chunks have been read?
    if (done) {
      return JSON.parse(chunks.join(''));
    }

    const chunk = decoder.decode(value, { stream: true });

    chunks.push(chunk);

    return read(); // read the next chunk
  }

  return read();
}

export function getHandler({ data, delayMs, errorType, method, url }: Handler) {
  return http[method](url, async () => {
    if (delayMs) {
      await delay(delayMs);
    }

    if (errorType === 'hard') {
      return HttpResponse.error();
    }

    if (errorType === 'soft') {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(data);
  });
}

export function getServer(handlers: Handler[], callback: (data: any) => void) {
  const server = setupServer(...handlers.map(getHandler));

  server.events.on('request:start', async ({ request }) => {
    const payload = request.clone();

    const body = payload.body ? await readableStreamToJSON(payload.body) : undefined;
    const headers: Record<string, string> = {};

    payload.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return callback({
      url: payload.url,
      body,
      cache: payload.cache,
      credentials: payload.credentials,
      headers,
      method: payload.method,
      mode: payload.mode,
    });
  });

  return server;
}

export { delay, http } from 'msw';

// eslint-disable-next-line unicorn/prefer-export-from
export { HttpResponse };
