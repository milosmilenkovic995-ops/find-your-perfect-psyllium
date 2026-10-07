import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Password lock (HTTP Basic Auth). Credentials come from the project env vars
// BASIC_AUTH_USER / BASIC_AUTH_PASSWORD. Fails closed if they are missing.
function basicAuth(req: NextRequest): NextResponse | null {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;
  if (!user || !pass) return new NextResponse("Locked", { status: 503 });
  const h = req.headers.get("authorization") || "";
  if (h.startsWith("Basic ")) {
    try {
      const dec = atob(h.slice(6));
      const i = dec.indexOf(":");
      if (i > -1 && dec.slice(0, i) === user && dec.slice(i + 1) === pass) return null;
    } catch {}
  }
  return new NextResponse("Password required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Protected", charset="UTF-8"', "Cache-Control": "no-store" },
  });
}

export function proxy(request: NextRequest) {
  return basicAuth(request) ?? NextResponse.next();
}

export const config = { matcher: ["/", "/:path*"] };
