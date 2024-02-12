import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components"
import {Search, ShoppingCartOutlined} from '@mui/icons-material';
import { Badge } from '@mui/material';
import axios from "axios"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userRedux';
const Container = styled.div`
    height: 60px;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size:14px;
    cursor: pointer;
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    position: relative;
    cursor: pointer;
    box-shadow: 0 2px 10px 0px rgba(0, 0, 0, 0.25);
`
const Input = styled.input`
  border: none;
  outline: none;
  font-size:16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
  }
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
  font-weight: bold;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    a {
    text-decoration:none;
    color: black;
    }
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`
const Box = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  position: absolute;
  left: 0;
  top: 25px;
  z-index: 9999;
  width: 100%;
  max-height: 350px;
  padding: 0;
  margin: 0;
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Data = styled.div`
  
  
  padding: 5px;
  a {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-decoration:none;
  color: black;
  width: 100%;
  height: 100%;
  }
  &:hover {
    background: #3498db;
    color: white;
    cursor: pointer;
    
  }
  
`
const Image = styled.img`
  
  border-radius:50%;
 
  object-fit: cover;
  width: 50px;
  height: 50px;
`;
const Label = styled.label`
font-size: 16px;
width: 100%;
cursor: pointer;
`

const Navbar = () => {
    const [products, setProducts] = useState([]);
    const [onFocus,setOnFocus] = useState(false)
    const [copyProducts,setCopyProducts] = useState([])
    const quantity = useSelector(state=>state.cart.quantity)
    const currentUser = useSelector(state=>state.user.currentUser)
    const dispatch = useDispatch()
   
    const newRef = useRef(null);
    useEffect(() => {
        
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      },[]);
    const handleOutsideClick = (e) => {
      if (newRef.current && !newRef.current.contains(e.target)) {
        setOnFocus(false)
      } else {
        setOnFocus(true)
      }  
    };
    useEffect(() => {
        const getProducts = async () => {
          
          
          
          try {
              const res = await axios.get(
             
                
                `http://localhost:5000/api/products`
                
           );
          setProducts(res.data.products)
          setCopyProducts(res.data.products)
          } catch (err) {}
        };
          getProducts(); 
        
      }, []);
      const handleChange = (e) => {
        const text = e.target.value.toLowerCase()
        
        const dataFilter = copyProducts.filter((item)=>(
          item.title.includes(text)
        ))
        setProducts(dataFilter)
      }
      const exit = () => {
        dispatch(logout())
      }
    return (
       <Container>
        <Wrapper>
            <Left>
                <Language>En</Language>
                <SearchContainer ref={newRef}>
                   
                    <Input onChange={(e)=>handleChange(e)}/>
                    <Search style={{ color: "gray", fontSize: 16 }} />
                    <Box style={{
                    display:onFocus?"block":"none"
                    }}> 
                {products?.map((item,i)=>(
                
                <Data key={i}>
                    <Link to={`/product/${item._id}`}>
                    
                {item.img&&<Image src={item.img}/>}
                <Label>{item.title}</Label>
                </Link>
        
                </Data>
                
                ))}
        
      </Box>
      
                </SearchContainer>
            </Left>
            <Center>
                <Logo>{currentUser?.username}</Logo>
            </Center>
            <Right>
              {
              !currentUser&&
              <Link to="/login">
              <MenuItem>Login</MenuItem>
              </Link>
             
              }
              {
              currentUser &&
              <MenuItem onClick={exit}>Logout</MenuItem>
              }
            <Link to="/">
            <MenuItem>Home</MenuItem>
            </Link>
           
            <Link to="/cart">
            <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
              </Badge>
              </MenuItem>
              </Link>
            </Right>
        </Wrapper>
       </Container>
    )
}


export default Navbar;