import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';


import * as actions from '../../actions';
import CreateOrderForm from './createOrderForm';

class shopItemCheckOut extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            checkOutStep:1,
            completePay:false,
            jobDone:true,
            couponDiscount:null,
            formValues:{
                email:"",
                name:"",
                phone:"",
                address:"",
                message:""
            },
        }
    }


    componentDidMount(){
        this.props.fetchCart();
    }


    formSubmit = (values) => {
        this.setState({formValues:values});
        this.setState({checkOutStep:3});
    }

    createOrder = () => {
        this.props.submitCart();
        this.setState({completePay:true})
    }


    /*Tab 1 */
    deleteCartItem = (id) => {
        this.setState({jobDone:false})
        setTimeout(()=>{
            this.props.deleteCart(id);
            this.setState({jobDone:true})
        },1000);
    }





    renderCartList = () => {
        let qtyall = 0;
        let priceall = 0;
        let cartItem = this.props.cart.cartItem.map((cartItem)=>{
            qtyall += Number(cartItem.qty);
            priceall += Math.floor((cartItem.item.price*cartItem.qty) * cartItem.item.discount);

            return(
                <tr key={cartItem.id}>
                    <th className="d-md-table-cell d-none text-center"><div style={{backgroundImage:`url(${cartItem.item.imageUrl})`,height:"80px",width:"80px",backgroundSize:"cover",backgroundPosition:"50%",margin:"auto"}}></div></th>
                    <td className="d-sm-table-cell text-center">{cartItem.item.name}</td>
                    <td className="d-sm-table-cell d-none text-center">{cartItem.qty}</td>
                    <td className="d-sm-table-cell d-none text-center">{cartItem.size}</td>
                    <td className="d-sm-table-cell text-center">{Math.floor((cartItem.item.price*cartItem.qty) * cartItem.item.discount)}</td>
                    <td className="d-sm-table-cell text-center">
                        <div className="d-flex justify-content-center">
                            <button style={{fontSize:"1em"}} type="button" className="close" aria-label="Close" onClick={()=>this.deleteCartItem(cartItem.id)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })


        return(
            <div className="table-responsive mb-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="d-md-table-cell d-none text-center">縮圖</th>
                            <th scope="col" className="d-sm-table-cell text-center">商品名稱</th>
                            <th scope="col" className="d-sm-table-cell d-none text-center">數量</th>
                            <th scope="col" className="d-sm-table-cell d-none text-center">尺寸</th>
                            <th scope="col" className="d-sm-table-cell text-center">小計</th>
                            <th scope="col" className="d-sm-table-cell text-center">刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItem}
                    </tbody>
                    <tfoot className="bg-light table-borderless border-top">
                        <tr>
                            <th scope="col" className="d-md-table-cell d-none text-center"></th>
                            <th scope="col" className="d-sm-table-cell text-center"></th>
                            <th scope="col" className="d-sm-table-cell d-none text-center"></th>
                            <th scope="col" className="d-sm-table-cell d-none text-center"></th>
                            <th scope="col" className="d-sm-table-cell text-right">共{qtyall}件</th>
                            <th scope="col" className="d-sm-table-cell text-center"></th>
                        </tr>
                        <tr>
                            <th scope="col" className="d-md-table-cell d-none text-center"></th>
                            <th scope="col" className="d-sm-table-cell text-center"></th>
                            <th scope="col" className="d-sm-table-cell d-none text-center"></th>
                            <th scope="col" className="d-sm-table-cell d-none text-center"></th>
                            <th scope="col" className="d-sm-table-cell text-right">總計</th>
                            <th scope="col" className="d-sm-table-cell text-center">${priceall}元</th>
                        </tr>
                        {this.renderDiscount(priceall)}
                    </tfoot>
                </table>
            </div>

        );
    }

    renderDiscount = (price) =>{
        if(this.state.couponDiscount){
            return(
                <tr>
                    <th scope="col" className="d-md-table-cell d-none text-center"></th>
                    <th scope="col" className="d-sm-table-cell text-center"></th>
                    <th scope="col" className="d-sm-table-cell d-none text-center"></th>
                    <th scope="col" className="d-sm-table-cell d-none text-center"></th>
                    <th scope="col" className="d-sm-table-cell text-right text-danger">折扣後金額:</th>
                    <th scope="col" className="d-sm-table-cell text-center text-danger">${Math.floor(this.state.couponDiscount*price)}元</th>
                </tr>
            )
        }
    }
    /*Tab 1 Done */
    /*Tab 3 */

    renderConfirmCart = () => {
        let priceall = 0;
        let cartItem = this.props.cart.cartItem.map((cartItem)=>{
            priceall += Math.floor((cartItem.item.price*cartItem.qty) * cartItem.item.discount);

            return(
                <tr key={cartItem.id}>
                    <td className="d-sm-table-cell text-center">{cartItem.item.name}</td>
                    <td className="d-sm-table-cell text-center">{cartItem.qty}</td>
                    <td className="d-sm-table-cell text-center">{Math.floor((cartItem.item.price*cartItem.qty) * cartItem.item.discount)}</td>
                </tr>
            )
        })

        return (
            <tbody>
                {cartItem}
                <tr>
                    <th scope="col" className="d-sm-table-cell text-center"></th>
                    <th scope="col" className="d-sm-table-cell text-right">總計</th>
                    <th scope="col" className="d-sm-table-cell text-center">${(this.state.couponDiscount)?Math.floor(priceall*this.state.couponDiscount):priceall}元</th>
                </tr>
            </tbody>
            
    )}
    
    renderConfirmInfo = () => {


        return(
            <table className="table my-4">
                <tbody>
                    <tr>
                        <th scope="row">訂購人Email</th>
                        <td>{this.state.formValues.email}</td>
                    </tr>
                    <tr>
                        <th scope="row">訂購人姓名</th>
                        <td>{this.state.formValues.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">訂購人電話</th>
                        <td>{this.state.formValues.phone}</td>
                    </tr>
                    <tr>
                        <th scope="row">訂購人地址</th>
                        <td>{this.state.formValues.address}</td>
                    </tr>
                    <tr>
                        <th scope="row">付款狀態</th>
                        <td className={(this.state.completePay)?"text-success":"text-danger"}>{(this.state.completePay)?"付款完成":"尚未付款"}</td>
                    </tr>

                </tbody>
            </table>
        )
    }


    renderConfirmBtn = () => {
        if(this.state.completePay){
            return(
                <div className="d-flex justify-content-center my-2">
                    <Link to="/" className="btn btn-secondary">返回首頁</Link>
                </div> 
            )
        }else{
            return(
                <div className="d-flex justify-content-between my-2">
                    <div>
                        <button className="btn btn-light"  onClick={()=>this.setState({checkOutStep:2})} style={{backgroundColor:"rgb(237, 235, 235)"}}><i className="fas fa-angle-double-left mr-2"></i>返回 </button>
                    </div>
                    <div>
                        <button className="btn  btn-secondary" onClick={this.createOrder}>確認付款 <i className="fas fa-angle-double-right ml-2"></i></button>
                    </div>
                </div>

            )
        }
    }

    /*Tab 3 Done*/

    renderTab = () =>{
        if(this.state.checkOutStep === 1){
            return(
            <div>
                {this.renderCartList()}
                <div className="input-group mb-4">
                    <input type="text" className="form-control" placeholder="請輸入折價卷代碼"></input>
                    <div className="input-group-prepend">
                        <button className="btn btn-dark" >套用</button>
                    </div>
                </div>

                <div className="d-flex justify-content-between my-2">
                    <div>
                        <Link className="btn btn-light" to="/shopItem" style={{backgroundColor:"rgb(237, 235, 235)"}}><i className="fas fa-angle-double-left mr-2"></i>繼續購物 </Link>
                    </div>
                    <div>
                        <button className="btn  btn-secondary" onClick={()=>{if(this.props.cart.cartItem.length!==0){this.setState({checkOutStep:2})}}}>下一步 <i className="fas fa-angle-double-right ml-2"></i></button>
                    </div>
                </div>
            </div>
            )
        }else if(this.state.checkOutStep === 2){
            return <CreateOrderForm couponDiscount={this.state.couponDiscount} cartItem={this.props.cart.cartItem} initialValues={this.state.formValues} onSubmit={this.formSubmit} goBack={()=>{this.setState({checkOutStep:1})}}/>
            
        }else{
            return(
                <div className="table-responsive mb-3">
                    <table className="table my-3">
                        <thead>
                            <tr>
                                <th scope="col" className="d-sm-table-cell text-center">商品名稱</th>
                                <th scope="col" className="d-sm-table-cell text-center">數量</th>
                                <th scope="col" className="d-sm-table-cell text-center">價格</th>
                            </tr>
                        </thead>
                            {this.renderConfirmCart()}
                    </table>

                    {this.renderConfirmInfo()}

                    {this.renderConfirmBtn()}
                </div>
            )
        }
    }


    componentWillUnmount(){
        this.props.eraseCart();
    }



    render(){

        if(!this.props.cart.cartItem){
            return <Loader loading fullPage/>
        }





        return(
            <div className="container">
                {(this.state.jobDone)?"":<Loader loading fullPage/>}
                <div className="d-flex justify-content-center mb-4">
                    <div className={(this.state.checkOutStep === 1)?"checkout-title active":"checkout-title"}>1.確認購物清單</div>
                    <div className={(this.state.checkOutStep === 2)?"checkout-title active":"checkout-title"}>2.填寫資料</div>
                    <div className={(this.state.checkOutStep === 3)?"checkout-title active":"checkout-title"}>3.付款/完成訂單</div>
                </div>

                {this.renderTab()}

            </div>
        )
    }
}



function mapStateToProps(state){
    return {
        auth:state.auth,
        cart:state.cart
    }
}

export default connect(mapStateToProps,actions)(shopItemCheckOut)