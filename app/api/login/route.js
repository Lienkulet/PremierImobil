import db from "@/lib/dbconnect";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    await db.connect();
    const { name, password } = await req.json();

    // Check if the user exists
    const user = await User.findOne({ name });
    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

    // Respond with the token
    return new Response(JSON.stringify({ token }), { status: 200 });
}
