const express = require("express")
const mongoose = require("mongoose")
require("dotenv/config")
const bodyParser = require("body-parser")
const verifyToken = require("./middleware/verifyToken")

const productsRouter = require("./routes/products")
const authRouter = require("./routes/auth")

const app = express();
app.use(bodyParser.json())

const isLoggined = true; 

app.use((req,res,next)=>{
    if(isLoggined)
        next()
    else
        res.send("You must be loggen in to view this page")
})
app.get("/",(req,res)=>{
    res.send("Login is successfull Welcome")
})

//router 
app.use('/auth',authRouter);
app.use('/products',verifyToken,productsRouter);

app.listen(3000,()=>{
    console.log("Sunucu 3000 Portunda Hazır");
})

//mongo db bağlantısı
const serverUri = "mongodb+srv://{username}:{password}@cluster0.jak5e.mongodb.net/?retryWrites=true&w=majority"
const localUri = "mongodb://0.0.0.0:27017/"+process.env.DATABASE_NAME
mongoose.connect(localUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then((result)=>{
    console.log("MongoDB connection successfull");
}).catch((err)=>{
    console.log(err);
});
