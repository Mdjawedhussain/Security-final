

import axios from "axios";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";


function AdminHome() {

  const[news, setNews]=useState([])


  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  }

  const fetchNews= ()=>{
   return axios.get("http://localhost:3000/adminnews", config)
    
  }


  const getNews= async ()=>{
    const res = await fetchNews()
    setNews(res.data.data)
    console.log(news)
    
  }


useEffect(()=>{
  getNews();
},[])

const callback=()=>{
  getNews();
}











  return <div className='container my-3'> 

  <h3 className='shadow-sm p-4 text-center bg-white'>
      Recently added News
  </h3>
  <div className='shadow-sm p-5 my-4 bg-white'>
  <table class="table table-striped table-responsive">
  <thead>
    
    <tr className='text-center'>
      <th scope="col">SN</th>
      <th scope="col">News Title</th>
      <th scope="col">Date</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    
    
  {news.map((item, index)=>(
              <NewsItem key={index} newsitem={item} sn={index+1} callback={callback}/>
            )

            )}
    
  </tbody>
</table>

  </div>












  </div>;
}

export default AdminHome;
