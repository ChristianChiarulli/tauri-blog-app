import { type Event } from "nostr-tools";
import {
  createNaddr,
  profileContent,
  shortNpub,
  useBatchedProfiles,
} from "react-nostr";
import { tag } from "~/lib/nostr";
import { Badge } from "~/components/ui/badge";
import { fromNow } from "~/lib/utils";
import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import PostMenu from "./PostMenu";
import { BOT_AVATAR_ENDPOINT } from "~/lib/constants";

type Props = {
  blogEvent: Event;
};

export default function Post({ blogEvent }: Props) {
  const profileEvent = useBatchedProfiles(blogEvent.pubkey, ["wss://nos.lol"]);

  const seed = blogEvent.pubkey;

  return (
    <div className="flex flex-col py-8 px-2 gap-y-4 border-b min-w-[42rem] max-w-2xl justify-center hover:bg-secondary/30">
      <div className="flex text-sm text-secondary-foreground items-center justify-between">
        <span className="flex gap-x-2 items-center">
          <img
            className="w-8 h-8 rounded-full object-cover aspect-square border"
            src={
              profileContent(profileEvent).picture ||
              `${BOT_AVATAR_ENDPOINT}?seed=${seed}`
            }
          />
          <span>·</span>
          <span>
            {profileContent(profileEvent).name
              ? profileContent(profileEvent).name
              : shortNpub(blogEvent.pubkey)}
          </span>
          <span>·</span>
          <span>{fromNow(blogEvent.created_at)}</span>
        </span>
        <PostMenu postEvent={blogEvent}>
          <Button variant="ghost" size="icon">
            <MoreVertical size={18} />
          </Button>
        </PostMenu>
      </div>
      <Link
        className="cursor-pointer flex flex-col gap-y-4"
        to={`blog/${createNaddr(blogEvent, ["wss://nos.lol"])}`}
      >
        <div className="flex gap-x-2 items-center justify-between">
          <div className="flex flex-col gap-y-4 pr-8">
            <h2 className="font-bold">{tag("title", blogEvent)}</h2>
            <span>{tag("summary", blogEvent)}</span>
          </div>
          {tag("image", blogEvent) && (
            <img
              className="rounded-md w-24 h-24 object-cover aspect-square"
              src={tag("image", blogEvent)}
            />
          )}
        </div>
      </Link>
      <div>
        <Badge variant="secondary">{tag("t", blogEvent)}</Badge>
      </div>
    </div>
  );
}
