import { deleteProduct, fetchProducts, updateProduct} from '@/action/product'
import axios from 'axios'
import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {}

const ListProduct = (props: Props) => {

  const [valueInput , setValue] = useState('')
  const dispatch: Dispatch<any> = useDispatch()
  const { products } = useSelector((state: any) => state.products)
  console.log(products);
  
  useEffect(()=>{
      dispatch(fetchProducts());
  },[])

  const addProduct = (newData: any) => async (dispatch: any) => {
    const newData = {
      name: valueInput
    }
    const { data } = await axios.post(`http://localhost:3000/products`, newData)
    dispatch({type: 'products/addProduct', payload: data})
    setValue('')
}

  const onhanleChange = (e: any) => {
    console.log(e.target.value);
    
    setValue(e.target.value)
  }  

  return (
    <div>
      {products?.map((product: any) => {
        return (
          <div key={product.id}>
             <h2>{product.name}</h2>
             {/* <button onClick={()=> deleteProduct(product)}>Delete</button> */}
             <button onClick={()=> dispatch(updateProduct(product))}>Update</button>
            <button onClick={() => dispatch(deleteProduct(product.id))}>detele</button>

          </div>
        )
      })}
         <input type="text" value={valueInput} onChange={onhanleChange}/>
      <button onClick={()=> dispatch(addProduct({name: valueInput}))}>Add</button>
    </div>
  )
}

export default ListProduct