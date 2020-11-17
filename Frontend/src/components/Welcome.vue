<!--CONCLUDED -->

<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/icon-left-font-monochrome-white.png"
          transition="scale-transition"
          width="250"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
  
    <v-container class="mt-5">
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/icon.png')"
            class="my-3"
            contain
            height="200"
          />
        </v-col>

        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            Groupo Mania internal social network
          </h1>

          <p class="subheading font-weight-regular">
            Ready to share some interesting and funny content with your collegues?
            <br>Sign In if you still don't have an account.
          </p>
        </v-col>

        <v-col
          class="mb-5"
          cols="12"
        >
          <v-container justify="center" class="auth">
              <div class="auth__boutons">
                  <v-btn class="auth__boutons--ind mx-5 px-5" color="primary" @click="component='signup'" rounded>Sign in</v-btn>                    
                  <v-btn class="auth__boutons--ind mx-5 px-5" color="primary" @click="component='login'" rounded>Login</v-btn>
              </div>
              <component v-bind:is="component"></component>    
          </v-container>

        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
    import Signup from "./Signup.vue"
    import Login from "./Login.vue"
    export default {
        name : "BtnToEnter",
        data(){
            return{
                component: ""
            }
        },
        
        components: {
            'login': Login,
            'signup': Signup
        }
    }
</script>

<style lang="scss">

</style>