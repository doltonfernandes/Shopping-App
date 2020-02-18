import React, { Component } from 'react'
import axios from 'axios';
import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';
var varr = require("./Variables")

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          users: [],
          val: "",
          rr: [],
          lik: "pricesort"
        }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.check = this.check.bind(this);
      }

    componentDidMount() {
        axios.get('http://localhost:4000/api/product')
        .then(res => {
            console.log(res.data);
            var tmp = Array();
            for(var i=0;i<res.data.length;i++)
            {
                if(res.data[i].status == "Available")
                {
                    tmp.push(res.data[i]);
                }
            }
            this.setState({ users: tmp })
        });
        axios.get('http://localhost:4000/api/userr')
        .then(res => {
            this.setState({ rr: res.data })
        });
    }

    handleNameChange(e) {
    	console.log(this.state.users);
	    this.setState({val: e.target.value});
  	}

  	check(e) {
	    this.setState({lik: e.target.value});
  	}
    
    render() {

        var data = this.state.users;

        const func = (x)=>{
            var lol = Number(x.qty) - Number(x.ordered);
            return (lol);
        }

        const func1 = (x)=>{
            if(this.state.rr.length == 0)
            {
                return (0);
            }
            var i = 0;
            for(i=0;i<this.state.rr.length;i++)
            {
                if(this.state.rr[i].name == x.owner)
                {
                    i = this.state.rr[i].rating.split(":")[0];
                    break
                }
            }
            return (Number(i).toFixed(2));
        }

        return (
        <div className="users" style={{marginTop: "50px"}}>
            <div className="container"> 
            <h2>Store</h2>
            <div className="form-group row">
	            <div className="col-sm-10">
	                <input type="text" className="form-control" onChange={this.handleNameChange} name="search" value={this.state.val}/>
	            </div>
    	        <Link to={"store/"+this.state.val}>
                    <button className="btn btn-outline-dark btn-sm">Search</button>
                </Link>
	        </div>
            <select id="sort" onChange={this.check}>
			  <option value="pricesort">Price</option>
			  <option value="quantitysort">Quantity</option>
			  <option value="ratingsort">Rating</option>
			</select>
			<Link to={"store/"+this.state.lik}>
                <button className="btn btn-outline-dark btn-sm">Submit</button>
            </Link>
            {"\n\n".split('\n').map(function(item, key) {
              return (
                <span key={key}>
                  {item}
                  <br/>
                </span>
              )
            })}
            <div id="divv1" className="row">
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
                                                <Link to={"storeitem/"+user._id}>
                                                    <button className="btn btn-outline-dark btn-sm">Order</button>
                                                </Link>
                                            </div>   
                                            <div className="col-lg-9">
                                                <ul className="list-group">
                                                    <li className="list-group-item"><b>Name </b>: {user.name}</li>
                                                    <li className="list-group-item"><b>Quantity </b>: {func(user)}</li>
                                                    <li className="list-group-item"><b>Price </b>: {user.price}</li>
                                                    <li className="list-group-item"><b>Rating </b>: {func1(user)}</li>
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
export default Store;