const mongoose=require('mongoose');
let Employee = mongoose.model(
    'Employee',
    {
        name:String,
        lastname:String,
        image:String,
        tel:String,
        email:String,
        address:String,
        idDep:String,
    }
)


module.exports=Employee;