import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            qty: "",
            price: "",
            owner: sessionStorage.getItem("LoggedInUser"),
            ordered: "0",
            status: "Available",
            image: "/user.png",
            redirect: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.getBaseUrl = this.getBaseUrl.bind(this);
      }
    
      handleNameChange(e) {
        this.setState({name: e.target.value})
      }
    
      handleQtyChange(e) {
        this.setState({qty: e.target.value})
      }

      handlePriceChange(e) {
        this.setState({price: e.target.value})
      }
      
      addUser(event) {
        event.preventDefault();
        if(this.state.name=='')
        {
        	alert("Name can't be left empty");
        	return ;
        }
        if(!(/^\d+$/.test(this.state.qty) && Number(this.state.qty)>0))
        {
        	alert("Qty should be a number and greater than 0");
        	return ;
        }
        if(!(/^\d+$/.test(this.state.price) && Number(this.state.price)>0))
        {
        	alert("Price should be a number and greater than 0");
        	return ;
        }
        const userAdd = {
            name: this.state.name,
            qty: this.state.qty,
            price: this.state.price,
            owner: this.state.owner,
            ordered: this.state.ordered,
            status: this.state.status,
            image: this.state.image,
        }

        console.log("YO");
        console.log(userAdd);
        console.log("YO");

        axios.post('http://localhost:4000/api/product/add', userAdd)
        .then(res => { 
            console.log(res);
        })
        .catch(err => { console.log(err) });
        this.setState({ redirect: this.state.redirect === false });
      }

        getBaseUrl (event)  {
            event.preventDefault();
            var file = document.querySelector('input[type=file]')['files'][0];
            var reader = new FileReader();
            var baseString;
            var lol = this;
            reader.onloadend = function () {
                baseString = reader.result;
                lol.setState({image: baseString})
            };
            reader.readAsDataURL(file);
        }
    
    render() {


        return (
            <div className="container" style={{marginTop: "50px"}}>
            <br/>
            <br/>
            <br/>
            <h2>Add Item</h2>
            <form onSubmit={this.addUser} method="user">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handleNameChange} name="name" value={this.state.name}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Quantity</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handleQtyChange} name="qty" value={this.state.qty}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Price</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handlePriceChange} name="price" value={this.state.price}/>
                    </div>
                </div>
                <input type="file" onChange={this.getBaseUrl}/>
                <hr/>
                <div style={{marginLeft: "0px"}} className="row">
                    <button type="submit" className="btn btn-warning" style={{marginLeft: "0px"}}>Add Item</button>
                </div>
            </form>
            {this.state.redirect && (
                <Redirect to={'/il'}/>
            )}
          </div>
        );
    }
}

export default AddItem;