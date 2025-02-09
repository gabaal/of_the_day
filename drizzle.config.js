import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_6aQfmO1TDdoU@ep-yellow-cell-a8gpo4ln-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
});
