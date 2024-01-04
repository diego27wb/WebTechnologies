<template>
  <div class="movie-details">
    <!-- <img v-bind:src="poster" alt="Poster">-->
    <img :src="dataUrl" alt="Imagen">
    <h1 id="title">{{ titulo }}</h1>
    <p id="description">{{ descripcion }} </p>
    <hr>
    <div class="details">
      <hr class="vertical-line">
      <h2 id="year">Year</h2>
      <p>{{ ano }}</p>
      <hr class="vertical-line">
      <h2 id="Duración">Duración</h2>
      <p>{{ duracion }}</p>
      <hr class="vertical-line">
      <h2 id="precio">Precio</h2>
      <p> {{ precio }} €</p>
      <hr class="vertical-line">
      <h2 id="director">Director</h2>
      <p>{{director}}</p>
      <hr class="vertical-line">
    </div>
    <hr>
    <button id="btn-cesta" v-on:click="ponerEnCesta">Añadir a la cesta</button>
    <br>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'MovieDetails',
  props: [],
  data() {
    return {
      error: '',
      titulo: '',
      binarioPortada: '',
      descripcion: '',
      ano: 0,
      duracion: 0,
      precio: 0,
      director: '',
      genero: ''
    }
  },
  created:function(){
    this.info();
  },
  computed:{
      dataUrl(){
        const url = 'data:image/jpeg;base64,' + btoa(
          new Uint8Array(this.binarioPortada)
          .reduce((data,byte)=> data + String.fromCharCode(byte), '')
        );
        //console.log(url);
        return url;
      }
  },
  methods:{
    info(){
      let peli = {
        id: this.$router.currentRoute._rawValue.params.id,
      }
      
      axios.post('http://localhost:5000/oneFilm', peli)
        .then(res => {
          console.log(res.data.pelicula);
          this.titulo = res.data.pelicula.titulo;
          this.binarioPortada = res.data.pelicula.image.data.data;
          this.descripcion = res.data.pelicula.descripcion;
          this.ano = res.data.pelicula.ano;
          this.duracion = res.data.pelicula.duracion;
          this.precio = res.data.pelicula.precio;
          this.director = res.data.pelicula.director;
          this.genero = res.data.pelicula.genero;


        }, err => {
          console.log(err.response);
          this.error = err.response.data.error
        })
      
    },
    ponerEnCesta(){
      this.$store.state.pelicula = this.$router.currentRoute._rawValue.params.id;
      this.$store.dispatch('anadirPeliculaAction');
      confirm("Añadido a la cesta");
    }
  }
}
</script>

<style>
  
  .movie-details img {
    width: 200px;
    height: 300px;
  }

  .movie-details h1 {
    margin: 10px 0;
    font-size: 24px;
    text-align: center;
  }

  .movie-details p {
    margin: 0;
    font-size: 16px;
    text-align: center;
  }
  
  .vertical-line {
    transform: rotate(90deg);
    height: 0.1px;
    width: 35px;
    background-color: black;
  }

  .details{
    display: flex;
    flex-direction: row;
    justify-content:center;
  }

  .details h2{
    margin: 0;
    font-size: 17px;
    text-align: center;
    margin-right: 15px;
  }

  .detials p{
    margin: 0;
    font-size: 15px;
    text-align: center;
  }

  .movie-details button{
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }
</style>
