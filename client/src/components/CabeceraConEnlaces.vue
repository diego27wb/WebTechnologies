<template>
  <div class="test1">
  <nav>
    <router-link to="/peliculas">Peliculas</router-link>
  </nav>
  <nav>
    <router-link to="/cesta">Cesta</router-link>
  </nav>
  <nav>
    <router-link to="/about">About</router-link>
  </nav>
  <nav>
    <router-link to="/" @click="logout">Logout</router-link>
  </nav>
  <nav>
    <router-link to="">Bienvenido {{ usuario }}</router-link>
  </nav>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CabeceraConEnlaces',
  components: {
    
  },
  data() {
    return {
      error: '',
      usuario: ''
    }
  },
  created:function(){
    this.logeado();
  },
  methods: {
    logeado(){
         //user is not authorized
        if (localStorage.getItem('token') === null) {
            this.$router.push('/');
        }

        axios.get('http://localhost:5000/user', { headers: { token: localStorage.getItem('token')}})
        .then(res => {
            console.log(res.data);
            this.usuario = res.data.user.name;
        })
    },
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:40px;
}

nav {
  padding: 15px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.test1{
  background-color:aquamarine;
  display: flex;
  flex-direction: row;
  justify-content:center;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}
</style>
