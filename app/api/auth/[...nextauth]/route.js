import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { signJwtToken } from "@/lib/jwt";
import bcrypt from 'bcrypt'
import { User } from "@/models/User";
import db from "@/lib/dbconnect";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                username: {label: 'Email', type: 'text', placeholder: 'John Doe'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req){
                const {email, password} = credentials

                await db.connect()
                                
                const user = await User.findOne({ email })
                let type = user.type;
                let name = user.name;
                if(!user){
                    throw new Error("Invalid input")
                }
                const comparePass = await bcrypt.compare(password, user.password)

                if(!comparePass){
                    throw new Error("Invalid input")
                } else {
                    const {password, ...currentUser} = user._doc

                    const accessToken = signJwtToken(currentUser, {expiresIn: '6d'})

                    return {
                        ...currentUser,
                        accessToken,
                        type,
                        name
                    }
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.accessToken = user.accessToken
                token._id = user._id
                token.type = user.type; 
                token.name = user.name; 
            }

            return token
        },
        async session({session, token}){
            if(token){
                session.user._id = token._id
                session.user.accessToken = token.accessToken
                session.user.type = token.type;
                session.user.name = token.name;
            }

            return session
        }
    }
})

export {handler as GET, handler as POST}