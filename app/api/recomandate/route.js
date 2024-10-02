import db from "@/lib/dbconnect";
import { Add } from "@/models/Imobile";

export async function GET(req){
    await db.connect();

    try {
        const adds = await Add.find({recomandate: true});
        return new Response(JSON.stringify(adds), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}