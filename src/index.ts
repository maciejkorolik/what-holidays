import { Router } from "itty-router";
import getHolidays from "./getHolidays";
import prepareSlackMessage from "./prepareSlackMessage";

const router = Router();

function jsonResponse(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

async function sendSlackMessage() {
  const holidays = await getHolidays();
  const message = prepareSlackMessage(holidays);
  await fetch(SLACK_HOOK_URL, {
    method: "post",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
  });
}

router.get("", async () => {
  const holidays = await getHolidays();
  return jsonResponse(holidays);
});

router.post("/send-slack-message", async ({ query }) => {
  if (query.token === MESSAGE_TOKEN) {
    await sendSlackMessage();
    return new Response("Succesfully posted to Slack!");
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
