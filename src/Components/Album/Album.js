// importing album styles
import styles from './Album.module.css';

// creating the album component
const Album = ({album})=>{
    return(
        <>
        <div className={styles.album}>
            <div className={styles.albumImg}>
                <img src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png" alt="album_img" />
            </div>
            <span>{album.name}</span>

        </div>
        
        </>
    )

}

export default Album;