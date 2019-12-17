import React from 'react'
import ItemsForm from './ItemsForm'
import {connect} from 'react-redux';

import {Redirect} from 'react-router-dom';


import * as actions from '../../../../actions';

import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';


class ItemsCreate extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            initialValues:{ 
            name:"",
            description:"",
            imageUrl:"",
            price:"",
            category:"",
            discount:"1"}
        }
    }


    goBack = () => {
        this.props.history.goBack();
    }

    onSubmit = (values) => {
        //run action to add
        this.props.createItem(values);
    }

    
    checkAdmin = () =>{
        if(this.props.auth === false || this.props.auth.isAdmin === false){
            this.props.foundError("您尚未登入或沒有權限")
            return true;
        }else{
            return false;
        }
    }


    render(){
        if(this.props.auth == null){
            return (
                <div>
                    <Loader loading/>
                </div>
            );
        }

        //Auth Protect
        if(this.checkAdmin()){
            return <Redirect to="/Login" />
        }
        //Auth Protect

        return(
            <div className="container">
                <ItemsForm onSubmit={this.onSubmit} goBack={this.goBack} initialValues={this.state.initialValues}/>
            </div>
        );

    }
}

function mapStateToProps({items,auth}){
    return {items,auth};
}

export default connect(mapStateToProps,actions)(ItemsCreate);