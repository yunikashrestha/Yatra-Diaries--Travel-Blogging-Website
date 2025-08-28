const mongoose=require('mongoose')

const userSchema=mongoose.Schema(
    {
        fullname:{
            type:String,
            required:[true,"Please fill username"]
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
    },
    {
    timestamps:true,
    }
)

const user=mongoose.model("User",userSchema);
module.exports=user;