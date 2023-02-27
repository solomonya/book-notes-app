import { ShowList } from "@/components";
import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getEditorConfig, getMenuOptions } from "./model";
import { forwardRef, useImperativeHandle } from "react";

interface Props {
  initialContent?: string;
}

const Editor = forwardRef(function (props: Props, ref) {
  const editor = useEditor(getEditorConfig(props));

  useImperativeHandle(
    ref,
    () => {
      return {
        getContent() {
          return editor?.getHTML();
        },
      };
    },
    [editor]
  );

  return (
    <>
      {editor && (
        <FloatingMenu editor={editor}>
          <ShowList list={getMenuOptions(editor)}>
            {(menu) => <button key={menu.level} onClick={menu.onClick}>{`h${menu.level}`}</button>}
          </ShowList>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
});

export { Editor };
