const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();

const multer = require("multer");
let filename = "";
const mystorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    let date = Date.now();
    //  6677746637
    //  image/png
    // [ 'image' , 'png']
    let fl = date + "." + file.mimetype.split("/")[1];
    //786876876.png
    redirect(null, fl);
    filename = fl;
  },
});
const upload = multer({ storage: mystorage });
//ajout client
router.post("/ajout", upload.any("image"), (req, res) => {
  let data = req.body;
  let emp = new Employee(data);
  emp.image = filename;
  emp
    .save()
    .then((savedEmployee) => {
      filename = "";
      console.log(savedEmployee);
      res.send(savedEmployee);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});
//get Employee
router.get("/all", (req, res) => {
  Employee.aggregate(

      [

        // {
        //   $project:{
        //     name: 1,
        //     _id: 0,
        //     email: 1
        //   }
        // }

        {
          $lookup:{
            from: 'departements',
            localField: 'idDep',
            foreignField: '_id',
            as: 'departement'

          }

        }

        // ,
        // {
        //   $skip: 2
        // },
        // {
        //   $limit: 1
        // }
        
      



      ]

    )


    .then((allemployee) => {
      res.send(allemployee);
    })
    .catch((error) => {
      res.send(error);
    });
});
//get Employee by id
router.get("/getbyid/:id", (req, res) => {
  let myid = req.params.id;
  Employee.findOne({ _id: myid })
    .then((Employee) => {
      res.send(Employee);
    })
    .catch((error) => {
      res.send(error);
    });
});
//update Employee

router.put("/update/:id" , upload.any("image") , (req, res) => {
  let id = req.params.id;
  let newData = req.body;

  if(filename.length > 0){
    newData.image = filename;
  }

  Employee.findOneAndUpdate({ _id: id }, newData)
    .then((updatedEmployee) => {
      filename = '';
      res.send(updatedEmployee);
    })
    .catch((err) => {
      res.send(err);
    });
});
//delete Employee
router.delete("/supprimer/:id", (req, res) => {
  let id = req.params.id;
  Employee.findByIdAndDelete({ _id: id })
    .then((deletedEmployee) => {
      res.send(deletedEmployee);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
