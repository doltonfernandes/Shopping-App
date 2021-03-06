import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dispatch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          users: []
        }
      }

    componentDidMount() {
        if(sessionStorage.getItem("Typev") == "Vendor")
        {
            axios.get('http://localhost:4000/api/product')
            .then(res => {
                var tmparr = Array();
                for(var i=0;i<res.data.length;i++)
                {
                    if(res.data[i].owner == sessionStorage.getItem("LoggedInUser") && res.data[i].status == "Ready_To_Dispatch")
                    {
                        tmparr.push(res.data[i]);
                    }
                }
                console.log(res.data);
                this.setState({ users: tmparr })
            });
        }
        if(sessionStorage.getItem("Typev") == "Customer")
        {
            axios.get('http://localhost:4000/api/order')
            .then(res => {
                var tmparr = Array();
                for(var i=0;i<res.data.length;i++)
                {
                    if(res.data[i].name_of_customer == sessionStorage.getItem("LoggedInUser"))
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
              if(sessionStorage.getItem("Typev") == 'Vendor' && user.status == "Ready_To_Dispatch"){
                return (
                        <ul className="list-group">
                            <li className="list-group-item"><b>Name </b>: {user.name}</li>
                            <li className="list-group-item"><b>Quantity </b>: {user.qty}</li>
                            <li className="list-group-item"><b>Price </b>: {user.price}</li>
                        </ul>
                        );
              } else{
                    if(sessionStorage.getItem("Typev") == 'Customer'){
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
          if(sessionStorage.getItem("Typev") == 'Vendor'){
            return (
                    <button className="btn btn-outline-dark btn-sm">View Item</button>
                    );
          } else{
                if(sessionStorage.getItem("Typev") == 'Customer'){
                    return (
                    <button className="btn btn-outline-dark btn-sm">Delete</button>);
                  }
          }
        }

        return (
        <div className="users" style={{marginTop: "50px"}}>
            <div className="container"> 
            <h2>Dispatch</h2>
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
                                                <img className="img-thumbnail" style={{marginBottom: "10px"}} src={user.image} alt="user"/><br/>
                                                <Link to={"dispatch/"+user._id}>
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
export default Dispatch;

