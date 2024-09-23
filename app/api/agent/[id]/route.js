import db from "@/lib/dbconnect";
import { User } from "@/models/User";

export async function DELETE(req, {params: {id}}){
    await db.connect();

    try {
        await User.findByIdAndDelete(id);

        return new Response(JSON.stringify("Deleted successfuly"), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}