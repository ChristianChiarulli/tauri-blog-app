import { finalizeEvent, nip19, type Event } from "nostr-tools";
import { createIdentifier, usePublish } from "react-nostr";
import { toast } from "sonner";
import { Button } from "../ui/button";
import useStore from "~/store";
import { useNavigate } from "react-router-dom";

export default function PublishButton() {
  const mdxEditorRef = useStore((state) => state.mdxEditorRef);
  const navigate = useNavigate();

  const { publish, status, invalidateKeys } = usePublish({
    relays: ["wss://nos.lol"],
  });

  const getTitleFromMarkdown = (markdown: string) => {
    const regex = /^# .*/;
    const title = markdown.match(regex)?.[0];
    if (!title) return "Untitled";
    return title.replace("# ", "");
  };

  const pubkey = nip19.decode(
    "npub1w927jq3c24da74hk94m3qtjnawvf2gjdsja2c3ejt7dktsylaraqd3dw2l",
  ).data;

  const privkey = nip19.decode(
    "nsec1u0ffr6eztrkzhmdewneq6l92cv0rvj0tx5r35t9sasxr9wyxw0cskq4jw2",
  ).data;

  const handlePublish = async (e: any) => {
    e.preventDefault();
    if (!mdxEditorRef) return;

    const content = mdxEditorRef.getMarkdown();

    const title = getTitleFromMarkdown(content ?? "");
    const identifier = createIdentifier(title, pubkey);

    const tags = [
      ["d", identifier],
      ["title", title],
      // ["t", tag],
    ];

    console.log(title);

    let event: Event = {
      kind: 30023,
      tags: tags,
      content: content ?? "",
      created_at: Math.floor(Date.now() / 1000),
      pubkey: pubkey,
      id: "",
      sig: "",
    };

    event = finalizeEvent(event, privkey);

    const onSuccess = (_: Event) => {
      toast("Event has been publised.", {
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismissed toast"),
        },
      });
      navigate("/");
      invalidateKeys(["blogs"]);
    };

    console.log(event);

    publish(event, onSuccess);
  };

  return (
    <div>
      <Button disabled={status !== "idle"} onClick={handlePublish}>
        Publish
      </Button>
    </div>
  );
}
