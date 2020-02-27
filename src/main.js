import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import { firestorePlugin } from 'vuefire'
import router from './routes/index'

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBiI_sqGqe1AIWavF9Xu7ZLIMtk621pDnI",
  authDomain: "fabrica-memes-92f97.firebaseapp.com",
  databaseURL: "https://fabrica-memes-92f97.firebaseio.com",
  projectId: "fabrica-memes-92f97",
  storageBucket: "fabrica-memes-92f97.appspot.com",
  messagingSenderId: "359962053327",
  appId: "1:359962053327:web:b8e76904c67f1bbd2885ba",
  measurementId: "G-38E3GXRVFZ"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firestore = firebaseApp.firestore()
export const storage = firebase.storage().ref('/images')

Vue.use(firestorePlugin)

new Vue({
  vuetify,
  render: h => h(App),
  router,
  components: {App}
}).$mount('#app')
