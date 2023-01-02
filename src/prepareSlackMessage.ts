import { Holiday } from "./types";

export default function prepareSlackMessage(
  holidays: Holiday[],
  inChannel: boolean = false
) {
  return {
    username: "Holidays bot",
    icon_emoji: "date",
    response_type: inChannel ? "in_channel" : "ephemeral",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: holidays.length
            ? "*Holidays for today:*"
            : "Sorry, there are no holidays today :sadeg:",
        },
      },
      {
        type: "divider",
      },
      ...holidays.map((holiday) => {
        return {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `:star: *<${holiday.url}|${holiday.name}>*`,
          },
        };
      }),
    ],
  };
}
