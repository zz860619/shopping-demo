import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../actions';

//overlay
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';


class shopItemShow extends React.Component{

    constructor(props){
        super(props);
        this.state={
            quantity:"1",
            size:"S",
            tab:1,
            jobDone:true
    };
    }

    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id);
    }

    handleChange = (e) => {
        this.setState({quantity:e.target.value})
    }

    addToCart = () =>{
        this.setState({jobDone:false})
        setTimeout(()=>{
            this.props.addCart(this.props.items[0],this.state.quantity,this.state.size);
            this.setState({jobDone:true})
        },1000);

    }



    
    renderBreadCrumb(){
        let category = "";
        if(this.props.items[0].category === "top"){
            category = "上半身";
        }else if(this.props.items[0].category === "suit"){
            category = "套裝";
        }else if(this.props.items[0].category === "bottom"){
            category = "下半身";
        }else if(this.props.items[0].category === "shoes"){
            category = "鞋子";
        }else if(this.props.items[0].category === "accessory"){
            category = "飾品";
        }else{
            category = "全部商品";
        }

        return(
            <nav aria-label="breadcrumb mb-3">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" aria-current="page"><Link to="/" style={{textDecoration:"none",color:"black"}}>首頁</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link to="/shopItem/all" style={{textDecoration:"none",color:"black"}}>商品列表</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link to={`/shopItem/${this.props.items[0].category}`} style={{textDecoration:"none",color:"black"}}>{category}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{this.props.items[0].name}</li>
                </ol>
            </nav>
        )
    }

    renderSizeSelect(){

        return(
                <select className="form-control mb-3" onChange={(e)=>this.setState({size:e.target.value})} value={this.state.size}>
                    <option value="請選擇尺寸" disabled >請選擇尺寸</option>
                    <option value="S" key="S">S</option>
                    <option value="M" key="M">M</option>
                    <option value="L" key="L">L</option>

                </select>        
        );
    }


    renderQtySelect(){
        let select = [1,2,3,4,5,6,7,8,9,10];
        select = select.map((index)=>{
            return(
                <option value={index} key={index}>{index}件</option>
            )
        });

        return(
                <select className="form-control" onChange={this.handleChange} value={this.state.quantity}>
                    <option value="請選擇數量" disabled >請選擇數量</option>
                    {select}
                </select>        
        );
    }

    renderContent = (describe)=>{
        if(this.state.tab === 1){
            return (
                <span style={{fontSize:"0.9em",color:"gray"}}>
                    {describe}
                </span>        
            );
        }else if(this.state.tab === 2){
            return (
                <span style={{fontSize:"0.9em",color:"gray"}}>
                    洗滌方式：建議手洗，深淺色衣物請分開洗滌使用中性洗劑；請勿長時間浸泡。同色系衣物以水溫40°C清洗；不可漂白；不可烘乾。<br />如需整燙，請以低溫墊布熨燙。
                </span>
            )
        }else{
            return ;
        }
    }







    render(){

        let item = this.props.items[0];

        if(this.props.items.length === 0){
            return <Loader loading fullPage/>
        }

        return (
            <div className="container">

                {(this.state.jobDone)?"":<Loader loading fullPage/>}

                {this.renderBreadCrumb()}
                <div className="row">
                    <div className="col-md-8 my-3">
                        <img alt="圖" className="img-fluid" src={`${this.props.items[0].imageUrl}`}></img>
                    </div>
                    <div className="col-md-4 my-3">
                        <h1 className="text-center item-detail-name h2">{item.name}</h1>
                        <div className="d-flex　flex-wrap my-3">
                            <div className="item-detail-oriPrice">原價：${item.price} 元</div>
                            <div className="item-detail-Price">${Math.floor(item.price*item.discount)} 元</div>
                        </div>

                        <div className="item-buy mt-3">
                            {this.renderSizeSelect()}
                            {this.renderQtySelect()}
                            <div className="mt-3"><div className="item-box-buy" onClick={this.addToCart}><i className="far fa-plus-square mr-2"></i>加入購物車</div></div>
                        </div>
                        <div className="item-detail-describe d-flex my-3">
                            <div className={(this.state.tab === 1)?"tab tab-focus":"tab"} onClick={()=>this.setState({tab:1})}>商品描述 Description</div>
                            <div className={(this.state.tab === 2)?"tab tab-focus":"tab"} onClick={()=>this.setState({tab:2})}>洗滌說明 Laundry</div>
                            <div data-toggle="modal" data-target="#sizecontent" className={(this.state.tab === 3)?"tab tab-focus":"tab"} onClick={()=>this.setState({tab:3})}>尺寸 Size</div>
                        </div>
                        <div>
                            {this.renderContent(item.description)}
                        </div>
                        <div className="modal fade" id="sizecontent" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 style={{fontSize:"1em"}} className="modal-title">SIZE GUIDE</h5>
                                        <button style={{fontSize:"1em"}} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="accordion" id="accordionExample">
                                            <div className="card">
                                              <div className="card-header" id="headingOne">
                                                <h2 className="mb-0">
                                                  <button className="btn btn-link modal-Option" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    尺寸 SIZE GUIDE
                                                  </button>
                                                </h2>
                                              </div>

                                              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <table className="table">
                                                        <thead>
                                                          <tr>
                                                            <th scope="col">尺寸</th>
                                                            <th scope="col">S</th>
                                                            <th scope="col">M</th>
                                                            <th scope="col">L</th>
                                                            <th scope="col">XL</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">衣長(cm)</th>
                                                                <td>66</td>
                                                                <td>68</td>
                                                                <td>70</td>
                                                                <td>72</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">胸寬(cm)</th>
                                                                <td>52.5</td>
                                                                <td>55</td>
                                                                <td>57.5</td>
                                                                <td>60</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">袖長(cm)</th>
                                                                <td>69</td>
                                                                <td>71</td>
                                                                <td>73</td>
                                                                <td>75</td>

                                                            </tr>
                                                            <tr>
                                                                <th scope="row">袖寬(cm)</th>
                                                                <td>12</td>
                                                                <td>12.5</td>
                                                                <td>13</td>
                                                                <td>13.5</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">下擺寬(cm)</th>
                                                                <td>52.5</td>
                                                                <td>55</td>
                                                                <td>57.5</td>
                                                                <td>60</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <p style={{fontSize:"0.8em",color:"gray"}}>注意:本尺寸表會因布料彈性、水洗處理注意:本尺寸表會因布料彈性、水洗處理、人為拉扯等因素，與實際使尺寸略有誤差，誤差尺寸±2cm，在國際驗貨標準範圍都是屬於可接受範圍，並不屬於瑕疵</p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="card">
                                              <div className="card-header" id="headingTwo">
                                                <h2 className="mb-0">
                                                  <button className="btn btn-link collapsed modal-Option" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    試穿指南 FITTING REPORT
                                                  </button>
                                                </h2>
                                              </div>
                                              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <table className="table">
                                                        <thead>
                                                          <tr>
                                                            <th scope="col">試穿人員</th>
                                                            <th scope="col">身高(cm)</th>
                                                            <th scope="col">體重(kg)</th>
                                                            <th scope="col">肩寬(cm)</th>
                                                            <th scope="col">胸圍(cm)</th>
                                                            <th scope="col">腰圍(cm)</th>
                                                            <th scope="col">臀圍(cm)</th>
                                                            <th scope="col">建議尺寸</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                                <th scope="row">Model</th>
                                                                <td>188</td>
                                                                <td>68</td>
                                                                <td>44</td>
                                                                <td>93</td>
                                                                <td>81</td>
                                                                <td>93</td>
                                                                <td>L</td>

                                                            </tr>
                                                            <tr>
                                                                <th scope="row">A</th>
                                                                <td>178</td>
                                                                <td>65</td>
                                                                <td>42</td>
                                                                <td>84</td>
                                                                <td>81</td>
                                                                <td>94</td>
                                                                <td>M</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">B</th>
                                                                <td>165</td>
                                                                <td>56</td>
                                                                <td>40</td>
                                                                <td>87</td>
                                                                <td>76</td>
                                                                <td>90</td>
                                                                <td>S</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">C</th>
                                                                <td>176</td>
                                                                <td>74</td>
                                                                <td>42</td>
                                                                <td>98</td>
                                                                <td>96</td>
                                                                <td>102</td>
                                                                <td>L</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <p style={{fontSize:"0.8em",color:"gray"}}>注意:(1)身高、體重與尺寸的選擇無絕對關係，僅供參考<br />(2)胸圍是影響尺寸的關鍵，建議可以參考試穿人員的胸圍作選購依據</p>
                                                </div>
                                              </div>
                                            </div>
                                        </div>                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                

            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        items:Object.values(state.items),
        auth:state.auth,
        cart:state.cart
    };
}

export default withRouter(connect(mapStateToProps,actions)(shopItemShow));