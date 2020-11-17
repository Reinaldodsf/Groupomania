<!--CONCLUDED -->

<template>
    <div id="profile" class="d-flex justify-center">
        <page-header/>
        <v-card class="my-5 ml-5 col-10 col-lg-8" raised>
            <v-img class="logo mx-auto" src="../assets/icon.png" width="150px" contain></v-img>
            <v-card-title class="my-3 justify-center">
                <h1>My profile</h1>
            </v-card-title>

            <v-card-text class="ml-2 black--text">
                <p>First Name : {{ dataGet.firstName }}</p>
                <p>Last Name : {{ dataGet.lastName }}</p>
                <p>E-mail : {{ dataGet.email }}</p>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-between text-cenet">
                <v-btn @click.stop="dialogModify=true" title="Modify profile">Modify</v-btn>
                <v-btn @click.stop="deleteDialog=true" title="Delete profile" color="red">Delete</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog persistent v-model="dialogModify" max-width="500px">
            <v-card>
                <v-card-title>Modify Profile</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field  
                            v-model="dataModify.firstName" 
                            :rules="firstNameCheck" 
                            label="First Name" 
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="dataModify.lastName" 
                            :rules="lastNameCheck" 
                            label="Last Name" 
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="dataModify.email" 
                            :rules="emailCheck" 
                            label="E-mail" 
                            required
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="dialogModify=false">Cancel</v-btn>
                    <v-btn text :disabled="!valid" @click="updateUser" color="success">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    Do you want to delete your account?
                </v-card-title>
                <v-card-text>
                    <p>If your account is deleted, you will also delete all your posts as well as your comments.</p>
                    <p>{{ msg }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="deleteDialog=false">
                        Cancel
                    </v-btn>
                    <v-btn text @click="deleteUser">
                        Delete My Account
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import pageHeader from "./pageHeader.vue"
import axios from "axios"
export default {
    name: "Profile",
    data() {
        return{
            deleteDialog: false,
            dialogModify: false,
            msg: "",
            dataGet: { 
                firstName: "",
                lastName: "",
                email: ""
            },
            dataModify: {
                firstName: "",
                lastName: "",
                email: "",
            },
            modifiedData: "",
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
        }
    },
    methods: {
        deleteUser() {
            axios.delete("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                localStorage.userId = "";
                localStorage.token = "";
                this.$router.push('/');  
            })
            .catch(error => {
                this.msg = error; 
            })
        },
        updateUser() {
            this.modifiedData = JSON.stringify(this.dataModify);
            axios.put("http://localhost:3000/api/auth/", this.modifiedData, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                this.dialogModify = false;
                console.log(rep);
                location.reload();
            })
            .catch(error => {
                this.msg = error;
            })
        }
    },
    mounted() { 
        axios.get("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let profile = JSON.parse(response.data);
                this.dataGet.email = profile[0].email;
                this.dataGet.firstName = profile[0].firstName;
                this.dataGet.lastName = profile[0].lastName;
                this.dataModify.email = profile[0].email;
                this.dataModify.firstName = profile[0].firstName;
                this.dataModify.lastName = profile[0].lastName;
            })
            .catch(error => {
                this.msg = error;
            });    
    },
    
    components: {
        "page-header": pageHeader,
    }
}
</script>

<style lang="scss">
    .logo{
        margin-top: 5%;
        margin-left: 30%;
    }
@media screen and (min-width: 200px) and (max-width: 640px) {
    #profile {
        padding-left: 10%;
    }
}
</style>