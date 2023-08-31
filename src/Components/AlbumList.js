import { useState, useRef } from "react";
import Album from "./Album";
import "./css/AlbumList.css"

const AlbumList = ({toggleIsImgList, addAlbum, albums}) => {
    const [isCreateAlbum,setIsCreateAlbum] = useState(false);
    const albumNameRef = useRef();

    const toggleIsCreate = ()=>{
        setIsCreateAlbum(!isCreateAlbum);
    }

    const handleAlbumForm= (e)=>{
      e.preventDefault();
      const albumName = albumNameRef.current.value;
      addAlbum(albumName);
      albumNameRef.current.value = "";
  
    }

  return (
    <>
      <div className="album-list">
        {isCreateAlbum?
        <div className="create-album">
            <span>Create an Album</span>
            <form onSubmit={handleAlbumForm}>
                <input type="text" ref={albumNameRef}placeholder="Album Name" required/>
                {/* <button onClick={()=>{albumNameRef.current.value=""}}>Clear</button> */}
                <button >Create</button>
            </form>
        </div>:null}
        <div className="album-list-top">
            <div className="album-text">
                <h1>Your Albums</h1>
            </div>
            <div className={isCreateAlbum?"cancel-album-btn":"add-album-btn"}>
                <button onClick={toggleIsCreate}>{isCreateAlbum?"Cancel":"Add Album"}</button>
            </div>


        </div>
        <div className="album-list-container" >
          {albums.map((album) => (
            <div onClick={toggleIsImgList}>
            <Album album={album} key={album.id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AlbumList;
