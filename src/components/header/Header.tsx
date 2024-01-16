import { Link, useLocation } from "react-router-dom";
import LoginButton from "./LoginButton";
// import useAuthStore from "~/stores/authStore";
import UserMenu from "./UserMenu";
import { nip19 } from "nostr-tools";
import { ModeToggle } from "../theme/mode-toggle";
import { SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import PublishButton from "./PublishButton";

export default function Header() {
  // const { pubkey } = useAuthStore();

  let location = useLocation();

  const pubkey = nip19.decode(
    "npub1ygzj9skr9val9yqxkf67yf9jshtyhvvl0x76jp5er09nsc0p3j6qr260k2",
  ).data;

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-8">
        <div className="flex w-full items-center space-x-4">
          <div className="flex w-full items-center justify-between gap-x-2">
            <Link to="/">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height={"2rem"}
                width={"2rem"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M172.2 226.8c-14.6-2.9-28.2 8.9-28.2 23.8V301c0 10.2 7.1 18.4 16.7 22 18.2 6.8 31.3 24.4 31.3 45 0 26.5-21.5 48-48 48s-48-21.5-48-48V120c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v248c0 89.5 82.1 160.2 175 140.7 54.4-11.4 98.3-55.4 109.7-109.7 17.4-82.9-37-157.2-112.5-172.2zM209 0c-9.2-.5-17 6.8-17 16v31.6c0 8.5 6.6 15.5 15 15.9 129.4 7 233.4 112 240.9 241.5.5 8.4 7.5 15 15.9 15h32.1c9.2 0 16.5-7.8 16-17C503.4 139.8 372.2 8.6 209 0zm.3 96c-9.3-.7-17.3 6.7-17.3 16.1v32.1c0 8.4 6.5 15.3 14.8 15.9 76.8 6.3 138 68.2 144.9 145.2.8 8.3 7.6 14.7 15.9 14.7h32.2c9.3 0 16.8-8 16.1-17.3-8.4-110.1-96.5-198.2-206.6-206.7z" />
              </svg>
            </Link>
            {location.pathname === "/write" && <PublishButton />}
            {location.pathname !== "/write" && pubkey && (
              <Link to="/write">
                <Button variant="outline" size="icon">
                  <SquarePen size={24} />
                </Button>
              </Link>
            )}
          </div>
          {pubkey && <ModeToggle />}
          {pubkey ? <UserMenu pubkey={pubkey} /> : <LoginButton />}
        </div>
      </div>
    </div>
  );
}
