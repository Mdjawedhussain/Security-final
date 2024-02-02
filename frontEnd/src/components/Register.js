import axios from "axios";
import { useState } from "react";
           
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';



const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate()
  const [toastShown, setToastShown] = useState(false);


  // const passwordValidate = (e) => {
  //   e.preventDefault();
  //   // Check if the password is at least 7 characters long
  //   if (password.length < 7) {
  //     toast.error("Password must be more than 6 characters.");
  //     setPassword(e.target.value)
  //     return; // Prevent the form from being submitted
  //   }
    
  //   // Rest of your code for submission...
  // };
  const passwordValidate = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (inputPassword.length < 7) {
      if (!toastShown) {
        toast.error("Password must be more than 6 characters.");
        setToastShown(true); // Set the flag so the toast won't show again
      }
    } else {
      setToastShown(false); // Reset the flag when the error is corrected
    }
  };

  const customerRegister = (e) => {
    e.preventDefault(); // stop the default behaviour is refresh
    const cusData = {
      username,
      email,
      password,
      phone,
      address,
    };
    axios
      .post("http://localhost:3000/customer/register", cusData)
      .then((result) => {
        console.log(result.data)
        if (result.data.success) {
          //register successful
          
          toast.success("Registration Success .");
          navigate("/login");


        } else {
          //not register
          toast.error("Sorry! Something is wrong.");
        }
      })
      .catch();
  };
  return (
    <>
      <div className="container">
        <div className="col-lg-7 p-5 shadow-sm bg-white my-5 mx-auto">
          <div className="col-lg-7 mx-auto my-4">
            <h3 className="text-center">
              <i class="fa-brands fa-old-republic"></i> Easy News | Sign Up{" "}
            </h3>
            <hr />
            <p className="text-center">Enter your details to register.</p>
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

            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Your Password"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating mb-3">
            <input
                      type="text"
                      class="form-control"
                      placeholder="Your Address"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
              <label for="floatingInput">Address</label>
            </div>
            <div class="form-floating mb-3">
            <input
                      type="number"
                      class="form-control"
                      placeholder="Your Phone"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
              <label for="floatingInput">Contact</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                placeholder="Your Password"
                id="password"
                value={password}
                // onChange={(e) => setPassword(e.target.value)}
                onChange={passwordValidate}
                // onClick={passwordValidate}
                // onFocus={passwordValidate}
                onKeyDown={passwordValidate}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="col-lg-3 mx-auto my-4">
              <input
                type="submit"
                value="Sign Up"
                class="btn col-lg-12 btn-info text-white"
                onClick={customerRegister}
                
              />
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Register;
