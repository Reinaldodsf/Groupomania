<!--CONCLUDED -->


<template>
    <div class="d-flex justify-center">
        <page-header/>
        <v-app id="formPost" class="my-5 ml-5 col-10 col-lg-8"> 
            <v-card class="my-12 ml-5 ">
                <v-card-title class="mb-3">
                    <h2>New post</h2>
                </v-card-title>
                
                <v-card-text>
                    <v-form ref="form" class="ma-3" v-model="valid" >
                        <v-text-field v-model="dataPost.title" :rules="titleCheck" :counter="50" label="Tittle" autofocus required></v-text-field>
                        <v-textarea v-model="dataPost.content" :rules="contentCheck" label="Message" required></v-textarea>
                    </v-form>
                </v-card-text>
                

                <v-card-actions>
                    <v-btn :disabled="!valid" class="success" @click="sendPost">Post</v-btn>
                    <v-btn text href="/Home/Feed" class="secondary">Cancel</v-btn>
                </v-card-actions>

            </v-card>
        </v-app>
    </div>
</template>
<script>
import axios from "axios"
import pageHeader from "./pageHeader.vue"
export default {
    name: "FormPost",
    data(){
        return{
            valid: true,
            titleCheck: [
                (value) => !!value || 'Insert a Title',
                (value) => (value && value.length <= 50) || 'Tittle cannot have more than 50 characters',
            ],
            contentCheck: [
                (value) => !!value || 'Insert your post message',
            ],
            dataPost:{
                title: "",
                content:"",
                userId: localStorage.userId
            },
            postData: "",
            msg: false,
            message: "",
        }
    },
    methods: {
        sendPost(){
            this.postData = JSON.stringify(this.dataPost);
            axios.post("http://localhost:3000/api/posts/", this.postData, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    this.message = rep.message;
                    this.msg = true;
                    this.form = false;
                    this.$router.push('/Home/Feed')
                    
                })
                .catch(error => {
                    console.log(error); 
                    this.message = error;
                    this.msg = true
                });
        },
    },
    components: {
        "page-header": pageHeader, 
        
    },
}
</script>
<style lang="scss">
</style>