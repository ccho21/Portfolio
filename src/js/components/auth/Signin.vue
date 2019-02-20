<template>

    <div id="signin">
        <transition-group tag="h2"
                          v-bind:css="false"
                          class="heading mb-3 text-white mb-3"
                          v-on:before-enter="$parent.beforeStartAnimation"
                          v-on:enter="$parent.startAnimation"
                          v-on:after-enter="$parent.removeAnimation">
                <span v-for="(item, index) in animatedTitle"
                      v-bind:key="item.key"
                      v-bind:data-index="index"
                      :class="item.classes"
                      class="font-xl charAnimation"
                      @mouseover="$parent.jelloVertical">
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
            this.animatedTitle = this.$parent.charInit(this.message);
        },
        methods: {
            onSubmit() {
                const formData = {
                    email: this.email,
                    password: this.password,
                };
                this.$store.dispatch('login',
                    {
                        email: formData.email,
                        password: formData.password
                    }).then((res)=>{
                        console.log('RESOLVED',res);
                        alert(`successfully logged in ${res.data.email}`);
                    }).then(()=>{
                    this.$router.push('/');
                });
            },
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
