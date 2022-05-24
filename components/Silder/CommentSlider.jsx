import React, { useEffect } from 'react'
import useWindowSize from '../../hooks/useWindowSize'

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import Comment from './Comment'

function CommentSlider( {commentsFeed} ) {

    const { width } = useWindowSize()

    var num;

    useEffect(() => {
      num = 1 
    }, [])
    
    if (typeof window !== 'undefined') {
        if(width > 1100) {
            num = 3
        } else if (width > 800) {
            num = 2
        } else if (width > 0) {
            num = 1
        }
    }

    return (
        <Swiper
            slidesPerView={num}
            slidesPerGroup={num}
            spaceBetween={10}
            cssMode={true}
            navigation={true}
            loop={true}
            pagination={false}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="h-[450px] w-full"
        >
            {commentsFeed.map( (comment, index) => { return (
                <SwiperSlide key={index}>
                    <Comment comment={comment}/>
                </SwiperSlide>
            )} )}
        </Swiper>
    )  
}


export default CommentSlider