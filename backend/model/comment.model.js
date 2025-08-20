const mongoose=require('mongoose')
const commentSchema=mongoose.Schema(
    {
    caption:{
        type:String,
        required:true

    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'

    },
    postId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Post'
       

    }

    }
,{ timestamps:true });

const comment=mongoose.model("Comment",commentSchema)
module.exports=comment
