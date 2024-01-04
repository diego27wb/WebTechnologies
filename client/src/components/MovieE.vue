<template>
    <div class="movie-e">
      <img :src="dataUrl" v-bind:style="{ width: '55%' }">
      <h1>{{ title }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MovieE',
    props: ['title', 'poster'],
    data() {
      return {
      }
    },
    computed:{
      dataUrl(){
        const url = 'data:image/jpeg;base64,' + btoa(
          new Uint8Array(this.poster.data.data)
          .reduce((data,byte)=> data + String.fromCharCode(byte), '')
        );
        //console.log(url);
        return url;
      }
    }
  }
  </script>
  
  <style>
  .movie-e {
    display: flex;
    flex-direction: column;
    align-items: center;
    width:9cm;
    height:9cm;
  }

  .movie-e h1{
    font-size: 20px; 
  }
  </style>
  