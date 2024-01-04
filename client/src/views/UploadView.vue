<template>
    <div>
        <h1>Pagina para subir películas al servidor </h1>
        <Upload />
    </div>
</template>

<script>
import Upload from '@/components/UploadFilm.vue'

export default{
    components:{
        Upload
    }
}
</script>