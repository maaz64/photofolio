import { useState } from "react";
import { AlbumImgArr } from "../data";
import Album from "./Album";
import "./css/AlbumList.css"

const AlbumList = ({toggleIsImgList}) => {
    const [isCreateAlbum,setIsCreateAlbum] = useState(false)

    const toggleIsCreate = ()=>{
        setIsCreateAlbum(!isCreateAlbum);
    }

  return (
    <>
      <div className="album-list">
        {isCreateAlbum?
        <div className="create-album">
            <span>Create an Album</span>
            <form>
                <input type="text" placeholder="Album Name" required/>
                <button>Clear</button>
                <button>Create</button>
            </form>
        </div>:null}
        <div className="album-list-top">
            <div className="album-text">
                <h1>Your Albums</h1>
            </div>
            <div className={isCreateAlbum?"cancel-album-btn":"add-album-btn"}>
                <button onClick={toggleIsCreate}>{isCreateAlbum?"cancel":"Add Album"}</button>
            </div>


        </div>
        <div className="album-list-container" >
          {AlbumImgArr.map((album) => (
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
