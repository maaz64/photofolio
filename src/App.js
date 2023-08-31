import { useState, useEffect } from 'react';
import './App.css';
import Navbar from "./Components/Navbar"
import AlbumList from './Components/AlbumList';
import ImageList from './Components/ImageList';
import {db} from './firebaseInit';
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 



function App() {
const[isImgList, setIsImgList] = useState(false);
const[albums, setAlbums] = useState([]);

const addAlbum =async (name)=>{
  setAlbums([{
    name,
    images:albums.images
  },...albums]);
  await addDoc(collection(db, "photofolio"), {
    name,
    images:[]
  });
}

useEffect(() => {
  async function getAlbums() {

    onSnapshot(collection(db, "photofolio"), (snapShot) => {

        const albums = snapShot.docs.map((document) => {
          return {
            id: document.id,
            ...document.data(),
          };  
        });

        setAlbums(albums);

      });
    }

  getAlbums();
}, []);

const toggleIsImgList = ()=>
{
  setIsImgList(!isImgList);
}

  return (
    <div className="App">
      <Navbar/>

      {isImgList?
      <ImageList toggleIsImgList={toggleIsImgList}/>:
      <AlbumList toggleIsImgList={toggleIsImgList} addAlbum={addAlbum} albums={albums}/>
      }

    </div>
  );
}

export default App;
