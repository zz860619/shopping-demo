import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../actions';

//overlay
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';


class shopItemList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            allpages:1,
            pageStart:1,
            dataPerpage:12,
            category:"all",
            jobDone:true
        }
    }


    
    componentDidMount(){
        if(this.props.match.params.category){
            this.setState({category:this.props.match.params.category});
        };

    
        this.props.fetchItems().then(()=>{
            let {dataPerpage} = this.state;
            let length = (this.props.match.params.category === "all")?this.props.items.length:this.props.items.filter(item => item.category === this.props.match.params.category).length;
            let allpages =(length/dataPerpage > Math.floor(length/dataPerpage))? Math.floor(length/dataPerpage)+1:Math.floor(length/dataPerpage)    
            this.setState({allpages:Math.max(allpages,1)});
        });

        

    }
    
    addToCart = (item) =>{
        this.setState({jobDone:false})
        setTimeout(()=>{
            this.props.addCart(item,1,"L");
            this.setState({jobDone:true})
        },1000);

    }







    pageChange = (symbol,allpages,count) =>{
        if(symbol === "+" && this.state.pageStart <allpages){
            this.setState({pageStart:this.state.pageStart+count})
        }
        if(symbol === "-" && this.state.pageStart>1) this.setState({pageStart:this.state.pageStart-count})
        
    }


    renderPagination =(pageStart) => {

        const diff = this.state.allpages-pageStart;
        if(this.state.allpages === 1){
            return(
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={()=>{this.pageChange("-",this.state.allpages,1)}}>←</button></li>
                    <li className='page-item active'><button className='page-link'>{pageStart}</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>{this.pageChange("+",this.state.allpages,1)}}>→</button></li>
                </ul>            
            );


        }else if(diff === 0){
            return(
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={()=>{this.pageChange("-",this.state.allpages,1)}}>←</button></li>
                    <li className='page-item'><button className='page-link' onClick={()=>{this.pageChange("-",this.state.allpages,1)}}>{pageStart-1}</button></li>
                    <li className='page-item active'><button className='page-link'>{pageStart}</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>{this.pageChange("+",this.state.allpages,1)}}>→</button></li>
                </ul>            

            )
        }else if(diff === 1 && this.state.allpages <3){
            return(
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={()=>{this.pageChange("-",this.state.allpages,1)}}>←</button></li>
                    <li className='page-item active'><button className='page-link'>{pageStart}</button></li>
                    <li className='page-item'><button className='page-link' onClick={()=>{this.pageChange("+",this.state.allpages,1)}}>{pageStart+1}</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>{this.pageChange("+",this.state.allpages,1)}}>→</button></li>
                </ul>            

            )
        }else if(pageStart === 1 && this.state.allpages > 2){
            return(
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={()=>{this.pageChange("-",this.state.allpages,1)}}>←</button></li>
                    <li className='page-item active'><button className='page-link'>{pageStart}</button></li>
                    <li className='page-item '><button className='page-link' onClick={()=>{this.pageChange("+",this.state.allpages,1)}}>{pageStart+1}</button></li>
                    <li className='page-item '><button className='page-link' onClick={()=>{this.pageChange("+",this.state.allpages,2)}}>{pageStart+2}</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>{this.pageChange("+",this.state.allpages,1)}}>→</button></li>
                </ul>            

            )


        }else{
            return(
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={()=>{this.pageChange("-",this.state.allpages,1)}}>←</button></li>
                    <li className='page-item'><button className='page-link' onClick={()=>{this.pageChange("-",this.state.allpages,1)}}>{pageStart-1}</button></li>
                    <li className='page-item active'><button className='page-link'>{pageStart}</button></li>
                    <li className='page-item'><button className='page-link' onClick={()=>{this.pageChange("+",this.state.allpages,1)}}>{pageStart+1}</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>{this.pageChange("+",this.state.allpages,1)}}>→</button></li>
                </ul>            

            )
        }
    }

    categoryChange = (category,dataPerpage) => {
        this.setState({category});
        let length = (category === "all")?this.props.items.length:this.props.items.filter(item => item.category === category).length;
        let allpages =(length/dataPerpage > Math.floor(length/dataPerpage))? Math.floor(length/dataPerpage)+1:Math.floor(length/dataPerpage);
        this.setState({pageStart:1,allpages:allpages});   
    }




    renderItemList = () => {
        let start = (this.state.pageStart-1) * this.state.dataPerpage;
        let end = this.state.pageStart * this.state.dataPerpage;
        let filtered = (this.state.category === "all")?this.props.items:this.props.items.filter(item => item.category === this.state.category)
        let sliced = filtered.slice(start,end);
        let result = sliced.map(item => {
            return(
                <div className="card item-box p-2 mt-1" key={item._id}>
                    <a href = {`/shopItem/${item.category}/${item._id}`}><div className="itemBoxImg-parent"><div className="itemBoxImg-child" style={{backgroundImage:`url(${item.imageUrl})`}}></div></div></a>
                    <div className="card-body p-2">
                        <h5 className="card-title mb-0">{item.name}</h5>
                        <div className="d-flex">
                            <p className="card-text origin-price">${item.price} 元</p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <p className="card-text actual-price" >${Math.floor(item.price*item.discount)} 元</p>
                        </div>
                    </div>
                    <div><div className="item-box-buy" onClick={()=>this.addToCart(item)}><i className="far fa-plus-square mr-2"></i>加入購物車</div></div>
                </div>
            )
        });

        if(result.length === 0){
            return (
                <div className="d-flex justify-content-center my-4">
                    <h5>這個分類尚無商品</h5>
                </div>
            )
        }else{
           return(
            <div className="shopItemList card-columns pb-2">
                {result}
            </div>
           ) 
        }
    }
    renderBreadCrumb(){
        let category = "";
        if(this.state.category === "top"){
            category = "上半身";
        }else if(this.state.category === "suit"){
            category = "套裝";
        }else if(this.state.category === "bottom"){
            category = "下半身";
        }else if(this.state.category === "shoes"){
            category = "鞋子";
        }else if(this.state.category === "accessory"){
            category = "飾品";
        }else{
            category = "全部商品";
        }

        return(
            <nav aria-label="breadcrumb mb-3">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" aria-current="page"><Link to="/" style={{textDecoration:"none",color:"black"}}>首頁</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">商品列表</li>
                    <li className="breadcrumb-item active" aria-current="page">{category}</li>
                </ol>
            </nav>
        )
    }



    render(){


        if(!this.props.items){
            return <Loader loading fullPage/>
        }

        return(
            <div className="container">
                {(this.state.jobDone)?"":<Loader loading fullPage/>}

                {this.renderBreadCrumb()}

                <div className="list-banner mb-3">
                    <h1>商品列表</h1>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-2 col-md-3 my-3">
                        <div className="list-group list-nav">
                                <div><Link to="/shopItem/all" className={this.state.category === "all" ?"list-group-item active":"list-group-item"} onClick={()=>this.categoryChange("all",12)}>全部商品</Link></div>
                                <div><Link to="/shopItem/suit" className={this.state.category === "suit" ?"list-group-item active":"list-group-item"} onClick={()=>this.categoryChange("suit",12)}>套裝</Link></div>
                                <div><Link to="/shopItem/top" className={this.state.category === "top" ?"list-group-item active":"list-group-item"} onClick={()=>this.categoryChange("top",12)}>上半身</Link></div>
                                <div><Link to="/shopItem/bottom" className={this.state.category === "bottom" ?"list-group-item active":"list-group-item"} onClick={()=>this.categoryChange("bottom",12)}>下半身</Link></div>
                                <div><Link to="/shopItem/shoes" className={this.state.category === "shoes" ?"list-group-item active":"list-group-item"} onClick={()=>this.categoryChange("shoes",12)}>鞋子</Link></div>
                                <div><Link to="/shopItem/accessory" className={this.state.category === "accessory" ?"list-group-item active":"list-group-item"} onClick={()=>this.categoryChange("accessory",12)}>配件</Link></div>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-9 my-3">
                            {this.renderItemList()}
                        <div className="d-flex justify-content-center mt-3">
                            {this.renderPagination(this.state.pageStart)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}



function mapStateToProps(state){
    return {
        items:Object.values(state.items),
        auth:state.auth,
        cart:state.cart
    };
}


export default connect(mapStateToProps,actions)(shopItemList);