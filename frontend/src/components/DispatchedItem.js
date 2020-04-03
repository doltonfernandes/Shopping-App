import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class DispatchedItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: {},
      redirect: false
    }
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
      axios.get(`http://localhost:4000/api/product/${this.props.match.params.id}`)
      .then(res => {
        console.log(res)
          this.setState({ user: res.data })
      });
  }

  deleteUser(event) {
    event.preventDefault();
    console.log(this.state.user._id)
      axios.get(`http://localhost:4000/api/order/`)
      .then(res => {
        console.log(res.data)
        console.log(this.state.user)
        for(var i=0;i<res.data.length;i++)
        {
        	if(res.data[i].id_of_prod == this.state.user._id)
        	{
	            var userUpdate = res.data[i];
	            userUpdate.status = "Canceled";
	          	axios.post(`http://localhost:4000/api/order/update/${res.data[i]._id}`, userUpdate)
  			    .then(res1 => { 
  			        console.log(res1);
  			    })
        	}
        }
        this.state.user.status = "Canceled";
        axios.post(`http://localhost:4000/api/product/update/${this.state.user._id}`, this.state.user)
	    .then(res1 => { 
	        console.log(res1);
	    })
        this.setState({ redirect: this.state.redirect === false });
      });
  }

  render() {

    const rend1 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") != 'none'){
        return (
               <p className="card-text">Name : {this.state.user.name}</p>
          );
      } else{
        return ;
      }
    }

    const rend2 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") != 'none'){
        return (
                 <p className="card-text">Qty : {this.state.user.qty}</p>
          );
      } else{
        return ;
      }
    }

    const rend3 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") != 'none' && sessionStorage.getItem("Typev") == "Vendor"){
        return (
                    <p className="card-text">Price : {this.state.user.price}</p>
          );
      } else{
        return ;
      }
    }

    const rend4 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") != 'none' && sessionStorage.getItem("Typev") == "Vendor"){
        return (
                    <p className="card-text">Ordered : {this.state.user.ordered}</p>
          );
      } else{
        return ;
      }
    }

    const rend5 = ()=>{
      if(sessionStorage.getItem("LoggedInUser") != 'none'){
        return (
                    <p className="card-text">Status : {this.state.user.status}</p>
          );
      } else{
        return ;
      }
    }

    return (
      <div className="container" style={{marginTop: "50px"}}>
        <div className="card text-left">
          <div className="card-header">Name : {this.state.user.name}</div>
              <div className="card-body"> 
                <div className="row">
                  <div className="col-lg-3">
                  <img className="img-thumbnail" style={{marginBottom: "10px"}} src={this.state.user.image} alt="user"/><br/>                                            
                  </div>
                  <div className="col-lg-9">
                    {rend1()}
                    {rend2()}
                    {rend3()}
                    {rend4()}
                    {rend5()}
                  </div>
                </div>                                        
                  <hr/>
                  <div className="row" style={{marginLeft: "0px"}}>
                    <form onSubmit={this.deleteUser}>
                      <button type="submit" className="btn btn-danger" style={{marginLeft: "10px"}}>Cancel</button>
                    </form>
                  </div> 
                
                  {this.state.redirect && (
                    <Redirect to={'./dispatched'}/>
                  )}

              </div>
          </div>
      </div>
    )
  }
}
export default DispatchedItem;