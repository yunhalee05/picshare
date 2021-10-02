import React from 'react'
import {Link} from 'react-router-dom'
import topproductsbackground from '../images/topproductsbackground.JPG'
import hometitle from '../images/hometitle.png'

function TopProduct({products}) {

    return (
        <div className="topproducts">
            <div className="topproducts-background">
                <img src={topproductsbackground} alt="" />

            {
                products.map((product, index)=>(
                    <Link to={`/product/${product._id}`} key={index}>
                        <div className={`topproducts_image topproduct_image${index}`}>
                            <img src={product.image} alt={product.name} />
                        </div>
                        {/* <div className={`topproducts_info topproduct_info${index}`}>
                            <span>{product.name}</span>
                        </div> */}
                    </Link>
                ))
            }

                <div className="topproducts-title">
                    <img src={hometitle} alt=""/>
                </div>
            </div>
        </div>

    )
}

export default TopProduct
