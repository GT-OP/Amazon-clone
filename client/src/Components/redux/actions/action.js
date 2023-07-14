//IT IS USED TO SEND DATA AS PAYLOAD TO STORE VIA REDUCERS
export const getProducts= ()=>async(dispatch) =>{

    try{
        //we can also use axios alternatively but we'll use fetch
        //we have applied proxy dependency in package.json file of frontend , no need to mention port number of server 
        const data = await fetch("/getproducts",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const res = await data.json();
        //console.log(res);
        //If there is no error then this data will be sent ot reducer functions
        dispatch({type:"SUCCESS_GET_PRODUCTS",payload:res});
    }
    catch(error)
    {
        dispatch({type:"FAIL_GET_PRODUCTS",payload:error.response});
        console.log("error_in_action.js+in_redux_folder= "+error.message);
    }
}