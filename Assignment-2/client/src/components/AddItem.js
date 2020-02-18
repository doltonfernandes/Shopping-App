import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
var varr = require("./Variables")

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            qty: "",
            price: "",
            owner: varr.LoggedInUser,
            ordered: "0",
            status: "Available",
            redirect: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.addUser = this.addUser.bind(this);
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
        const userAdd = {
            name: this.state.name,
            qty: this.state.qty,
            price: this.state.price,
            owner: this.state.owner,
            ordered: this.state.ordered,
            status: this.state.status,
        }
        console.log(userAdd)
        axios.post('http://localhost:4000/api/product/add', userAdd)
        .then(res => { 
            console.log(res);
            this.setState({ redirect: this.state.redirect === false });
        })
        .catch(err => { console.log(err) });
      }
    
    render() {
        return (
            <div className="container" style={{marginTop: "50px"}}>
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