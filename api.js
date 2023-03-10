const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
const Device = require('./models/device'); 
mongoose.connect('mongodb+srv://osheen:Osheen9867@cluster0.ekzqil5.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

app.post('/api/devices', (req, res) => {
  const { name, user, sensorData } = req.body;
  const newDevice = new Device({
    name,
    user,
    sensorData
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});

app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(devices);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

/*app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    console.log(devices);
  });
});*/

// app.get('/api/devices', (req, res) => {
//   Device.find({}, (err, devices) => {
//     return res.send(devices);
//   });
// });

// app.get('/api/devices', (req, res) => {
//   Device.find({}, (err, devices) => {
//     if (err == true) {
//       return res.send(err);
//     } else {
//       return res.send(devices);
//     }
//   });
// });

/*app.post('/api/devices', (req, res) => {
  console.log(req.body);
});*/


