<template>
    <div class="profile">
        <NavBar/>
        <ProfileInformations/>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ProfileInformations from '@/components/ProfileInformations.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: "Profile",
    components: {
        NavBar,
        ProfileInformations,
        Footer
    }
}
</script>