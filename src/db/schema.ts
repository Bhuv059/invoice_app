import {
  serial,
  timestamp,
  integer,
  text,
  pgEnum,
  pgTable,
} from "drizzle-orm/pg-core";
import { AVAILABLE_STATUSES } from "@/constants/invoices";

export type Status = (typeof AVAILABLE_STATUSES)[number]["id"];

const statuses = AVAILABLE_STATUSES.map(({ id }) => id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statuses as [Status, ...Array<Status>]
);

/* export const statusEnum = pgEnum("status", [
  "open",
  "paid",
  "void",
  "uncollectible",
  ]);
  */

export const Customers = pgTable("customers", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  userId: text("userId").notNull(),
  organizationId: text("organizationId"),
});

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  userId: text("userId").notNull(),
  organizationId: text("organizationId"),
  customerId: integer("customerId")
    .notNull()
    .references(() => Customers.id),
  status: statusEnum("status").notNull(),
});