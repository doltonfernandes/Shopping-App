import React, { Component } from 'react'
import axios from 'axios';
import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';
var varr = require("./Variables")

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          users: [],
          val: "",
          rr: [],
          lol1: [],
          lik: "pricesort"
        }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.check = this.check.bind(this);
      }

    componentDidMount() {
        axios.get('http://localhost:4000/api/order')
        .then(async res => {
            console.log(res.data);
            for(var i=0;i<res.data.length;i++)
            {
            	var tot = res.data[i];
            	var ll = await axios.get('http://localhost:4000/api/product/'+String(res.data[i].id_of_prod))
		        .then(res1 => {
		        	if(res1.data.owner == this.props.match.params.id)
		        	{
		        		var tmpp = this.state.lol1;
                        if(String(tot.rated).split(":").length == 2)
                        {
    		        		tmpp.push(tot);
                        }
			    		this.setState({lol1: tmpp});
					}
		        });
            }
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

        var data = this.state.lol1;

        const func = (x)=>{
        	var ret = String(x.rated).split(":")[1];
            return (ret);
        }

        return (
        <div className="users" style={{marginTop: "50px"}}>
            <div className="container"> 
            <h2>Review</h2>
            <div id="divv1" className="row">
                {data.length > 0 ? 
                    data.map((user, i) => {                        
                        return (
                            <div className="col-lg-6" key={user._id.toString()}>
                                <div className="card" style={{ marginBottom: "20px"}}>
                                    <div className="card-header text-left">{user.name_of_customer}</div>
                                    <div className="card-body text-left">
                                        <div className="row">
                                            <div className="col-lg-9">
                                                <ul className="list-group">
                                                    <li className="list-group-item"><b>Review </b>: {func(user)}</li>
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
export default Review;