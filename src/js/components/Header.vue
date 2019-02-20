<template>
    <nav class="navbar navbar-expand-md flex-row flex-md-column">
        <router-link to="/" class="navbar-brand text-white p-0 m-0 mt-md-5">
            <svg class="nav-logo ani-shaking">
                <use xlink:href="#copyright"/>
            </svg>
        </router-link>
        <button class="navbar-toggler text-black" type="button" data-toggle="collapse"
                data-target="#navbarToggle"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                @click="isNavbarOpen = !isNavbarOpen">
            <span class="navbar-toggler-icon">COL</span>
        </button>
        <div></div>
        <div class="collapse navbar-collapse flex-md-column justify-content-md-between"
             id="navbarToggle" :class="{show: isNavbarOpen}">
            <ul class="list-unstyled text-center navbar-auth pt-md-5 pt-0 d-flex flex-md-column flex-row align-items-center">
                <router-link :to="{name: 'sign-in'}" class="nav-item" active-class="active" tag="li" v-if="!auth">
                    <a class="nav-link text-white">
                        <svg class="icon">
                            <use xlink:href="#user"/>
                        </svg>
                        <div class="nav-text">LOG IN</div>
                    </a>
                </router-link>
                <router-link :to="{name: 'sign-up'}" class="nav-item" active-class="active" tag="li" v-if="!auth">
                    <a class="nav-link text-white">
                        <svg class="icon">
                            <use xlink:href="#plus"/>
                        </svg>
                        <div class="nav-text">SIGN UP</div>
                    </a>
                </router-link>
            </ul>
            <ul class="list-unstyled text-center navbar-auth pt-md-5 pt-0 d-flex flex-md-column flex-row align-items-center" v-if="auth">
                <router-link :to="{name: 'dashboard'}" class="nav-item" active-class="active" tag="li">
                    <a class="nav-link text-white">
                        <svg class="icon">
                            <use xlink:href="#wrench"/>
                        </svg>
                        <div class="nav-text">BOARD</div>
                    </a>
                </router-link>

                <li class="nav-item">
                    <button class="logout" @click="onLogout" >
                        <svg class="icon">
                            <use xlink:href="#logout"/>
                        </svg>
                        <div class="nav-text">LOG OUT</div>
                    </button>
                </li>
            </ul>
            <ul class="list-unstyled navbar-main d-flex flex-md-column flex-row align-items-center">

                <router-link to="/" class="nav-item" tag="li" active-class="active" exact>
                    <a class="nav-link text-white">
                        <svg class="icon">
                            <use xlink:href="#home"/>
                        </svg>
                        <div class="nav-text">HOME</div>
                    </a>
                </router-link>
                <router-link to="/about" class="nav-item" active-class="active" tag="li">
                    <a class="nav-link text-white">
                        <svg class="icon">
                            <use xlink:href="#eye"/>
                        </svg>
                        <div class="nav-text">ABOUT</div>
                    </a>
                </router-link>
                <router-link to="/projects" class="nav-item" active-class="active" tag="li">
                    <a class="nav-link text-white">
                        <svg class="icon">
                            <use xlink:href="#gear"/>
                        </svg>
                        <div class="nav-text">WORKS</div>
                    </a>
                </router-link>

                <router-link to="/contacts" class="nav-item" active-class="active" tag="li">
                    <a class="nav-link text-white">
                        <svg class="icon">
                            <use xlink:href="#mail"/>
                        </svg>
                        <div class="nav-text">CONTACT</div>
                    </a>
                </router-link>
            </ul>

            <ul class="list-unstyled navbar-social d-flex flex-md-column flex-row align-items-center">

                <li class="nav-item">
                    <a href="https://github.com/ccho21" class="nav-link text-white" target="_blank">
                        <svg class="icon">
                            <use xlink:href="#github"/>
                        </svg>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="https://www.linkedin.com/in/changsoo-cho-9ab21615a/" class="nav-link text-white"
                       target="_blank">
                        <svg class="icon">
                            <use xlink:href="#linkedin"/>
                        </svg>
                    </a>
                </li>

            </ul>
        </div>
    </nav>


</template>

<script>
    export default {
        data() {
            return {
                isNavbarOpen: false,
            }
        },
        computed: {
            auth() {
                return this.$store.getters.isAuthenticated;
            }
        },
        mounted() {

        },
        methods: {
            onLogout() {
                this.$store.dispatch('logout').then((res) => {
                    alert(`Thank you for visiting my webpage!
                    You are successfully logged out`);
                    this.$router.push('/sign-in');
                });
            },
            enter(el) {
                console.log('enter');
                let delay = el.dataset.index * 150;
                setTimeout(() => {
                    el.classList.add('is-show');
                }, delay)
            },
            leave(el) {
                el.classList.add('slide-leave-active');
            }
        }
    }
</script>
<style lang="scss">
    .logout {
        background-color: transparent;
        border: none;
        font: inherit;
        cursor: pointer;
        color: white;
    }

    nav {
        background-color: rgba(0, 0, 0, 0.7);
        margin-right: .8rem;
        width: 6rem;
    }

    /*ANIMATION*/
    .slide-leave-active {
        animation-delay: .5s;
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

