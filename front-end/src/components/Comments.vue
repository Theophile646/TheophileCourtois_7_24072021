<template>
    <div class="comment-list">
        <div class="comment-single" v-for= "(oneComment, idx) in commentsList" :key="idx" >
            <p>{{ oneComment.content }}</p>
            <h3>Ecrit par {{oneComment.firstName}} {{oneComment.lastName}} le {{formatedDateComment(oneComment.date)}}</h3>
            <button class="button button--delete" v-if="isAuthor(oneComment.id) || $store.state.admin === 1">Supprimer</button>
        </div>
        
        <button class="button button--seemore" @click="limit = null" >Voir Plus</button>
        
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/_variables.scss';

.comment-list {
    border: 1px solid $secondary-color;
    border-top: 0px;
    margin: 0 30px 15px 30px;

    :nth-of-type(even):not(:last-child) {
        background-color: $fifth-color ;
    }

    
}

.comment-single{
    padding: 10px;
}


</style>

<script>
import axios from 'axios'
export default {
    name: 'Comments',
    data() {
        return {
            commentsList: [],
            limit: 5
        }
    },
    
    computed: {
        postLimited() {
            return this.limit ? this.posts.slice(0,this.limit) : this.posts
        }
    },

    methods: {
        async getAllComments(postId) {
            await axios.get(`http://localhost:3000/api/posts/${postId}/comments`,
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`,
                }
            })
            .then(response => {
                return this.commentsList = response.data;
            })
            .catch(error => {
                console.log(error)
            })
        },
         formatedDateComment(date) {
            const current =  new Date(date);
            const formatedPublicationDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
            return formatedPublicationDate;
        },
        isAuthor(userIdInComment){
            if(this.$store.state.userId === userIdInComment){
                return true;
            } else {
                return false;
            }
        }
    },

    created () {
        const id = window.location.href.slice(1).split("/")[4];
        this.getAllComments(id);
    }
}
</script>