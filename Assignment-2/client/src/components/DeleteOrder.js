import React, { Component } from 'react'
import axios from 'axios';
import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
var varr = require("./Variables")

class DeleteOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: {},
      redirect: false
    }
  }

  componentDidMount() {
      axios.get(`http://localhost:4000/api/order/${this.props.match.params.id}`)
      .then(res => {
        console.log(res)
        res.data.status = "Canceled";
        axios.post(`http://localhost:4000/api/order/update/${this.props.match.params.id}`, res.data)
        .then(res1 => { 
            console.log(res1);
        })
          axios.get(`http://localhost:4000/api/product/${res.data.id_of_prod}`)
          .then(res1 => {
                res1.data.ordered = String(Number(res1.data.ordered) - Number(res.data.qty));
                axios.post(`http://localhost:4000/api/product/update/${res1.data._id}`, res1.data)
                .then(res1 => { 
                    console.log(res1);
                })
          });
      });
  }

  render() {

    return (
      <div className="container" style={{marginTop: "50px"}}>
        <div className="card text-left">
          Order Canceled
          </div>
      </div>
    )
  }
}
export default DeleteOrder;