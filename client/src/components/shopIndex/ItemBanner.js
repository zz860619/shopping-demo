import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

class ItemBanner extends React.Component {
    constructor(props){
        super(props)
    }


    renderSwiper = () =>{
        
        let ItemList = this.props.items.map((item)=>{
    
            return(
                <div key={item._id}>
                    <a href={`/shopItem/${item.category}/${item._id}`}>
                        <div className="item-image" style={{backgroundImage:`url(${item.imageUrl})`,backgroundPosition:"50%",backgroundSize:"cover",height:"250px"}}>
                            <div className="item-banner"><span>{item.name}</span></div>
                        </div>
                    </a>
                </div>
            )
        });
        return ItemList;
        
    
    }



    render(){
        const params = {
            observer: true,
        shouldSwiperUpdate: true,
        rebuildOnUpdate:true,
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
    }

        return(
            <Swiper {...params}>
                {this.renderSwiper()}
            </Swiper>
        )       
    }

}

export default ItemBanner;