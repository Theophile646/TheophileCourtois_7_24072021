<template>
    <div class="users-list">
        <NavBar/>
        <UsersList/>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import UsersList from '@/components/UsersList.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'Users',
    components: {
        NavBar,
        UsersList,
        Footer
    }
}
</script>