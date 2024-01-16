import { nip19, type Filter } from "nostr-tools";
import { AddressPointer } from "nostr-tools/nip19";
import { tag, useSubscribe } from "react-nostr";
import Markdown from "react-markdown";

// @ts-expect-error no types
import { NoComment } from "react-nocomment";
import { useEffect } from "react";

type Props = {
  addressPointer: AddressPointer;
  naddr: string | undefined;
};

export default function Article({ addressPointer, naddr }: Props) {
  const npub =
    "npub1w927jq3c24da74hk94m3qtjnawvf2gjdsja2c3ejt7dktsylaraqd3dw2l";

  const privkey = nip19.decode(
    "nsec1u0ffr6eztrkzhmdewneq6l92cv0rvj0tx5r35t9sasxr9wyxw0cskq4jw2",
  ).data;

  const filter: Filter = {
    kinds: [30023],
    limit: 1,
    "#d": [addressPointer.identifier],
    authors: [addressPointer.pubkey],
  };

  const { events } = useSubscribe({
    eventKey: "article" + addressPointer.identifier,
    filter: filter,
    relays: ["wss://nos.lol"],
  });

  const removeTitle = (content: string) => {
    const noTitle = content.replace(/^\s*#+\s.*\n/, "");
    return noTitle;
  };

  useEffect(() => {
    console.log("SOME EVENTS", events[0]);
  }, [events]);

  return (
    <div className="flex flex-col items-center gap-y-4 my-16">
      <div className="max-w-3xl">
        <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl">
          {tag("title", events[0])}
        </h1>
        <img className="my-8" src={tag("image", events[0])} />
        <article className="prose prose-lg w-full dark:prose-invert">
          {events[0] && <Markdown>{removeTitle(events[0].content)}</Markdown>}
        </article>
        <div className="mt-8">
          {naddr && events[0] && (
            <NoComment
              privateKey={privkey}
              publicKey={nip19.decode(npub).data}
              customBase={naddr}
              relays={["wss://nostr-pub.wellorder.net"]}
              owner={npub}
            />
          )}
        </div>
      </div>
    </div>
  );
}
