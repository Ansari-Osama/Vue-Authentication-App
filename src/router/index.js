import {createRouter, createWebHistory} from "vue-router";
import Navbar from "../components/Navbar.vue";
import LoginComponent from "../components/LoginComponent.vue"
import SignUpComponent from "../components/SignUpComponent.vue";
import ProfileComponent from "../components/ProfileComponent.vue";

const router = createRouter({
    history : createWebHistory(import.meta.env.BASE_URL),
    routes : [
        {
            path : "/signup",
            name: "signup",
            component : SignUpComponent
        },
        {
            path : "/login",
            name : "login",
            component :LoginComponent
        },
        {
            path : "/profile",
            name : "profile",
            component : ProfileComponent
        }
    ]
})

export default router