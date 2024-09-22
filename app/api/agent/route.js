import db from "@/lib/dbconnect";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

// Define the number of salt rounds for bcrypt
const SALT_ROUNDS = 10;

export async function GET(req) {
    await db.connect();

    try {
        const agents = await User.find({});
        return new Response(JSON.stringify(agents), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
}

export async function POST(req){
    try {
        await db.connect()

        const {name, password: pass,email, photoUrl} = await req.json()

        const isExisting = await User.findOne({email});
            console.log(email, photoUrl);

        if(isExisting){
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(pass, 10)

        const newUser = await User.create({name,password: hashedPassword,  email, type: 'agent', photoUrl})

        return new Response(JSON.stringify(newUser), {status: 201})
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500})
    }
}