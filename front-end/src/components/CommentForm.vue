<template>
    <div class="comment">
        <form @submit.prevent="createComment">
            <div class="form-comment-content">
                <label for="comment-content">Ecrivez votre commentaire :</label>
                <textarea cols="40" rows="2" id="comment-content"></textarea>
            </div>
            <button type="submit" class="button button-publish">Publier</button>

            <div class="message">{{message}}</div>

        </form>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/_variables.scss';

.form-comment-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    label {
        padding-bottom: 10px;
        color: $secondary-color;
        font-weight: bold;
    }
    textarea {
        width: 50%;
        margin-bottom: 10px;
        border: 2px solid $secondary-color;
        border-radius: 10px;
    
        &:focus, :active{
        background-color: $fifth-color;
        outline: none;
        }
    }

}

</style>

<script>
import axios from 'axios';
export default {
    name: 'CommentForm',

    data() {
        return {
            message: ""
        }
    },

    methods: {
        createComment () {
            const userId = this.$store.state.userId;
            const postId = window.location.href.slice(1).split("/")[4];
            console.log(postId);
            const date = new Date().toJSON().slice(0, 10);
            const content= document.getElementById('comment-content').value;

            axios.post(`http://localhost:3000/api/posts/${postId}/comment`,
            {
                userId,
                postId,
                date,
                content
            },
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`,
                }
            })
            .then(res => {
                if(res.status === 201) {
                    this.message ="Votre commentaire a bien été publié !";
                    console.log('Commentaire publié');
                    this.$emit('launch-rerender');
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.message = "erreur.";
                } 
            });
        }
    }
}
</script>