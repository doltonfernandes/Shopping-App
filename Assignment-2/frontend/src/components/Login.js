import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            password: "",
            redirect: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.addUser = this.addUser.bind(this);
      }
    
      handleNameChange(e) {
        this.setState({name: e.target.value})
      }

      handlePasswordChange(e) {
        this.setState({password: e.target.value})
      }
      
      addUser(event) {
        event.preventDefault();
        const userAdd = {
            name: this.state.name,
            password: this.state.password
        }
        console.log(userAdd)
        axios.get('http://localhost:4000/api/userr/', userAdd)
        .then(res => { 
            var tmpflag = 0
            var lol = "none";
            for(var i=0;i<res["data"].length;i++)
            {
            	if(res["data"][i]["name"] == userAdd["name"] && res["data"][i]["password"] == userAdd["password"])
            	{
            		tmpflag = 1;
                    lol = res["data"][i]["type"];
            		break;
            	}
            }
            if(tmpflag)
            {
                sessionStorage.setItem("LoggedInUser", userAdd["name"]);
                sessionStorage.setItem("Typev", lol);
            	console.log("Logged In");
           		this.setState({ redirect: this.state.redirect === false });
            }
            else
            {
                alert("Wrong username or password");
            	console.log("Wrong password or username")
            }
        })
        .catch(err => { console.log(err) });
      }
    
    render() {
        return (
            <div className="container" style={{marginTop: "50px"}}>
            <h2>Login Page</h2>
            <form onSubmit={this.addUser} method="user">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handleNameChange} name="name" value={this.state.name}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" onChange={this.handlePasswordChange} name="password" value={this.state.password}/>
                    </div>
                </div>
                <hr/>
                <div style={{marginLeft: "0px"}} className="row">
                    <button type="submit" className="btn btn-warning" style={{marginLeft: "0px"}}>Login</button>
                </div>
            </form>
	          {this.state.redirect && (
	                <Redirect to={'/il'}/>
	            )}
          </div>
        );
    }
}

export default LoginPage;