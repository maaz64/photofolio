import { useState } from "react";
// import Album from "./Album";
import Image from './Image';
import './css/ImageList.css'
import { ImgArr } from "../data";

const ImageList = ({toggleIsImgList})=>{
    const[isAddImg, setIsAddImg] = useState(false);
    const toggleIsAddImg = ()=>{
        setIsAddImg(!isAddImg);
    }
    return(
        <div className="img-list">

            <div className="img-list-top">
                <div className="back" onClick={toggleIsImgList}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png" alt="back" />
                </div>
                <div className="img-text">
                    <h1>No images found in this album...</h1>
                </div>
                <div className="add-img-btn">
                    <button onClick={toggleIsAddImg}>{isAddImg?"Cancel":"Add Image"}</button>
                </div>
            </div>
            {isAddImg?<div className="create-img">
                <span>Add Image to ALbumName</span>
                <form>
                    <input placeholder="Title" required />
                    <input placeholder="Image URL" required />

                    <div className="img-form-btn">
                        <button>Clear</button>
                        <button>Add</button>
                    </div>
                </form>
            </div>:null}


            <div className="img-list-container">
                {ImgArr.map((img)=>
                <Image album={img} key={img.id}/>
                )}
            </div>
        </div>
    )
}

export default ImageList;