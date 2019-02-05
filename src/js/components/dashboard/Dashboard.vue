<template>
    <div id="dashboard text-white">
        <h1>This is the dashboard!</h1>
        <p>You should only get here if you're authenticated!</p>
        <p v-if="email">Your email address: {{ email }}</p>
    </div>
</template>

<script>
    export default {
        computed: {
            email() {
                return !this.$store.getters.user ? false : this.$store.getters.user.email;
            }
        },
        created() {
            console.log('dash board starteD!!!');
            this.$store.dispatch('fetchUser');
        },
        methods: {

        }
    }
</script>

<style scoped>
    h1, p {
        text-align: center;
    }

    p {
        color: red;
    }
</style>
