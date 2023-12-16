import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
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
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
            username: { label: "Username", type: "text", placeholder: "username" },
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.username || !credentials?.password) {
                    throw new Error('No User Found');
                }

                const existingUser = await prisma.user.findUnique({
                    where: { username : credentials?.username}
                });

                if(!existingUser) {
                    throw new Error('No User Found');
                }

                const passwordMatch = await compare(credentials.password, existingUser.password);

                if(!passwordMatch) {
                    throw new Error('Wrong Password');
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
            return session
        },
    }
}