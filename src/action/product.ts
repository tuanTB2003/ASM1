import axios from "axios";
import {useState} from "react";

export const fetchProducts = () => async (dispatch: any) => {

    
    try {
        const {data} = await axios.get("http://localhost:3000/products");
        dispatch({type: "products/fetchProducts", payload: data});
        console.log(data);
        return data
    } catch (error: any) {
        return error.message
    } finally {
    }
};


export const deleteProduct = (id: any) => async (dispatch: any) => {
    const confirm = window.confirm("Are you sure you want to delete this product")
    try {
        if (confirm) {
            await axios.delete("http://localhost:3000/products/" + id)
            dispatch({type: "products/deleteProduct", payload: id})
        }


    } catch (error) { }
}
export const updateProduct = (product: any) => async (dispatch: any) => {
    try {
        const {data} = await axios.put("http://localhost:3000/products/" + product.id, {...product , name: "update Product"})
        console.log(data);
        dispatch({type: "products/updateProduct", payload: data})
    } catch (error) { }
}
