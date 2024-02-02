import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SearchForm() {

    const navigate = useNavigate();

    const[query, setQuery]=useState('');

    const searchSubmit=()=>{
        window.location.replace("/search/"+query)
  

    }


  return (
    <div class="d-flex">
      <input class="form-control me-2" value={query} onChange={(e)=>setQuery(e.target.value)}  type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-light btn-sm " onClick={searchSubmit} ><i className='fa fa-search'  ></i></button>
    </div>
  )
}

export default SearchForm