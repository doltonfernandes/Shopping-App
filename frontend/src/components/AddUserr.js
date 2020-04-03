import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class AddUserr extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            email: "",
            phone: "",
            password: "",
            type: "Vendor",
            rating: "0:0",
            redirect: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.ValidateEmail = this.ValidateEmail.bind(this);
        this.check_name = this.check_name.bind(this);
        this.check_phone = this.check_phone.bind(this);
      }

		ValidateEmail(mail) 
		{
		 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
		  {
		    return (false)
		  }
		    alert("You have entered an invalid email address!")
		    return (true)
		}
    
      handleNameChange(e) {
        this.setState({name: e.target.value})
      }
    
      handleEmailChange(e) {
        this.setState({email: e.target.value})
      }

      handlePhoneChange(e) {
        this.setState({phone: e.target.value})
      }

      handlePasswordChange(e) {
        this.setState({password: e.target.value})
      }

      handleTypeChange(e) {
        this.setState({type: e.target.value})
      }

      check_phone(e)
      {
      	if(/^\d+$/.test(e))
      	{
      		return false;
      	}
      	else
      	{
		    alert("phone should be a number")
      		return true;
      	}
      }

      check_name(e)
      {
      	if(e!='')
      	{
      		return false;
      	}
      	else
      	{
		    alert("Name can't be empty")
      		return true;
      	}
      }
      
      addUser(event) {
        event.preventDefault();
        if(this.ValidateEmail(this.state.email) || this.check_name(this.state.name) || this.check_phone(this.state.phone)){return ;}
        const userAdd = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            type: this.state.type,
            rating: this.state.rating,
        }
        console.log(userAdd)
        axios.post('http://localhost:4000/api/userr/add', userAdd)
        .then(res => { 
            console.log(res);
            this.setState({ redirect: this.state.redirect === false });
        })
        .catch(err => { console.log(err) });
      }
    
    render() {
        return (
            <div className="container" style={{marginTop: "50px"}}>
            <h2>Registration Page</h2>
            <form onSubmit={this.addUser} method="user">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handleNameChange} name="name" value={this.state.name}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Email</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handleEmailChange} name="email" value={this.state.email}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Phone</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={this.handlePhoneChange} name="phone" value={this.state.phone}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" onChange={this.handlePasswordChange} name="password" value={this.state.password}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-left">Type</label>
                    <div className="col-sm-10">
                        <select id="cars" className="form-control"  onChange={this.handleTypeChange} value={this.state.type}>
                          <option value="Vendor" selected>Vendor</option>
                          <option value="Customer">Customer</option>
                        </select>
                    </div>
                </div>
                <hr/>
                <div style={{marginLeft: "0px"}} className="row">
                    <button type="submit" className="btn btn-warning" style={{marginLeft: "0px"}}>Add User</button>
                </div>
            </form>
            {this.state.redirect && (
                <Redirect to={'/login'}/>
            )}
          </div>
        );
    }
}

export default AddUserr;