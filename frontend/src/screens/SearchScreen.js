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
    const {loading, error, products, pages, count} = productList

    const [category, setCategory] = useState('all')
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [rating, setRating] = useState(0)
    const [order, setOrder] = useState('newest')

    const [price, setPrice] = useState('Any')

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)

    const pageRange = [...Array(pages).keys()]    

    const dispatch = useDispatch()


    useEffect(() => {
        handleMinMax();
        dispatch(searchProducts({name:keyword!=='all'? keyword: '', category:category !=='all'? category:'', min, max,rating,order,page,limit}))
    }, [dispatch,page,category,min, max,rating,order, keyword, limit, price])

    const productCategoryList = useSelector(state => state.productCategoryList)
    const {loading:loadingCategories, error:errorCategories, categories} = productCategoryList

    useEffect(()=>{
        dispatch(listProductCategories())
    },[dispatch])

    const handleMinMax = () =>{
        prices.forEach(p =>{
            if(p.name===price){
                setMax(p.max)
                setMin(p.min)
                return;
            }
        })
    } 
    
    return (
        <div>
            {loading
            ? <LoadingBox></LoadingBox> 
            : error
                ? <MessageBox variant='danger'>{error}</MessageBox> 
                :(
                <div className="search">
                    <div className="search-result">
                            <button>{count} Results</button>
                    </div>
                    <div className="search-filter-container">
                        <div className="search-filters">
                            <div className="search-filter">
                                <span className="search-filter-name">Sort by</span>

                                <select value = {order} onChange={e=>setOrder(e.target.value)}>
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="lowest">Price: Low to High</option>
                                    <option value="highest">Price: High to Low</option>
                                    <option value="toprated">Avg. Customer Reviews</option>
                                </select>
                            </div>
                            <div className="search-filter">
                                <span className="search-filter-name">Price</span>
                                <select value = {price} onChange={e=>setPrice(e.target.value)}>
                                    {
                                        prices.map((p, index)=>(
                                            <option key={index} className={`${p.min}-${p.max}`===`${min}-${max}`? 'active': ''} value={p.name}>{p.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="search-filter" style={{marginBottom:"2px"}}>
                                <span className="search-filter-name">Rating</span>
                                <select value = {rating} onChange={e=>setRating(e.target.value)}>
                                    {
                                        ratings.map((r, index)=>(
                                            <option key={index} className={`${r.rating}`===`${rating}`? 'active':''} value={r.rating}>
                                                {/* <Rating caption={" & up"} rating={r.rating}></Rating> */}
                                                {r.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="search-filter-categories">
                            {loadingCategories? <LoadingBox></LoadingBox> :
                                errorCategories? <MessageBox variant='danger'>{errorCategories}</MessageBox> :
                                (
                                    <>
                                        <div onClick={e=>setCategory('all')} className='search-filter-category' style={category ==='all'&& {fontWeight:"800"}}>
                                            Any
                                        </div>
                                        {categories.map(c=>
                                            (
                                                <><span style={{marginRight:"2rem"}}>|</span>
                                                <div key = {c} onClick={e=>setCategory(c)} className='search-filter-category' style={category=== c ? {fontWeight:"800"}:{}}>
                                                    {c}
                                                </div>
                                                </>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>

                    <div>
                        {loading
                        ? <LoadingBox></LoadingBox> 
                        :error
                            ? <MessageBox variant='danger'>{error}</MessageBox> 
                            :(<>
                            {products.length===0 &&  <MessageBox>No Product Found</MessageBox>}
                                <div className="search-products">
                                    {products.map(product=>(
                                        <div className="search-product">
                                                <SearchProduct key={product._id}  product = {product}/>
                                        </div>
                                    ))}
                                </div>
                            </>)
                            }
                    </div>

                </div>)
            }

                <nav aria-label="Pagination">
                    <ul className="pagination">
                        <li className="page-item" style={{borderRadius:"10px 0px 0px 10px"}} onClick={()=>setPage(1)}>
                            <i className="fas fa-backward" ></i>
                        </li>
                        {
                            pageRange.map((x, index)=>(
                                <li key={index} className={`page-item ${page===x+1 && 'page_active'}`} onClick={()=>setPage(x+1)}>{x+1}</li>
                            ))
                        }
                        <li className="page-item" style={{borderRadius:"0px 10px 10px 0px"}} onClick={()=>setPage(pageRange.length)}>
                            <i className="fas fa-forward" ></i>
                        </li>
                    </ul>
                </nav>


        </div>
    )
}

export default SearchScreen
