import { useState } from 'react';
import './App.css';
import Navbar from "./Components/Navbar"
import AlbumList from './Components/AlbumList';
import ImageList from './Components/ImageList';

function App() {
const[isImgList, setIsImgList] = useState(false);

const toggleIsImgList = ()=>
{
  setIsImgList(!isImgList);
}

  return (
    <div className="App">
      <Navbar/>
      {isImgList?<ImageList toggleIsImgList={toggleIsImgList}/>:<AlbumList toggleIsImgList={toggleIsImgList}/>}
      
      


    </div>
  );
}

export default App;
