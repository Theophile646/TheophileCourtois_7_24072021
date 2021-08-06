<template>
    <div class="feed">
        <h1>Dernières Publications</h1>
        <span v-if="posts.length === 0">Personne n'a encore publié !</span>
        <div class="post" v-for= "(post, idx) in postLimited" :key="idx">
            <div class="post-content" @click.prevent="singlePostUrl(post.id)">
                <h2>{{ post.title }}</h2>
                <h3>Publié le {{formatDatePost(post.publicationDate)}} par {{ post.author }}.</h3>
                <p>{{ post.content }}</p>
            </div>
            <button class="button button--delete" v-if="isAuthor(post.userId) || $store.state.admin === 1" @click.prevent="deletePost(post.id)">Supprimer la publication</button>
            <div class="message">{{message}}</div>
        </div>
        <button v-if="posts.length > 5" @click="limit = null" class="button button--seemore ">Voir plus</button>
    </div>
</template>

<style lang="scss">
@import '@/assets/_variables.scss';

.post {
    border: 1px solid $secondary-color;
    margin: 15px 30px;
    padding: 30px 30px;

    .post-content {
        cursor: pointer;
    }


}

h3 {
    font-size: 0.9em;
    font-style: italic;
}

h2::first-letter {
    text-transform: capitalize;
}




</style>

<script>
import axios from "axios";

export default {
    name: 'PostFeed',
    data() {
        return {
            posts: [],
            limit: 5,
            message: ""
        }
    },
    computed: {
        postLimited() {
            return this.limit ? this.posts.slice(0,this.limit) : this.posts
        },
    
    },

    methods: {
        async getAllPosts() {
            await axios.get('http://localhost:3000/api/posts',
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`,
                }
            })
            .then(response => {
                return this.posts = response.data;
            })
            .catch(error => {
                console.log(error)
            })

        },
        singlePostUrl (id) {
            this.$router.push(`/postSingle/${id}`)
        },
        formatDatePost(date) {
            const current = new Date(date);
            const formatedPublicationDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
            return formatedPublicationDate;
        },
        isAuthor(userIdInPost){
            if(this.$store.state.userId === userIdInPost){
                return true;
            } else {
                return false;
            }
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
                    this.$emit('launch-rerender-ondelete');
                }else{
                    this.message = "error";
                }
            })
        }
    },
    
    created () {
        this.getAllPosts();
    }


}
</script>