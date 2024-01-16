import { MDXEditorMethods } from "@mdxeditor/editor";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface NostrState {
  mdxEditorRef: MDXEditorMethods | undefined;
  setMdxEditorRef: (ref: MDXEditorMethods | undefined) => void;
}

const useStore = create<NostrState>()(
  devtools((set) => ({
    mdxEditorRef: undefined,
    setMdxEditorRef: (ref) => set({ mdxEditorRef: ref }),
  })),
);

export default useStore;
