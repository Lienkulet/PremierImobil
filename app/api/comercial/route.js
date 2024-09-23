import db from "@/lib/dbconnect";
import { SpatiiComerciale } from "@/models/SpatiiComerciale";

export async function GET(req){
    await db.connect();

    try {
        const adds = await SpatiiComerciale.find({});
        return new Response(JSON.stringify(adds), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}

export async function POST(req){
    await db.connect();

    try {
        const body = await req.json();

        const newAdd = await SpatiiComerciale.create(body);
    
        return new Response(JSON.stringify(newAdd), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}