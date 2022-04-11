const mongoose=require('mongoose');
let Client = mongoose.model(
    'Client',
    {
        name:String,
        description:String,
        entreprise:String,
        titreprojet:String,
        image:String
    }
)


module.exports=Client;