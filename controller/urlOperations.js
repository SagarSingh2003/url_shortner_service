import urlData from  "../model/urlData.js"
import geoip from "geoip-lite";
import {v4 as uuidv4} from "uuid";
import domain from "../domain/domain.js";

const urlOperations = {

    getLinkAndUpdateAnalytics : async (req , res) => {

        const id = req.params.id;
        
        const referer = req.headers.referer;
        const ip = req.ip;
        const visitTime = new Date(Date.now()); 
    
        const geo = geoip.lookup(ip);

        console.log(req.cookies);


        try{

            const data = await urlData.findByIdAndUpdate(`${id}`, 
                
                { 
                    $push : {
                        
                        analytics :{
                                    visitTime : visitTime ,
                                    ip : ip ,
                                    referer : referer ,
                                    geo : geo
                        
                                    }
                    }
                }
            );
            
            
            res.cookie('user_id', 1111111111111111111111111 , { maxAge: 30 * 24 * 60 * 60 * 1000 });

            res.redirect(data.link);
        }catch(err){
            res.sendStatus(500)
        }
    
    } , 

    generateLink : async (req , res) => {
   
        //get the link
        const link = req.query.link;
        
        //store the link with an id
        if(link){
            const id = uuidv4();

            try{
    
                await urlData.create({
                     _id : id , 
                    link : link
                });
                          
                // return the url
                res.status(200).json({
                    msg : "success",
                    url : `${domain}/${id}`
                });
    
            }catch(e){
    
                console.log(e);
                res.sendStatus(500);
    
            }  
    
        }else{
    
            res.sendStatus(500);
        }
    
        
    }
};

const logEvent = (userId , event) => {
    console.log(userId , event , "information")
}


export default urlOperations;