import React, { Component } from 'react'
import axios from 'axios';
import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';
var varr = require("./Variables")

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          users: [],
          val: ""
        }
    this.handleNameChange = this.handleNameChange.bind(this);
      }

    componentDidMount() {
        if(this.props.match.params.id=="pricesort" || this.props.match.params.id=="quantitysort" || this.props.match.params.id=="ratingsort")
        {
            axios.get('http://localhost:4000/api/product/')
            .then(res => {
                console.log(res.data);
                var tmparr = [];
                for(var i=0;i<res.data.length;i++)
                {
                    if(res.data[i].status == "Available")
                    {
                        tmparr.push(res.data[i]);
                    }
                }
                for(var i=0;i<tmparr.length;i++)
                {
                    for(var j=i+1;j<tmparr.length;j++)
                    {
                        if(Number(tmparr[i].price) > Number(tmparr[j].price) && this.props.match.params.id=="pricesort")
                        {
                            var tmp = tmparr[i];
                            tmparr[i] = tmparr[j];
                            tmparr[j] = tmp;
                        }
                        if(Number(tmparr[i].qty) > Number(tmparr[j].qty) && this.props.match.params.id=="quantitysort")
                        {
                            var tmp = tmparr[i];
                            tmparr[i] = tmparr[j];
                            tmparr[j] = tmp;
                        }
                        if(Number(tmparr[i].rating) > Number(tmparr[j].rating) && this.props.match.params.id=="ratingsort")
                        {
                            var tmp = tmparr[i];
                            tmparr[i] = tmparr[j];
                            tmparr[j] = tmp;
                        }
                    }
                }
                this.setState({ users: tmparr })
            });
        }
        else
        {
            axios.get('http://localhost:4000/api/product/')
            .then(res => {
                console.log(res.data);
                var tmp = Array();
                for(var i=0;i<res.data.length;i++)
                {
                    if(res.data[i].name.toLowerCase().indexOf(this.props.match.params.id.toLowerCase()) > -1 && res.data[i].status == "Available")
                    {
                        tmp.push(res.data[i]);
                    }
                }
                this.setState({ users: tmp })
            });
        }
    }

    handleNameChange(e) {
    	console.log(this.state.users);
	    this.setState({val: e.target.value});
  	}
    
    render() {

        var data = this.state.users;

        const func = (x)=>{
            var lol = Number(x.qty) - Number(x.ordered);
            return (lol);
        }

        return (
        <div className="users" style={{marginTop: "50px"}}>
            <div className="container"> 
            <h2>Store</h2>
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
                                                <Link to={"./../storeitem/"+user._id}>
                                                    <button className="btn btn-outline-dark btn-sm">Order</button>
                                                </Link>
                                            </div>   
                                            <div className="col-lg-9">
                                                <ul className="list-group">
                                                    <li className="list-group-item"><b>Name </b>: {user.name}</li>
                                                    <li className="list-group-item"><b>Quantity </b>: {func(user)}</li>
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
export default SearchPage;