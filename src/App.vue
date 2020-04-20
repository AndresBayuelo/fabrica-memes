<template>
  <v-app>
    <v-app-bar
      app
      color="indigo"
      dark
      fixed
    >
      <v-toolbar-title>Fabrica de Memes</v-toolbar-title>

    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-layout>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
