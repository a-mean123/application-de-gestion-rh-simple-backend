const mongoose=require('mongoose');
let Employee = mongoose.model(
    'Employee',
    {
        name:String,
        lastname:String,
        image:String,
        tel:Number,
        email:String,
        address:String,
        idDep:Number,
    }
)


module.exports=Employee;