import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/Table'
import axios from 'axios'

function App() {
  const [info,setInfo] =useState(null);
  const apiData =  async()=>{
try {
  const userInfo = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
setInfo(userInfo);
} catch (error) {
console.log(error ,'fetching data error');  
}    
  }
  useEffect(()=>{
    apiData();
  },[])

  return (
    <>
    <Table infoData={info && info}/>
    </>
  )
}

export default App
