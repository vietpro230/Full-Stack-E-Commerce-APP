import { toast } from "react-toastify";
import SummaryApi from "../common";

const addToCart =  async(e, id) => {
    e?.stopPropagation();
    e?.preventDefault();
    const respone = await fetch(SummaryApi.addToCart.url, {
        method: SummaryApi.addToCart.method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
                productId : id
        })
    })

    const responseData = await respone.json();

    if(responseData.success){
        toast.success(responseData.message)
    }
    if(responseData.error){
        toast.error(responseData.message)
    }
    return responseData;

}



export default addToCart;