export async function POST(req) {
    try {
        const body = await req.json();
        return Response.json({ message: "Received!", data: body });
    } catch (error) {
        return Response.json({ error: "Invalid request" }, { status: 400 });
    }
}
