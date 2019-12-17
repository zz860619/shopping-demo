import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';


import * as actions from '../../actions';


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jobDone:true
        }
    }


    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchCart();
    }
    
    deleteCartItem = (id) => {
        this.setState({jobDone:false})
        setTimeout(()=>{
            this.props.deleteCart(id);
            this.setState({jobDone:true})
        },1000);
    }





    renderLogOutBtn(){
        if(this.props.auth){
            return(
            
                <li className="nav-item ml-lg-auto pt-1 dropdown">

                        <a className="nav-link" href="#" id="MemberDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-user-circle fa-lg"></i>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="MemberDropdown">
                            <h3 className="dropdown-header">你好!使用者</h3>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">我的訂單</a>
                            <a className="dropdown-item" href="/ItemsDashBoard">{(this.props.auth.isAdmin)?"商品管理":null}</a>                
                            <a className="dropdown-item" href="/api/logout">登出</a>
                        </div>

                </li>
            
                            
            );
        }else if(this.props.auth == null){
            return;
        }else{
            return(
                <li className="nav-item ml-lg-auto pt-1">
                    <Link className ="nav-link" to="/Login">
                        <i className="fas fa-user-circle fa-lg"></i>
                    </Link>                            
                </li>
            );
        }
    }

    renderCart = () => {
        if(this.props.cart.cartItem.length === 0){
            return <div className="cart-list"><p className="text-center">購物車裡尚無物品</p></div>
        }
        return this.props.cart.cartItem.map((cartItem)=>{
            return(
                <div className="row cart-list" key={cartItem.id}>
                    <div className="col pr-0"><div style={{backgroundImage:`url(${cartItem.item.imageUrl})`,height:"90px",width:"80px",backgroundSize:"cover",backgroundPosition:"50%"}}></div></div>
                    <div className="col"><p className="cart-item-text">{cartItem.item.name}<br/>尺寸：{cartItem.size}<br/>數量：{cartItem.qty}</p></div>
                    <div className="col d-flex aligh-items-center">
                        <button style={{fontSize:"1em"}} type="button" className="close" aria-label="Close" onClick={()=>this.deleteCartItem(cartItem.id)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )
        });

    }

    renderCartButton(){
        if(this.props.cart.cartItem.length === 0){
            return
        }else{
            return(
                <div className="d-flex justify-content-center mt-3"><Link style={{color:"white"}} className="btn btn-dark" to="/createOrder"><i className="fas fa-angle-double-down mr-2"></i>前往結帳</Link></div>
            )
        }
    }


    render(){      
        
        //讓Header不會在LoingPage顯示
        const url = String(this.props.location.pathname);
        if(url.includes("/Login")){
            return null;
        }

        if(!this.props.cart.cartItem){
            return <Loader loading fullPage/>
        }



        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-white">

                {(this.state.jobDone)?"":<Loader loading fullPage/>}

                <a className="navbar-brand" href="/">Kubo's Shop</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#client-nav-bar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="client-nav-bar">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">首頁</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shopItem/all">商品列表</Link>
                        </li>
                        {this.renderLogOutBtn()}                        
                    </ul>
                    
                    <div className="btn-group" role="group" style={{float:"right"}}>
                        
                            <button id="cartbtndrop" type="button" className="btn btn-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{background:"transparent",border:"none"}}>
                                <i className="fas fa-shopping-cart fa-lg"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="cartbtndrop">
                                <div className="p-2" style={{width:"300px",maxHeight:"600px",overflow:"auto"}}>
                                    <h5 className="text-center mb-4">購物車</h5>
                                    {this.renderCart()}                                    
                                    {this.renderCartButton()}       
                                </div>
                            </div>                           
                        
                    </div>
                    
                </div>

            </nav>
        );
    }


}

function mapStateToProps(state){
    return {
        auth:state.auth,
        cart:state.cart
    }
}


export default connect(mapStateToProps,actions)(Header);