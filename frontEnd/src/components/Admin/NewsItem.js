import axios from "axios";
import dateFormat from "dateformat";
import DOMPurify from "dompurify";
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TextEditor from '../TextEditor';

function NewsItem(props) {
  // variable initialioze
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [isNational, setIsNational] = useState(false);
  const [isInternational, setIsInternational] = useState(false);
  const [isSports, setIsSports] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [dthumbnail, setDThumbnail] = useState('');

  // change thumbnail event
  const onThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        setDThumbnail(URL.createObjectURL(event.target.files[0]));
        setThumbnail(event.target.files[0]);
    }
    
}

  

  useEffect(()=>{
    setTitle(props.newsitem.title)
    setContent(props.newsitem.content)
    setExcerpt(props.newsitem.excerpt)
    setThumbnail(props.newsitem.thumbnail)
    setDThumbnail('http://localhost:3000/' + props.newsitem.thumbnail)

    setIsBreaking(props.newsitem.isBreaking)
    setIsNational(props.newsitem.isNational)
    setIsInternational(props.newsitem.isInternational)
    setIsBusiness(props.newsitem.isBusiness)
    setIsSports(props.newsitem.isSports)
    // console.log('------------------------>',props.newsitem.isBreaking, isBreaking.toString())
    const blocksFromHTML = convertFromHTML(props.newsitem.content);
  const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
  );
  setEditorState(
      // EditorState.createWithContent(ContentState.createFromText(result.data.data.description))
      EditorState.createWithContent(state)
  )
  },[])

  // editor statechange
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setContent(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
    )};

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const deleteNews = () => {
    axios
      .delete("http://localhost:3000/news/delete/" + props.newsitem._id, config)
      .then((res) => {
        if (res.data.success) {
          toast.success("News Deleted");
          props.callback();
        }
      });
  };

  const updateNews = (e) => {
    e.preventDefault();

    console.log(content);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    // formdata
    const fdata = new FormData();
    fdata.append("title", title);
    fdata.append("content", content);
    fdata.append("thumbnail", thumbnail);
    fdata.append("excerpt", excerpt);
    fdata.append("isNational", isNational);
    fdata.append("isInternational", isInternational);
    fdata.append("isSports", isSports);
    fdata.append("isBreaking", isBreaking);
    fdata.append("isBusiness", isBusiness);
    // console.log(title, thumbnail);

    axios
      .put(
        "http://localhost:3000/news/update/" + props.newsitem._id,
        fdata,
        config
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          toast.success("News Updated!");
          props.callback();
        } else {
          toast.error("Something went wrong on server!");
        }
      })
      .catch((e) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <tr className="text-center">
      
        <th scope="row">{props.sn}</th>
        <td>{props.newsitem.title}</td>
        {/* <td>{props.newsitem.date}</td> */}
        <td>{dateFormat(props.newsitem.created_date, "dddd, mmmm dS, yyyy")}</td>
        <td>
          <div className="btn-group">
            <button
              className="btn btn-info text-white btn-sm me-2"
              data-bs-toggle="modal"
              data-bs-target={"#exampleModal" + props.sn}
            >
              Details
            </button>
            <button
              className="btn btn-success btn-sm me-2"
              data-bs-toggle="modal"
              data-bs-target={"#exampleModal1" + props.sn}
            >
              Update
            </button>
            <button
              className="btn btn-outline-danger btn-sm me-2"
              onClick={deleteNews}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>

      <div
        class="modal fade"
        id={"exampleModal" + props.sn}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {props.newsitem.title}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p
                dangerouslySetInnerHTML={createMarkup(props.newsitem.content)}
              ></p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>





      <div
        class="modal fade"
        id={"exampleModal1" + props.sn}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update: {props.newsitem.title}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">


            <form className="col-lg-8 mx-auto">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Excerpt
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={excerpt}
            onChange={(e)=>{setExcerpt(e.target.value)}}
          />
        </div>
        <div class="mb-3 p-2 border bg-white rounded-3">
          <label for="exampleInputPassword1" class="form-label">
            Content
          </label>
          <input
            type="text"
            hidden
            onChange={(e)=>(e.target.value)}
            class="form-control"
            id="exampleInputPassword1"
            value={content}
            
          />
          <div className="editor">
            <TextEditor
              onEditorStateChange={onEditorStateChange}
              editorState={editorState}
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Thumbnail
          </label>
          <img src={dthumbnail} className="my-2" style={{ 'height': "10em" }} />
          <input type="file"
            onChange={onThumbnailChange} class="form-control" id="exampleInputPassword1" accept="image/*" />

        </div>
        <hr />
        <p>Category</p>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            defaultChecked={props.newsitem.isSports}
            onChange={()=>{setIsSports(!isSports)}}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Sports
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked1"
            defaultChecked={props.newsitem.isBusiness}
            onChange={()=>{setIsBusiness(!isBusiness)}}
          />
          <label class="form-check-label" for="flexCheckChecked1">
            Business
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            defaultChecked={props.newsitem.isNational}
            onChange={()=>{setIsNational(!isNational)}}
            id="flexCheckChecked2"
          />
          <label class="form-check-label" for="flexCheckChecked2">
            National
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked3"
            defaultChecked={props.newsitem.isInternational}
            onChange={()=>{setIsInternational(!isInternational)}}
          />
          <label class="form-check-label" for="flexCheckChecked3">
            International
          </label>
        </div><hr/>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked3"
            defaultChecked={props.newsitem.isBreaking}
            onChange={()=>{setIsBreaking(!isBreaking)}}
          />
          <label class="form-check-label" for="flexCheckChecked3">
            Breaking
          </label>
        </div>
        <hr />

       
      </form></div>





            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success btn-sm "
                data-bs-dismiss="modal"
                onClick={updateNews}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsItem;
