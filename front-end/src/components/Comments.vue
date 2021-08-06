<template>
    <div class="comment-list">
        <span v-if="commentsList.length === 0">Personne n'a encore commenté cette publication !</span>
        <div class="comment-single" v-for= "(oneComment, idx) in commentsLimited" :key="idx" >
            <p>{{ oneComment.content }}</p>
            <h3>Ecrit par {{oneComment.firstName}} {{oneComment.lastName}} le {{formatedDateComment(oneComment.date)}}</h3>
            <button class="button button--delete" v-if="isAuthor(oneComment.userId) || $store.state.admin === 1" @click.prevent="deleteComment(oneComment.commentId)">Supprimer</button>
        </div>
        
        <button class="button button--seemore" v-if="commentsList.length > 5" @click="limit = null" >Voir Plus</button>
        
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/_variables.scss';

span {
    line-height: 2em;
}

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
        commentsLimited() {
            return this.limit ? this.commentsList.slice(0,this.limit) : this.commentsList
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
                console.log(response.data);
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
        },
        deleteComment(commentId) {
            //console.log(postId);
            const postId = window.location.href.slice(1).split("/")[4];
            console.log(commentId);
            axios.delete(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            })
            .then(res => {
                if(res.status === 200) {
                    this.message ="Votre publication a bien été supprimé !";
                    console.log('Post supprimé');
                    this.$emit('launch-rerender-ondelete-comment');
                }else{
                    this.message = "error";
                }
            })
        }
    },

    created () {
        const id = window.location.href.slice(1).split("/")[4];
        this.getAllComments(id);
    }
}
</script>