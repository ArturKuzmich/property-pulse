import connectDB from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//GET /api/messages/unread-count

export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return Response.json(
        {
          message: "User ID is required",
        },
        { status: 401 },
      );
    }
    const { userId } = sessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });
    return new Response(count, {
      status: 200,
    });
  } catch (e) {
    return new Response("Something went wrong", { status: 500 });
  }
};
