<!--CONCLUDED -->

<template>
    <v-app class="form ma-auto mt-6">
        <v-card raised>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field 
                        v-model="dataLogin.email" 
                        :rules="emailCheck" 
                        label="E-mail" 
                        required 
                        autofocus
                    ></v-text-field>
                    <v-text-field 
                        v-model="dataLogin.password" 
                        :rules="passwordCheck" 
                        type="password" 
                        label="Password"
                        required
                    ></v-text-field>
                </v-form>
            </v-card-text>
            
            <v-btn :disabled="!valid" class="success mb-3" @click="Login()">Login</v-btn>
            <p v-if="msg">{{ message }}</p>
            
        </v-card>
    </v-app>
</template>

<script>
import axios from "axios"
export default {
    name : "Login",
        data(){
            return{
                valid: true,
                emailCheck: [
                    value => !!value || 'Insert your email',
                    value => /.+@.+\..+/.test(value) || 'E-mail format is not valid',
                ],
                passwordCheck: [
                    value => !!value || 'Insert your Password',
                ], 
                dataLogin: {
                    email: "",
                    password: "",
                },
                loginInfo: "",
                msg: false,
                message: ""
            }
    },
    methods: {
        Login(){
            this.loginInfo = JSON.stringify(this.dataLogin);
            axios.post('http://localhost:3000/api/auth/login', this.loginInfo, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    let log = JSON.parse(response.data);
                    localStorage.userId = log.userId;
                    localStorage.token = log.token;
                    localStorage.admin = log.admin;
                    this.$router.push('/Home');  
                })
                .catch(error => {
                    console.log(error);
                    this.message = error;
                    this.msg = true 
                }); 
        }
    }
}
</script>



<style lang="scss">
    .form{
        width: 325px;
    }
</style>