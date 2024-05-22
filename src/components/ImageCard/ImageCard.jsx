import css from "./ImageCard.module.css";

export default function ImageCard({ imgUrl, imgDescr, onClick }) {
  return (
    <div>
      <img
        onClick={onClick}
        className={css.galleryImage}
        src={imgUrl}
        alt={imgDescr}
      />
    </div>
  );
}
