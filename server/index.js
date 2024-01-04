const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
const mongoose = require('mongoose');
const fs = require("fs");
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Film = require('./models/Film');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://abc123:Z7ZhekVI@vueexpress.bvdaajx.mongodb.net/?retryWrites=true&w=majority');

const createacount = require('./routes/api/createacount');

app.use('/api/createacount', createacount);

app.post('/signup', (req, res, next) => {
    const newUser = new User({
      gmail: req.body.gmail,
      usuario: req.body.usuario,
      contrasena: req.body.contrasena
    })
    newUser.save(err => {
      if (err) {
        return res.status(400).json({
          title: 'error',
          error: 'email in use'
        })
      }
      return res.status(200).json({
        title: 'signup success'
      })
    })
  })

app.post('/login', (req, res, next) => {
    
    User.findOne({ gmail: req.body.gmail }, (err, user) => {
      if (err) return res.status(500).json({
        title: 'server error',
        error: err
      })
      if (!user) {
        return res.status(401).json({
          title: 'user not found',
          error: 'invalid credentials'
        })
      }
      //incorrect password
      if (req.body.contrasena != user.contrasena) {
        return res.status(401).json({
          tite: 'login failed',
          error: 'invalid credentials'
        })
      }
      //IF ALL IS GOOD create a token and send to frontend
      let token = jwt.sign({userId: user._id}, 'secretkey');
      return res.status(200).json({
        title: 'login succes',
        token: token
      })
      
    })
  })

//grabbing user info
app.get('/user', (req, res, next) => {
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) return res.status(401).json({
        title: 'unauthorized'
      })
      //token is valid
      User.findOne({ _id: decoded.userId }, (err, user) => {
        if (err) return console.log(err)
        return res.status(200).json({
          title: 'user grabbed',
          user: {
            email: user.gmail,
            name: user.usuario
          }
        })
      })
  
    })
  })

  // Subir película
  // storage
  const Storage = multer.diskStorage({
    destination: 'uploads',
    filename:(req,file, cb)=> {
      cb(null, file.originalname);
    },
  })

  const upload = multer({
    storage: Storage
  }).single('file')

  app.post('/upload', (req, res) => {
    upload(req,res,(err)=>{
      if(err){
        console.log(err)
      }
      else{
        const newFilm = new Film({
          titulo: req.body.titulo,
          image:{
            data:fs.readFileSync(__dirname + "/../uploads/" + req.file.originalname),
            contentType:'image/jpeg'
          },
          descripcion: req.body.descripcion,
          ano: req.body.ano,
          duracion: req.body.duracion,
          genero: req.body.genero,
          director: req.body.director,
          precio: req.body.precio
        })
        console.log(newFilm);
        newFilm.save(err => {
          if (err) {
            return res.status(400).json({
              title: 'error',
              error: 'Película en uso'
            })
          }
          return res.status(200).json({
            title: 'upload success'
          })
        })
      }
    })
    
    /*newFilm.save(err => {
      if (err) {
        return res.status(400).json({
          title: 'error',
          error: 'Película en uso'
        })
      }
      return res.status(200).json({
        title: 'upload success'
      })
    })*/
    //const newFilm = new Film({

    //})
    /*res.json({file: req.file})
    
    console.log(req);*/
  })

  app.get('/films', async(req,res) => {
    Film.find((err, peliculas) => {
      if (err) return res.status(400).json({
        title: 'Pelicula en uso',
        error: err
      })
      //console.log(peliculas);
      return res.status(200).json({
        title: 'Todas las peliculas',
        peliculas: peliculas 
      })
    });
    

    
  })

  app.post('/oneFilm', async(req,res) => {
    var id = req.body.id;       
    
    Film.findOne({ _id: id }, (err, film) => {
      if (err) return res.status(500).json({
        title: 'server error',
        error: err
      })
      if (!film) {
        return res.status(401).json({
          title: 'film not found',
          error: 'invalid credentials'
        })
      }
      return res.status(200).json({
        titulo: 'Pelicula',
        pelicula: film
      })
      
    })
  })


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server satarted on port ', port));