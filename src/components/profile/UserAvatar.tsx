import { profileContent, useProfile } from "react-nostr";
import { BOT_AVATAR_ENDPOINT } from "~/lib/constants";

type Props = {
  pubkey: string;
};

export default function UserAvatar({ pubkey }: Props) {
  const seed = pubkey;

  const { profileEvent, loading } = useProfile(pubkey, ["wss://nos.lol"]);

  return (
    <img
      className="w-8 h-8 rounded-full object-cover aspect-square border"
      src={
        profileContent(profileEvent).picture ||
        `${BOT_AVATAR_ENDPOINT}?seed=${seed}`
      }
    />
  );
}
