import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImgClick }) {
  return (
    <ul className={css.gallery}>
      {images.map((img) => (
        <li className={css.galleryItem} key={img.id}>
          <ImageCard
            imgUrl={img.urls.small}
            imgDescr={img.description}
            onClick={() => onImgClick(img)}
          />
        </li>
      ))}
    </ul>
  );
}
