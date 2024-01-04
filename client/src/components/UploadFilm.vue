<template style="background-color: black">
  <div>
    <p><H1 id="title" style ="color: black;"><b> 
        Rellena la siguiente información
      </b></H1></p> 
      <hr>
      <label>Título</label><br>
      <input id="titulo" name="titulo" type="text" placeholder="Titulo pelicula" required v-model="titulo"><br><br>
      <label>Portada</label><br>
      <input id="fileImput" name="portada" type="file" ref="file" @change="onFileSelected" ><br><br>
      <label>Descripcion</label><br>
      <input id="descripcion" name="descripcion" type="text" placeholder="Descripcion de la pelicula" required v-model="descripcion"><br><br>
      <label>Año</label><br>
      <input id="año" name="año" type="number" placeholder="Año de la pelicula" required v-model="ano"><br><br>
      <label>Duración</label><br>
      <input id="duracion" name="duracion" type="number" placeholder="Duracion de la pelicula" required v-model="duracion"><br><br>
      <label>Género</label><br>
      <input id="genero" name="genero" type="text" placeholder="Género de la pelicula" required v-model="genero"><br><br>
      <label>Director</label><br>
      <input id="director" name="director" type="text" placeholder="Director de la pelicula" required v-model="director"><br><br>
      <label>Precio</label><br>
      <input id="precio" name="precio" type="number" placeholder="Precio de la pelicula" required v-model="precio"><br><br>
      <hr>
      
      <button id="btn-upload" v-on:click="uploadFilm" style="width:150px; height:45px; background-color: #641E16; color:white; font-size: 20px;">Subir</button>
      {{ error }} 
  </div>
</template>


  <script>
  import axios from 'axios';
  import FormData from 'form-data';
  export default {
    name: 'UploadFilm',
    data() {
      return {
        error: '',
        titulo: '',
        portada: null,
        descripcion: '',
        ano: 2000,
        duracion: 160,
        genero: '',
        director: '',
        precio: 5
      }
    },
    methods: {
      onFileSelected(){
        this.portada = this.$refs.file.files[0];
        console.log(this.portada);
      },
      async uploadFilm() {
        /*let info = {
          titulo: this.titulo,
          portada: this.portada,
          descripcion: this.descripcion,
          ano: this.ano,
          duracion: this.duracion,
          genero: this.genero,
          director: this.director,
          precio: this.precio
        }*/

        let film = new FormData();
        
        film.append('titulo', this.titulo);
        film.append('descripcion', this.descripcion);
        film.append('ano', this.ano);
        film.append('duracion', this.duracion);
        film.append('genero', this.genero);
        film.append('director', this.director);
        film.append('precio', this.precio);

        film.append('file', this.portada);
        console.log(film);
        axios.post('http://localhost:5000/upload', film)
          .then(res => {
            //if successfull
            if (res.status === 200) {
              confirm("Película subida");
            }
          }, err => {
            console.log(err.response);
            this.error = err.response.data.error
          })
          this.error = '';
          this.titulo = '';
          this.descripcion = '';
          this.ano = 2000;
          this.duracion = 160;
          this.genero = '';
          this.director = '';
          this.precio = 5;
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>