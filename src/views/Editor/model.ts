import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface EditorMethods {
  getContent: () => string;
}

interface IEditorConfig {
  initialContent?: string;
}

const HEADING_LEVELS = [1, 2, 3] as const;

const getEditorConfig = (options: IEditorConfig) => ({
  editorProps: {
    attributes: {
      class: "prose prose-sm mx-auto w-full lg:prose-lg xl:prose-lg focus:outline-none",
    },
  },
  content: options.initialContent ?? "",
  extensions: [
    StarterKit.configure({
      heading: {
        levels: HEADING_LEVELS as any,
      },
    }),
  ],
});

const getHeadings = (editor: Editor) => {
  return HEADING_LEVELS.map((level) => {
    return {
      level,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level }).run();
      },
    };
  });
};

const getMenuOptions = (editor: Editor) => {
  const headings = getHeadings(editor);

  return [...headings];
};

export { getMenuOptions, getEditorConfig };
