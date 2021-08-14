import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductCategories, listProducts, searchProducts } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { prices, ratings } from '../utils';
import Rating from '../components/Rating';
import { useState } from 'react';
import SearchProduct from '../components/SearchProduct';
import {Link} from 'react-router-dom'


function SearchScreen(props) {

    const keyword = props.match.params.name || 'all'

    const productList = useSelector(state => state.productList)
    const {loading, error, products, result} = productList
    const dispatch = useDispatch()
    const [category, setCategory] = useState('all')
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [rating, setRating] = useState(0)
    const [order, setOrder] = useState('newest')
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(searchProducts({name:keyword!=='all'? keyword: '', category:category !=='all'? category:'', min, max,rating,order,page}))
    }, [dispatch,page,category,min, max,rating,order, keyword])

    const productCategoryList = useSelector(state => state.productCategoryList)
    const {loading:loadingCategories, error:errorCategories, categories} = productCategoryList

    useEffect(()=>{
        dispatch(listProductCategories())
    },[dispatch])
    
    return (
        <div>
            {loading
            ? <LoadingBox></LoadingBox> 
            : error
                ? <MessageBox variant='danger'>{error}</MessageBox> 
                :(
                <div className="search">
                    <div className="search-result">
                            <button>{products.length} Results</button>
                            <div>
                                Sort by :&nbsp; &nbsp;
                                <select value = {order} onChange={e=>setOrder(e.target.value)}>
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="lowest">Price: Low to High</option>
                                    <option value="highest">Price: High to Low</option>
                                    <option value="toprated">Avg. Customer Reviews</option>
                                </select>
                            </div>
                    </div>

                    <div className="search-info">
                        <div className="search-filters">
                            <div className="search-filter">
                                <div className="search-filter-name">
                                    Category
                                </div>
                                {loadingCategories? <LoadingBox></LoadingBox> :
                                errorCategories? <MessageBox variant='danger'>{errorCategories}</MessageBox> :
                                (
                                    <ul >
                                        <li onClick={e=>setCategory('all')} className={category ==='all'? 'active':''}>
                                            Any
                                        </li>
                                        {categories.map(c=>
                                            (
                                                <li key = {c} onClick={e=>setCategory(c)} className={category ===c? 'active':''}>
                                                {c}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )}
                            </div> 
                            <div search-filter>
                                <div className="search-filter-name">
                                    Price
                                </div>
                                <ul >
                                    {prices.map(p=>(
                                        <li key={p.name} className={`${p.min}-${p.max}`===`${min}-${max}`? 'active': ''} onClick={e=> {setMin(p.min);setMax(p.max)} }>
                                            {p.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="search-filter">
                                <div className="search-filter-name">
                                    Reviews
                                </div>
                                <ul style={{"fontSize":"2rem", "padding":"3rem"}}>
                                    {ratings.map(r=>(
                                        <li key={r.name} className={`${r.rating}`===`${rating}`? 'active':''} onClick={e=> setRating(r.rating)}>
                                            {/* <Rating caption={" & up"} rating={r.rating}></Rating> */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="search-products">
                            {loading
                            ? <LoadingBox></LoadingBox> 
                            :error
                                ? <MessageBox variant='danger'>{error}</MessageBox> 
                                :(<>
                                {products.length===0 &&  <MessageBox>No Product Found</MessageBox>}
                                    <div className="search-product-container">
                                        {products.map(product=>(
                                            <div className="search-product">
                                                    <SearchProduct key={product._id}  product = {product}/>
                                            </div>
                                        ))}
                                    </div>
                                </>)
                                }
                        </div>
                    
                    </div>

                </div>)
            

            }
        </div>
    )
}

export default SearchScreen
