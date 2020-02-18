import React, { Component } from 'react'
import axios from 'axios';
import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
var varr = require("./Variables")

class StoreItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: {},
      redirect: false
    }
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
      if(this.props.match.params.id.substring(0,4) == "rate")
      {
        axios.get(`http://localhost:4000/api/product/${this.props.match.params.id.substring(4,this.props.match.params.id.length)}`)
        .then(res => {
          console.log(res)
            axios.get(`http://localhost:4000/api/userr/`)
            .then(res1 => {
              console.log(res1)
                var tmp = null;
                for(var i=0;i<res1.data.length;i++)
                {
                  if(res1.data[i].name == res.data.owner && res1.data[i].type == "Vendor")
                  {
                    tmp = res1.data[i];
                    break;
                  }
                }
                console.log(tmp);
                this.setState({ user: tmp })
            });
        });
      }
      else
      {
        axios.get(`http://localhost:4000/api/product/${this.props.match.params.id}`)
        .then(res => {
          console.log(res)
            this.setState({ user: res.data })
        });
      }
  }

  deleteUser(event) {
    event.preventDefault();
    var tmp = document.getElementById('inp2');
    console.log(tmp.value);
    console.log(this.state.user._id);
    axios.get(`http://localhost:4000/api/product/${this.state.user._id}`)
      .then(res => {
            var tmp1 = Number(res.data.ordered);
            if(Number(res.data.qty) < tmp1 + Number(tmp.value))
            {
              console.log("Qty Limit Crossed");
            }
            else
            {
              tmp1 += Number(tmp.value);
              res.data.ordered = String(tmp1);
              axios.post(`http://localhost:4000/api/product/update/${this.state.user._id}`,res.data)
              .then(res1 => {});
	          this.setState({ redirect: this.state.redirect === false })
            }
          const userAdd = {
                id_of_prod: this.state.user._id,
                name: this.state.user.name,
                qty: tmp.value,
                status: "Waiting",
                name_of_customer: varr.LoggedInUser,
            }
        axios.post('http://localhost:4000/api/order/add', userAdd)
            .then(res1 => { 
                console.log(res1);
                this.setState({ redirect: this.state.redirect === false });
            })
            .catch(err => { console.log(err) });
      });
  }

  funcc(event) {
    event.preventDefault();
    var x = document.getElementById("ratingdrop").value;
    console.log(this.user.data);
  }

  render() {

    const rend1 = ()=>{
      if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) != "rate"){
        return (
                    <input id="inp2" type="text"></input>
          );
      } else{
        if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) == "rate"){
            return (
                    <select id="ratingdrop">
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
              );
          }
      }
    }

    const rend2 = ()=>{
      if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) != "rate"){
        return (
		        <form onSubmit={this.deleteUser}>
                  <button type="submit" className="btn btn-danger" style={{marginLeft: "10px"}}>Order</button>
                </form>
          );
      } else{
          if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) == "rate"){
            return (
			        <form onSubmit={this.funcc}>
                      <button type="submit" className="btn btn-danger" style={{marginLeft: "10px"}}>Submit</button>
			        </form>
              );
          }
      }
    }

		const func1 = (x)=>{
            var lol = String(x);
            lol = lol.split(":")[0];
            return (lol);
        }

    const rend3 = ()=>{
      if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) != "rate"){
        return (
                  <div className="col-lg-9">
                    <p className="card-text">Name : {this.state.user.name}</p>                 
                    <p className="card-text">Qty : {func(this.state.user)}</p>
                    <p className="card-text">Price : {this.state.user.price}</p>
                    <p className="card-text">Owner : {this.state.user.owner}</p>
                    <p className="card-text">Status : {this.state.user.status}</p>
                  </div>
          );
      } else{
            if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) == "rate"){
            return (
                      <div className="col-lg-9">
                        <p className="card-text">Name : {this.state.user.name}</p>                 
                        <p className="card-text">Rating : {func1(this.state.user.rating)}</p>
                      </div>
              );
          }
      }
    }

    const func = (x)=>{
            var lol = Number(x.qty) - Number(x.ordered);
            return (lol);
        }

    return (
      <div className="container" style={{marginTop: "50px"}}>
        <div className="card text-left">
          <div className="card-header">Name : {this.state.user.name}</div>
              <div className="card-body"> 
                <div className="row">
                  <div className="col-lg-3">
                  <img className="img-thumbnail" style={{marginBottom: "10px"}} src={userImg} alt="user"/><br/>                                            
                  </div>
                  {rend3()}
                </div>                                        
                  <hr/>
                  <div className="row" style={{marginLeft: "0px"}}>
                    {rend1()}
                    {rend2()}
                  </div> 
                
              </div>
          </div>
          {this.state.redirect && (
            <Redirect to={'/'}/>
          )}
      </div>
    )
  }
}
export default StoreItem;