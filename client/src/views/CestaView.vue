<template>
    <div>
        <Cabecera />
        <h1>Pagina de la cesta de la compra </h1>
        <Cesta />
    </div>
</template>

<script>
import Cesta from '@/components/CestaCompra.vue'
import Cabecera from '@/components/CabeceraConEnlaces.vue'
export default{
    components:{
        Cesta,
        Cabecera
    }
}
</script>