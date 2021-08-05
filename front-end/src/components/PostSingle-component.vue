<template>
    <div class="post">
        <h2>{{post.title}}</h2>
        <h3>Publié le {{formatDate(post.publicationDate)}} par {{ post.author }}</h3>
        <p>{{ post.content }}</p>
        <button class="button button--delete" v-if="isAuthor(post.userId)|| $store.state.admin === 1" @click.prevent="deletePost(post.id)">Supprimer</button>
        <span>{{ message }}</span>
    </div>
</template>

<style lang="scss" scoped>

.post {
    margin-bottom: 0px;
}

</style>


<script>
import axios from 'axios'
export default {
    name: 'PostSingleComponent',
    data () {
        return {
            post: {},
            message: ""
        }
    },
    methods: {
        async getPostById (postId) {
            await axios.get(`http://localhost:3000/api/posts/${postId}`,
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`,
                }
            })
            .then(response => {
                return this.post = response.data;
            })
            .catch(error => {
                console.log(error)
            })
        },
        formatDate(date) {
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
            axios.delete(`http://localhost:3000/api/posts/${postId}`, 
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            })
            .then(res => {
                if(res.status === 200) {
                    this.$router.push('/feed');
                    this.message ="Votre publication a bien été supprimé !";
                    console.log('Post supprimé');
                }
                else{
                    this.message = "error";
                }
            })
        }
    },

    created () {
        const id = window.location.href.slice(1).split("/")[4];
        this.getPostById(id);
    }

}
</script>