import { nip19, type Filter } from "nostr-tools";
import { useState } from "react";
import PostTags from "~/components/posts/PostTags";

import Posts from "~/components/posts/Posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

function App() {
  const filter: Filter = {
    kinds: [30023],
    limit: 5,
  };

  const [selectedTag, setSelectedTag] = useState<string>("");

  const pubkey = nip19.decode(
    "npub1w927jq3c24da74hk94m3qtjnawvf2gjdsja2c3ejt7dktsylaraqd3dw2l",
  ).data;

  return (
    <div className="flex-col md:flex items-center overflow-hidden">
      <div className="flex-1 space-y-4 p-8 w-full max-w-3xl">
        <Tabs defaultValue="new" className="space-y-4 w-full">
          <div className="flex justify-between w-full">
            <PostTags
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
            <TabsList>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="posted">Posted</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="new" className="space-y-4">
            <div className="flex flex-col">
              <Posts tag={selectedTag} eventKey={"blogs"} filter={filter} />
            </div>
          </TabsContent>
          <TabsContent value="posted" className="space-y-4">
            <div className="flex flex-col">
              <Posts tag={selectedTag} eventKey={"blogs"} filter={filter} publicKey={pubkey} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
