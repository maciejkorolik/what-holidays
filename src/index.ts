import { Router, Request } from "itty-router";
import qs from "qs";
import getHolidays from "./getHolidays";
import prepareSlackMessage from "./prepareSlackMessage";

const router = Router();

const allowedChannels = JSON.parse(ALLOWED_CHANNELS);

function jsonResponse(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

router.get("", async () => {
  const holidays = await getHolidays();
  return jsonResponse(holidays);
});

router.post("/send-slack-message", async (request: Request) => {
  if (request.query.token === MESSAGE_TOKEN) {
    const body = await request.text();
    const params = qs.parse(body);
    const holidays = await getHolidays();
    const channelId = params?.channel_id || null;
    const shouldDisplayInChannel = allowedChannels.includes(channelId);
    const message = prepareSlackMessage(holidays, shouldDisplayInChannel);
    return jsonResponse(message);
  } else {
    return new Response("Not authorized", { status: 401 });
  }
});

router.get("/:day", async ({ params }) => {
  const holidays = await getHolidays(params.day);
  return jsonResponse(holidays);
});

// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));

// attach the router "handle" to the event handler
addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
