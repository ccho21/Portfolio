<template>

    <div id="signin">
        <transition-group tag="h2"
                          v-bind:css="false"
                          class="heading mb-3 text-white mb-3"
                          v-on:before-enter="beforeStartAnimation"
                          v-on:enter="startAnimation"
                          v-on:after-enter="removeAnimation">
                <span v-for="(item, index) in animatedTitle"
                      v-bind:key="item.key"
                      v-bind:data-index="index"
                      :class="item.classes"
                      class="font-xl charAnimation"
                      @mouseover="jelloVertical">
                      {{ item.character=== ' ' ? '&nbsp' : item.character }}
                </span>
        </transition-group>
        <div class="signin-form">
            <form @submit.prevent="onSubmit">
                <div class="input">
                    <label for="email">Mail</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email">
                </div>
                <div class="input">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password">
                </div>
                <div class="submit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                email: '',
                password: '',
                animatedTitle: [],
                message: `Login`,
            }
        },
        created() {
            this.$store.dispatch('setMessage', this.message);
            this.animatedTitle = this.charInit();
        },
        methods: {
            onSubmit() {
                const formData = {
                    email: this.email,
                    password: this.password,
                };
                console.log('AUTHENTO', this.isAuthenticated());
                this.$store.dispatch('login',
                    {
                        email: formData.email,
                        password: formData.password
                    });
            },

            ...mapGetters({
                charInit: 'charInit',
                isAuthenticated: 'isAuthenticated'
            }),
            beforeStartAnimation(el) {
                let delay = el.dataset.index;
                el.style.opacity = '0';
            },
            startAnimation(el) {
                let delay = el.dataset.index;
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.classList.add('jello-vertical');
                }, delay * 100);
            },
            removeAnimation(el) {
                let animationed = el.addEventListener('animationend', () => {
                    el.classList.remove('jello-vertical');
                })
            },
            // //ANIMATIONS
            jelloVertical(e) {
                e.target.classList.add('jello-vertical');
                setTimeout(() => {
                    e.target.classList.remove('jello-vertical');
                }, 1000);
            }
        }
    }
</script>

<style scoped>
    .signin-form {
        width: 400px;
        margin: 30px auto;
        border: 1px solid #eee;
        padding: 20px;
        box-shadow: 0 2px 3px #ccc;
    }

    .input {
        margin: 10px auto;
    }

    .input label {
        display: block;
        color: #4e4e4e;
        margin-bottom: 6px;
    }

    .input input {
        font: inherit;
        width: 100%;
        padding: 6px 12px;
        box-sizing: border-box;
        border: 1px solid #ccc;
    }

    .input input:focus {
        outline: none;
        border: 1px solid #521751;
        background-color: #eee;
    }

    .submit button {
        border: 1px solid #521751;
        color: #521751;
        padding: 10px 20px;
        font: inherit;
        cursor: pointer;
    }

    .submit button:hover,
    .submit button:active {
        background-color: #521751;
        color: white;
    }

    .submit button[disabled],
    .submit button[disabled]:hover,
    .submit button[disabled]:active {
        border: 1px solid #ccc;
        background-color: transparent;
        color: #ccc;
        cursor: not-allowed;
    }
</style>
