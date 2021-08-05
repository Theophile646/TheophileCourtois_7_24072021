<template>
    <div>
        <img src="@/assets/icon-left-font.png" alt="logo-footer-groupomania">
        <p>La direction de Groupomania est heureuse de vous présenter votre nouveau réseau social d'entreprise !</p>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/_variables.scss';

div{
    border-top: 2px solid $secondary-color;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;   
    p {
        padding-bottom: 40px;
    }
}

img {
    width: 50%;
    margin-top: 30px;
}

</style>

<script>
export default {
    name: 'Footer'
}
</script>