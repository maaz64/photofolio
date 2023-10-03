// importing styles for Image component
import styles from './Image.module.css';

// creating image component 
const Image = ({image,deleteImg, setUpdateImg, index, setIsCarousel})=>{
    return(
        
            <div className={styles.imgComp} >

                <div className={styles.image}  onClick={()=>setIsCarousel({carousel:true, index})}>
                    <img src={image.url} alt="img" />
                </div>
                <span>{image.title}</span>
                <div className={styles.updateImg}onClick={()=>setUpdateImg(image)}> 
                    <img src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png" alt="update" />
                </div>
                <div onClick={()=>deleteImg(index)} className={styles.deleteImg}>
                    <img src="https://t3.ftcdn.net/jpg/02/76/19/96/240_F_276199650_Hs5K3QnXm9ZMBLd3DT44YcdWUIf8GHxO.jpg" alt="delete"  />

                </div>
                

            </div>

    )
}
export default Image;