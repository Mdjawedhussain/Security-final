import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../News/NewsCard";

const Category = () => {
  const [news, setNews] = useState([]);
  const [usersavings, setUserSavings] = useState([]);
  const uid = localStorage.getItem("userid");
  console.log(uid);

  const { category } = useParams();

  var logo
  if(category == 'national'){
    logo = (<>
    <h3 className="bg-white shadow-sm p-4 my-2">
    <i className="fa-solid fa-users text-info"></i>{" "}
        National News
      </h3>
    </>
      )
  }
  else if(category == 'international'){
    logo = (<>
    <h3 className="bg-white shadow-sm p-4 my-2">
    <i className="fa-solid fa-earth-asia text-primary"></i>{" "}
        International News
      </h3>
    </>
      )
  }
  else if(category == 'sports'){
    logo = (<>
    <h3 className="bg-white shadow-sm p-4 my-2">
    <i className="fa-solid fa-basketball text-danger"></i>{" "}
        Sports News
      </h3>
    </>
      )
  }
  else{
    logo = (<>
    <h3 className="bg-white shadow-sm p-4 my-2">
        <i className="fa-solid fa-money-bill text-success" ></i>{" "}
        Business News
      </h3>
    </>
      )
  }
    
  

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const fetchNews = () => {
    return axios.get("http://localhost:3000/news/category/" + category, config);
  };

  const getNews = async () => {
    const res = await fetchNews();
    setNews(res.data.data);
    console.log(news);
  };

  const getUser = () => {
    axios
      .get("http://localhost:3000/customer/" + uid, config)
      .then((res) => {
        setUserSavings(res.data.data.savelaters);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("I am alive");
    callback();
  }, []);

  const callback = () => {
    getNews();
    getUser();
  };


  return (
    <div className="container">
      {logo}
      <div className=" bg-white shadow-sm p-2 my-2">
        <div className="row p-2">
          {news.map((item, index) => (
            <NewsCard
              key={index}
              newsitem={item}
              usersavings={usersavings}
              callback={callback}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
