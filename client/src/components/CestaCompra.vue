<template>
<div>
  <div class="movies-list" v>
    <router-link v-for="movie in movies" v-bind:key="movie._id" v-bind:to="`/movies/${movie._id}`">
      <Movie v-bind:title="movie.titulo" v-bind:poster="movie.image" v-bind:precio="movie.precio" />
    </router-link>
  </div>
    <h2 id="Precio">Precio del pedido total</h2>
      <p>{{precio}} €</p>
    <button id="btn-cesta" >Comprar</button>
</div>
</template>

<script>
import Movie from './CestaE.vue'
import axios from 'axios';
export default {
  name: 'CestaCompra',
  components: {
    Movie
  },
  data() {
    return {
      error: '',
      movies: [],
      precio: 0
    }
  },
  created:function(){
    this.getFilms();
  },
  methods: {
    getFilms(){
        for(const element of this.$store.state.peliculas){
            let peli = {
                id: element,
            }
            axios.post('http://localhost:5000/oneFilm', peli)
            .then(res => {
            //console.log(res.data.pelicula);
            this.movies.push(res.data.pelicula);
            this.precio += res.data.pelicula.precio;
            }, err => {
            console.log(err.response);
            this.error = err.response.data.error
            })
        }

    },
  }
}
</script>

<style>
.movies-list {
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;  /* Ajusta el ancho del contenedor padre */
  margin: 15;  /* Centra el contenedor */
}
button{
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
