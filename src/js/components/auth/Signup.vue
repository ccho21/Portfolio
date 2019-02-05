<template>
    <div id="signup text-center mr-auto">
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
        <div class="signup-form">
            <form @submit.prevent="onSubmit">
                <div class="input" :class="{invalid: $v.email.$error}">
                    <label for="email">Mail</label>
                    <input
                        type="email"
                        id="email"
                        @blur="$v.email.$touch()"
                        v-model="email">
                    <p class="text-white" v-if="!$v.email.email">Please provide a valid email address </p>
                    <p class="text-white" v-if="!$v.email.required">this field must not be empty</p>
                    {{email === 'test@test.com'}}
                </div>
                <div class="input" :class="{invalid : $v.age.$error}">
                    <label for="age">Your Age</label>
                    <input
                        type="number"
                        id="age"
                        @blur="$v.age.$touch()"
                        v-model.number="age">
                    <p class="text-white" v-if="!$v.age.minVal">You have to be at least
                        {{$v.age.$params.minVal.min}}</p>

                </div>
                <div class="input" :class="{invalid: $v.password.$error}">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        @input="$v.password.$touch()"
                        v-model="password">
                </div>
                <div class="input" :class="{invalid: $v.confirmPassword.$error}">
                    <label for="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        @blur="$v.confirmPassword.$touch()"
                        v-model="confirmPassword">
                </div>
                <div class="input">
                    <label for="country">Country</label>
                    <select id="country" v-model="country">
                        <option value="usa">USA</option>
                        <option value="india">India</option>
                        <option value="uk">UK</option>
                        <option value="germany">Germany</option>
                        <option value="germany">Canada</option>
                    </select>
                </div>
                <div class="hobbies">
                    <h3>Add some Hobbies</h3>
                    <button @click="onAddHobby" type="button">Add Hobby</button>
                    <div class="hobby-list">
                        <div
                            class="input"
                            v-for="(hobbyInput, index) in hobbyInputs"
                            :class="{invalid: $v.hobbyInputs.$each[index].$error}"
                            :key="hobbyInput.id">
                            <label :for="hobbyInput.id">Hobby #{{ index }}</label>
                            <input
                                type="text"
                                :id="hobbyInput.id"
                                @blur="$v.hobbyInputs.$each[index].value.$touch()"
                                v-model="hobbyInput.value">
                            <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
                            <p class="text-white" v-if="$v.hobbyInputs.minLen"> you have to specify at least {{
                                $v.hobbyInputs.$params.minLen.min }} hobbies</p>
                        </div>
                    </div>
                </div>
                <div class="input inline" :class="{ invalid : $v.terms.$invalid}">
                    <input type="checkbox" id="terms" @change="$v.terms.$touch()" v-model="terms">
                    <label for="terms">Accept Terms of Use</label>
                </div>
                <div class="submit">
                    <button type="submit" :disabled="$v.$invalid">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, email, numeric, minValue, minLength, sameAs, requiredUnless} from 'vuelidate/lib/validators';
    import axios from 'axios';
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                email: '',
                age: null,
                password: '',
                confirmPassword: '',
                country: 'usa',
                hobbyInputs: [],
                terms: false,
                // ANIMATION
                animatedTitle: [],
                message: `Sign up`,
            }
        },
        created() {
            this.$store.dispatch('setMessage', this.message);
            this.animatedTitle = this.charInit();
        },
        validations: {
            email: {
                required,
                email,
                unique: val => {
                    console.log(val);
                    if (val === '') {
                        return true;
                    }
                    return axios.get(`/users.json?orderBy="email"&equalTo="${val}"`)
                        .then(res => {
                            console.log(res);
                            console.log(Object.keys(res.data).length);
                            return Object.keys(res.data).length == 0;
                        });
                }
            },
            age: {
                required,
                numeric,
                minVal: minValue(18)
            },
            password: {
                required,
                minLen: minLength(6)
            },
            confirmPassword: {
                // sameAs: sameAs('password'),
                sameAs: sameAs(vm => {
                    return vm.password;
                }),
            },
            terms: {
                // required,
                required: requiredUnless(vm => {
                    return vm.country === 'germany';
                }),
            },
            hobbyInputs: {
                required,
                minLen: minLength(1),
                $each: {
                    value: {
                        required,
                        minLen: minLength(5)
                    }
                }
            }
        },
        methods: {
            onAddHobby() {
                const newHobby = {
                    id: Math.random() * Math.random() * 1000,
                    value: '',
                };
                this.hobbyInputs.push(newHobby);
            },
            onDeleteHobby(id) {
                this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
            },
            onSubmit() {
                const formData = {
                    email: this.email,
                    age: this.age,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    country: this.country,
                    hobbies: this.hobbyInputs.map(hobby => hobby.value),
                    terms: this.terms
                };
                console.log(formData);
                this.$store.dispatch('signup', formData);
            },

        //    ANIMATION
            ...mapGetters({
                charInit: 'charInit',
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
            },
        }
    }
</script>

<style scoped>
    .signup-form {
        width: 400px;
        margin: 30px auto;
        border: 1px solid #eee;
        padding: 20px;
        box-shadow: 0 2px 3px #ccc;
    }

    .invalid label {
        color: red;
    }

    .invalid input {
        border: 1px solid red;
        background-color: #ffc9aa;
    }

    .input {
        margin: 10px auto;
    }

    .input label {
        display: block;
        color: #4e4e4e;
        margin-bottom: 6px;
    }

    .input.inline label {
        display: inline;
    }

    .input input {
        font: inherit;
        width: 100%;
        padding: 6px 12px;
        box-sizing: border-box;
        border: 1px solid #ccc;
    }

    .input.inline input {
        width: auto;
    }

    .input input:focus {
        outline: none;
        border: 1px solid #521751;
        background-color: #eee;
    }

    .input select {
        border: 1px solid #ccc;
        font: inherit;
    }

    .hobbies button {
        border: 1px solid #521751;
        background: #521751;
        color: white;
        padding: 6px;
        font: inherit;
        cursor: pointer;
    }

    .hobbies button:hover,
    .hobbies button:active {
        background-color: #8d4288;
    }

    .hobbies input {
        width: 90%;
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
