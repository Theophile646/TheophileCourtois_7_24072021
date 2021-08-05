<template>
    <div>
        <div class="post-created">
            <h1>{{ this.$store.state.fullName}} voici vos publications :</h1>
            <div class="post" v-for="(post, idx) in postsCreated" :key="idx">
                <div class="post-content" @click.prevent="singlePostUrl(post.id)">
                    <h2>{{ post.title }}</h2>
                    <h3>Publié le {{ formatedPublicationDate(post.publicationDate) }}</h3>
                    <p>{{ post.content }}</p>
                </div>
                <button class="button button--delete" @click.prevent="deletePost(post.id)">Supprimer l'article</button>
            </div>

            <button @click="limit = null" class="button button--seemore">Voir Plus</button>

        </div>

        <button class="button button--delete" @click="deleteAccount()">Supprimer le compte</button>

    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from "vuex";


export default {
    name: "ProfileInformations",
    data() {
        return {
            postsCreated: [],
            limit: 5
        }
    },

    computed: {
        postLimited() {
            return this.limit ? this.posts.slice(0,this.limit) : this.posts
        }
    },

    methods: {
        ...mapMutations([
            'setUserId',
            'setToken',
            'setFullName',
            'setAdmin'
        ]),
        async getPostCreated() {
            const userId = this.$store.state.userId;

            await axios.get(`http://localhost:3000/api/posts/user/${userId}`,
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`,
                }
            })
            .then(response => {
                return this.postsCreated = response.data;
            })
            .catch(error => {
                console.log(error)
            })
        },

        singlePostUrl (id) {
            this.$router.push(`/postSingle/${id}`)
        },

        formatedPublicationDate(date) {
            const current =  new Date(date);
            const formatedPublicationDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
            return formatedPublicationDate;
        },
        deletePost(postId) {
            //console.log(postId);
            axios.delete(`http://localhost:3000/api/posts/${postId}`, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            })
            .then(res => {
                if(res.status === 200) {
                    this.message ="Votre publication a bien été supprimé !";
                    console.log('Post supprimé');
                }else{
                    this.message = "error";
                }
            })
        },
        deleteAccount() {
            const userId = this.$store.state.userId;
            axios.delete(`http://localhost:3000/api/auth/users/${userId}`, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            })
            .then(res => {
                if(res.status === 200) {
                    this.$store.commit('resetState');
                    this.$router.push('/');
                    this.message ="Votre compte a bien été supprimé !";
                    console.log('Compte supprimé');
                }
                else{
                    this.message = "error";
                }
            })
        }
    },

    created () {
        this.getPostCreated();
    }
}
</script>