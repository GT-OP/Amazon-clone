//BASIC REDUCER TEMPLATE FOR REDUX
const products = [];

//BELOW IS THE REDUCER FUNCTION IN REDUX
//INITIALLY WE HAVE DEFINED THE STATE AS EMPTY
export const getProductsReducers = (state = {products},action)=>{
    switch(action.type){
        case "SUCCESS_GET_PRODUCTS":
            return {products:action.payload}
        case "FAIL_GET_PRODUCTS":
            return {error:action.payload}
        default : return state
    }
}