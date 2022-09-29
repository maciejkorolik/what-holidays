import { Holiday } from "./types";

export default function prepareSlackMessage(holidays: Holiday[]) {
  return {
    username: "Holidays bot",
    icon_emoji: "date",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Holidays for today:*",
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
