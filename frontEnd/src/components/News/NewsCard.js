import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import './style.css';

function NewsCard({newsitem, usersavings, callback}) {

  const uid = localStorage.getItem('userid')

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  }

  const newsId = newsitem._id
  const data = {
    newsId
  }

  const saveLater =()=>{
    
    axios.post("http://localhost:3000/news/save", data, config).then((res) => {
      console.log(res.data)
        if (res.data.success) {
          toast.success("Added to your savings!");
          callback();
        } else {
          toast.error("Something went wrong on server!");
        }
      })
      .catch((e) => {
        toast.error("Something went wrong!");
      });
  }

  const unsave =()=>{
    axios.post("http://localhost:3000/news/unsave", data, config).then((res) => {
      console.log(res.data)
        if (res.data.success) {
          toast.success("Removed from your savings!");
          callback();
        } else {
          toast.error("Something went wrong on server!");
        }
      })
      .catch((e) => {
        toast.error("Something went wrong!");
      });
  }





  return (
    <>
      <div className="col-lg-4 col-md-4 col-6 ">
        <div className='p-2 bg-white shadow-sm my-2 newscard'>
        <Link className="text-decoration-none text-dark " to={'/readmore/'+newsitem._id}>
        <img
            src={'http://localhost:3000/'+newsitem.thumbnail}
            className="img-fluid"
            alt="thumbnail"
          />
          <h4 className="my-2 fw-light">{newsitem.title}</h4><hr/>
          <p className="">
              {newsitem.excerpt}
            </p>


           
            </Link>
            <div className="d-flex justify-content-end" >
              <Link className="dbtn text-white text-decoration-none" to={'/readmore/'+newsitem._id}>Read more...</Link>
              
              {usersavings.includes(newsitem._id)?(
                <i className="fa-solid fa-bookmark fw-4 text-warning ms-2 savelater" onClick={unsave}  title="Remove from read later"></i>

              ):(
                <i className="fa-regular fa-bookmark fw-4 text-warning ms-2 savelater" onClick={saveLater} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to read later"></i>

              )}

            </div>





        </div>






        {/* <div className="card m-2">
          <img
            src={'http://localhost:3000/'+newsitem.thumbnail}
            className="card-img-top img-fluid"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{newsitem.title}</h5>
            <p className="card-text">
              {newsitem.excerpt}
            </p>
            
          </div>
        </div> */}
      </div>
    </>
  );
}

export default NewsCard;
