<!--NOT YET REVIEWED -->


<template>
    <v-app id="admi" >
        <page-header/>
        <div class="ml-12">
            <h1 class="ma-4">Administrator</h1>
            <v-container>
                <v-btn class="ma-3" color="primary" @click="clickPosts">See Posts</v-btn>
                <v-btn class="ma-3" color="primary" @click="clickComments">See Comments</v-btn>
                <div v-if="showPosts">
                    <v-card class="Feed__post ma-3 mt-6" v-for="(post, index) in allPosts" v-bind:key="index">
                        <v-card-title>
                            <h2 class="Feed__post__title">{{ post.title }}</h2>
                        </v-card-title>

                        <v-card-subtitle class=" Feed__post__name">
                            {{ post.firstName }} {{ post.lastName }}, on {{ post.date }}
                        </v-card-subtitle>

                        <v-card-text class="v-card-text black--text Feed__post__content" >
                            {{ post.content }}
                        </v-card-text>

                        <v-card-actions class="Feed__post__manage">
                            <v-btn class="Feed__post__manage--btn" title="Delete Post" @click="deletePost(post.postId)" icon>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn> 
                        </v-card-actions>
                    </v-card>
                </div>
                <div v-if="showComments">
                    <v-card class="Feed__comments--ind my-1 mx-2 pa-0" color="#ECECEC" v-for="(comment, index) in allComments" v-bind:key="index" outlined>
                        <v-card-subtitle class=" pb-0 Feed__comments__name">
                            on {{ comment.date }}, {{ comment.firstName }} {{ comment.lastName }} add the comment :
                        </v-card-subtitle>

                        <v-card-text class="text--primary Feed__comments__content ">
                            {{ comment.comContent }}
                        </v-card-text>

                        <v-card-actions class="Feed__comments__manage">
                            <v-btn title="Delete comment" class="Feed__comments__manage--btn" @click="deleteComment(comment.commentsId)" icon>
                                <v-icon >mdi-delete</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-container>
        </div>
    </v-app>
</template>


<script>
import pageHeader from "./pageHeader.vue"
import axios from "axios"
export default {
    name: "admi",
    data(){
        return{
            allPosts: [],
            allComments: [],
            showPosts: true,
            showComments: false
        }
    },
    components: {
        "page-header": pageHeader,
    },
    methods: {
        clickPosts(){
            this.showPosts = true,
            this.showComments = false
        },
        clickComments(){
            this.showPosts = false,
            this.showComments = true
        },
        deletePost(pId){
            axios.delete("http://localhost:3000/api/admi/post/" + pId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.reload(true);
                })
                .catch(error => {
                    console.log(error);    
                })
        },

        deleteComment(cId){
            axios.delete("http://localhost:3000/api/admi/comment/" + cId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.reload(true);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted(){
        axios.get("http://localhost:3000/api/admi/posts", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let posts = JSON.parse(response.data);
                this.allPosts = posts;
            })
            .catch(error => {
            console.log(error); 
            });
        axios.get("http://localhost:3000/api/admi/comments", {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let com = JSON.parse(response.data);
                    this.allComments = com;
                })
                .catch(error => {
                console.log(error);
                });
    }
}
</script>

<style lang="scss">
</style>