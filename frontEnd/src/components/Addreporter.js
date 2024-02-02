
import axios from "axios";
import { useState } from "react";


const Addreporter=()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');  
    const [message, setMessage] = useState('');
    const [rimage, setRimage] = useState('');


    const addReporter123=(e)=>{
        e.preventDefault();
        const config= {
            headers :{
                Authorization : 'Bearer '+localStorage.getItem('tok')
            }
        }
      
       

        const rdata = new FormData();

        rdata.append('username', username);
        rdata.append('password', password);
        rdata.append('phone', phone);
        rdata.append('address', address);
        rdata.append('repo_image', rimage);


        axios.post("http://localhost:3000/reporter/add", rdata, config)
        .then(result12=>{
            
            if(result12.data.success){
                    setMessage("Reporter Added succsessfullly!!");
            }
        })
        .catch(e=>{
            console.log(e)
          });
    };
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"> 
                    <h2 className="custom-heading-h2">ADD REPORTER</h2>
                   
                    <p>{message}</p>
                    <form>
                        <div className="form-group">
                            <label>Reporter Username</label>
                            <input type="text" className="form-control"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Reporter Address</label>
                            <input type="text" className="form-control"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Reporter password</label>
                            <textarea type="text" className="form-control"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            
                            />
                        </div>

                        <div className="form-group">
                            <label>Reporter phone</label>
                            <input type="text" className="form-control"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                          <label>Reporter Image</label>
                          <input type="file" className="form-control"
                          onChange={e=>{setRimage(e.target.files[0])}}
                          />
                      </div>

                        <input type="submit" className="btn btn-dark" 
                        onClick={addReporter123}
                        />
                    </form>
                </div>
                <div className="col-md-4">
               
                </div>
            </div>
        </div>
    )
}

export default Addreporter;