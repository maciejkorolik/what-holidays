## what-holidays

This is a simple app that shows what strange holidays are in Poland in a specified day. It gets data from [kalbi.pl](https://www.kalbi.pl). It's deployed as a [Cloudflare Worker](https://workers.cloudflare.com/).

**Live:** [what-day.maciejkorolik.workers.dev](https://what-day.maciejkorolik.workers.dev/)

### Endpoints:

- `GET /` - returns an array of today's holidays
- `GET /:day` - returns an array of holidays for a specified day. **NOTE:** for now the day should be written in Polish in following format: e.g. 22-wrzesnia)
- `POST /send-slack-message` - sends a message to Slack with a list of holidays for today

There is also a CRON job that sends a Slack message every day in the morning.
