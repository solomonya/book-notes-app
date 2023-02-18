import { Modal } from "@/components";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { AddBookForm } from "../AddBookForm/AddBookForm";

const AddBookModal = forwardRef((props, ref) => {
  const modalRef = useRef<{ open: () => void }>();

  useImperativeHandle(ref, () => {
    return {
      open: modalRef.current?.open,
    };
  });

  return (
    <Modal ref={modalRef} title="Добавить книгу">
      <AddBookForm />
    </Modal>
  );
});

AddBookModal.displayName = "AddBookModal";

export { AddBookModal };
