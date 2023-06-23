<script setup>
    import {reactive} from "vue";
    import {useUserStore} from "../stores/users";
    import {storeToRefs} from "pinia";

    const userStore = useUserStore();
    const {errorMessage, user} = storeToRefs(userStore);

    const userCredentials = reactive({
        email : "", 
        password : ""
    })

    const loginUser = () => {
        userStore.handleLogin(userCredentials);
        errorMessage.value = "";    
    }
</script>


<template>
    <div class="container">
        <h1>Login</h1>
        <input type="text" v-model="userCredentials.email" placeholder="E-mail">
        <input type="password" v-model="userCredentials.password" placeholder="Password">
        <button @click="loginUser">Login</button>
        <RouterLink class="go-to-signup" to="/signup">Create a New Acount ? Register</RouterLink>
        <p class="error" v-if="errorMessage" type="danger">{{ errorMessage }}</p>
   </div>
</template>

<style scoped>
    .container {
        width: 380px;
        height: 400px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 80px;
        background-color: rgb(187, 184, 184);
        border-radius: 40px;
    }
    h1 {
        color: black;
        font-size: 40px;
        margin-bottom: 10px;
    }
    input {
        width: 300px;
        height: 30px;
        padding: 5px;
        margin: 10px;
        border: none;
        border-radius: 20px;
        text-align: center;
        font-size: 17px;
        font-weight: bold;
    }
    button {
        margin-top: 20px;
        font-size: 20px;
        width: 130px;
        height: 35px;
        background-color: black;
        color: white;
        font-weight: bold;
        text-align: center;
        border: none;
        border-radius: 20px;
        cursor: pointer;
    }
    .go-to-signup {
        color: black;
        text-decoration: none;
        margin-top: 20px;
        cursor: pointer;
        font-size: 17px;
        text-align: center;
    }
    .error {
        margin-top: 5px;
        color: red;
        font-weight: bold;  
    }
</style>