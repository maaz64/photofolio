import { useState, useEffect, useReducer } from 'react';

// importing App styling
import './App.css';

// importing Components
import Navbar from "./Components/Navbar/Navbar"
import AlbumList from './Components/AlbumList/AlbumList';
import ImageList from './Components/ImageList/ImageList';

// importing firebase database methods
import {db} from './firebaseInit';
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 

// importing react toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// reducer function for album
const albumReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {

    case "SET_ALBUM":{
      return{
        albums:[...payload.albums],
      }
    }

    case "ADD_ALBUM": {
      return {
        albums: [payload.album, ...state.albums],
      };
    }
    default:
      return state;
  }
};

function App() {

// creating state for storing album list
const[state, dispatch] = useReducer(albumReducer,{albums:[]})

// setting state for conditional rendering of imageList..if it is false it will render AlbumList component otherwise it will render ImageList component
const[isImgList, setIsImgList] = useState(false);

// creating state to get the clicked album and then use it renders its images
const[selectedAlbum,setSelectedAlbum] = useState(null);



// this useEffect will get the album list from database as the component did mount
useEffect(() => {

  // this function wii give us real time data 
  async function getAlbums() {

    onSnapshot(collection(db, "photofolio"), (snapShot) => {

      const albums = snapShot.docs.map((document) => {
          return {
            id: document.id,
            ...document.data(),
          };  
        });

        // dispatching the album list to store the data in state.albums array
        dispatch({type:"SET_ALBUM",payload:{albums}});

      });
    }

  getAlbums();
}, []);


// This function will add the album in the album list
const addAlbum =async (name)=>{
  const newAlbum = {
    name,
    images:[]
  }
  toast.success("Album created successfully.");
  await addDoc(collection(db, "photofolio"), newAlbum);
}

// function to toggle the isImgList and set the selectedAlbum to the album that is clicked
const toggleIsImgList = (album)=>
{
  setIsImgList(!isImgList);
  setSelectedAlbum(album);
}

  return (
    <>
    {/* using toastContainer to show the notification */}
    <ToastContainer/>
    <div className="App">
      <Navbar/>
    {/* conditional rendering of ImageList and AlbumList */}
      {isImgList?
      <ImageList toggleIsImgList={toggleIsImgList}selectedAlbum={selectedAlbum}/>:
      <AlbumList toggleIsImgList={toggleIsImgList} 
                 addAlbum={addAlbum} 
                 albums={state.albums}
                 />
      }

    </div>
    </>
  );
}

export default App;
