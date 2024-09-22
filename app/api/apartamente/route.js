import db from "@/lib/dbconnect";
import { Add } from "@/models/Imobile";

export async function GET(req){
    await db.connect();

    try {
        const adds = await Add.find({});
        return new Response(JSON.stringify(adds), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}

export async function POST(req){
    await db.connect();

    try {
        const body = await req.json();

        const newAdd = await Add.create(body);
    
        return new Response(JSON.stringify(newAdd), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}