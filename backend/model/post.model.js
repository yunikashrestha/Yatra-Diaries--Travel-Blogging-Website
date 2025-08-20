const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    photo:{
        type:String,
        required:true
    }  

},{ timestamps:true });

const post=mongoose.model("Post",postSchema)
module.exports=post

