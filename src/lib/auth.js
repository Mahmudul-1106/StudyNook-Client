
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI) || "http://localhost:3000";
const db = client.db('studyNook');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  
  emailAndPassword: { 
    enabled: true, 
  }, 

  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessType: "offline", 
      prompt: "select_account consent",  
    }, 
  },

  // 🔥 FIXED: Restructured the session block completely
  session: {
    strategy: "jwt", // Tells better-auth to use JWT structure for the core session cookie
    expiresIn: 7 * 24 * 60 * 60, // 7 Days token duration lifecycle
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Keeps the local state lookup highly optimized
    }
  },

  plugins: [
    jwt() // Keeps the JWKS remote signature generator plugin live for your Express API verifyToken check
  ]
});