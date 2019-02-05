<template>
    <div id="app" class="flex-md-row flex-column">
        <app-header></app-header>
        <div class="main-background">
            <div class="main-page justify-content-center">
                <transition name="slide" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';


    
    export default {
        name: 'app',
        components: {
            appHeader: Header,
            appFooter: Footer
        },
        data () {
            return {

            }
        },
        created() {
            this.$store.dispatch('tryAutoLogin');
        },
        methods :{

        }
    }
</script>

<style lang="scss">
    #app {
        display: flex;
        background-color: white;
    }
    .slide-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }

    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateY(3rem);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-3rem);
            opacity: 0;
        }
    }
</style>
