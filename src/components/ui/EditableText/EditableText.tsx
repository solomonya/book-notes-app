import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface Props {
  defaultText: string | undefined;
}

const EditableText = forwardRef(function (props: Props, ref) {
  const editableRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerText = props.defaultText ?? "";
    }
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        getContent() {
          return editableRef.current?.innerText;
        },
      };
    },
    []
  );

  return (
    <p
      contentEditable={true}
      ref={editableRef}
      className="border-b border-slate-300 p-2 text-xl font-light outline-none"
    />
  );
});

export { EditableText };
