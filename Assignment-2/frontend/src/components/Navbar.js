import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    const rend4 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") != 'none'){
        return (
                 <div className="Navbar">
                 <font color="white">LOGGED IN AS : {sessionStorage.getItem("LoggedInUser")} ( {sessionStorage.getItem("Typev")} ) </font>
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
      if(sessionStorage.getItem("LoggedInUser") == 'none'){
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
      if(sessionStorage.getItem("LoggedInUser") != 'none' && sessionStorage.getItem("Typev") != "Customer"){
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
    const rend2 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") == 'none'){
        return (
                <li className="nav-item">
                    <Link className="nav-link" to="/addr">Register
                    </Link>               
                </li>
          );
      } else{
        return ;
      }
    }
    const rend3 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") == 'none' || sessionStorage.getItem("Typev") == "Customer"){
        return (
                <li className="nav-item">
                    <Link className="nav-link" to="/store">Store
                    </Link>               
                </li>
          );
      } else{
        return ;
      }
    }
    const rend6 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") != 'none' && sessionStorage.getItem("Typev") == "Vendor"){
        return (
                <li className="nav-item">
                    <Link className="nav-link" to="/dispatch">Dispatch
                    </Link>               
                </li>
          );
      } else{
        return ;
      }
    }
    const rend7 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") != 'none'){
        return (
                <li className="nav-item">
                    <Link className="nav-link" to="/il">View Items</Link>               
                </li>
          );
      } else{
        return ;
      }
    }
    const rend8 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") != 'none' && sessionStorage.getItem("Typev") == "Vendor"){
        return (
                <li className="nav-item">
                    <Link className="nav-link" to="/dispatched">Dispatched</Link>               
                </li>
          );
      } else{
        return ;
      }
    }
    return (
    <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">DoltKart</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                {rend2()}
                {rend1()}
                {rend5()}
                {rend6()}
                {rend7()}
                {rend3()}
                {rend8()}
                </ul>
                {rend4()}
            </div>
        </nav>
    </div>
    )
  }
}
export default Navbar;
