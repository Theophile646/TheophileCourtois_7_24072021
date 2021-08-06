<template>
    <div>
        <NavBar/>
        <PostSingleComponent />
        <Comments  @launch-rerender-ondelete-comment="forceRerender()" :key="`${componentKey}-2`"/>
        <CommentForm @launch-rerender="forceRerender()" :key="`${componentKey}-1`"/>
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
    },
    data() {
        return {
            componentKey: 0
        };
    }, 
    methods: {
        forceRerender() {
            this.componentKey += 1;
    }
    
  }
}
</script>