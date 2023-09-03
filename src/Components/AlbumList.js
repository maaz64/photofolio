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
      clearInput();
    }
    
    const clearInput = ()=>{
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
                <button >Create</button>
                <button onClick={clearInput}>Clear</button>
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
            <div key={album.id} onClick={()=>toggleIsImgList(album)}>
            <Album album={album} key={album.id} />
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default AlbumList;
