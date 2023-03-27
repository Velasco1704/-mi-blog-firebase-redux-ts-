import { useState } from "react";
import { db } from "@config/index";
import { doc, updateDoc } from "firebase/firestore";
import { type PropsModal } from "@interface/PropsModal";
import "@styles/Modal.scss";

export const Modal: React.FC<PropsModal> = ({
  id,
  valueTitle,
  valueContent,
  modalState,
  setModalState,
}) => {
  const [formModal, setFormModal] = useState({
    title: valueTitle,
    content: valueContent,
  });
  const handleEdit = async () => {
    await updateDoc(doc(db, "posts", id), {
      title: formModal.title,
      content: formModal.content,
    }).then(() =>
      setModalState({ ...modalState, closeOrOpen: !modalState.closeOrOpen })
    );
  };
  return (
    <div className="modal__container">
      <form className="modal__form">
        <div className="modal__container__info">
          <label className="modal__label">Title</label>
          <input
            className="modal__input"
            type="text"
            value={formModal.title}
            name="title"
            onChange={({ target }) =>
              setFormModal({ ...formModal, title: target.value })
            }
          />
        </div>
        <div className="modal__container__info">
          <label className="modal__label">Content</label>
          <textarea
            className="modal__input modal__textarea"
            value={formModal.content}
            name="content"
            onChange={({ target }) =>
              setFormModal({ ...formModal, content: target.value })
            }
          />
          <div className="modal__container__buttons">
            <button
              className="modal__button modal__button__close"
              onClick={() =>
                setModalState({
                  ...modalState,
                  closeOrOpen: !modalState.closeOrOpen,
                })
              }
            >
              Cancel
            </button>
            <button
              className="modal__button modal__button__save"
              type="button"
              onClick={handleEdit}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
