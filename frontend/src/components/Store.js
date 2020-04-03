import FuzzySearch from 'fuzzy-search';
import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
var varr = require("./Variables")

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          users: [],
          users2: [],
          rr: [],
          lik: "pricesort(asc)"
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.check = this.check.bind(this);
        this.subm = this.subm.bind(this);
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
            this.setState({ users2: tmp })
        });
        axios.get('http://localhost:4000/api/userr')
        .then(res => {
            this.setState({ rr: res.data })
        });
    }

    handleNameChange(e) {
        if(e.target.value=='')
        {
            console.log("EMpty");
            this.setState({users: this.state.users2});
        }
        else
        {
            var searcher = new FuzzySearch(this.state.users2, ['name','owner'], {
              caseSensitive: false,
            });
            var result = searcher.search(e.target.value);
            this.setState({users: result});
        }
  	}

  	check(e) {
	    this.setState({lik: e.target.value});
  	}

    subm(e) {
        var tmp = this.state.users;
        if(this.state.lik == 'pricesort(asc)')
            tmp.sort(function(a,b){
                if(Number(a.price)>Number(b.price))
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
            });
        if(this.state.lik == 'pricesort(desc)')
            tmp.sort(function(a,b){
                if(Number(a.price)<Number(b.price))
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
            });
        if(this.state.lik == 'quantitysort(asc)')
            tmp.sort(function(a,b){
                if(Number(a.qty)>Number(b.qty))
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
            });
        if(this.state.lik == 'quantitysort(desc)')
            tmp.sort(function(a,b){
                if(Number(a.qty)<Number(b.qty))
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
            });
        if(this.state.lik == 'ratingsort(asc)')
            tmp.sort(function(a,b){
                if(Number(a.rating)>Number(b.rating))
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
            });
        if(this.state.lik == 'ratingsort(desc)')
            tmp.sort(function(a,b){
                if(Number(a.rating)<Number(b.rating))
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
            });
        this.setState({users: tmp});
    }

    render() {

        var data = this.state.users;

        const func = (x)=>{
            var lol = Number(x.qty) - Number(x.ordered);
            return (lol);
        }

        const rend1 = (user)=>{
            if(sessionStorage.getItem("LoggedInUser") != "none")
            return (
                    <Link to={"storeitem/"+user._id}>
                        <button className="btn btn-outline-dark btn-sm">Order</button>
                    </Link>
                );
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
	            <div className="col-sm-12">
	                <input type="text" className="form-control" onChange={this.handleNameChange} name="search" value={this.state.val}/>
	            </div>
	        </div>
            <select id="sort" onChange={this.check}>
              <option value="pricesort(asc)">Price ↑</option>
			  <option value="pricesort(desc)">Price ↓</option>
              <option value="quantitysort(asc)">Quantity ↑</option>
			  <option value="quantitysort(desc)">Quantity ↓</option>
              <option value="ratingsort(asc)">Rating ↑</option>
			  <option value="ratingsort(desc)">Rating ↓</option>
			</select>
            <button onClick={this.subm} className="btn btn-outline-dark btn-sm">Submit</button>
            <br/>
            <br/>
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
                                                <img className="img-thumbnail" style={{marginBottom: "10px"}} src={user.image} alt="user"/><br/>
                                                {rend1(user)}
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