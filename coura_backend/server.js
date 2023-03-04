const express= require('express')
const cors=require('cors')
const PORT = 80;
const app=express()
const bodyParser=require('body-parser')
const path=require('path')

//middle-ware
app.use(bodyParser.json({limit : "50mb"}))
app.use(bodyParser.urlencoded({extended: true, limit : "50mb"}))

//cors
app.use((req,res,next) => {
    req.headers("Access-Control-Allow-Origin","*")
    req.headers("Access-Control-Allow-Headers","*");
    next()

})

//routes
app.use("/uploads", express.static(path.join(__dirname,"/../uploads")))
app.use("/uploads", express.static(path.join(__dirname,"/../coura-frontend/build")));
app.get("*",(req,res) => {
    try{
        res.sendFile(path.join(`${__dirname}/../coura-frontend/build/index.html`));
    }
    catch(e){
        res.send("Oops! unexpected error");
    }
})
app.use(cors());
app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on port no ${PORT}`);
  });