import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var varr = require("./Variables")

class Navbar extends Component {
  render() {
    const rend2 = ()=>{
      if(varr.LoggedInUser != 'none'){
        return (
                <li className="nav-item">
                    <Link className="nav-link" to="/users">users
                    </Link>               
                </li>
                );
      } else{
        return ;
      }
    }
    const rend3 = ()=>{
      if(varr.LoggedInUser != 'none'){
        return (
                <li className="nav-item">
                    <Link className="nav-link" to="/add">Add user
                    </Link>               
                </li>
                );
      } else{
        return ;
      }
    }
    const rend4 = ()=>{
      if(varr.LoggedInUser != 'none'){
        return (
                 <div className="Navbar">
                 <font color="white">LOGGED IN AS : {varr.LoggedInUser} </font>
                <form action="/" class="btn btn-default">
                    <input type="submit" value="Logout" />
                </form>
                 </div>
                );
      } else{
        return ;
      }
    }
    const rend1 = ()=>{
      if(varr.LoggedInUser == 'none'){
        return (
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login
                    </Link>               
                </li>
                );
      } else{
        return ;
      }
    }
    const rend5 = ()=>{
      if(varr.LoggedInUser != 'none'){
        return (
                <li className="nav-item">
                    <Link className="nav-link" to="/additem">Add Item
                    </Link>               
                </li>
                );
      } else{
        return ;
      }
    }
    return (
    <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">GeorgeMato</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/addr">Register
                    </Link>               
                </li>
                {rend1()}
                {rend2()}
                {rend3()}
                {rend5()}
                <li className="nav-item">
                    <Link className="nav-link" to="/il">View Items</Link>               
                </li>
                </ul>
                {rend4()}
            </div>
        </nav>
    </div>
    )
  }
}
export default Navbar;
