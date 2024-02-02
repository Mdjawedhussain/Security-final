import axios from "axios";
import dateFormat from "dateformat";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Readmore = () => {
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState([]);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const { nid } = useParams();
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const fetchNews = () => {
    return axios.get("http://localhost:3000/news/" + nid, config);
  };

  const getNews = async () => {
    const result = await fetchNews();
    setNews(result.data.data);
    setComments(result.data.data.Comments);
    console.log(comments,result.data.data)
  };

  // useeffect
  useEffect(() => {
    getNews();
  }, []);

  // comment post
  const commentPost = (e) => {
    e.preventDefault();

    if (commentText == "") {
      toast.error("write something..", { position: "top-left" });

      return;
    }

    const newsid = nid;

    const data = {
      newsid,
      commentText,
    };
    axios.post("http://localhost:3000/news/comment", data, config).then((res) => {
      console.log(res.data);

      if (res.data.success) {
        toast.success("Comment Posted.", { position: "top-left" });

        setCommentText("");
        getNews();

        // setCommentcount(res.data.commentcount + 1);

        // callbackUpdate();
      } else {
        toast.error("Error while posting.", { position: "top-left" });
      }
    });
  };

  return (
    <div className="container my-3">
      <div class="col-lg-12 mx-auto">
        <div class="page-header">
          <h3 className="px-3">{news.title} </h3>
          <small className="p-3" style={{ fontSize: "15px" }}>
            {dateFormat(news.created_date, "dddd, mmmm dS, yyyy")}{" "}
          </small>
        </div>
        <img
          className="featuredImg p-3"
          src={"http://localhost:3000/" + news.thumbnail}
          width="100%"
        />
        <p dangerouslySetInnerHTML={createMarkup(news.content)}></p>
      </div>
      <hr />

      <div>
        <h4 className="py-3">Comments</h4>
        <form>
          <div className="d-flex ">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add comment"
              type="text"
              class="form-control"
            />

            <button
              type="submit"
              onClick={commentPost}
              class=" btn btn-danger ms-4 btn-sm "
            >
              Post
            </button>
          </div>
        </form>
      </div>
      <hr />
      <div className="my-2">
        {/* loop */}
        {comments.map((comment, index) => (
          <div className="border p-2 bg-white rounded-3">
            <div>
              <i className="fa fa-user-circle"></i> {comment.PostedBy.username}
            </div>
            <small className="ms-4">{comment.Text}</small>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Readmore;
