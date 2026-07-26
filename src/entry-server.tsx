import React from 'react';
import { renderToReadableStream } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';
import { AppRoutes } from './App';

const RENDER_TIMEOUT_MS = 10_000;

export async function renderRoute(location: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(`Static rendering timed out for ${location}`), RENDER_TIMEOUT_MS);
  let renderError: unknown;

  try {
    const stream = await renderToReadableStream(
      <React.StrictMode>
        <HelmetProvider>
          <StaticRouter location={location}>
            <AppRoutes />
          </StaticRouter>
        </HelmetProvider>
      </React.StrictMode>,
      {
        signal: controller.signal,
        onError(error) {
          renderError = error;
        },
      }
    );

    await stream.allReady;

    if (renderError) {
      throw renderError;
    }

    return await new Response(stream).text();
  } finally {
    clearTimeout(timeout);
  }
}
