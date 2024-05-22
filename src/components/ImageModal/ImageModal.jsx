import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, selectedImage, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={selectedImage.description}
      className={css.imageModal}
      overlayClassName={css.overlay}
    >
      <img src={selectedImage.urls.regular} alt={selectedImage.description} />
    </Modal>
  );
}
