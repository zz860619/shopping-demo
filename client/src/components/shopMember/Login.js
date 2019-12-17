import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../actions';



class Login extends React.Component{

    componentWillUnmount(){
        this.props.eraseError();
    }

    render(){
    

        return(
            
            
            <div className="container w-75">

                <form className="mt-5">
                        <h1 className=" text-center">會員登入</h1>                        

                    <div className="form-group row mt-4">
                        <label htmlFor="account" className="col-sm-2 col-form-label">信箱 Email</label>
                        <div className="col-sm-8">
                            <input id="account" type="text" className="form-control" placeholder="請輸入會員信箱" />
                        </div>
                    </div>

                    <div className="form-group row mt-4">
                        <label htmlFor="password" className="col-sm-2 col-form-label">密碼 Password</label>
                        <div className="col-sm-8">
                            <input id="password" type="password" className="form-control" placeholder="請輸入會員密碼" />
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <div className="col-auto"></div>
                        <div className="col-8">
                            <button className="btn btn-secondary btn-lg btn-block" type="submit">登入</button>
                        </div>
                        <div className="col-auto"></div>
                    </div>


                    <div className="form-group row justify-content-center">
                        <div className="col-auto"></div>
                        <div className="col-8">
                            <a href="/auth/google" className="btn btn-outline-secondary btn-block" onClick={this.props.signIn}>
                                <i className="fab fa-google fa-lg"></i><span className="ml-3">使用Google帳戶登入</span>
                            </a>
                        </div>
                        <div className="col-auto"></div>
                    </div>


                    <div className="form-group row">
                        <div className="col-sm-8">
                            <Link className="text-secondary" to="/" >→返回Kubo's Shop繼續購物</Link>                
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-8">
                            <p className="text-danger">{(this.props.error !== null)?`${this.props.error}`:null}</p>
                        </div>
                    </div>
                </form>
            </div>        
        );
    }




}

function mapStateToProps(state){
    return {error:state.error}
}


export default connect(mapStateToProps,actions)(Login);