import React from 'react'
import Rating from './Rating'

function ReviewCard({review}) {
    return (
        <div className="review_card">
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div className="review_card_name">
                    {review.name}   
                    <small>{review.createdAt.substring(0,10)}</small>
                </div>
                <Rating rating = {review.rating} caption=" "></Rating>
            </div>
            <p>
                {review.comment}
            </p>
        </div>
    )
}

export default ReviewCard
