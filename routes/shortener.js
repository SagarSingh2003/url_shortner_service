import {Router} from "express";
import {v4 as uuidv4} from "uuid";
import domain from "../domain/domain.js";
import urlData from "../model/urlData.js";

const router = Router();


router.get("/" , async (req , res) => {
   
    //get the link
    const link = req.query.link;
    console.log(link);
    
    //store the link with an id
    
    if(link){
        const id = uuidv4();
        
        await urlData.create({ _id : id , link : link});
            
        // return the url
        res.status(200).json({
            msg : "success",
            url : `${domain}/${id}`
        });

    }else{

        res.sendStatus(500);
    }

    
});

export default router;