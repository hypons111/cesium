<template>
    <div id="login">
        <div id="loginContainer">
            <p>帳號</p><input type="text" v-model="user" placeholder="" autocomplete="off" />
            <p>密碼</p><input type="password" v-model="password" placeholder="" autocomplete="off" />
            <button @click="login" type="button">登入</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref("");
const password = ref("");

function login() {
    if(user.value.trim() === "hypons" && password.value.trim() === "1661") {
        router.push("/system");
    } else {
        alert("帳號或密碼錯誤")
    }
}
</script>

<style lang="scss" scoped>
#login {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("@/assets/image/loginBackground.png");
    background-size: cover;
    background-repeat: no-repeat;

    #loginContainer {
        width: 20em;
        padding: 1em;
        color: rgb(var(--WHITE));

        p {
            width: 2.5em;
            display: inline-block;
            color: white;
            font-size: 1em;
            font-weight: bolder;
        }

        input {
            width: calc(100% - 2.5em);
            height: 38px;
            padding: 12px;
            flex-grow: 1;
            border-radius: 1em;
            background-color: rgba(var(--WHITE), 0.75);
            margin-bottom: 2em;
        }

        button {
            width: 100%;
            height: 38px;
            color: rgb(var(--WHITE));
            font-size: 1.25em;
            font-weight: bolder;
            border-radius: 1em;
            background-color: rgb(var(--B4));
        }
    }



}
</style>