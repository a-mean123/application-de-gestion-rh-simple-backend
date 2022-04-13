const mongoose=require('mongoose');
let objectId = require('mongodb').ObjectId;
let Employee = mongoose.model(
    'Employee',
    {
        name:String,
        lastname:String,
        image:String,
        tel:String,
        email:String,
        address:String,
        idDep:objectId,
    }
)


module.exports=Employee;