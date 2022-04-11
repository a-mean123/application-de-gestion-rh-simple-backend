const express=require('express');
const mongoose=require('./config/connect');

const cors = require('cors');

const adminRoute=require('./routes/admin');
const clientRoute=require('./routes/client');
const departementRoute=require('./routes/departement');
const employeeRoute=require('./routes/employee');

const app=express();
app.use(express.json());
app.use(cors());

app.use('/admin',adminRoute);
app.use('/client',clientRoute);
app.use('/departement',departementRoute);
app.use('/employee',employeeRoute);


app.use( '/getimage' , express.static('./uploads')  );

app.listen(
    3000,
    ()=>{
        console.log('server work');
    }
)