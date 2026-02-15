import { nanoid } from "nanoid";

// short, readable ID for client + ops
export function makeBookingId() {
  return `24S-${nanoid(8).toUpperCase()}`;
}
