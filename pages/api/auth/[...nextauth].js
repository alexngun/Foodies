import NextAuth from 'next-auth'
import GoogleProvider  from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../utils/mongodb"

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    jwt: {
        secret: process.env.JWT_SECRET,
        encryption: true,
    },
    session: {
        jwt: true
    },
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async session({ session, user, token }) {
            session.userid = user.id
            return session
        },
    }
})