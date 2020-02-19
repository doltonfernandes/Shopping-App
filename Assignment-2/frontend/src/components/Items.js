import React, { Component } from 'react'
import axios from 'axios';
import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';

class Dispatch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          users: []
        }
      }

    componentDidMount() {
        axios.get('http://localhost:4000/api/product')
            .then(res => {
                for(var i=0;i<res.data.length;i++)
                {
                    if(res.data[i].ordered == res.data[i].qty && res.data[i].status == "Available")
                    {
                        console.log(res.data[i].name);
                        res.data[i].status = "Ready_To_Dispatch"
                        axios.post(`http://localhost:4000/api/product/update/${res.data[i]._id}`, res.data[i])
                        .then(res1 => { 
                            console.log(res1);
                        })
                        var tmp = res.data[i]._id;
                        axios.get('http://localhost:4000/api/order')
                        .then(res1 => {
                            for(var j=0;j<res1.data.length;j++)
                            {
                                if(res1.data[j].id_of_prod == tmp && res1.data[j].status != "Canceled")
                                {
                                    res1.data[j].status = "Placed";
                                    axios.post(`http://localhost:4000/api/order/update/${res1.data[j]._id}`, res1.data[j])
                                    .then(res2 => { 
                                        console.log(res2);
                                    })
                                }
                            }
                        });
                    }
                    else
                    {
                    	if(res.data[i].ordered != res.data[i].qty && res.data[i].status == "Ready_To_Dispatch")
	                    {
	                        console.log(res.data[i].name);
	                        res.data[i].status = "Available"
	                        axios.post(`http://localhost:4000/api/product/update/${res.data[i]._id}`, res.data[i])
	                        .then(res1 => { 
	                            console.log(res1);
	                        })
	                        var tmp = res.data[i]._id;
	                        axios.get('http://localhost:4000/api/order')
	                        .then(res1 => {
	                            for(var j=0;j<res1.data.length;j++)
	                            {
	                                if(res1.data[j].id_of_prod == tmp && res1.data[j].status != "Canceled")
	                                {
	                                    res1.data[j].status = "Waiting";
	                                    axios.post(`http://localhost:4000/api/order/update/${res1.data[j]._id}`, res1.data[j])
	                                    .then(res2 => { 
	                                        console.log(res2);
	                                    })
	                                }
	                            }
	                        });
	                    }
                    }
                }
            });
        if(sessionStorage.getItem("Typev") == "Vendor")
        {
            axios.get('http://localhost:4000/api/product')
            .then(res => {
                var tmparr = Array();
                for(var i=0;i<res.data.length;i++)
                {
                    if(res.data[i].owner == sessionStorage.getItem("LoggedInUser") && res.data[i].status != "Ready_To_Dispatch" && res.data[i].status != "Dispatched")
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
              if(sessionStorage.getItem("Typev") == 'Vendor' && user.status != "Ready_To_Dispatch" && user.status != "Dispatched"){
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
                                    <li className="list-group-item"><b>Status </b>: {user.status}</li>
                                </ul>
                                );
                      }
              }
            }

        const rend2 = (user)=>{
          if(sessionStorage.getItem("Typev") == 'Vendor'){
            return (
		            <Link to={"product/"+user._id}>
                    <button className="btn btn-outline-dark btn-sm">View Item</button>
                    </Link>
                    );
          } else{
                if(sessionStorage.getItem("Typev") == 'Customer' && user.status == "Dispatched")
                {
                	return (
		            <Link to={"storeitem/rate"+user.id_of_prod+"/"+user._id}>
                    <button className="btn btn-outline-dark btn-sm">Rate Vendor</button>
                    </Link>
                    );
                }
                else
                if(sessionStorage.getItem("Typev") == 'Customer' && user.status != "Canceled"){
                    return (
		            <Link to={"deleteorder/"+user._id}>
                    <button className="btn btn-outline-dark btn-sm">Cancel Order</button>
                    </Link>
                    );
                  }
          }
        }

        return (
        <div className="users" style={{marginTop: "50px"}}>
            <div className="container"> 
            <h2>Items</h2>
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
                                                {rend2(user)}
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

