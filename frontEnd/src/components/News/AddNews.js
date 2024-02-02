import React, { useState } from "react";
import axios from "axios";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import TextEditor from "../TextEditor";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'

function AddNews() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const[isNational, setIsNational]=useState(false)
  const[isInternational, setIsInternational]=useState(false)
  const[isSports, setIsSports]=useState(false)
  const[isBreaking, setIsBreaking]=useState(false)
  const[isBusiness, setIsBusiness]=useState(false)

  // editorstate
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setContent(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
      )

  };


  


  // form submit
  const submit = (e) => {
    e.preventDefault();
    
   
      console.log(content)


    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }

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
    console.log(title, thumbnail,isBreaking, isBusiness,isInternational,isNational,isSports);

    axios.post("http://localhost:3000/news/insert", fdata, config).then((res) => {
      console.log(res.data)
        if (res.data.success) {
          toast.success("News added!");
          navigate('/admin')
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
    <div className="shadow-sm bg-white my-2 p-3">
    <h4 className="text-center fw-light">Add News</h4>
    </div>

    <div className="shadow-sm bg-white my-3 p-4 pt-5">
    
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
            class="form-control"
            id="exampleInputPassword1"
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            // onChange={onContentChange}
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
          <input type="file"
            onChange={(e)=>{setThumbnail(e.target.files[0])}} class="form-control" id="exampleInputPassword1" accept="image/*" />
        </div>
        <hr />
        <p>Category</p>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked={isSports}
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
            checked={isBusiness}
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
            checked={isNational}
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
            checked={isInternational}
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
            checked={isBreaking}
            onChange={()=>{setIsBreaking(!isBreaking)}}
          />
          <label class="form-check-label" for="flexCheckChecked3">
            Breaking
          </label>
        </div>
        <hr />

        <button type="submit" onClick={submit} class="btn btn-danger btn-sm">
          Add
        </button>
      </form>
      
    </div>
    </>
  );
}

export default AddNews;
