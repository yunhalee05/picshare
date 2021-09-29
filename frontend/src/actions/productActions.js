import { PRODUCT_DELETE_FAIL,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_REQUEST,PRODUCT_UPDATE_FAIL,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_REQUEST,PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_REVIEW_CREATE_REQUEST, PRODUCT_REVIEW_CREATE_SUCCESS, PRODUCT_REVIEW_CREATE_FAIL } from "../constants/productConstants"
import Axios from 'axios'

export const getProducts = () =>async(dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    });
    try{
        const res = await Axios.get('/api/products');
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:res.data});
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL, payload:error.message});
    }
}

export const listProducts = ({page, seller}) =>async(dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    });
    try{
        const res = await Axios.get(`/api/products?page=${page}&seller=${seller}`);
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:res.data});
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL, payload:error.message});
    }
}

export const searchProducts = ({name, category, min, max, rating,order, page, limit}) =>async(dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    });
    try{
        const res = await Axios.get(`/api/products?page=${page}&limit=${limit}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`);

        dispatch({type:PRODUCT_LIST_SUCCESS, payload:res.data});
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL, payload:error.message});
    }
}

export const detailsProduct = (productId) =>async(dispatch)=>{
    dispatch({
        type:PRODUCT_DETAILS_REQUEST, payload:productId
    });
    try{
        const {data} = await Axios.get(`/api/products/${productId}`);
        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL, payload:error.response && error.response.data.message? error.response.data.message:error.message})
    }

}

export const createProduct = (product,bodyFormData) =>async(dispatch, getState)=>{
    // console.log(product)
    dispatch({
        type: PRODUCT_CREATE_REQUEST
    })
    const {userSignin:{userInfo}} = getState();

    try{
        const{res} = await Axios.post('/api/uploads', bodyFormData,{
            headers:{'Content-Type':'multipart/form-data',
            Authorization:`Bearer ${userInfo.token}`}
        })

        product = {...product, image:res}

        const {data} = await Axios.post('/api/products',{body:product}, {
            headers: {Authorization : `Bearer ${userInfo.token}`}
        } )
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data.product
        })
    }catch(error){
        dispatch({type:PRODUCT_CREATE_FAIL, payload:error.response && error.response.data.message? error.response.data.message:error.message})
    }
}



export const updateProduct = (product, bodyFormData)=>async(dispatch, getState)=>{
    dispatch({
        type: PRODUCT_UPDATE_REQUEST,
        payload:product
    })
    const {userSignin:{userInfo}} = getState();

    try{
        const{data} = await Axios.post('/api/uploads', bodyFormData,{
            headers:{'Content-Type':'multipart/form-data',
            Authorization:`Bearer ${userInfo.token}`}
        })
        product = {...product, image:data}
        const {res} = await Axios.put(`/api/products/${product._id}`,product, {
            headers: {Authorization : `Bearer ${userInfo.token}`}
        } )
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:res
        })
    }catch(error){
        dispatch({type:PRODUCT_UPDATE_FAIL, payload:error.response && error.response.data.message? error.response.data.message:error.message})
    }
}


export const deleteProduct = (productId) =>async(dispatch, getState)=>{
    dispatch({
        type:PRODUCT_DELETE_REQUEST, payload:productId
    });
    const {userSignin:{userInfo}} = getState();
    try{
        const {data} = await Axios.delete(`/api/products/${productId}`,{
            headers: {Authorization : `Bearer ${userInfo.token}`}
    });
    
        dispatch({type:PRODUCT_DELETE_SUCCESS})

    }catch(error){
        dispatch({type:PRODUCT_DELETE_FAIL, payload:error.response && error.response.data.message? error.response.data.message:error.message})
    }

}

export const listProductCategories = () => async (dispatch) => {

    dispatch({
      type: PRODUCT_CATEGORY_LIST_REQUEST,
    });

    try {
      const res  = await Axios.get('/api/products/categories');
      dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
    }

  };

  export const createReview = (productId, review) =>async(dispatch, getState)=>{
    dispatch({
        type: PRODUCT_REVIEW_CREATE_REQUEST
    })
    const {userSignin:{userInfo}} = getState();

    try{
        const {data} = await Axios.post(`/api/products/${productId}/reviews`,review, {
            headers: {Authorization : `Bearer ${userInfo.token}`}
        } )
        dispatch({
            type:PRODUCT_REVIEW_CREATE_SUCCESS,
            payload:data.review
        })
    }catch(error){
        dispatch({type:PRODUCT_REVIEW_CREATE_FAIL, payload:error.response && error.response.data.message? error.response.data.message:error.message})
    }
}