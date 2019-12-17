import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../../actions';

//overlay
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';


class ItemsDashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            allpages:1,
            pageStart:1,
            dataPerpage:8
        }
    }

    componentDidMount(){
        this.props.fetchItems().then(()=>{
            let {dataPerpage} = this.state;
            let {length} = this.props.items;
            let allpages =(length/dataPerpage > Math.floor(length/dataPerpage))? Math.floor(length/dataPerpage)+1:Math.floor(length/dataPerpage)    
            this.setState({allpages:Math.max(allpages,1)});
        });
    }
    

    pageChange = (symbol,allpages) =>{
        if(symbol === "+" && this.state.pageStart <allpages){
            this.setState({pageStart:this.state.pageStart+1})
        }
        if(symbol === "-" && this.state.pageStart>1) this.setState({pageStart:this.state.pageStart-1})
        
    }


    renderPagination =(pageStart) => {

        const diff = this.state.allpages-pageStart;
        if(this.state.allpages === 1){
            return(
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={()=>{this.pageChange("-",this.state.allpages)}}>←</button></li>
                    <li className='page-item active'><button className='page-link'>{pageStart}</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>{this.pageChange("+",this.state.allpages)}}>→</button></li>
                </ul>            
            );


        }else if(diff === 0 ){
            return(
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={()=>{this.pageChange("-",this.state.allpages)}}>←</button></li>
                    <li className='page-item'><button className='page-link' onClick={()=>{this.pageChange("-",this.state.allpages)}}>{pageStart-1}</button></li>
                    <li className='page-item active'><button className='page-link'>{pageStart}</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>{this.pageChange("+",this.state.allpages)}}>→</button></li>
                </ul>            

            )
        }else if(diff === 1 && this.state.allpages <3){
            return(
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={()=>{this.pageChange("-",this.state.allpages)}}>←</button></li>
                    <li className='page-item active'><button className='page-link'>{pageStart}</button></li>
                    <li className='page-item'><button className='page-link' onClick={()=>{this.pageChange("+",this.state.allpages)}}>{pageStart+1}</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>{this.pageChange("+",this.state.allpages)}}>→</button></li>
                </ul>            

            )
        }else if(pageStart === 1 && this.state.allpages > 2){
            return(
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={()=>{this.pageChange("-",this.state.allpages)}}>←</button></li>
                    <li className='page-item active'><button className='page-link'>{pageStart}</button></li>
                    <li className='page-item '><button className='page-link' onClick={()=>{this.setState({pageStart:pageStart+1})}}>{pageStart+1}</button></li>
                    <li className='page-item '><button className='page-link' onClick={()=>{this.setState({pageStart:pageStart+2})}}>{pageStart+2}</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>{this.pageChange("+",this.state.allpages)}}>→</button></li>
                </ul>            

            )


        }else{
            return(
                <ul className="pagination">
                    <li className="page-item"><button className="page-link"  onClick={()=>{this.pageChange("-",this.state.allpages)}}>←</button></li>
                    <li className='page-item'><button className='page-link' onClick={()=>{this.setState({pageStart:pageStart-1})}}>{pageStart-1}</button></li>
                    <li className='page-item active'><button className='page-link'>{pageStart}</button></li>
                    <li className='page-item'><button className='page-link' onClick={()=>{this.setState({pageStart:pageStart+1})}}>{pageStart+1}</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>{this.pageChange("+",this.state.allpages)}}>→</button></li>
                </ul>            

            )
        }
    }




    renderList = () => {
        let start = (this.state.pageStart-1) * this.state.dataPerpage
        let end = this.state.pageStart * this.state.dataPerpage
        let filtered = this.props.items.slice(start,end);
        return filtered.map(item=>{
            return(
                <tr key={item._id}>
                    <th className="align-middle d-md-table-cell d-none">{item.category}</th>
                    <td className="align-middle d-md-table-cell">{item.name}</td>
                    <td className="align-middle d-lg-table-cell d-none"><img alt="縮圖"src={item.imageUrl} style={{height:"100px",width:"100px"}}></img></td>
                    <td className="align-middle d-sm-table-cell">{item.price}</td>
                    <td className="align-middle d-lg-table-cell d-none">{item.discount}</td>
                    <td className="align-middle">
                        <div className="d-flex flex-wrap">
                            <a className="btn btn-light mr-2" href={`/ItemsDashBoard/edit/${item._id}`}>編輯</a>
                            <button className="btn btn-secondary text-light" onClick={()=>this.props.deleteItem(item._id)}>刪除</button>
                        </div>
                    </td>
                </tr>
            )
        })
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
        //Auth Protect
        if(this.props.auth == null){
            return (
                <div>
                    <Loader loading/>
                </div>
            );
        }
        if(this.checkAdmin()){
            return <Redirect to="/Login" />
        }
        //Auth Protect


        return(
        <div className="container">
                <div className="row mt-3 px-auto">
                    <div className="col-sm-2 bg-light d-flex flex-column pt-3">                    
                        <ul className="nav flex-column align-items-center">
                            <li className="nav-item">
                                <a className="nav-link text-secondary" href="/ItemsDashBoard">商品管理</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-secondary" href="/ItemsDashBoard">訂單管理</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-sm-10">
                        <div className="d-flex flex-row-reverse mb-3">
                            <div className="p-2">
                                <Link className="btn btn-secondary" to="/ItemsDashBoard/new">新增商品</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="d-md-table-cell d-none">分類</th>
                                        <th scope="col" className="d-md-table-cell">名稱</th>
                                        <th scope="col" className="d-lg-table-cell d-none">縮圖</th>
                                        <th scope="col" className="d-sm-table-cell">售價</th>
                                        <th scope="col" className="d-lg-table-cell d-none">折扣</th>
                                        <th scope="col" >編輯</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderList()}
                                </tbody>
                            </table>

                            <div className="d-flex justify-content-center">
                                <nav aria-label="Page navigation example">
                                    {this.renderPagination(this.state.pageStart)}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
    )}
}

function mapStateToProps(state){
    return {
        items:Object.values(state.items),
        auth:state.auth
        };
}

export default connect(mapStateToProps,actions)(ItemsDashBoard);