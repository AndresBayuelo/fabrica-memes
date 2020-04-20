<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <input type="file" ref="fileInput" id="file" @change="processFile($event)">
        <v-btn color="primary" @click="uploadFile">Enviar</v-btn>
      </v-col>
    </v-row> 
  </v-container>
</template>

<script>
  //import { firestore } from '@/main'
  import { storage } from '@/main'
  export default {
    name: 'HelloWorld',
    data: () => ({
      
    }),
    methods: {
      processFile: function(event) {
        this.file = event.target.files[0] 
      },
      uploadFile: function() {
        let name = (+new Date()) + '-' + this.file.name
        let metadata = { contentType: this.file.type }
        storage.child(name).put(this.file, metadata)
        .then(snapshot => snapshot.ref.getDownloadURL())
      }
    }
  }  
</script>
