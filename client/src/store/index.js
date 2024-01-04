import { createStore } from 'vuex'

export default createStore({
  state: {
    sesionIniciada: 0,
    usuarioLogeado: '',
    usuario: null,
    peliculas: [],
    pelicula: ''
  },
  getters: {
    sesionIniciada(state) {
      return state.sesionIniciada;
    },
    usuarioLogeado(state) {
      return state.usuarioLogeado;
    }
  },
  mutations: {
    logearUsuario(state){
      state.usuarioLogeado = state.usuario;
      state.sesionIniciada = 1;
    },
    anadirPelicula(state){
      state.peliculas.push(state.pelicula);
    }
  },
  actions: {
    logearUsuarioAction(context){
      context.commit('logearUsuario');
    },
    anadirPeliculaAction(context){
      context.commit('anadirPelicula');
    }
  },
  modules: {
  }
})
