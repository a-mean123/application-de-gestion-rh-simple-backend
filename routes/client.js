const express = require('express');
const Client = require('../models/client');
const router = express.Router();
const multer = require('multer');
let filename = '';
const mystorage = multer.diskStorage(
    {
        destination: './uploads',
        filename: (req, file, redirect) => {
            let date = Date.now();
            //  6677746637
            //  image/png
            // [ 'image' , 'png']
            let fl = date + '.' + file.mimetype.split('/')[1];
            //786876876.png
            redirect(null, fl);
            filename = fl;
        }
    }
);
const upload = multer({ storage: mystorage });
//ajout client 
router.post('/ajout', upload.any('image'), (req, res) => {
    let data = req.body;
    let client = new Client(data);
    client.image = filename;
    client.save()
        .then(
            (savedClient) => {
                filename = ''
                console.log(savedClient);
                res.send(savedClient)
            })
        .catch(
            (error) => {
                console.log(error);
                res.send(error);
            }
        )
});
//get clients
router.get('/all', (req, res) => {
    Client.find()
        .then(
            (allclient) => {
                res.send(allclient)
            }
        )
        .catch(
            (error) => {
                res.send(error)
            }
        )
}
)
//get client by id
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
//update client
router.put('/update/:id', upload.any('image'), (req, res) => {
    let id = req.params.id;
    let newData = req.body;

    if(filename.length>0){
        newData.image = filename;
    }

    Client.findOneAndUpdate(
        { _id: id },
        newData
    )
        .then(
            (updatedClient) => {
                filename = '';
                res.send(updatedClient)
                
            }
        )
        .catch(
            (err) => {
                res.send(err)
            })
});
//delete client
router.delete('/supprimer/:id', (req, res) => {
    let id = req.params.id;
    Client.findByIdAndDelete({ _id: id })
        .then(
            (deletedClient) => {
                res.send(deletedClient);
            }
        )
        .catch((err) => {
            res.send(err);
        })
});


module.exports = router;