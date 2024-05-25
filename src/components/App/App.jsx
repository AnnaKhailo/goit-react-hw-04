import { useState } from "react";
import { useEffect } from "react";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

import { getImages } from "../../images-api";
import css from "./App.module.css";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [noImagesByQuery, setNoImagesByQuery] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }

    async function fetchImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getImages(searchQuery, page);
        setImages((prevState) => [...prevState, ...data.results]);
        setTotalPages(data.total_pages);
        if (!data.total_pages) {
          setNoImagesByQuery(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [page, searchQuery]);

  const handleSearch = async (topic) => {
    setSearchQuery(topic);
    setPage(1);
    setImages([]);
    setTotalPages(0);
    setNoImagesByQuery(false);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  const handleImgClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {isError && <ErrorMessage />}

      {images.length > 0 && (
        <ImageGallery images={images} onImgClick={handleImgClick} />
      )}
      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          selectedImage={selectedImage}
          onRequestClose={closeModal}
        />
      )}
      {isLoading && <Loader />}

      {images.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      {page === totalPages && (
        <p className={css.endOfCollection}>
          Sorry, but that is all we had for your request!
        </p>
      )}
      {noImagesByQuery && (
        <p className={css.noImages}>
          Sorry, there are no images matching your search query. Please try
          again.
        </p>
      )}
    </div>
  );
}

export default App;
