<template>
    <div class="home">
        <NavBar/>
        <FormPost @launch-rerender="forceRerender()" :key="`${componentKey}-1`"/>
        <PostsFeed @launch-rerender-ondelete="forceRerender()" :key="`${componentKey}-2`"/>
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