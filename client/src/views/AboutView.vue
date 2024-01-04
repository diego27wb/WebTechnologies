<template>
  <div>
    <Cabecera />
    <div class="about">
      <h1>This is an about page</h1>
      <h2>Compra online películas, encuentra los clásicos que siempre quisiste tener en físico,
        ya sea en Blu Ray, DVD incluso VHS. Esta página está dedicada a coleccionistas de películas
        que les gusta la sensación de tener sus películas favoritas para toda la vida.
      </h2>
    </div>
  </div>
</template>

<script>
import Cabecera from '@/components/CabeceraConEnlaces.vue'
export default{
    components:{
        Cabecera
    }
}
</script>