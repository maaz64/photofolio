import { useState } from "react";

// importing Carousel component styles
import styles from './Carousel.module.css';

const Carousel = ({images,setIsCarousel,isCarousel})=>{

    // creating state to track the current index of images array
    const[currentIndex, setCurrentIndex] = useState(isCarousel.index);
    
    // function to handle the index..it will increase the index by 1 if the index value is less than the length of images array otherwise it will set it to 0
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
      };

      // function to handle the index..it will decrease the index by 1 if the index value is grater than 0 otherwise it will set it to (length of images array- 1)
      const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
      };

      const handleDotClick = (index) => {
        setCurrentIndex(index);
      };

      return (
        <>
          
        <div className={styles.carousel}>
          <div className={styles.cancel} onClick={()=>setIsCarousel({carousel:false, index:null})}>
            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828851.png" alt="backToimages" />
            </div>

            <h2>{images[currentIndex].title}</h2>
            <img
              key={currentIndex}
              src={images[currentIndex].url}
              alt="img"
            /><div className={styles.slide_direction}>
            <div className={styles.left} onClick={handlePrevious}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 96 960 960"
                width="20"
              >
                <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
              </svg>
            </div>
            <div className={styles.right} onClick={handleNext}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 96 960 960"
                width="20"
              >
                <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
              </svg>
            </div>
          </div>
          <div className={styles.indicator}>
            {images.map((_, index) => (
              <div
                key={index}
                className={`${styles.dot}   ${currentIndex === index ? styles.active : ""}`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>
        </>
      );
}

export default Carousel;