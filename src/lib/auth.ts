import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri =
  process.env.MONGODB_URI ||
  "mongodb://sport-nest:wzRikA2pmrRwcWfI@ac-xahspt4-shard-00-00.8avnhl5.mongodb.net:27017,ac-xahspt4-shard-00-01.8avnhl5.mongodb.net:27017,ac-xahspt4-shard-00-02.8avnhl5.mongodb.net:27017/?ssl=true&replicaSet=atlas-uev5y2-shard-0&authSource=admin";
const client = new MongoClient(uri);
const db = client.db();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "s8aerTqQ3tV802I9Ic3zlmKqTvjWq6ga",
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
  trustedOrigins: [
    "http://localhost:3000",
    "https://sport-nest-frontend.vercel.app",
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    },
  },
});
