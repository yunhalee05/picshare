import React from 'react'
import {Link} from 'react-router-dom'

function TopProduct({products}) {

    return (
        <div className="topproducts">
            {
                products.map((product, index)=>(
                    index ===0 &&
                    <>
                        <Link to={`/product/${product._id}`}>
                            <div className="topproducts_image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            {/* <div className="topproducts_info">
                                <span>{product.name}</span>
                                <span>{product.seller.seller.name}</span>
                                <div>{product.description}sdlfwjlfdjwlidfjliwjflwdjlfkjwlfijwdlfjlkwjfliwjflwdjkfljwlfijiwdjfdljwlityljdklfjwifuiwytihwlijfkdjifowoidfuoywoihltjwlkefjiwuoetyilwjlejkwjfidwjoitliwjlwjk</div>
                            </div> */}
                        </Link>
                    </>
                ))
            }
        </div>

    )
}

export default TopProduct
