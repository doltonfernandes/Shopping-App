import React, { Component } from 'react'
import axios from 'axios';
import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';
var varr = require("./Variables")

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          users: []
        }
      }

    componentDidMount() {
        axios.get('http://localhost:4000/api/product')
        .then(res => {
            var tmparr = Array();
            for(var i=0;i<res.data.length;i++)
            {
                if(res.data[i].owner == varr.LoggedInUser)
                {
                    tmparr.push(res.data[i]);
                }
            }
            console.log(res.data);
            this.setState({ users: tmparr })
        });
    }
    
    render() {

        var data = this.state.users;

        return (
        <div className="users" style={{marginTop: "50px"}}>
            <div className="container"> 
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
                                                <Link to={"users/"+user._id}>
                                                    <button className="btn btn-outline-dark btn-sm">View Item</button>
                                                </Link>
                                            </div>   
                                            <div className="col-lg-9">
                                                <ul className="list-group">
                                                    <li className="list-group-item"><b>Name </b>: {user.name}</li>
                                                    <li className="list-group-item"><b>Quantity </b>: {user.qty}</li>
                                                    <li className="list-group-item"><b>Price </b>: {user.price}</li>
                                                </ul>
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
export default Items;

