import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoose from "mongoose";
// import Spotify from "next-auth/providers/spotify"

export const authOptions = {
  adapter: MongoDBAdapter(mongoose.connection.getClient()),
  providers: [],
  secret: process.env.NEXT_AUTH_SECRET,
};
