import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct, updateProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen(props) {

    const productId = props.match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState('')
    
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} =productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate

    const dispatch = useDispatch()
    useEffect(() => {
        if(successUpdate){
            props.history.push('/productlist');
        }
        if(!product || product._id!== productId ||successUpdate){//만약 상품을 가져오지 못했으면 백엔드에서 불러온다. 
            dispatch({
                type:PRODUCT_UPDATE_RESET
            })
            dispatch(detailsProduct(productId))
        }else{//만약 있으면 
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setImage(product.image);
            setDescription(product.description);
            setBrand(product.brand);
            setCountInStock(product.countInStock);
        }
    }, [product, dispatch, productId, successUpdate, props.history])

    const submitHandler= (e)=>{
        e.preventDefault();
        dispatch(updateProduct({_id:productId, name, price, countInStock, category, brand, image, description}));
    }

    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const uploadFileHandler= async(e)=>{
        const file = e.target.files[0]//하나의 파일만 업로드가능
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try{
            const{data} = await axios.post('/api/uploads', bodyFormData,{
                headers:{'Content-Type':'multipart/form-data',
                Authorization:`Bearer ${userInfo.token}`}
            })
            setImage(data)
            setLoadingUpload(false);
        }catch(error){
            setErrorUpload(error.message)
            setLoadingUpload(false)
        }

    }
    return (
        <div className="edit-product">
            <form onSubmit= {submitHandler} className="edit-form" >
                <div className="edit-title-container">
                    <div className="edittitle" >EDIT PRODUCT</div>
                </div>
                <div className="edit-id-container">
                    <div className="edit-id">
                        ID : <span className="id">{productId}</span>
                    </div>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                {loading
                ? <LoadingBox></LoadingBox> 
                :error
                    ? <MessageBox variant='danger'>{error}</MessageBox>
                    :<>
                        <div>
                            <label htmlFor="name">NAME</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="price">PRICE</label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="image">IMAGE</label>
                            <input
                                id="image"
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="imageFile">IMAGEFILE</label>
                            <input type="file" id = "imageFile" label="Choose Image" onChange={uploadFileHandler}/>
                        </div>
                        {loadingUpload && <LoadingBox></LoadingBox>}
                        {errorUpload && <MessageBox variant='danger'>{errorUpload}</MessageBox>}
                        <div>
                            <label htmlFor="category">CATEGORY</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="brand">BRAND</label>
                            <input
                                id="brand"
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="countInStock">COUNT IN STOCK</label>
                            <input
                                id="countInStock"
                                type="text"
                                placeholder="Enter countInStock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></input>
                        </div>
                            <div>
                            <label htmlFor="description">DESCRIPTION</label>
                            <textarea
                                id="description"
                                rows="3"
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            </div>
                        <div className="edit-button">
                            <button type="submit" >
                                Update
                            </button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default ProductEditScreen
