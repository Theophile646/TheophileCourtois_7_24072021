<template>
    <div class="home">
        <NavBar/>
        <FormPost/>
        <PostsFeed />
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FormPost from '@/components/FormPost.vue'
import PostsFeed from '@/components/PostsFeed.vue'
import Footer from '@/components/Footer.vue'



export default {
  name: 'Feed',
  components: {
    NavBar,
    FormPost,
    PostsFeed,
    Footer
  }
}
</script>