const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
const app = express()
const mongoose = require("mongoose")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connection successful to database")
    } catch(err) {
        console.log(err)
    }
    
}
connectToDatabase()
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/products",productRoute)

app.listen(process.env.PORT,()=> {
    console.log(`server run in port ${process.env.PORT}`)
   
    
   
})