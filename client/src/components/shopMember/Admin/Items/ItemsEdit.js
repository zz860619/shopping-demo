import React from 'react'
import ItemsForm from './ItemsForm'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


import * as actions from '../../../../actions';

import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';


class ItemsEdit extends React.Component{

    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id)
    }





    onSubmit = (values) => {
        //run action to add
        this.props.editItem(this.props.match.params.id,values);
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

        if(this.props.auth == null || !this.props.items){
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
                <ItemsForm onSubmit={this.onSubmit}  initialValues={this.props.items}/>                
            </div>
        );

    }
}

function mapStateToProps(state,ownProps){
    return {items:state.items[ownProps.match.params.id],auth:state.auth};
}

export default connect(mapStateToProps,actions)(ItemsEdit);