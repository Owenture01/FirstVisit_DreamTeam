// Vercel serverless entry: exposes the Express backend under /api/*.
// Locally, server.ts mounts the same backendApp, so behaviour is identical.
import { backendApp } from '../src/backend/index.ts';

export default backendApp;
