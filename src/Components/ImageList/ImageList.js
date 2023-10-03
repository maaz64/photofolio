import { useState, useRef, useEffect} from "react";

// importing components
import Carousel from "../Carousel/Carousel";
import Image from "../Image/Image";

// importing ImageLsit styles
import styles from "./ImageList.module.css";

// importing firebase database methods
import { db } from "../../firebaseInit";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

// importing react toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


const ImageList = ({ toggleIsImgList, selectedAlbum }) => {

  // creating state for conditional rendering of image form. if it is true it will render the form  
  const [isAddImg, setIsAddImg] = useState(false);

  // creating state to store the Images
  const [images, setImages] = useState([]);

  // creating state to upadte the image
  const [imgToBeUpdated, setImgToBeUpdated] = useState(null);

  // setting state for crousel...if it is true Carousel component will be render otherwise image component will be render
  const [isCarousel, setIsCarousel] = useState({carousel:false,index:null});

  // creating imageList form input ref
  const titleRef = useRef();
  const imgUrlRef = useRef();


  // this useEffect will fetch the images of selected album from database and set it to the images state whenever the selected album changes
  useEffect(() => {
    const getImages = async () => {
      // fetching the images of selected Album from database using selected Album Id
      onSnapshot(doc(db, "photofolio", selectedAlbum.id), (doc) => {
        setImages(doc.data().images);
      });
    };
    getImages();
  }, [selectedAlbum]);

  // this useEffect will store the input value inside reference whenever they changed..it will help us in updating the image
  useEffect(() => {
    if (!imgToBeUpdated) return;
    titleRef.current.value = imgToBeUpdated.title;
    imgUrlRef.current.value = imgToBeUpdated.url;
  }, [imgToBeUpdated]);

  // this function will add or update the image according to the imgToBeUpdated value
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
      
      // adding the input image in the images field of selcted album inside the database 
      await setDoc(doc(db, "photofolio", selectedAlbum.id), {
        name: selectedAlbum.name,
        images: [formData, ...images],
      });

      // clearing the input field
      clearInput();

      // showing the success notification  
      toast.success("Image added successfully.");
      return;
    }

    let image = {
        id: imgToBeUpdated.id,
        title,
        url,
    };

    // calling the update function to update the image
    const result = updateImage(image);
    if (!result) return;

    // clearing the input field
    clearInput();

    // setting isImgToBeUpdated state to null
    setImgToBeUpdated(null);

    // showing the success notification
    toast.success("Image updated successfully.");
  };

  // function to delete image using index of the image
  const deleteImg = async (index) => {
    // removing the image from the images array using splice method
    images.splice(index, 1);

    // setting the images state to the updated array 
    setImages(images);

    // storing the updated array inside the database
    const docRef = doc(db, "photofolio", selectedAlbum.id);
    await updateDoc(docRef, {
      images,
    });

    // showing the success notification
    toast.success("Image  deleted successfully.");
  };


  // function to update the image
  const updateImage = async (image) => {

    // getting the index of image that we want to update
    const index = images.indexOf(imgToBeUpdated);

    // updating the image to the updated value
    images[index] = image;

    // setting the images ṣtate to the updated one
    setImages([...images]);

    // updating the images inside the databse using updateDoc method
    const docRef = doc(db, "photofolio", selectedAlbum.id);
    await updateDoc(docRef, {
      images,
    });
    
  };

  // setting the updated value inside the isImgToBeUpdated and setting isAddImg to true so that our form will render  
  const setUpdateImg = (image) => {
    setIsAddImg(true);
    setImgToBeUpdated(image);
  };


  // functiion to toggle isAddImg 
  const toggleIsAddImg = () => {
    setIsAddImg(!isAddImg);
    setImgToBeUpdated(null);
  };

  // function to clear the form input fields
  const clearInput = () => {
    titleRef.current.value = "";
    imgUrlRef.current.value = "";
  };



  return (
    <>
      <ToastContainer/>
      {/* condtional rendering of Carousel and ImageList component */}
      {isCarousel.carousel?<Carousel images={images} isCarousel={isCarousel} setIsCarousel={setIsCarousel} /> :
        <div className={styles.imgList}>
          <div className={styles.imgListTop}>
            <div className={styles.back} onClick={toggleIsImgList}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png"
                alt="back"
              />
            </div>
            <div >
              <h1>
                {images.length === 0
                  ? "No images found in this album..."
                  : null}
              </h1>
            </div>
            <div className={isAddImg?styles.cancelImgBtn:styles.addImgBtn}>
              <button onClick={toggleIsAddImg}>
                {isAddImg ? "Cancel" : "Add Image"}
              </button>
            </div>
          </div>
          {/* conditional rendering of form */}
          {isAddImg ?
            <div className={styles.createImg}>
              <span>Add Image to {selectedAlbum.name}</span>
              <form onSubmit={handleImgForm}>
                <input placeholder="Title" ref={titleRef} required />
                <input placeholder="Image URL" ref={imgUrlRef} required />

                <div className={styles.imgFormBtn}>
                  <button>
                    {imgToBeUpdated == null ? "Create" : "Update"}
                  </button>
                  <button onClick={clearInput}>Clear</button>
                </div>
              </form>
            </div>
         : null}

          <div className={styles.imgListContainer}>
            {images.map((img, index) => (
                <Image
                  key={img.id}
                  setIsCarousel={setIsCarousel}  
                  image={img}
                  index={index}
                  deleteImg={deleteImg}
                  setUpdateImg={setUpdateImg}
                />
            ))}
          </div>
        </div>}
    </>
  );
};

export default ImageList;
