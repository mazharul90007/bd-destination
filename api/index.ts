import app from "../src/app";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Let Express handle incoming request
  return app(req as any, res as any);
}
