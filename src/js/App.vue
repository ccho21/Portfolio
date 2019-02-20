<template>
    <div id="app" class="flex-md-row flex-column">
        <app-header></app-header>
        <div class="main-background">
            <div class="main-page justify-content-center">
                <transition name="slide" mode="out-in">
                    <router-view ></router-view>
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
            appFooter: Footer,
        },
        data () {
            return {

            }
        },
        created() {
            console.log('AUTO LOGIN',this.$store.dispatch('tryAutoLogin'));
        },
        methods :{
            test() {
              alert('test is working!!');
            },
            charInit(message) {
                let messageArr = message.split("");
                const animatedTitle = messageArr.map((cur, index) => {
                    if(index === 0) {
                        return {
                            character: cur,
                            classes: ['orange', 'charAnimation'],
                            key: index,
                        }
                    }
                    if (cur === ',') {
                        messageArr[index + 1] = "line";
                    }
                    if (cur === 'line') {
                        return {
                            character: '',
                            classes: ['d-block', 'charAnimation'],
                            key: index,
                        }
                    }
                    if (cur && cur === 'C') {
                        return {
                            character: cur,
                            classes: ['orange', 'charAnimation'],
                            key: index,
                        }
                    }
                    return {
                        character: cur,
                        classes: ['charAnimation'],
                        key: index,
                    }
                });
                return animatedTitle;
            },
            beforeStartAnimation(el) {
                let delay = el.dataset.index;
                el.style.opacity = 0;
            },
            startAnimation(el) {
                let delay = el.dataset.index;
                setTimeout(() => {
                    el.style.opacity = 1;
                    el.classList.add('jello-vertical');
                }, delay * 80);
            },
            removeAnimation(el) {
                let animationed = el.addEventListener('animationend', () => {
                    el.classList.remove('jello-vertical');
                })
            },
            //ANIMATIONS
            jelloVertical(e) {
                e.target.classList.add('jello-vertical');
                setTimeout(() => {
                    e.target.classList.remove('jello-vertical');
                }, 1000);
            },
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
