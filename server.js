import cors from "cors";
import express from "express";
import shortenerRoute from "./routes/shortener.js";
import urlData from  "./model/urlData.js"
import geoip from "geoip-lite";
import "./db/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();

app.set("trust proxy" , true);

app.use(cors());

app.use(express.json());

app.use("/shorten" , shortenerRoute );

app.get("/:id" , async(req , res) =>{

    console.log(req.ip);
    console.log(req.headers);
    const id = req.params.id;
    
    //get data from hashmap
    const query = urlData.where({ _id: `${id}` });
    const data = await query.findOne();

    const referer = req.headers.referer;
    const ip = req.ip;
    const visitTime = Date.now();    

    const geo = geoip.lookup(ip);

    console.log(referer);

    const updateData = await urlData.findByIdAndUpdate(`${id}`, { $push : {analytics : {visitTime : visitTime , ip : ip , referer : referer , geo : geo}}});
    
    
    res.redirect(data.link);

});

app.listen(PORT , () => {
    console.log(`app listening on port ${PORT}`)
})