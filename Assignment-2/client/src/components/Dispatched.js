import React, { Component } from 'react'
import axios from 'axios';
import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';
var varr = require("./Variables")

class Dispatched extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          users: []
        }
      }

    componentDidMount() {
        if(varr.Typev == "Vendor")
        {
            axios.get('http://localhost:4000/api/product')
            .then(res => {
                var tmparr = Array();
                for(var i=0;i<res.data.length;i++)
                {
                    if(res.data[i].owner == varr.LoggedInUser && res.data[i].status == "Dispatched")
                    {
                        tmparr.push(res.data[i]);
                    }
                }
                console.log(res.data);
                this.setState({ users: tmparr })
            });
        }
        if(varr.Typev == "Customer")
        {
            axios.get('http://localhost:4000/api/order')
            .then(res => {
                var tmparr = Array();
                for(var i=0;i<res.data.length;i++)
                {
                    if(res.data[i].name_of_customer == varr.LoggedInUser)
                    {
                        tmparr.push(res.data[i]);
                    }
                }
                console.log(res.data);
                this.setState({ users: tmparr })
            });
        }
    }
    
    render() {

        var data = this.state.users;

        const rend1 = (user)=>{
              if(varr.Typev == 'Vendor' && user.status == "Dispatched"){
                return (
                        <ul className="list-group">
                            <li className="list-group-item"><b>Name </b>: {user.name}</li>
                            <li className="list-group-item"><b>Quantity </b>: {user.qty}</li>
                            <li className="list-group-item"><b>Price </b>: {user.price}</li>
                        </ul>
                        );
              } else{
                    if(varr.Typev == 'Customer'){
                        return (
                                <ul className="list-group">
                                    <li className="list-group-item"><b>Name </b>: {user.name}</li>
                                    <li className="list-group-item"><b>Quantity </b>: {user.qty}</li>
                                    <li className="list-group-item"><b>Price </b>: {user.price}</li>
                                    <li className="list-group-item"><b>Status </b>: {user.status}</li>
                                </ul>
                                );
                      }
              }
            }

        const rend2 = (user)=>{
          if(varr.Typev == 'Vendor'){
            return (
                    <button className="btn btn-outline-dark btn-sm">View Item</button>
                    );
          } else{
                if(varr.Typev == 'Customer'){
                    return (
                    <button className="btn btn-outline-dark btn-sm">Delete</button>);
                  }
          }
        }

        return (
        <div className="users" style={{marginTop: "50px"}}>
            <div className="container"> 
            <h2>Dispatched</h2>
            <div className="row">
                {data.length > 0 ? 
                    data.map((user, i) => {                        
                        return (
                            <div className="col-lg-6" key={user._id.toString()}>
                                <div className="card" style={{ marginBottom: "20px"}}>
                                    <div className="card-header text-left">{user.name}</div>
                                    <div className="card-body text-left">
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <img className="img-thumbnail" style={{marginBottom: "10px"}} src={userImg} alt="user"/><br/>
                                                <Link to={"dispatched/"+user._id}>
                                                {rend2()}
                                                </Link>
                                            </div>   
                                            <div className="col-lg-9">
                                                {rend1(user)}
                                            </div>      
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                        )}                       
                    ) : null}                                           
                </div>
            </div>
        </div>
        );
    }
}
export default Dispatched;

