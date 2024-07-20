import {Schema , model} from "mongoose";

const urlDataSchema = new Schema({
   
    _id : {type : String , required : true },
    link : { type : String , required : true},
    analytics : [{
            visitTime : Date,
            referer: String,
            ip : String
    }]

});

const urlData = model('urlData'  , urlDataSchema);

export default urlData;