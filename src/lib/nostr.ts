import { Event } from "nostr-tools";
import { Profile } from "react-nostr";

export function tag(key: string, event: Event | undefined) {
  if (!event) {
    return undefined;
  }
  const array = event.tags;
  if (!array) {
    return undefined;
  }
  const item = array.find((element) => element[0] === key);
  return item ? item[1] : undefined;
}

export const profileContent = (event: Event | undefined | null) => {
  return JSON.parse(event?.content ?? "{}") as Profile;
};
