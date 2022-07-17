const mongoose=require("mongoose");
const schema =mongoose.Schema;

const PersonSchema=new schema({
    name:
    {
        type:String,
        required:true,
    },
    age:Number,
    email:{
        type:String,
        required:true,
        unique:true,
            },
    favoriteFoods:[String]
});

// create model in DB
// our model named "person"
// mongoose will be created automatically a new collection in DB named "people" 
module.exports=Person=mongoose.model("Person",PersonSchema);