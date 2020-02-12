import React, { Component } from 'react'
import axios from 'axios';
import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class Item extends Component {
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
    axios.post(`http://localhost:4000/api/product/delete/${this.state.user._id}`)
      .then(res => {
        console.log(res)
          this.setState({ redirect: this.state.redirect === false })
      });
  }

  render() {
    return (
      <div className="container" style={{marginTop: "50px"}}>
        <div className="card text-left">
          <div className="card-header">Name : {this.state.user.name}</div>
              <div className="card-body"> 
                <div className="row">
                  <div className="col-lg-3">
                  <img className="img-thumbnail" style={{marginBottom: "10px"}} src={userImg} alt="user"/><br/>                                            
                  </div>
                  <div className="col-lg-9">
                    <p className="card-text">Name : {this.state.user.name}</p>                 
                    <p className="card-text">Qty : {this.state.user.qty}</p>
                    <p className="card-text">Price : {this.state.user.price}</p>
                    <p className="card-text">Ordered : {this.state.user.ordered}</p>
                    <p className="card-text">Status : {this.state.user.status}</p>
                  </div>
                </div>                                        
                  <hr/>
                  <div className="row" style={{marginLeft: "0px"}}>
                    <Link to={this.state.user._id+"/edit"}>
                      <button className="btn btn-primary">Edit user</button>
                    </Link>                  
                    <form onSubmit={this.deleteUser}>
                      <button type="submit" className="btn btn-danger" style={{marginLeft: "10px"}}>Delete</button>
                    </form>
                  </div> 
                
                  {this.state.redirect && (
                    <Redirect to={'/il'}/>
                  )}

              </div>
          </div>
      </div>
    )
  }
}
export default Item;