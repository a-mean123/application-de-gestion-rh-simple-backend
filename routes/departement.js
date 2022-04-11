const express = require('express');
const Departement = require('../modules/departement');
const router = express.Router();

//ajout Departement 
router.post('/ajout', (req, res) => {
    let data = req.body;
    let dep = new Departement(data);
    dep.save()
        .then(
            (savedDepartement) => {
                console.log(savedDepartement);
                res.send(savedDepartement)
            })
        .catch(
            (error) => {
                console.log(error);
                res.send(error);
            }
        )
});
//get Departement
router.get('/all', (req, res) => {
    Departement.find()
        .then(
            (alldepartement) => {
                res.send(alldepartement)
            }
        )
        .catch(
            (error) => {
                res.send(error)
            }
        )
}
)
//get Departement by id
router.get('/getbyid/:id', (req, res) => {
    let myid = req.params.id;
    Departement.findOne({ _id: myid })
        .then(
            (Departement) => {
                res.send(Departement)
            }
        )
        .catch(
            (error) => {
                res.send(error);
            }
        )
}
)
//update Departement
router.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let newData = req.body;
    Departement.findOneAndUpdate(
        { _id: id },
        newData
    )
        .then(
            (updatedDepartement) => {
                res.send(updatedDepartement)
            }
        )
        .catch(
            (err) => {
                res.send(err)
            })
});
//delete Departement
router.delete('/supprimer/:id', (req, res) => {
    let id = req.params.id;
    Departement.findByIdAndDelete({ _id: id })
        .then(
            (deletedDepartement) => {
                res.send(deletedDepartement);
            }
        )
        .catch((err) => {
            res.send(err);
        })
});


module.exports = router;