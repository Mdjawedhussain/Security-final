import { Route, Routes } from "react-router-dom";
import AdminHome from "./Admin/AdminHome";
import Breaking from "./Breaking";
import Category from "./Category/Category";
import Home from "./Home";
import International from "./International";
import Login from "./Login";
import National from "./National";
import AddNews from "./News/AddNews";
import Readmore from "./Readmore";
import Register from "./Register";
import SaveLater from "./SaveLater/SaveLater";
import Search from "./Search/Search";

const Container = () => {
  return (
    <div class="container">
      <div className="row"></div>
      <Routes >
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/international" element={<International />}></Route>
        <Route path="/national" element={<National />}></Route>
        <Route path="/breaking" element={<Breaking />}></Route>
        <Route path="/savelater" element={<SaveLater />}></Route>
        <Route path="/category/:category" element={<Category />}></Route>

        <Route path="/readmore/:nid" element={<Readmore />}></Route>
        <Route path="/search/:query" element={<Search />}></Route>




         
        <Route path="/admin" element={<AdminHome />}></Route>
        <Route path="/addnews" element={<AddNews />}></Route>
      </Routes>
    </div>
  );
};

export default Container;
