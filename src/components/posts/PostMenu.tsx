import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { nip19, type Event, finalizeEvent } from "nostr-tools";
import { usePublish } from "react-nostr";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  postEvent: Event;
};

export default function PostMenu({ children, postEvent }: Props) {
  const { publish, status, removeEvent } = usePublish({
    relays: ["wss://nos.lol"],
  });

  const privkey = nip19.decode(
    "nsec1u0ffr6eztrkzhmdewneq6l92cv0rvj0tx5r35t9sasxr9wyxw0cskq4jw2",
  ).data;

  const pubkey = nip19.decode(
    "npub1w927jq3c24da74hk94m3qtjnawvf2gjdsja2c3ejt7dktsylaraqd3dw2l",
  ).data;

  async function handleDelete() {
    if (!pubkey) return;
    if (status !== "idle") return;

    const tags = [["e", postEvent.id]];

    let event: Event = {
      kind: 5,
      tags,
      content: "",
      pubkey: pubkey,
      created_at: Math.floor(Date.now() / 1000),
      id: "",
      sig: "",
    };

    event = finalizeEvent(event, privkey);

    const onSuccess = (_: Event) => {
      toast("Event has been deleted.", {
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismissed toast"),
        },
      });
      // TODO: remove event from every where that's important
      removeEvent(["blogs"], postEvent.id);
    };

    await publish(event, onSuccess);
  }

  const handleBroadcast = async () => {
    const onSuccess = (_: Event) => {
      toast("Event has been broadcast.", {
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismissed toast"),
        },
      });
    };

    await publish(postEvent, onSuccess);
  };

  const handleShowRaw = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleBroadcast}>Broadcast</DropdownMenuItem>
        <DropdownMenuItem onClick={handleShowRaw}>Copy Raw</DropdownMenuItem>
        {postEvent.pubkey === pubkey && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
