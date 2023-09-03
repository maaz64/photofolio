import './css/Image.css'

const Image = ({image,deleteImg, setUpdateImg, index, setIsCarousel})=>{
    return(
        
            <div className="img-comp" >

                <div className="image"  onClick={()=>{setIsCarousel(true)}}>
                    <img src={image.url} alt="img" />
                </div>
                <span>{image.title}</span>
                <div className="update-img" onClick={()=>setUpdateImg(image)}> 
                    <img src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png" alt="update" />
                </div>
                <div onClick={()=>deleteImg(index)} className="delete-img">
                    <img src="https://t3.ftcdn.net/jpg/02/76/19/96/240_F_276199650_Hs5K3QnXm9ZMBLd3DT44YcdWUIf8GHxO.jpg" alt="delete"  />

                </div>
                

            </div>

    )
}
export default Image;