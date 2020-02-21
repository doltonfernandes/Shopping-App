import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Items from './components/Items';
import Dispatch from './components/Dispatch';
import Dispatched from './components/Dispatched';
import DispatchItem from './components/DispatchItem';
import DispatchedItem from './components/DispatchedItem';
import Item from './components/Item';
import Review from './components/Review';
import Route  from 'react-router-dom/Route';
import Home from './components/Home';
import EditUser from './components/EditUser';
import EditItem from './components/EditItem';
import AddUserr from './components/AddUserr';
import AddItem from './components/AddItem';
import Store from './components/Store';
import LoginPage from './components/Login';
import StoreItem from './components/StoreItem';
import DeleteOrder from './components/DeleteOrder';

class App extends Component {
  render() {
    return (
      
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact strict component={Home}/>
          <Route path="/product/:id" exact strict component={Item}/>
          <Route path="/users/:id/edit" exact strict component={EditUser}/>
          <Route path="/product/:id/edit" exact strict component={EditItem}/>
          <Route path="/addr" exact strict component={AddUserr}/>
          <Route path="/additem" exact strict component={AddItem}/>
          <Route path="/login" exact strict component={LoginPage}/>
          <Route path="/il" exact strict component={Items}/>
          <Route path="/dispatch" exact strict component={Dispatch}/>
          <Route path="/dispatched" exact strict component={Dispatched}/>
          <Route path="/dispatch/:id" exact strict component={DispatchItem}/>
          <Route path="/review/:id" exact strict component={Review}/>
          <Route path="/dispatched/:id" exact strict component={DispatchedItem}/>
          <Route path="/store" exact strict component={Store}/>
          <Route path="/storeitem/:id" exact strict component={StoreItem}/>
          <Route path="/storeitem/:id/:ido" exact strict component={StoreItem}/>
          <Route path="/deleteorder/:id" exact strict component={DeleteOrder}/>
        </div>
      </Router>
    );
  }
}

export default App;
