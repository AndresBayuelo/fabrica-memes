<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-flex xs12 sm6 md6 lg4>
          <v-card>
            <v-img
            class="white--text"
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
          </v-card>
        </v-flex>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <v-text-field 
          label="Que te parece esta foto?"
          v-model="comentario">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-right">
          <v-flex xs12 pt-5>
            <v-btn primary @click="enviarComentario">Enviar</v-btn>
          </v-flex>
        </v-col>
        <v-col cols="12" class="text-left">
          <v-flex xs12 pt-5>
            <h1>Otros comentarios</h1>
          </v-flex>
        </v-col>
      </v-row>
      <v-row v-for="comentario in comentarios" v-bind:key="comentario.id">
        <v-col cols="12">
          <v-text-field
          :value="comentario.texto"
          :label="comentario.score"
          readonly>
          </v-text-field>
        </v-col>
      </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { firestore } from '@/main'
//import { storage } from '@/main'

export default {
  data () {
    return {
      id: this.$route.params.id,
      image: '',
      comentario: '',
      comentarios: []
    }
  },
  methods: {
    enviarComentario: function () {
      let comentario = {
        imageId: this.id,
        texto: this.comentario,
        createdAt: (+new Date()),
        score: 0
      }
      firestore.collection('comentarios').add(comentario)
    }
  },
  firestore () {
    return {
      image: firestore.collection('images').doc(this.id),
      comentarios: firestore.collection('comentarios').where("imageId", "==", this.id)
    }
  },
  filters: {
    separateLabels: function (value) {
      return `${value[0]}, ${value[1]}, ${value[2]}`
    }
  }
}

</script>