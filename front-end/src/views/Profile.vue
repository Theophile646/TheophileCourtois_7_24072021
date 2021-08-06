<template>
    <div class="profile">
        <NavBar/>
        <ProfileInformations @launch-rerender="forceRerender()" :key="`${componentKey}-1`"/>
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