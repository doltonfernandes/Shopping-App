import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        name: "",
        qty: "",
        price: "",
        status: "",
        owner: "",
        ordered: "",
        redirect: false
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.handleOrderedChange = this.handleOrderedChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/product/${this.props.match.params.id}`)
    .then(res => {
        this.setState({ 
            name: res.data.name,
            qty: res.data.qty,
            price: res.data.price,
            status: res.data.status,
            owner: res.data.owner,
            ordered: res.data.ordered
        })
        console.log(res)
    });
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

  handleStatusChange(e) {
    this.setState({status: e.target.value})
  }

  handleOwnerChange(e) {
  }

  handleOrderedChange(e) {
  }

  updateUser(event) {
    event.preventDefault();
    const userUpdate = {
        name: this.state.name,
        qty: this.state.qty,
        price: this.state.price,
        status: this.state.status,
        owner: this.state.owner,
        ordered: this.state.ordered
    }
    console.log(userUpdate)
    axios.post(`http://localhost:4000/api/product/update/${this.props.match.params.id}`, userUpdate)
    .then(res => { 
        console.log(res);
        this.setState({ redirect: this.state.redirect === false })
    })
    .catch(err => { console.log(err) });
  }

  render() {
    return (
      <div className="container" style={{marginTop: "50px"}}>
        <form onSubmit={this.updateUser} method="user">
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
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Status</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handleStatusChange} name="status" value={this.state.status}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Ordered</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handleOrderedChange} name="ordered" value={this.state.ordered}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Owner</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handleOwnerChange} name="owner" value={this.state.owner}/>
                    </div>
                </div>
            <hr/>
            <div style={{marginLeft: "0px"}} className="row">
                <button type="submit" className="btn btn-success" style={{marginLeft: "0px"}}>Update Item</button>
            </div>
        </form>
        {this.state.redirect && (
            <Redirect to={'/il'}/>
        )}
      </div>
    )
  }
}
export default EditItem;