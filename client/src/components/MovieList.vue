<template>
<div>
  <div class="movies-list" v>
    <router-link v-for="movie in movies" v-bind:key="movie._id" v-bind:to="`/movies/${movie._id}`">
      <Movie v-bind:title="movie.titulo" v-bind:poster="movie.image" />
    </router-link>
  </div>
</div>
</template>

<script>
import Movie from './MovieE.vue'
import axios from 'axios';
export default {
  name: 'MoviesList',
  components: {
    Movie
  },
  data() {
    return {
      error: '',
      movies: [],
      usuario: ''
    }
  },
  created:function(){
    this.getFilms();
  },
  methods: {
    getFilms(){
      axios.get('http://localhost:5000/films')
      .then( res => {
              //console.log(res.data.peliculas);
              this.movies = res.data.peliculas;
              //console.log(this.movies[0].image);
            }, err => {
              //console.log(err.response)
              this.error = err.response.data.error
      })
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
</style>
