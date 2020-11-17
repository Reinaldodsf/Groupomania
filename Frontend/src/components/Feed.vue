<!--CONCLUDED -->

<template>
    <v-app id="Feed">

        <page-header/>
        <div class="ml-12">
            <h1 class="ma-4">Feed</h1>
            

            <router-view></router-view>
            <v-container >
                <v-btn class="ma-3" @click="openForm">Create New Post</v-btn>
                
                <v-card class="Feed__post ma-3 mt-6" v-for="(post, index) in allPosts" v-bind:key="index">
                    
                        <v-card-title>
                            <h2 class="Feed__post__title ml-0">{{ post.title }}</h2>
                        </v-card-title>
                    <div class="d-flex">
                        <v-card-subtitle class="mr-auto p-2 Feed__post__name">
                            {{ post.firstName }} {{ post.lastName }}, on {{ post.date }} at {{ post.time }}
                        </v-card-subtitle>
                        
                        <v-card-actions class="p-2 Feed__post__manage" v-if="post.userId == userId">
                            <v-btn class="Feed__post__manage--btn" color="secundary" title="Modify the Post" @click.stop="goDialogUpPost(post.title, post.content, post.postId)" icon>
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn class="Feed__post__manage--btn" color="secundary" title="Delete the Post" @click="deletePost(post.postId)" icon>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn> 
                        </v-card-actions>
                    </div>
                    
                    <v-card-text class="v-card-text black--text Feed__post__content" >
                        {{ post.content }}
                    </v-card-text>


                    <v-card-text class="py-0">
                        <v-btn icon fab title="Like" class="ma-3" color="green" @click="likePost(post.postId, post.likes)">
                                <v-icon>mdi-thumb-up</v-icon>
                                {{ post.likes }}
                        </v-btn> 
                            
                        <v-btn text @click="viewCom(post.postId)" title="View Comments">
                            <v-icon>mdi-comment</v-icon>
                            Comments 
                        </v-btn>
                    </v-card-text>

            
                    <v-dialog v-model="dialogUpPost" max-width="500px">
                        <v-card>
                            <v-card-title>Edit Post</v-card-title>
                            <v-card-text>
                                <v-form ref="form" v-model="valid">
                                    <v-text-field v-model="dataPost.title" :rules="titleCheck" :counter="50" label="Tittle"></v-text-field>
                                    <v-textarea v-model="dataPost.content" :rules="contentCheck" label="Comment"></v-textarea>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn @click="dialogUpPost=false" class="secondary">Cancel</v-btn>
                                <v-btn :disabled="!valid" class="success" @click="updatePost()">Submit</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

<!--WAS HERE-->                
                    <div class="Feed__comments" v-if="postId === post.postId">
                        <v-card class="Feed__comments--ind my-1 mx-2 pa-3 " color="#ECECEC" v-for="(comment, index) in allComments" v-bind:key="index" outlined>
                            <div class="d-flex">
                                <v-card-subtitle class="mr-auto pa-0 Feed__comments__name">
                                    on {{ comment.date }}, {{ comment.firstName }} {{ comment.lastName }}:
                                </v-card-subtitle>

                                <v-card-actions class="Feed__post__manage" v-if="comment.userId == userId">
                                    <v-btn class="Feed__post__manage--btn" color="secundary" title="Modify the Comment" @click.stop="goDialogUpCom(comment.comContent, comment.commentsId)" icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn class="Feed__post__manage--btn" color="secundary" title="Delete the Comment" @click="deleteCom(comment.commentsId)" icon>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </div>
                            <v-card-text class="pa-0 text--primary Feed__comments__content ">
                                {{ comment.comContent }}
                            </v-card-text>

                            <v-dialog v-model="dialogUpCom" max-width="500px">
                                <v-card>
                                    <v-card-title>Edit Comment</v-card-title>
                                    <v-card-text>
                                        <v-form ref="form" v-model="valid">
                                            <v-textarea v-model="dataCom.content" :rules="comContentCheck" :counter="255" label="Comment"></v-textarea>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn @click="dialogUpCom=false" class="secondary">Cancel</v-btn>
                                        <v-btn :disabled="!valid" class="success" @click="updateCom()">Submit</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card>

                        <v-btn v-if="!openComment" title="Comment Post" class="ma-2" @click="openCommentFrm()">Comment</v-btn>
                        
                        
                        <v-card v-if="openComment">
                            <v-form  ref="form" class="mt-5" v-model="valid" v-if="form">
                                <v-textarea background-color="#ECECEC" v-model="dataCom.content" :rules="comContentCheck" :counter="255" label="Add a Comment" autofocus required></v-textarea>
                            </v-form>
                            <v-btn @click="closeCommentFrm()" class="secondary">Cancel</v-btn>
                            <v-btn :disabled="!valid" class="success ma-2" @click="sendCom(post.postId)">Post</v-btn>
                            
                        </v-card>
                    </div>
                </v-card>
            </v-container>
        </div>
    </v-app>
</template>

<script>
import pageHeader from "./pageHeader.vue"
import axios from "axios"
export default {
    name: "Feed",
    data(){
        return{
            userId: "",
            admin: "",
            openComment: false,
            allPosts: [],
            allLikes: [],
            allComments: [],
            postId: "",
            commentId: "",
            dialogUpCom: false,
            dialogUpPost: false,
            valid: true,
            titleCheck: [
                (value) => !!value || 'Post Title',
                (value) => (value && value.length <= 50) || 'Title cannot have more than 50 characters',
            ],
            contentCheck: [
                (value) => !!value || 'Post cannot be empty',
            ],
            comContentCheck: [
                (value) => !!value || 'Comment cannot be empty',
                (value) => (value && value.length <= 255) || 'Comment cannot have more than 255 characters',
            ],
            dataPost: {
                postId: "",
                title:"",
                content:"",
                userId:"",
            },
            PostData: "",

            dataCom:{
                CommentId: "",
                content:"",
                userId: "",
            },
            comData: "",

            dataLike:{
                userId: "",
                nbLikes: "",
                postId: "",
                liked: false,
            },
            likeData: "",
            form: true
            
            
        }
    },
    methods: {        
        openForm(){
            this.$router.push('/Home/Feed/Post')
        },

        goDialogUpPost(postTitle, postContent, postId){
            this.dataPost.title = postTitle;
            this.dataPost.content = postContent;
            this.dataPost.postId = postId;
            this.dialogUpPost = true;
        },

        updatePost(){
            this.dataPost.userId = this.userId;
            this.PostData = JSON.stringify(this.dataPost);
            axios.put("http://localhost:3000/api/posts/" + this.dataPost.postId, this.PostData, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataPost.title = "";
                    this.dataPost.content = "";
                    this.dataPost.userId = "";
                    this.dataPost.postId = "";
                    this.dialogUpPost = false;
                    window.location.reload(true);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        
        deletePost(pId){
            axios.delete("http://localhost:3000/api/posts/" + pId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.reload(true);
                })
                .catch(error => {
                    console.log(error);    
                })
        },
        //----------------Comments---------------------------
        openCommentFrm(){
            this.openComment = true
        },

        closeCommentFrm(){
            this.openComment = false
        },

        viewCom(pId){
            this.postId = pId;
            this.openComment = false;
            axios.get("http://localhost:3000/api/posts/" + pId + "/comments", {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let com = JSON.parse(response.data);
                    this.allComments = com;
                    console.log (this.allComments)
                })
                .catch(error => {
                console.log(error);
                });
        },

        sendCom(pId){
            this.dataCom.userId = this.userId;
            this.comData = JSON.stringify(this.dataCom);
            axios.post("http://localhost:3000/api/posts/" + pId + "/comments", this.comData, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataCom.content="";
                    this.dataCom.userId="";
                    this.openComment=false;
                })
                .catch(error => {
                    console.log(error); 
                    this.message=error;
                    this.msg=true
                });
        },

        goDialogUpCom(comContent, commentId){
            this.dataCom.CommentId = commentId;
            this.dataCom.content = comContent;
            this.dialogUpCom = true; 
        },

        updateCom(){
            this.dataCom.userId = this.userId;
            this.comData = JSON.stringify(this.dataCom);
            axios.put("http://localhost:3000/api/posts/comments/" + this.dataCom.commentId, this.comData, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataCom.content = "";
                    this.dataCom.userId = "";
                    this.openComment = false;
                    window.location.reload(true);
                })
                .catch(error => {
                    console.log(error);     
                })
        },
        
        deleteCom(cId){
            axios.delete("http://localhost:3000/api/posts/comments/" + cId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.reload(true);
                })
                .catch(error => {
                    console.log(error);
                })
        },

        //----------------LIKES---------------------------
        likePost(postId, nbLikes){
            this.allLikes.forEach(element => {
                if(element.postId == postId && element.userId == localStorage.userId){
                    this.dataLike.nbLikes = nbLikes+-1;
                    this.dataLike.liked = true;
                }
            });
            if(this.dataLike.liked == false){
                this.dataLike.nbLikes = nbLikes+1;
            }
            this.dataLike.userId = localStorage.userId;
            this.dataLike.postId = postId;
            this.likeData = JSON.stringify(this.dataLike);
            axios.post("http://localhost:3000/api/posts/" + postId + "/like", this.likeData, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataLike.liked = false;
                    location.reload();
                })
                .catch(error => {
                    console.log(error);
                    this.dataLike.liked = false;
                })
        },
    },
    components: {
        "page-header": pageHeader, 
    },
    mounted(){
        this.userId = localStorage.userId;
        axios.get("http://localhost:3000/api/posts", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let posts = JSON.parse(response.data);
                this.allPosts = posts;
            })
            .catch(error => {
                console.log(error); 
            });
        axios.get("http://localhost:3000/api/posts/likes", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response =>{
                let likes = JSON.parse(response.data);
                this.allLikes = likes;
            })
            .catch(error => {
                console.log(error)
            }); 
    },
}
</script>
<style lang="scss">
    h1{
        text-align: center;
    }
    #Feed{
        &__comments{
            &--ind{
                position: relative;
            }
        }
   }
</style>