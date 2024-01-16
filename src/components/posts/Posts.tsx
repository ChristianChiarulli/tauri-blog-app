import { useSubscribe } from "react-nostr";
import { type Filter } from "nostr-tools";
import Post from "~/components/posts/Post";

import { useInView } from "react-intersection-observer";
import { Button } from "../ui/button";

type Props = {
  eventKey: string;
  filter: Filter;
  tag?: string;
  publicKey?: string;
};

export default function Posts({ eventKey, filter, tag, publicKey }: Props) {
  if (tag) {
    eventKey = eventKey + tag;
    console.log("tag", tag);
    filter["#t"] = [tag];
  }

  if (publicKey) {
    eventKey = eventKey + publicKey;
    filter.authors = [publicKey];
  }

  const { events, status, loading, loadOlderEvents } = useSubscribe({
    eventKey,
    filter: filter,
    relays: ["wss://nos.lol"],
  });

  async function loadMore() {
    await loadOlderEvents(eventKey, 3);
  }

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && !loading && status === "idle") {
        loadMore();
      }
    },
  });

  return (
    <>
      <ul className="flex flex-col items-center">
        {events.map((event, index) => {
          return (
            <li ref={index === events.length - 2 ? ref : null} key={event.id}>
              <Post blogEvent={event} />
            </li>
          );
        })}
      </ul>
      <Button
        disabled={loading && status !== "idle"}
        className="my-8"
        variant="secondary"
        onClick={loadMore}
      >
        Load more
      </Button>
    </>
  );
}
