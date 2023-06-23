<script setup>
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);


const router = useRouter();

const logout = () => {
    userStore.handleLogout();
    console.log("User has been Logout.")
    router.push("/login");
}
</script>

<template>
    <div class="container">
        <RouterLink class="heading" to="/login">{{ user ? user.username : "Authnetication" }}</RouterLink>
            <div class="yes-user" v-if="user">
                <RouterLink class="btn" to="/profile">Profile</RouterLink>
                <button class="btn" @click="logout">Logout</button>
            </div>
            <div class="no-user" v-else>
                <RouterLink class="btn" to="/signup">SignUp</RouterLink>
                <RouterLink class="btn" to="/login">SignIn</RouterLink>
            </div>
    </div>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 70px;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.heading {
    color: white;
    width: 400px;
    margin-left: 50px;
    font-size: 30px;
    text-decoration: none;
}

.no-user,
.yes-user {
    margin-right: 50px;
    display: flex;
    align-items: center;
    text-align: center;
}

.no-user .btn,
.yes-user .btn {
    width: 100px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    background-color: white;
    border-radius: 10px;
    border: none;
    text-decoration: none;
    color: black;
}
button {
    cursor: pointer;
}
</style>