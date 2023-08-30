import './css/Album.css'

const Album = ({album})=>{
    return(
        <>
        <div className="album">
            <div className="album-img">
                <img src={album.src} alt="album_img" />
            </div>
            <span>{album.albumName}</span>

        </div>
        
        </>
    )

}

export default Album;