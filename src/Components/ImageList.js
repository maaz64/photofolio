import { useState, useRef, useEffect } from "react";
import Carousel from "./Carousel";
import Image from "./Image";
import "./css/ImageList.css";
import { db } from "../firebaseInit";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

const ImageList = ({ toggleIsImgList, selectedAlbum }) => {
  const [isAddImg, setIsAddImg] = useState(false);
  const [images, setImages] = useState([]);
  const [imgToBeUpdated, setImgToBeUpdated] = useState(null);
  const [isCarousel, setIsCarousel] = useState(false);

  const titleRef = useRef();
  const imgUrlRef = useRef();

  useEffect(() => {
    const getImages = async () => {
      onSnapshot(doc(db, "photofolio", selectedAlbum.id), (doc) => {
        setImages(doc.data().images);
      });
    };
    getImages();
  }, [selectedAlbum]);

  useEffect(() => {
    if (!imgToBeUpdated) return;
    titleRef.current.value = imgToBeUpdated.title;
    imgUrlRef.current.value = imgToBeUpdated.url;
  }, [imgToBeUpdated]);

  const handleImgForm = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const url = imgUrlRef.current.value;
    if (!imgToBeUpdated) {
      const formData = {
        id: Date.now(),
        title,
        url,
      };
      setImages([formData, ...images]);

      await setDoc(doc(db, "photofolio", selectedAlbum.id), {
        name: selectedAlbum.name,
        images: [formData, ...images],
      });
      clearInput();
      return;
    }

    let image = {
        id: imgToBeUpdated.id,
        title,
        url,
    };
    const result = updateImage(image);
    if (!result) return;
    clearInput();
    setImgToBeUpdated(null);
  };

  const deleteImg = async (index) => {
    images.splice(index, 1);
    setImages(images);

    const docRef = doc(db, "photofolio", selectedAlbum.id);
    await updateDoc(docRef, {
      images,
    });
  };

  const updateImage = async (image) => {
    const index = images.indexOf(imgToBeUpdated);
    images[index] = image;
    setImages([...images]);
    const docRef = doc(db, "photofolio", selectedAlbum.id);
    await updateDoc(docRef, {
      images,
    });
    
  };

  const setUpdateImg = (image) => {
    setIsAddImg(true);
    setImgToBeUpdated(image);
  };

  const toggleIsAddImg = () => {
    setIsAddImg(!isAddImg);
  };

  const clearInput = () => {
    titleRef.current.value = "";
    imgUrlRef.current.value = "";
  };

  return (
    <>
      {isCarousel ?
        <Carousel setIsCarousel={setIsCarousel} images={images} />
      :
        <div className="img-list">
          <div className="img-list-top">
            <div className="back" onClick={toggleIsImgList}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png"
                alt="back"
              />
            </div>
            <div className="img-text">
              <h1>
                {images.length === 0
                  ? "No images found in this album..."
                  : null}
              </h1>
            </div>
            <div className="add-img-btn">
              <button onClick={toggleIsAddImg}>
                {isAddImg ? "Cancel" : "Add Image"}
              </button>
            </div>
          </div>
          {isAddImg ?
            <div className="create-img">
              <span>Add Image to {selectedAlbum.name}</span>
              <form onSubmit={handleImgForm}>
                <input placeholder="Title" ref={titleRef} required />
                <input placeholder="Image URL" ref={imgUrlRef} required />

                <div className="img-form-btn">
                  <button>
                    {imgToBeUpdated == null ? "Create" : "Update"}
                  </button>
                  <button onClick={clearInput}>Clear</button>
                </div>
              </form>
            </div>
         : null}

          <div className="img-list-container">
            {images.map((img, index) => (
              <div key={img.id}>
                <Image
                  setIsCarousel={setIsCarousel}
                  image={img}
                  index={index}
                  deleteImg={deleteImg}
                  setUpdateImg={setUpdateImg}
                />
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default ImageList;
