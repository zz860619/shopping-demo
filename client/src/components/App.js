import React from 'react';
import {Router,Route} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../actions';

import Header from './partial/Header';
import Footer from './partial/Footer';
import shopIndex from './shopIndex/shopIndex';
import shopItemList from './shopItem/shopItemList';
import shopItemShow from './shopItem/shopItemShow';
import shopItemCheckOut from './shopItem/shopItemCheckOut';
import Login from './shopMember/Login';
import ItemsDashBoard from './shopMember/Admin/ItemsDashBoard';
import ItemsCreate from './shopMember/Admin/Items/ItemsCreate';
import ItemsEdit from './shopMember/Admin/Items/ItemsEdit';



import history from '../history';

import '../assets/css/App.css';



class App extends React.Component{

    componentDidMount(){
        this.props.fetchUser();
    }


    render(){
        return (        
            <div>
                <Router history={history}>
                    <div className="container">
                        
                            <Route path="/" component={Header}/>
                            <Route path="/" exact component={shopIndex} />
                            <Route path="/shopItem" exact component={shopItemList} />
                            <Route path="/shopItem/:category" exact component={shopItemList} />
                            <Route path="/shopItem/:category/:id" exact component={shopItemShow} />  
                            <Route path="/createOrder" exact component={shopItemCheckOut} />  
                            <Route path="/Login" exact component={Login} />

                            <Route path="/ItemsDashBoard" exact component={ItemsDashBoard} />
                            <Route path="/ItemsDashBoard/new" exact component={ItemsCreate} />
                            <Route path="/ItemsDashBoard/edit/:id" exact component={ItemsEdit} />
                
                            <Route path="/" component={Footer}/>

                    </div>                  
                </Router>
            </div>
        )
    
    }
}


export default connect(null,actions)(App);