import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../actions';

//overlay
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';

import Banner from './IndexBanner';
import ItemBanner from './ItemBanner';

class shopIndex extends React.Component{

    componentDidMount(){
        this.props.fetchItems();
    }


    





    render(){

        if(!this.props.items){
            return <Loader loading fullpage/>
        }

        return(
            <div className="container">
                <Banner />
                    <div className="row my-4" style={{flexDirection:"row"}}>
                        <div className="col-lg-2 col-md-4 col-6 text-center "><div className="index-btn from-left"><Link to="/shopItem/all"><i className="fas fa-dove mr-2"></i>全部商品</Link></div></div>
                        <div className="col-lg-2 col-md-4 col-6 text-center "><div className="index-btn from-left"><Link to="/shopItem/suit"><i className="fas fa-user-tie mr-2"></i>套裝</Link></div></div>
                        <div className="col-lg-2 col-md-4 col-6 text-center "><div className="index-btn from-left"><Link to="/shopItem/top"><i className="fas fa-tshirt mr-2"></i>上半身</Link></div></div>
                        <div className="col-lg-2 col-md-4 col-6 text-center "><div className="index-btn from-left"><Link to="/shopItem/bottom"><i className="fas fa-burn mr-2"></i>下半身</Link></div></div>
                        <div className="col-lg-2 col-md-4 col-6 text-center "><div className="index-btn from-left"><Link to="/shopItem/shoes"><i className="fas fa-shoe-prints mr-2"></i>鞋子</Link></div></div>
                        <div className="col-lg-2 col-md-4 col-6 text-center "><div className="index-btn from-left"><Link to="/shopItem/accessory"><i className="fas fa-mitten mr-2"></i>飾品</Link></div></div>                               
                </div>
                <ItemBanner items={this.props.items} />

                <div className="my-4">
                    <h5 className="ml-5" style={{color:"#655c5c"}}>商品列表 ></h5>
                    <div className="row my-3">
                        <div className="col-4 pr-1" ><a href="/shopItem/top/5df59d60c3e16c31785c2b08"><div style={{backgroundImage:"url(https://images.unsplash.com/photo-1571729024267-e0120826dfe6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)",backgroundPosition:"50%",backgroundSize:"cover",height:"150px"}}></div></a></div>
                        <div className="col-2 " style={{backgroundColor:"rgb(233, 233, 233)"}}><span style={{position: "absolute",top:"50%",left:"50%",transform: "translate(-50%,-50%)"}}>上衣<br />Top</span></div>
                        <div className="col-6 pl-1" ><a href="/shopItem/top/5df59efec3e16c31785c2b0a"><div style={{backgroundImage:"url(https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1782&q=80)",backgroundPosition:"10%",backgroundSize:"cover",height:"150px"}}></div></a></div>
                    </div>
                    <div className="row my-3" style={{marginRight:"0px"}}>
                        <div className="col-4 pr-0" ><a href="/shopItem/suit/5df5e3325e69b64c78bdf34e"><div style={{backgroundImage:"url(https://images.unsplash.com/photo-1574781824015-6dc89cb75ff1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80)",backgroundPosition:"50%",backgroundSize:"cover",height:"150px"}}></div></a></div>
                        <div className="col-6 px-1" ><a href="/shopItem/suit/5df6096313d23852682c7e1e"><div style={{backgroundImage:"url(https://images.unsplash.com/photo-1472417583565-62e7bdeda490?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80)",backgroundSize:"cover",height:"150px"}}></div></a></div>
                        <div className="col-2 pl-1" style={{backgroundColor:"rgb(233, 233, 233)"}}><span style={{position: "absolute",top:"50%",left:"50%",transform: "translate(-50%,-50%)"}}>套裝<br />Suit</span></div>

                    </div>
                    <div className="row my-3" style={{marginLeft:"0px"}}>
                        <div className="col-2 pr-0" style={{backgroundColor:"rgb(233, 233, 233)"}}><span style={{position: "absolute",top:"50%",left:"50%",transform: "translate(-50%,-50%)"}}>鞋子<br />Shoes</span></div>
                        <div className="col-6 px-1" ><a href="/shopItem/shoes/5df60a8813d23852682c7e20"><div style={{backgroundImage:"url(https://images.unsplash.com/photo-1545066230-919660a9290a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80)",backgroundPosition:"90% 80%",backgroundSize:"cover",height:"150px"}}></div></a></div>
                        <div className="col-4 pl-1" ><a href="/shopItem/shoes/5df5a220c3e16c31785c2b0f"><div style={{backgroundImage:"url(https://images.unsplash.com/photo-1499321889027-736489e2f5a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80)",backgroundPosition:"50%",backgroundSize:"cover",height:"150px"}}></div></a></div>
                    </div>
                    <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",backgroundPosition:"50%",backgroundSize:"cover",height:"400px",backgroundAttachment:"fixed",textAlign:"center"}}>
                        <div className="p-4 subscribe-box">
                            <h4>輸入Email以訂閱最新消息</h4>
                            <input className="form-control my-3" type="email" placeholder="請輸入您的Email"></input>
                            <button className="form-control btn btn-secondary" >訂閱</button>
                        </div>
                    </div>
                </div>
            
            </div>            
        );
    };
}

function mapStateToProps(state){
    return {
        items:Object.values(state.items)
    }
}

export default connect(mapStateToProps,actions)(shopIndex);