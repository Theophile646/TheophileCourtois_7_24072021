<template>
    <div class="users-list">
        <h1>Voici les utilisateurs présents sur la plateforme :</h1>
        <div class="user-box" v-for= "(user, idx) in users" :key="idx">
            <h2>{{ user.firstName }} {{ user.lastName }}</h2>
            <button class="button button--delete" @click.prevent="deleteUser(user.id)">Supprimer l'utilisateur</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/_variables.scss';


h1 {
    padding-bottom: 10px;
}

.users-list{
    margin-bottom: 60px;
}

.user-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    border: 1px solid $secondary-color;
    padding: 30px 30px;
    margin: 15px auto;



}

</style>

<script>
import axios from 'axios'
export default {
    name: 'UsersList',
    data() {
        return {
            users: []
        }
    },
    methods: {
        async getAllUsers() {
            await axios.get('http://localhost:3000/api/auth/users',
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`,
                }
            })
            .then(response => {
                return this.users = response.data;
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteUser(userId){
            axios.delete(`http://localhost:3000/api/auth/users/${userId}`, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            })
            .then(res => {
                if(res.status === 200) {
                    this.message ="Ce compte a bien été supprimé !";
                    console.log('Compte supprimé');
                }else{
                    this.message = "error";
                }
            })
        }

    },
    created() {
        this.getAllUsers();
    }
}
</script>