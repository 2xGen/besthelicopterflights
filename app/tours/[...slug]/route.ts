// Known island tour URLs are redirected in next.config.ts before reaching this handler.
function gone() {
  return new Response("This flight page has been removed.", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}

export const GET = gone;
export const HEAD = gone;
