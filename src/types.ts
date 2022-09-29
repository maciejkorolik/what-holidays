export type Holiday = {
  name: string;
  url: string;
};

declare global {
  const SLACK_HOOK_URL: string;
}
