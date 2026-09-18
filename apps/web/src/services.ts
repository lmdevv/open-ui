import { type Database, createDb } from "@open-ui/db";

import { ENV } from "./env.server";

export function getDb(): Database {
  return createDb(ENV);
}
