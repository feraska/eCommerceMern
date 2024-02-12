import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import {useParams} from "react-router-dom"
import { React,useEffect,useRef,useState } from "react";
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
 
  
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  width: 100%;

`;
const Option = styled.option`

`;
const ContainerSearch = styled.div`
  position: relative;
  width: 100%;
 
  box-shadow: 0 2px 10px 0px rgba(0, 0, 0, 0.25);
  
  
  `
const Checkbox = styled.input.attrs({
  type:"checkbox",
})
`
margin-right:0.2rem;
cursor: pointer;

`;
const Label = styled.label`
font-size: 16px;
width: 100%;
cursor: pointer;
`
const Search = styled.input.attrs({
  type:"text"
})
`

border:none;
outline:none;
font-size:16px;
border-bottom: 1px solid rgba(0, 0, 0, 0.1);
padding:5px;
`;


const Box = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  position: absolute;
  left: 0;
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
  
  width: 100%;
  padding: 5px;
  &:hover {
    background: #3498db;
    color: white;
    cursor: pointer;
    
  }
  
`
const FilterProduct = styled.div`
  display: flex;
  justify-content: space-between;
  
  gap: 2rem;
`
const FilterSearch = ({data,setData,onfocus,setOnFocus,copyData,text,name,dataSelected,setDataSelected})=> {
  const newRef = useRef(null);
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setOnFocus(false)
    } else {
      setOnFocus(true)
    }  
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior:"smooth"
    });
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  },[]);
  const handleChange = (e) => {
    const text = e.target.value.toLowerCase()
    const dataFilter = copyData.filter((item)=>(
      item.includes(text)
    ))
    setData(dataFilter)
  }
  const checkClick = (i) => {
     const checkboxes = document.getElementsByClassName(`${name}`)
     let data = []
     if(checkboxes[i].checked === true) {
      checkboxes[i].checked = false
      data = dataSelected.filter((item)=>item!=checkboxes[i].value)
     } else {
      checkboxes[i].checked = true
      data = [...dataSelected,checkboxes[i].value]
     }
     setDataSelected(data)

  }
  
     
 
  return(
    <ContainerSearch  ref={newRef}>
        <Search 
        onChange={(e)=>handleChange(e)}
        placeholder={dataSelected.length?dataSelected.length:text}
        />
       <Box style={{
        display:onfocus?"block":"none"
       }}> 
       {data?.map((item,i)=>(
         <Data  key={item} onClick={()=>checkClick(i)}>
         <Label htmlFor={item}>
         <Checkbox value={item} className={name}  />
          {item}
          </Label>
        
        
        </Data>
       ))}
        
      </Box>
        
        
        </ContainerSearch>
  )
  
    }
const ProductList = () => {
  const colorsCopy = [
    "white","black","red","blue","yellow","green"
  ] 
  const sizesCopy = [
    "xs","s","m","l","xl"
  ]
  const [colors,setColors] = useState(
    [
      "white","black","red","blue","yellow","green"
    ] 
  )
  const [sizes,setSizes] = useState(
    [
      "xs","s","m","l","xl"
    ]
  )
  const [onfocusColor,setOnFocusColor] = useState(false)
  const [onfocusSize,setOnFocusSize] = useState(false)
  const cat = useParams().category
  const [selectedColor,setSelectedColor] = useState([])
  const [selectedSize,setSelectedSize] = useState([])
  const [filters, setFilters] = useState({
   
  });
  const [sort, setSort] = useState("newest");
  const handleFilters = (e) => {
    setFilters(
    
    
    {...filters,[e.target.name]:e.target.value}
    )
  }
  // const handleScroll = () => {
   
  //   if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
  //     return;
  //   }
    
  // };
  // useEffect(()=>{
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // },[]
  // )

  return (
    <Container >
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <FilterProduct>
          <FilterSearch 
          data={colors} 
          setData={setColors} 
          onfocus={onfocusColor} 
          setOnFocus={setOnFocusColor}
          copyData={colorsCopy}
          text="color.."
          name={"ch1"}
          dataSelected={selectedColor}
          setDataSelected={setSelectedColor}
          />
          <FilterSearch 
          data={sizes} 
          setData={setSizes} 
          onfocus={onfocusSize} 
          setOnFocus={setOnFocusSize}
          copyData={sizesCopy}
          text="size.."
          name={"ch2"}
          dataSelected={selectedSize}
          setDataSelected={setSelectedSize}
          />
          </FilterProduct>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
        
      </FilterContainer>
      <Products cat={cat} filters={{"color":selectedColor,"size":selectedSize}} sort={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;