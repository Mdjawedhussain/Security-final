import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const customerLogin = (e) => {
    e.preventDefault(); // stop the default behaviour is refresh
    const cusData = {
      username,
      password,
    };
    axios
      .post("http://localhost:3000/customer/login", cusData)
      .then((result) => {
        if (result.data.token) {
          localStorage.clear();

          if (result.data.username === "admin") {
            alert(result.data.username);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("admin", true);
            localStorage.setItem("userid", result.data._id);
            localStorage.setItem("username", result.data.username);
            toast.success("Login Success as admin !!!!");
            window.location.replace("/admin");
          } else {
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("userid", result.data._id);
            localStorage.setItem("username", result.data.username);


            toast.success("Login Success as user !!!!");
            window.location.replace("/");
          }
        } else {
          ///invalid
          setMessage("Failed To login! try again");
          // alert("Invalid credentials! ")
          toast.error("Invalid credentials!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="container">
        <div className="col-lg-7 p-5 shadow-sm bg-white my-5 mx-auto">
          <div className="col-lg-7 mx-auto my-4">
            <h3 className="text-center">
              <i class="fa-brands fa-old-republic"></i> Easy News | Login{" "}
            </h3>
            <hr />
            <p className="text-center">Enter your username and password</p>
          </div>
          <div className="my-5">
            <div class="form-floating mb-3">
            <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Your Name"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
              <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating">
            <input
                      type="password"
                      class="form-control"
                      placeholder="Your Password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="col-lg-3 mx-auto my-4">
            <input
                    type="submit"
                    value="Log In"
                    class="btn col-lg-12 btn-info text-white"
                    onClick={customerLogin}
                  />
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default Login;
