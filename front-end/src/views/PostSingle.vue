<template>
    <div>
        <NavBar/>
        <PostSingleComponent/>
        <Comments />
        <CommentForm/>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import PostSingleComponent from '@/components/PostSingle-component.vue'
import CommentForm from '@/components/CommentForm.vue'
import Comments from '@/components/Comments.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'PostSingle',
    components: {
        NavBar,
        PostSingleComponent,
        CommentForm,
        Comments,
        Footer
    }
}
</script>