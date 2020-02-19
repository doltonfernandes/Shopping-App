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
      rr: {},
      lol1: "1",
      redirect: false
    }
    this.deleteUser = this.deleteUser.bind(this);
    this.funcc = this.funcc.bind(this);
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
        axios.get(`http://localhost:4000/api/order/${this.props.match.params.ido}`)
        .then(res => {
          console.log(res)
            this.setState({ lol1: res.data.rated })
        });
      }
      else
      {
        axios.get(`http://localhost:4000/api/product/${this.props.match.params.id}`)
        .then(res => {
          console.log(res)
            this.setState({ user: res.data })
        });
        axios.get(`http://localhost:4000/api/userr`)
        .then(res => {
          console.log(res)
          	var i=0;
          	for(;i<res.data.length;i++)
          	{
          		if(res.data[i].name == this.state.user.owner)
          		{
		            this.setState({ rr: res.data[i] })
          			break;
          		}
          	}
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
                review: "",
                rated: -1,
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
	    var tmp = document.getElementById('ratingdrop');
	    var x1 = Number(this.state.user.rating.split(":")[0]) , x2 = Number(this.state.user.rating.split(":")[1]);
	    x1 = x1 * x2;
	    x2 += 1;
	    x1 += Number(String(tmp.value).split(":")[0]);
	    x1 /= x2;
	    x1 = String(x1) + ":" + String(x2);
	    this.state.user.rating = x1;
	    axios.post(`http://localhost:4000/api/userr/update/${this.state.user._id}`, this.state.user)
            .then(res1 => { 
                console.log(res1);
                this.setState({ redirect: this.state.redirect === false });
            })
            .catch(err => { console.log(err) });

        var tmpvar = document.getElementById("inp3");

        axios.get(`http://localhost:4000/api/order/${this.props.match.params.ido}`)
        .then(res => {
        		res.data.rated = String(tmp.value) + ":" + String(tmpvar.value);
	          axios.post(`http://localhost:4000/api/order/update/${this.props.match.params.ido}`, res.data)
	            .then(res1 => { 
	                console.log(res1);
	                this.setState({ redirect: this.state.redirect === false });
	            })
	            .catch(err => { console.log(err) });
        });
	  }

  render() {

    const rend1 = ()=>{
      if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) != "rate"){
        return (
                    <input id="inp2" type="text"></input>
          );
      } else{
        if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) == "rate" && this.state.lol1 == "-1"){
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

    const rend4 = ()=>{
        if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) == "rate" && this.state.lol1 == "-1"){
            return (
            	<div>
				<input type="text" className="form-control" name="Review" id="inp3"/>
				</div>
              );
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
          if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) == "rate" && this.state.lol1 == "-1"){
            return (
			        <form onSubmit={this.funcc}>
                      <button type="submit" className="btn btn-danger" style={{marginLeft: "10px"}}>Submit</button>
			        </form>
              );
          }
      }
    }

		const func1 = (x)=>{
			console.log(x);
            var lol = String(x.rating);
            lol = lol.split(":")[0];
            return (Number(lol).toFixed(2));
        }

        const func2 = (x)=>{
        	var x1 = this.state.rr.rating;
        	x1 = String(x1);
        	return (Number(x1.split(":")[0]).toFixed(2));
        }

    const rend3 = ()=>{
      if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) != "rate"){
        return (
                  <div className="col-lg-9">
                    <p className="card-text">Name : {this.state.user.name}</p>                 
                    <p className="card-text">Qty : {func(this.state.user)}</p>
                    <p className="card-text">Price : {this.state.user.price}</p>
                    <p className="card-text">Rating : {func2(this.state.user)}</p>
                    <p className="card-text">Owner : {this.state.user.owner}</p>
                    <p className="card-text">Status : {this.state.user.status}</p>
                  </div>
          );
      } else{
            if(varr.LoggedInUser != 'none' && this.props.match.params.id.substring(0,4) == "rate"){
            return (
                      <div className="col-lg-9">
                        <p className="card-text">Name : {this.state.user.name}</p>                 
                        <p className="card-text">Rating : {func1(this.state.user)}</p>
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
                    {rend4()}
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