<!--CONCLUDED -->

<template>
    <v-app class="form ma-auto mt-6">
        <v-card raised>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field  
                        v-model="dataSignup.firstName" 
                        :rules="firstNameCheck" 
                        label="First Name"
                        autofocus 
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="dataSignup.lastName" 
                        :rules="lastNameCheck" 
                        label="Last Name" 
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="dataSignup.email" 
                        :rules="emailCheck" 
                        label="E-mail" 
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="dataSignup.password" 
                        :rules="passCheck" 
                        type="password" 
                        label="Password" 
                        required
                    ></v-text-field>
                    <v-text-field 
                        v-model="confirmPassword" 
                        :rules="confirmPassCheck" 
                        type="password" 
                        label="Confirm Password" 
                        required
                    ></v-text-field>
                </v-form>
                
                <v-btn :disabled="!valid" class="success my-5" @click="Signup()()">Sign Up</v-btn>
                <p v-if="msg">{{ message }}</p>

            </v-card-text>
        </v-card>
    </v-app>
</template>
<script>
import axios from "axios"
export default {
    name : "Signup",
    data(){
        return{
            valid: true,
            firstNameCheck: [
                (value) => !!value || 'Please insert your First name',
            ],
            lastNameCheck: [
                (value) => !!value || 'Please insert your Last name',
            ],
            emailCheck: [
                (value) => !!value || 'Please insert your E-mail',
                (value) => /.+@.+\..+/.test(value) || "E-mail has an invalid format",
            ],
            passCheck: [
                (value) => !!value || 'Please insert your Password',
                (value) => (value && value.length >= 8) || 'Minimum 8 characters ',
                (value) => /(?=.*[A-Z])/.test(value) || 'At least one capital letter', 
                (value) => /(?=.*\d)/.test(value) || 'At least one number',
            ],
            confirmPassCheck: [
                (value) => !!value || 'Please insert again your Password',
                (value) =>
                    value === this.dataSignup.password || 'Passwords do not match', 
            ], 
            dataSignup:{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
            signupData: "", 
            form: true,
            msg: false,
            message: ""
        }
    },
    methods: {
        Signup(){
            this.signupData = JSON.stringify(this.dataSignup)
            axios.post('http://localhost:3000/api/auth/signup', this.signupData, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                let sign = JSON.parse(response.data);
                this.message = sign.message;
                this.form = false;
                this.msg = true;
            })
            .catch(error => {
                console.log(error);
                this.message = error;
                this.msg = true; 
            });
        }
    }
}
</script>
<style lang="scss">
    .form{
        width: 450px;
    }
</style>