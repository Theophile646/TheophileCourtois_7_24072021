<template>
    <div class="post-single-wrapper">
        <div class="post" v-if="!modify">
            <h2>{{post.title}}</h2>
            <h3>Publié le {{formatDate(post.publicationDate)}} par {{ post.author }}</h3>
            <p>{{ post.content }}</p>
            <div class="buttons">
                <button class="button button--delete" v-if="isAuthor(post.userId)" @click="modify = true">Modifier</button>
                <button class="button button--delete" v-if="isAuthor(post.userId)|| $store.state.admin === 1" @click.prevent="deletePost(post.id)">Supprimer</button>
            </div>
            <span>{{ message }}</span>
        </div>

        <div class="modify-post" v-if="modify">
            <div class="modify-title">
                <label for="modify-title-field">Titre</label>
                <input type="text" name="modify-title-field" id="modify-title-field">
            </div>
            <div class="modify-content">
                <label for="modify-content-field">Modifiez votre publication ici :</label>
                <textarea cols="40" rows="5" name="modify-content-field" id="modify-content-field" required minlength="10" maxlength="300" ></textarea>
            </div>
            <button type="submit" class="button button-publish" @click.prevent="modifyPost">Modifier</button>

        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/_variables.scss';

.buttons {
    display: flex;
    justify-content: space-evenly;
}

.modify-post {
    border: 1px solid $secondary-color;
    margin: 15px 30px;
    padding: 30px 30px;
}

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
            message: "", 
            modify : false
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
        modifyPost() {
            const postId = window.location.href.slice(1).split("/")[4];
            const title = document.getElementById('modify-title-field').value;
            const content = document.getElementById('modify-content-field').value;
            console.log(postId);
            
            axios.put(`http://localhost:3000/api/posts/${postId}`, 
            {
                postId,
                title,
                content

            },
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            })
            .then(res => {
                if(res.status === 200) {
                    console.log('Post supprimé');
                    this.$emit('launch-rerender-onmodify-post');                    
                }
                else{
                    this.message = "error";
                }
            })
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