import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import {useRouter} from "vue-router";

export const useUserStore = defineStore("users", () => {
    const user = ref(null);
    const errorMessage = ref("");
    const loading = ref(false);
    const loadingUser = ref(false);

    const router = useRouter();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async (credentials) => {
        const { email, password } = credentials;
        if (!validateEmail(email)) {
            return errorMessage.value = "E-mail is Invalid";
        }
        if (!password.length) {
            return errorMessage.value = "Please Enter the Password";
        }
        loading.value = true;
        const { error, data } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if (error) {
           return errorMessage.value = error.message;
        }
        
        const { data: existingUser } = await supabase
            .from("users")
            .select()
            .eq('email', email)
            .single()

        user.value = {
            email: existingUser.email,
            username: existingUser.username,
            id: existingUser.id
        }
        if (!error) {
            loading.value = false;
            router.push('/profile');
            return errorMessage.value = "";
        }
    }

    const handleSignUp = async (credentials) => {
        const { username, email, password } = credentials;
        if (password.length < 6) {
            return errorMessage.value = "Password must be Atleast 6 Characters Long...";
        }
        if (username.length < 4) {
            return errorMessage.value = "UserName must be Atleast 4 Characters Long...";
        }
        if (!validateEmail(email)) {
            return errorMessage.value = "E-mail is Invalid..."
        }

        loading.value = true
        const { data: userWithUsername } = await supabase
            .from("users")
            .select()
            .eq('username', username)
            .single()
        if (userWithUsername) {
            loading.value = false;
            return errorMessage.value = "User Already Exist with Same UserName..."
        }
        errorMessage.value = "";

        const { error } = await supabase.auth.signUp({
            email,
            password
        })
        await supabase.from("users")
            .insert({
                username,
                email,
                password
            })

        if (error) {
            loading.value = false;
            return errorMessage.value = error.message;
        }
        const { data: newUser } = await supabase
            .from("users")
            .select()
            .eq("email", email)
            .single()

        user.value = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username
        }
        loading.value = false;
        errorMessage.value = "";
        if (!error) {
            loading.value = false;
            router.push('/profile');
            return errorMessage.value = "";
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        user.value = null;
     }

    const getUser = async () => {
        loadingUser.value = true;
        const {data} = await supabase.auth.getUser();
        if(!data.user) {
            return user.value = null;
            loadingUser.value = false;
        }
        const {data : userWithEmail} = await supabase
            .from("users")
            .select()
            .eq("email", data.user.email)
            .single();
            
        user.value = {
            id : userWithEmail.id,
            username : userWithEmail.username,
            email : userWithEmail.email
        }
        loadingUser.value = false;
    }

    const clearErrorMessage = () => {
        errorMessage.value = "";
    }

    return { user, errorMessage, loading, loadingUser, handleLogin, handleSignUp, handleLogout, getUser, clearErrorMessage }
}) 