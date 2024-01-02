"use client";
import { FC, ReactNode } from "react";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <dialog className={`modal !ms-0 ${modalOpen ? "modal-open" : " "}`}>
      <div className="modal-box w-full max-w-3xl">
        <button
          onClick={() => {
            setModalOpen(false);
            location.reload();
          }}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
