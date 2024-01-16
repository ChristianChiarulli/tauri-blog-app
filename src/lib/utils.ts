import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fromNow(createdAt: number | undefined) {
  if (!createdAt) {
    return undefined;
  }
  dayjs.extend(relativeTime);
  const time = dayjs(createdAt * 1000).fromNow();
  return time;
}
