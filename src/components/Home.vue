<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <input type="file" ref="fileInput" id="file" @change="processFile($event)">
        <v-btn   color="primary" @click="uploadFile">Enviar</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="text-center">
      <v-col cols="12">
        <v-flex xs12 sm6 lg3 v-for="image in images" v-bind:key="image.id">
          <v-card>
            <v-img
              height="200px"
              :src="image.url">
            </v-img>
            <v-card-title>
              <div>
                <span class="grey--text"> {{image.name}} </span>
                <v-chip> {{ image.scorePromedio }} </v-chip>
                <br>
                <span>{{ image.labels | separateLabels }}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn text @click="goToImageDetail(image.id)">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { firestore } from '@/main'
  import { storage } from '@/main'
  import axios from 'axios'
  export default {
    name: 'Home',
    data: () => ({
      apiKey: '',
      file: '',
      images: []
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
        .then( url => {
          const input = this.$refs.fileInput
          input.type = 'text'
          input.type = 'file'
          const data = {
            "requests" : [{
              "features": [{
                "type": "LABEL_DETECTION"
              }],
              "image": {
                "source": {
                  "imageUri": url
                }
              }
            }]
          }
          axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`, data)
          .then(response => {
            const labels = []
            let slicedLabelArray = response.data.responses[0].labelAnnotations.slice(0, 3)
            slicedLabelArray.forEach(function(label) {
              labels.push(label.description)
            })
            let image = {
              url: url,
              name: name,
              createdAt: (+new Date()),
              labels: labels,
              scorePromedio: 0
            }
            firestore.collection('images').add(image)
          })
          
        })
      },
      goToImageDetail: function(id){
        this.$router.push({ path: `/image/${id}` })
      },
    },
    firestore() {
      return {
        images: firestore.collection('/images')
      }
    },
    filters: {
      separateLabels: function (value) {
        return `${value[0]}, ${value[1]}, ${value[2]}`
      }
    }
  }  
</script>
