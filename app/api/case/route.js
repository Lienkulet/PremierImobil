import db from "@/lib/dbconnect";
import { Case } from "@/models/Case";

export async function GET(req){
    await db.connect();

    try {
        const Cases = await Case.find({});
        return new Response(JSON.stringify(Cases), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}

export async function POST(req){
    await db.connect();

    try {
        const body = await req.json();

        const newCase = await Case.create(body);
    
        return new Response(JSON.stringify(newCase), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}