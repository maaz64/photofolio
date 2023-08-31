import './css/Image.css'

const Image = ({album})=>{
    return(
        
            <div className="img-comp">
                <div className="image">
                    <img src={album.src} alt="img" />
                </div>
                <div className="span">
                <span>{album.albumName}</span>
                </div>
                

            </div>

    )
}
export default Image;