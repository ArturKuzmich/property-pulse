import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({ is_featured: true });

    return Response.json(properties);
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
