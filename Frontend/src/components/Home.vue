<!--CONCLUDED -->

<template>
    <v-app>
        <page-header/>
        <router-view></router-view>

        <v-container class="mt-5">
            <v-row class="text-center">
                <v-col cols="12">
                <v-img
                    :src="require('../assets/icon-above-font.png')"
                    class="my-3"
                    contain
                    height="200"
                />
                </v-col>

                <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
                    Welcome to our new internal social network
                </h1>

                <p class="subheading font-weight-regular">
                    Go to the Feed to see the latest content published or share any content with us.
                </p>
                </v-col>
            </v-row>
        </v-container>
             

    </v-app>
</template>
<script>
import pageHeader from "./pageHeader.vue"
export default {
    
    components: {
        "page-header": pageHeader,
    },
}
</script>
<style lang="scss">
    #accueil{
        background: no-repeat center top/70% url("../assets/icon-left-font-monochrome-black.png") ;
        display: flex;
        flex-direction: row;
    }
    #carousel{
        width: 60%;
        margin-top: 17%;
        margin-left: 20%;
    }
    .header{
        background-color: rgb(253,45,1);
        color: white;
    }
    @media screen and (min-width: 200px) and (max-width: 640px) {
    #carousel {
    padding-right: 15%;
    width: 80%;
    } 
    #accueil{
    background: no-repeat center top/70% url("../assets/icon-left-font-monochrome-black.png") ;
  }
}
        
    
</style>