import {
  MDXEditor,
  toolbarPlugin,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  thematicBreakPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  imagePlugin,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useEffect, useRef } from "react";
import { Toolbar } from "~/components/article/Toolbar";
import useStore from "~/store";

const allPlugins = (diffMarkdown: string) => [
  toolbarPlugin({ toolbarContents: () => <Toolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  // eslint-disable-next-line @typescript-eslint/require-await
  imagePlugin(),
  tablePlugin(),
  thematicBreakPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      css: "CSS",
      txt: "text",
      tsx: "TypeScript",
    },
  }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  diffSourcePlugin({ viewMode: "rich-text", diffMarkdown }),
  markdownShortcutPlugin(),
];

export default function WritePage() {
  // save content to store on unmount
  const mdxEditorRef = useRef<MDXEditorMethods>(null);

  const setMdxEditorRef = useStore((state) => state.setMdxEditorRef);

  useEffect(() => {
    setMdxEditorRef(mdxEditorRef.current ?? undefined);
  }, [mdxEditorRef, setMdxEditorRef]);



  return (
    <div className="flex flex-col gap-y-4 mt-8 h-screen">
      <MDXEditor
        ref={mdxEditorRef}
        markdown={"# Your title"}
        className="h-full"
        contentEditableClassName="prose max-w-full h-screen font-sans"
        plugins={allPlugins("# Your title")}
      />
    </div>
  );
}
