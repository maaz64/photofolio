import { useState, useRef } from "react";

// importing Album Components and its styling
import Album from "../Album/Album";
import styles from './AlbumList.module.css';

const AlbumList = ({toggleIsImgList, addAlbum, albums}) => {
  
    // creating state for conditional rendering of album form. if it is true it will render the form  
    const [isCreateAlbum,setIsCreateAlbum] = useState(false);

    // creating album input ref
    const albumNameRef = useRef();

    // toggling function for isCreate album
    const toggleIsCreate = ()=>{
        setIsCreateAlbum(!isCreateAlbum);
    }


    // function to handle the album submission
    const handleAlbumForm= (e)=>{
      e.preventDefault();
      const albumName = albumNameRef.current.value;
      addAlbum(albumName);
      clearInput();
    }
    
    const clearInput = ()=>{
      albumNameRef.current.value = "";
    }

  return (
    <>
      <div className={styles.albumList}>
        {/* conditional rendering of album form */}
        {isCreateAlbum?
        <div className={styles.createAlbum}>
            <span>Create an Album</span>
            <form onSubmit={handleAlbumForm}>
                <input type="text" ref={albumNameRef}placeholder="Album Name" required/>
                <button >Create</button>
                <button onClick={clearInput}>Clear</button>
            </form>
        </div>:null}
        <div className={styles.albumListTop}>
            <div >
                <h1>Your Albums</h1>
            </div>
            {/* conditional rendering of Add Album and Cancel button and setting its className accordingly */}
            <div className={isCreateAlbum?styles.cancelAlbumBtn:styles.addAlbumBtn}>
                <button onClick={toggleIsCreate}>{isCreateAlbum?"Cancel":"Add Album"}</button>
            </div>
        </div>
          {/* rendering the album list */}
        <div className={styles.albumListContainer} >
        
          {albums.map((album) => (
            <>
            <div key={album.id} onClick={()=>toggleIsImgList(album)}>
              <Album album={album} key={album.id}/>
            </div>

          </>
          ))}
        </div>

      </div>
    </>
  );
};

export default AlbumList;
