import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { compare } from "bcrypt";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret:process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
            email: { label: "Email", type: "email", placeholder: "Email" },
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('No User Found');
                }

                const existingUser = await prisma.user.findUnique({
                    where: { email : credentials?.email}
                });

                if(!existingUser) {
                    throw new Error('No User Found');
                }

                if(existingUser.password){
                    const passwordMatch = await compare(credentials.password, existingUser.password);

                    if(!passwordMatch) {
                        throw new Error('Wrong Password');
                    }
                }

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email:existingUser.email
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // console.log(token, user);

            if(user) {
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({ session, token }) {
            // console.log(session, user);

            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username    
                }
            }
        },
    }
}
