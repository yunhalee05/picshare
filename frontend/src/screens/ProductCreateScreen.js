import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import {productCategory} from '../utils'

function ProductCreateScreen(props) {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('Landscape')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)

    
    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate} = productCreate

    const dispatch = useDispatch()

    useEffect(() => {
        if(successCreate){
            dispatch({
                type:PRODUCT_CREATE_RESET
            })
            props.history.goBack()
        }
    }, [ dispatch, props.history, successCreate])




    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const uploadFileHandler= async(e)=>{
        const file = e.target.files[0]//하나의 파일만 업로드가능
        setImage(file)
    }

    const submitHandler= (e)=>{

        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('image', image);
        dispatch(createProduct({name, price, countInStock, category, brand, description}, bodyFormData));
    }

    return (
        <div className="edit-product">
            <form onSubmit= {submitHandler} className="edit-form" >
                <div className="edit-title-container">
                    <div className="edittitle" >CREATE PRODUCT</div>
                </div>
                {loadingCreate
                ? <LoadingBox></LoadingBox> 
                :errorCreate
                    ? <MessageBox variant='danger'>{errorCreate}</MessageBox>
                    :<>
                        <div>
                            <label htmlFor="name">NAME</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="price">PRICE</label>
                            <input
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="image">IMAGE</label>
                            <div className="editproduct_image_container">
                                <div className="editproduct_image">
                                {
                                    image 
                                    && <img src={URL.createObjectURL(image)} alt="" />
                                }
                                </div>
                                <span className="createproduct_image_upload">
                                    <i className="fas fa-camera" ></i>
                                    <input type="file" id = "imageFile" label="Choose Image" onChange={uploadFileHandler}/>
                                </span>

                            </div>
                        </div>

                        {loadingUpload && <LoadingBox></LoadingBox>}
                        {errorUpload && <MessageBox variant='danger'>{errorUpload}</MessageBox>}
                        <div>
                            <label htmlFor="category">CATEGORY</label>
                            <select name="category" onChange={(e)=>setCategory(e.target.value)}>
                                {
                                    productCategory.map((c, index)=>(
                                        <option selected={c===category? true:false} value={c}>{c}</option>
                                    ))
                                }
                            </select>
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
                                type="number"
                                placeholder="Enter countInStock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                                required
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
                                required
                            ></textarea>
                            </div>
                        <div className="edit-button">
                            <button type="submit" >
                                Create
                            </button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default ProductCreateScreen
