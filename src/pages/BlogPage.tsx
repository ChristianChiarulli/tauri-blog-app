import { nip19 } from "nostr-tools";
import { useParams } from "react-router-dom";
import Article from "~/components/article/Article";
import { useScrollToTop } from "~/hooks/useScrollToTop";

export default function BlogPage() {
  useScrollToTop();

  let { naddr } = useParams();
  let addressPointer;

  if (naddr && naddr.startsWith("naddr1")) {
    addressPointer = nip19.decode(naddr);
  }

  return (
    <div>
      {addressPointer?.type === "naddr" && (
        <div className="flex flex-col items-center">
          <Article addressPointer={addressPointer.data} naddr={naddr} />
        </div>
      )}
    </div>
  );
}
