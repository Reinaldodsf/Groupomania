<!--CONCLUDED -->

<template>
    <div class="head">
        
        <v-navigation-drawer
            v-model="drawer"
            color="primary"
            dark
            mini-variant
            mini-variant-width=45
            style="position:fixed;"
            expand-on-hover
            bottom
            permanent
            absolute 
        >
            <v-list dense nav>
                <v-list-item two-line class="px-0 ">
                    <v-list-item-avatar>
                        <v-img src="../assets/icon.png" contain></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            Groupomania
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
                
                <v-list-item v-if="this.modo==1">
                    <v-list-item-icon>
                        <v-icon>mdi-security</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content @click="admi" class="linkLogout">
                        <v-list-item-title>Administration</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-for="button in buttons" :key="button.title">
                    <v-list-item-icon>
                        <v-icon>{{ button.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <router-link :to=button.link>
                            <v-list-item-title>{{ button.title }}</v-list-item-title>
                        </router-link>
                    </v-list-item-content>
                </v-list-item>
                
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content @click="logout" class="linkLogout">
                        <v-list-item-title>LogOut</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name : 'Header',
        data(){
            return {
                modo: "",
                drawer: true,
                buttons: [
                    { title: 'Home', icon: 'mdi-home', link: '/Home'  },
                    { title: 'Profile', icon: 'mdi-account', link: '/Home/Profile'},
                    { title: 'Feed', icon: 'mdi-forum', link: '/Home/Feed' },
                ],
            }
        },
    methods: {
        logout(){
            localStorage.userId = "";
            localStorage.token = "";
            localStorage.admin = "";
             this.$router.push('/');
        },
        admi(){
            this.$router.push('/Home/Admi')
        }
    },
    mounted(){
        this.modo = localStorage.admin;
    },
}
</script>

<style lang="scss">
    a {
        text-decoration: none;
        color: white!important;
        &:hover{
            color: #cdd9ff!important;
        }
    }
                
    .linkLogout {
        cursor: pointer;
        &:hover {
        color: #cdd9ff!important;
        }
    }
</style>