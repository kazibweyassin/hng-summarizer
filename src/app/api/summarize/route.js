export async function POST(req) {
    try {
        const body = await req.json();
        return Response.json({ message: "Received!", data: body });
    } catch (e) {
        console.error(e);
        return Response.json({ message: "Error!", error: e });
    }
}
