
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../News/NewsCard";


const Search = () => {
  const[news, setNews]=useState([])
  const[usersavings, setUserSavings]=useState([])
  const uid = localStorage.getItem('userid')
  const{query}=useParams();
  console.log(uid)

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  }

const getNews=()=>{
  axios.get("http://localhost:3000/search/"+ query).then((res) => {
    console.log(res.data.data)
    setNews(res.data.data)
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
    <div className="container">
          <h3 className="bg-white shadow-sm p-4 my-2"><i className="fa fa-search"></i> Search results for: {query}</h3>
        <div className=" bg-white shadow-sm p-2 my-2">
          <div className="row p-2">

            {news.map((item, index)=>(
              <NewsCard key={index} newsitem={item} usersavings={usersavings} callback={callback}/>
            )
            )}
          </div>
         
        </div>
        
        
    </div>
  );
};

export default Search;
