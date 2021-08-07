<template>
    <div>
        <form  @submit.prevent="createPost">
            <div class="form-post__title">
                <label for="create-post__title">Titre du poste :</label>
                <input type="text" name ="create-post__title" id="create-post__title">
            </div>
            <div class="form-post__content">
                <label for="create-post__content">Que souhaitez-vous partager aujourd'hui ?</label>
                <textarea cols="40" rows="5" name="create-post__content" id="create-post__content" required minlength="10" maxlength="300"></textarea>
            </div>
            <button type="submit" class="button button-publish">Publier</button>

            <div class="message">{{message}}</div>
        </form>
    </div>
</template>

<style lang="scss">
@import '@/assets/_variables.scss';

.form-post__title, .form-post__content, .modify-title, .modify-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    label {
        padding-bottom: 10px;
        color: $secondary-color;
        font-weight: bold;
    }
    input, textarea {
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
    name: 'FormPost',
    data() {
        return {
            message:""
        }
    },
    methods: { 
        sendMessage() {
            this.$emit('message-sent', {
                message:"Mon message"
            })
        },
        createPost () {
            const title = document.getElementById('create-post__title').value;
            const content = document.getElementById('create-post__content').value;
            const publicationDate = new Date().toJSON().slice(0, 10);
            const author = this.$store.state.fullName;
            const userId = this.$store.state.userId;

            axios.post(`http://localhost:3000/api/posts`,
            {
                title,
                content,
                publicationDate,
                author,
                userId
            },
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`,
                }
            })
            .then(res => {
                if(res.status === 201) {
                    this.message ="Votre message a bien été publié !";
                    console.log('Post publié');
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