import axios from "axios";
import React, { useEffect, useState } from 'react';
import NewsCard from '../News/NewsCard';

function SaveLater() {
  const[news, setNews]=useState([])
  const[usersavings, setUserSavings]=useState([])
  const uid = localStorage.getItem('userid')
  console.log(uid)

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  }

const getNews=()=>{
  axios.get("http://localhost:3000/savelaters/"+uid, config).then((res) => {
    console.log(res.data.data)
    setNews(res.data.data.savelaters)
    })
    .catch((e) => {
      console.log(e)
    });


}

const getUser=()=>{
  axios.get("http://localhost:3000/customer/"+uid, config).then((res) => {
    
    setUserSavings(res.data.data.savelaters)
    })
    .catch((e) => {
      console.log(e)
    });

}

useEffect(()=>{
  getNews();
  getUser();
},[])

const callback=()=>{
  getNews();
  getUser();

}

  return (
    <>
    <div className='my-2 bg-white p-3 shadow-sm'>
        <h3><i class="fa-regular fa-clock text-info"></i> Your Savings</h3>

    </div>
    <div className='my-1 bg-white p-3 shadow-sm'>
        <div className='row'>
        {news.map((item, index)=>(
              <NewsCard key={index} newsitem={item} usersavings={usersavings} callback={callback}/>
            )

            )}

        </div>

    
        
    </div>
    
    
    
    
    
    
    </>
  )
}

export default SaveLater