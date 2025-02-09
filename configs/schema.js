import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  isMember: boolean().default(false),
  customerId: varchar(),
});

export const PAYMENT_RECORD_TABLE = pgTable("paymentRecords", {
  id: serial().primaryKey(),
  customerId: varchar(),
  sessionId: varchar(),
});
