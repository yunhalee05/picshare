import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductCategories, listProducts } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import {Link, useParams} from 'react-router-dom'
import { prices, ratings } from '../utils';
import Rating from '../components/Rating';

function SearchScreen(props) {
    const {name = 'all', category='all', min=0, max=0, rating=0, order='newest', pageNumber=1} = useParams();
    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts({name:name!=='all'? name: '', category:category !=='all'? category:'', min, max,rating,order,pageNumber}))
    }, [pageNumber,category, dispatch,name,min, max,rating,order])

    const productCategoryList = useSelector(state => state.productCategoryList)
    const {loading:loadingCategories, error:errorCategories, categories} = productCategoryList
    useEffect(()=>{
        dispatch(listProductCategories())
    },[dispatch])

    const getFilterUrl = (filter) =>{
        const filterPage = filter.page ||pageNumber;
        const filterCategory = filter.category ||category;
        const filterName = filter.name ||name;
        const filterMin = filter.min? filter.min :filter.min===0? 0:min;
        const filterMax = filter.max? filter.max :filter.max===0? 0:max;
        const filterRating = filter.rating||rating;
        const sortOrder = filter.order||order;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`
    }
    return (
        <div>
            <div className="row" >
                {loading? <LoadingBox></LoadingBox> :
                error? <MessageBox variant='danger'>{error}</MessageBox> :
                (<div style={{"fontSize":"1.4rem", "marginLeft":"2rem","padding":"1rem","borderRadius":"50%", "border":"1px solid black", "backgroundColor":"black", "color":"white"}}>
                    {products.length} Results
                </div>
                )}
                <div>
                    Sort by {' '}
                    <select value = {order} onChange={e=>props.history.push(getFilterUrl({order:e.target.value}))}>
                        <option value="newest">Newest Arrivals</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="highest">Price: High to Low</option>
                        <option value="toprated">Avg. Customer Reviews</option>
                    </select>
                </div>
            </div>
            <div className="row top">
                <div className="col-1" style={{"paddingLeft":"3rem", "marginTop":"1rem"}}>
                    <div>
                        <div className="search-filter">
                            Category
                        </div>
                        {loadingCategories? <LoadingBox></LoadingBox> :
                        errorCategories? <MessageBox variant='danger'>{errorCategories}</MessageBox> :
                        (
                            <ul style={{"fontSize":"2rem", "padding":"3rem"}}>
                                <li >
                                    <Link to ={getFilterUrl({category:'all'})} className={'all'==='category'? 'active':''}>Any</Link>
                                </li>
                                {categories.map(c=>
                                    (
                                        <li key = {c}>
                                            <Link to ={getFilterUrl({category:c})} className={c===category? 'active':''}>{c}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        )}
                    </div>
                    <div>
                        <div className="search-filter">
                            Price
                        </div>
                        <ul style={{"fontSize":"2rem", "padding":"3rem"}}>
                            {prices.map(p=>(
                                <li key={p.name}>
                                    <Link className={`${p.min}-${p.max}`=== `${min}-${max}`? 'active':''} to={getFilterUrl({min:p.min, max:p.max})} >{p.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="search-filter">
                            Reviews
                        </div>
                        <ul style={{"fontSize":"2rem", "padding":"3rem"}}>
                            {ratings.map(r=>(
                                <li key={r.name}>
                                    <Link className={`${r.rating}`===`${rating}`? 'active':''} to={getFilterUrl({rating:r.rating})} ><Rating caption={" & up"} rating={r.rating}></Rating></Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-3">
                    {loading? <LoadingBox></LoadingBox> :
                    error? <MessageBox variant='danger'>{error}</MessageBox> :
                    (<>
                        {products.length===0 &&  <MessageBox>No Product Found</MessageBox>}
                        <div className="row center">
                            {products.map(product=>(
                                <div className="col-1">

                                    <Product key={product._id}  product = {product}/> 
                                </div>
                            ))}
                        </div>
                        <div className="row center pagination">
                            {
                                [...Array(pages).keys()].map((x)=>(
                                    <Link to={getFilterUrl({page:x+1})} className={x + 1 === page ? 'active' : ''} key = {x+1} >{x+1}</Link>
                                ))
                            }
                        </div>
                    </>)
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchScreen
