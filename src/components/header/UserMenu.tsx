import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import UserAvatar from "~/components/profile/UserAvatar";
import { Link } from "react-router-dom";

type Props = {
  pubkey: string;
};

export default function UserMenu({ pubkey }: Props) {
  const logout = () => {
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar pubkey={pubkey} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2">
        <DropdownMenuItem asChild>
          <Link to="/settings">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
