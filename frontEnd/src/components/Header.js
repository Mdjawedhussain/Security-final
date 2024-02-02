import { Link, useNavigate } from "react-router-dom";
import SearchForm from "./Search/SearchForm";
import './header.css';

const Header = () => {
  const navigate = useNavigate();

  const urlChange=(topic)=>{
    window.location.replace('/category/'+topic)
  }


  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };
  var nav;
  if (localStorage.getItem("token")) {
    if (localStorage.getItem("admin")) {
      var nav = (
        <nav
        style={{ position: "sticky" }}
        class="navbar navbar-expand-lg navbar-dark bg-info shadow-sm "
      >
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            <i class="fa-brands fa-old-republic"></i> Easy Admin
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav  mx-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link"
                  aria-current="page"
           
                  onClick={()=>{urlChange('national')}}
                >
                  National
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  onClick={()=>{urlChange('international')}}>
                  International
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  onClick={()=>{urlChange('sports')}}>
                  Sports
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  onClick={()=>{urlChange('business')}}>
                  Business
                </a>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <li class="nav-item dropdown">
        <Link class="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </Link>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><Link class="dropdown-item" to="/">Action</Link></li>
          <li><Link class="dropdown-item" to="/">Another action</Link></li>
          <li><hr class="dropdown-divider"/></li>
          <li><Link class="dropdown-item" to="/">Something else here</Link></li>
        </ul>
      </li> */}
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/addnews">
                  {" "}
                  <i class="fa fa-plus"></i> Add News
                </Link>
                
              </li>
              <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/admin">
                  {" "}
                  News List
                </Link>
                
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link "
                  onClick={logout}
                  aria-current="page"
                  to="/"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        
      );
    } else {
      var nav = (
        <>
        <nav
          style={{ position: "sticky" }}
          class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm "
        >
          <div class="container-fluid">
            <Link class="navbar-brand" to="/">
              <i class="fa-brands fa-old-republic"></i> Easy News
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav  mx-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link"
                  aria-current="page"
           
                  onClick={()=>{urlChange('national')}}
                >
                  National
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  onClick={()=>{urlChange('international')}}>
                  International
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  onClick={()=>{urlChange('sports')}}>
                  Sports
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  onClick={()=>{urlChange('business')}}>
                  Business
                </a>
              </li>
              
              </ul>
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                
        <li class="nav-item">
                <SearchForm/>
                
              </li>
                
                <li class="nav-item dropdown">
          <Link class="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-user-circle"></i> {localStorage.getItem('username')}
          </Link>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li >
                  <Link class="dropdown-item" aria-current="page" to="/savelater">
                    {" "}
                    <i class="fa-regular fa-clock"></i> Savings
                  </Link>
                </li>
            <li><hr class="dropdown-divider"/></li>
            <li><Link
                    class="dropdown-item "
                    onClick={logout}
                    aria-current="page"
                    to="/"
                  >
                    Logout
                  </Link></li>
          </ul>
        </li>
                
              </ul>
            </div>
          </div>
        </nav>
          
        </>
      );
    }
  } else {
    var nav = (
      <nav
      style={{ position: "sticky" }}
      class="navbar navbar-expand-lg navbar-dark bg-info shadow-sm "
    >
      <div class="container-fluid">
        <Link class="navbar-brand" to="/login">
          <i class="fa-brands fa-old-republic"></i> Easy News
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
           
            
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/register">
                {" "}
               Sign Up
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/login">
                {" "}
               Login
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
    );
  }
  return <div className="container">{nav}</div>;
};

export default Header;
