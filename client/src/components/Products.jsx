import styled from "styled-components";

import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    
`;
const Pages = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 1rem;
  button {
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 20px;
      color: blue;
      &:hover {
        color: black;
      }
    }
`
const Items = styled.div`
  display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
   
`

const Products = ({ cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [page,setPage] = useState(1)
  const [total,setTotal] = useState(3)
  const arr = new Array(total).fill(null)
  //const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      
      const limit = 6
      
      try {
          const res = await axios.get(
         
            cat?
            `http://localhost:5000/api/products?category=${cat}&filters=${JSON.stringify(filters)}&sort=${sort}&page=${page}`
            :`http://localhost:5000/api/products?page=${page}`
            
       );
       setProducts(res.data.products);
       setTotal(Math.ceil(res.data.total/limit))
       
      } catch (err) {}
    };
      getProducts(); 
    
  }, [filters,sort,page]);
  
  // useEffect(() => {
  //   cat &&
  //     setFilteredProducts(
  //       products.filter((item) =>
  //         Object.entries(filters).every(([key, value]) =>
  //           item[key].includes(value)
  //         )
  //       )
  //     );
  // }, [products, cat, filters]);
  // useEffect(() => {
  //   if (sort === "newest") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.createdAt - b.createdAt)
  //     );
  //   } else if (sort === "asc") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.price - b.price)
  //     );
  //   } else {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => b.price - a.price)
  //     );
  //   }
  // }, [sort]);
  return (
    <Container>
      <Items>
      {products.map((item=>(<Product item={item} key={item._id} />)))}
      </Items>
      <Pages>
      {arr.map((item,index)=>(
        <button key={index} onClick={()=>setPage(index+1)}>{index+1}</button>
      ))}
      </Pages>
       {/* {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)} */}
    </Container>
  );
};

export default Products;