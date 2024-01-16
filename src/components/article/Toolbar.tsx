import {
  DiffSourceToggleWrapper,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  CodeToggle,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  InsertImage,
} from "@mdxeditor/editor";

export const Toolbar: React.FC = () => {
  return (
    <DiffSourceToggleWrapper>
      <ConditionalContents
        options={[
          {
            when: (editor) => editor?.editorType === "codeblock",
            contents: () => <ChangeCodeMirrorLanguage />,
          },
          {
            fallback: () => (
              <>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <ListsToggle />
                <Separator />

                <ConditionalContents
                  options={[{ fallback: () => <BlockTypeSelect /> }]}
                />

                <Separator />

                <CreateLink />
 <InsertImage />

                <Separator />

                <InsertTable />
                <InsertThematicBreak />

                <Separator />
                <InsertCodeBlock />
              </>
            ),
          },
        ]}
      />
    </DiffSourceToggleWrapper>
  );
};
