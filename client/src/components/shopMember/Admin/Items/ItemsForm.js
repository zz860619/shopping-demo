import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';


const ItemsForm =(props) => {

    const formik = useFormik({
        initialValues:props.initialValues,
        
        validationSchema:Yup.object({
            name:Yup.string()
            .required('必填欄位'),            
        
            description:Yup.string()
            .required('必填欄位'),
        
            imageUrl:Yup.string()
            .required('必填欄位')
            .url("請輸入有效網址"),
        
            price:Yup.string()
            .required('必填欄位'),
        
            category:Yup.string()
            .required('必填欄位'),
        
            discount:Yup.string()
            .required('必填欄位'),
        }),
        onSubmit: values =>{
            props.onSubmit(values);
        },
        validateOnChange:false,
        validateOnBlur:false
    });


    return(
        <form onSubmit = {formik.handleSubmit} className="w-75">

            <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">商品名稱</label>
                <div className="col-sm-10">
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
            </div>

            <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    {(formik.errors.name && formik.touched.name) ? 
                        <div className="text-danger">{formik.errors.name}</div>
                    : null}    
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="description" className="col-sm-2 col-form-label">商品描述</label>
                <div className="col-sm-10">
                    <textarea
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        className="form-control form-control"
                        style={{height:"125px"}}
                    />
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    {(formik.errors.description && formik.touched.description) ? 
                        <div className="text-danger">{formik.errors.description}</div>
                    : null}    
                </div>
            </div>


            <div className="form-group row">
                <label htmlFor="imageUrl" className="col-sm-2 col-form-label">商品圖片網址</label>
                <div className="col-sm-10">
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.imageUrl}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    {(formik.errors.imageUrl && formik.touched.imageUrl) ? 
                        <div className="text-danger">{formik.errors.imageUrl}</div>
                    : null}    
                </div>
            </div>


            <div className="form-group row">
                <label htmlFor="price" className="col-sm-2 col-form-label">商品價格</label>
                <div className="col-sm-10">
                    <input
                        id="price"
                        name="price"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    {(formik.errors.price && formik.touched.price) ? 
                        <div className="text-danger">{formik.errors.price}</div>
                    : null}    
                </div>
            </div>


            <div className="form-group row">
                <label htmlFor="discount" className="col-sm-2 col-form-label">商品折扣</label>
                <div className="col-sm-10">
                    <input
                        id="discount"
                        name="discount"
                        type="number"
                        min="0"
                        max="1"
                        step="0.05"
                        placeholder="請輸入0-1之間的數字"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.discount}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    {(formik.errors.discount && formik.touched.discount) ? 
                        <div className="text-danger">{formik.errors.discount}</div>
                    : null}    
                </div>
            </div>


            <div className="form-group row">
                <label htmlFor="category" className="col-sm-2 col-form-label">商品種類</label>
                <div className="col-sm-10">
                    <select
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                        className="form-control"
                    >
                        <option value="" label="請選擇分類" />
                        <option value="top" label="top" />
                        <option value="bottom" label="bottom" />
                        <option value="suit" label="suit" />
                        <option value="shoes" label="shoes" />
                        <option value="accessory" label="accessory" />
                    </select>
                </div>
            </div>


            <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    {(formik.errors.category && formik.touched.category) ? 
                        <div className="text-danger">{formik.errors.category}</div>
                    : null}    
                </div>
            </div>


            <button className="btn btn-light" onClick={props.goBack}>返回</button>
            <button className="btn btn-secondary ml-3" type="submit">送出</button>
        </form>
    );

};

export default ItemsForm;