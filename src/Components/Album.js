import './css/Album.css'

const Album = ({album})=>{
    return(
        <>
        <div className="album">
            <div className="album-img">
                <img src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png" alt="album_img" />
            </div>
            <span>{album.name}</span>

        </div>
        
        </>
    )

}

export default Album;