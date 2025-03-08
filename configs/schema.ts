import { integer, pgTable, varchar, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users Table
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  credits: integer("credits").default(0).notNull(),
});

// Wireframe to Code Table
export const wireframeToCodeTable = pgTable("wireframeToCode", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(),
  uid: varchar()
    .notNull(),
  imageUrl: varchar(),
  model: varchar(),
  description: varchar(),
  code: json(),
  createdBy: varchar(), // Corrected field name
});

