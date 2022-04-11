const express = require('express');
const Admin = require('../modules/admin');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//registre admin
router.post('/registre', (req, res) => {
    let data = req.body;
    let adm = new Admin(data);
    let cle = bcrypt.genSaltSync(10);
    let cryptedPass = bcrypt.hashSync(data.password, cle);
    adm.password = cryptedPass
    adm.save()
        .then(
            (saved) => {
                res.send(saved)
            }
        )
        .catch(
            (err) => {
                res.send(err)
            }
        )
});

//login admin
router.post('/login', (req, res) => {
    let data = req.body;
    Admin.findOne({ email: data.email })
        .then(
            (foundedAdmin) => {
                let valide = bcrypt.compareSync(data.password, foundedAdmin.password)
                if (!valide) {
                    res.send('email or password invalid')
                } else {
                    let payload = {
                        _id: foundedAdmin._id,
                        email: foundedAdmin.email
                    }
                    let token = jwt.sign(payload, '123456789')
                    res.send({ mytoken: token });
                }
            }
        )
        .catch(
            (err) => {
                res.send(err)
            }
        )
}
)

router.get('/getbyid/:id', (req, res) => {
    let myid = req.params.id;
    Client.findOne({ _id: myid })
        .then(
            (client) => {
                res.send(client)
            }
        )
        .catch(
            (error) => {
                res.send(error);
            }
        )
}
)
//update
router.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let newData = req.body;
    Admin.findOneAndUpdate(
        { _id: id },
        newData
    ).then(
        (updatedAdmin) => {
            res.send(updatedAdmin)
        }
    )
        .catch(
            (err) => {
                res.send(err)
            }

        )
})

module.exports = router;