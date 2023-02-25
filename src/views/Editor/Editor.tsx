import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "prose prose-sm mx-auto w-full lg:prose-lg xl:prose-lg focus:outline-none",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
    ],
  });

  return (
    <>
      {editor && (
        <FloatingMenu editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
          >
            h1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
          >
            h4
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            bullet list
          </button>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};
