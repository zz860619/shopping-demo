import React from 'react';


class Footer extends React.Component{

    render(){
        const url = String(this.props.location.pathname);
        if(url.includes("/ItemsDashBoard/new")){
            return null;
        }
        if(url.includes("/Login")){
            return null;
        }



        return(
            <div className="client-footer container">
                <div className="row">
                    <div className="col">
                        <h5 className="mb-4">聯絡我們</h5>
                        <div>電話:12345678</div>
                        <div>地址:地球市火星區水星路330號</div>
                        <div>Mail:1234@asdf.com</div>
                    </div>
                    <div className="col">
                        <h5>追隨我們</h5>
                        <div className="d-flex justify-content-center mt-4">
                            <div><i className="fab fa-instagram mr-4"></i></div>
                            <div><i className="fab fa-facebook-square"></i></div>
                        </div>
                    </div>
                </div>
                <footer>資料與圖片皆來自網路，僅供個人練習用途</footer>
            </div>
        )
    }
}


export default Footer;