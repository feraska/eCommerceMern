const router = require("express").Router()
const {verifyTokenAndAdmin}  = require("./verifyToken")
const Product = require("../models/Product")
class APIfeatures{
  constructor(query,queryString){
    this.query = query
    this.queryString = queryString
}
 
  filtering(){
    if(!this.queryString.filters) {
      
      return this.query
    }
    const { filters } = this.queryString
    const filterJson = JSON.parse(filters)
    if(filterJson.color.length === 0 ) {
      filterJson.color = ["yellow","red","black","white","blue","blue"]
    }
    if(filterJson.size.length === 0 ) {
      filterJson.size = ["s","m","l","xk","xs"]
    }
   

    return this.query.find({
      $and:[
        { "color": {$in: [...filterJson.color]}},
        { "size": {$in: [...filterJson.size]}}
      ]
    })
}
  sorting() {
  const {filters,...others } = this.queryString
  if(!others.sort) {
    return this.query.sort('-createdAt')
  }
  if(others.sort === "newest") {
    return this.query.sort('-createdAt')
  }
  if(others.sort === "asc") {
    return this.query.sort('-price')
  }
  if(others.sort === "desc") {
    return this.query.sort('price')
  }
}
pagination() {
  if(!this.queryString.page) {
    return this.query
  }
  const page = this.queryString.page *1 || 1
  // console.log("page",page)
   const limit = this.queryString.limit *1 || 6
 //  console.log("limit",limit)
   const skip = (page - 1) * limit
 //  console.log("skip",skip)
   this.query = this.query.skip(skip).limit(limit)
   //console.log("query",this.query)
  return this.query
}
run() {
  this.filtering()
  this.sorting()
  this.pagination()
  
  return this.query
}
runWithOut() {
  this.filtering()
  return this.query
}
}

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      return res.status(200).json(savedProduct);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  //UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedProduct);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json("Product has been deleted...");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  //GET PRODUCT
  router.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  //GET ALL PRODUCTS
  router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let features;
      let api;
      if (qNew) {
        features = new APIfeatures(Product.find().sort({ createdAt: -1 }).limit(1),req.query);
        api = new APIfeatures(Product.find().sort({ createdAt: -1 }).limit(1),req.query)
        
      } else if (qCategory) {

        features = new APIfeatures(
          Product.find({
            categories: {
              $in: [qCategory],
            },
          })
          ,req.query
        )

        api = new APIfeatures(
          Product.find({
            categories: {
              $in: [qCategory],
            },
          })
          ,req.query
        )
      } else {
        features = new APIfeatures(Product.find(),req.query)
        api = new APIfeatures(Product.find(),req.query)
      }
       
            const products = await features.run()
            const total = await api.runWithOut().countDocuments()
     // console.log(products.length)
      
      return res.status(200).json({"products":products,"total":total});
    } catch (err) {
      console.log(err)
      return res.status(500).json(err);
    }
  });
module.exports = router