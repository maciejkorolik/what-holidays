export type Holiday = {
  name: string;
  url: string;
};

declare global {
  const ALLOWED_CHANNELS: string;
  const MESSAGE_TOKEN: string;
}
