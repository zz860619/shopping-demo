import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const CreateOrderForm = (props) => {
    


    const formik = useFormik({
        initialValues:props.initialValues,
        
        validationSchema:Yup.object({
            email:Yup.string()
            .email('請輸入有效Email')            
            .required('必填欄位'),
        
            name:Yup.string()
            .required('必填欄位'),
        
            phone:Yup.string()
            .required('必填欄位'),
        
            address:Yup.string()
            .required('必填欄位'),
        
        }),
        onSubmit: values =>{
            props.onSubmit(values);
        },
        validateOnChange:false,
        validateOnBlur:false
    });

    const renderCartList = () =>{
        let qtyall = 0;
        let priceall = 0;
        let cartItem = props.cartItem.map((cartItem)=>{
            qtyall += Number(cartItem.qty);
            priceall += Math.floor((cartItem.item.price*cartItem.qty) * cartItem.item.discount);

            return(
                <tr key={cartItem.id}>
                    <td className="d-sm-table-cell text-center">{cartItem.item.name}</td>
                    <td className="d-sm-table-cell text-center">{cartItem.qty}</td>
                    <td className="d-md-table-cell d-none text-center">{cartItem.size}</td>
                    <td className="d-sm-table-cell text-center">{Math.floor(Math.floor((cartItem.item.price*cartItem.qty) * cartItem.item.discount))}</td>
                </tr>
            )
        })


        return(
            <div className="table-responsive mb-3">
                <table className="table">
                    <thead>
                        <tr>
                                <th scope="col" className="d-sm-table-cell text-center">商品名稱</th>
                                <th scope="col" className="d-sm-table-cell text-center">數量</th>
                                <th scope="col" className="d-md-table-cell d-none text-center">尺寸</th>
                                <th scope="col" className="d-sm-table-cell text-center">小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItem}
                    </tbody>
                    <tfoot className="bg-light table-borderless border-top">
                        <tr>
                            <th scope="col" className="d-sm-table-cell text-center"></th>
                            <th scope="col" className="d-sm-table-cell text-center"></th>
                            <th scope="col" className="d-md-table-cell d-none text-right"></th>
                            <th scope="col" className="d-sm-table-cell text-center">共{qtyall}件</th>
                        </tr>
                        <tr>
                            <th scope="col" className="d-sm-table-cell text-center"></th>
                            <th scope="col" className="d-sm-table-cell text-center"></th>
                            <th scope="col" className="d-md-table-cell d-none text-right"></th>
        <th scope="col" className="d-sm-table-cell text-center">總計{(props.couponDiscount)?Math.floor(priceall * props.couponDiscount):priceall}元</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }


    return(
        <div>
            <div className="accordion" id="accordion" style={{width:"80%",margin:"20px auto 50px auto"}}>
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h3 className="mb-0">
                      <button style={{color:"black"}} className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        購物車詳情 <i className="fas fa-angle-double-down mr-3"></i>
                      </button>
                    </h3>
                  </div>

                  <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                      {renderCartList()}
                    </div>
                  </div>
                </div>
            </div>

            <div className="d-flex justify-content-center"><h3>訂購資料</h3></div>
            <form onSubmit = {formik.handleSubmit} style={{width:"80%",margin:"10px auto"}}>
            <div className="form-group">
                    <label htmlFor="email" className="col-form-label">Email</label>
                    <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                    {(formik.errors.email && formik.touched.email) ? 
                        <div className="text-danger">{formik.errors.email}</div>
                    : null}    
            </div>

            <div className="form-group">
                    <label htmlFor="name" className="col-form-label">收件人姓名</label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="form-control"
                />
            </div>

            <div className="form-group ">
                    {(formik.errors.name && formik.touched.name) ? 
                        <div className="text-danger">{formik.errors.name}</div>
                    : null}    
            </div>

            <div className="form-group">
                    <label htmlFor="phone" className="col-form-label">收件人電話</label>
                    <input
                    id="phone"
                    name="phone"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                    {(formik.errors.phone && formik.touched.phone) ? 
                        <div className="text-danger">{formik.errors.phone}</div>
                    : null}    
            </div>

            <div className="form-group">
                    <label htmlFor="address" className="col-form-label">收件人地址</label>
                    <input
                    id="address"
                    name="address"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                    {(formik.errors.address && formik.touched.address) ? 
                        <div className="text-danger">{formik.errors.address}</div>
                    : null}    
            </div>

            <div className="form-group">
                    <label htmlFor="message" className="col-form-label">留言</label>
                    <textarea
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    className="form-control"
                    style={{height:"125px"}}
                />
            </div>

            <div className="d-flex justify-content-between my-2">
                <div><button className="btn btn-light" onClick={props.goBack}  style={{backgroundColor:"rgb(237, 235, 235)"}}><i className="fas fa-angle-double-left mr-2"></i>返回</button></div>
                <div><button className="btn btn-secondary ml-3" type="submit">送出<i className="fas fa-angle-double-right ml-2"></i></button></div>
            </div>
            </form>
        </div>
    );



}

export default CreateOrderForm;