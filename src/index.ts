import { Router } from "itty-router";
import getHolidays from "./getHolidays";

const router = Router();

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

router.get("/:day", async ({ params }) => {
  const holidays = await getHolidays(params.day);
  return jsonResponse(holidays);
});

// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));

// attach the router "handle" to the event handler
addEventListener("fetch", (event: FetchEvent) =>
  event.respondWith(router.handle(event.request))
);