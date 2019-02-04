<template>
    <section class="section-contacts">
        <div class="container-fluid p-5">
            <div class="row">
                <div class="col-md-6">
                    <div class="p-5">
                        <transition-group tag="h1"
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
                    </div>
                    <div class="text-white">
                        <h2 aria-label=" Contact me" class="">Contact Me</h2>
                        <p>Please contact me</p>
                    </div>
                    <div class="contact-form p-7 mb-5">
                        <form id="contact" autocomplete="off">
                            <ul class="contact-list">
                                <li class="contact-list__item">
                                    <input class="" placeholder="Name" type="text" name="name">
                                    <label class="contact-list__item-label"></label>
                                </li>
                                <li class="contact-list__item">
                                    <input class="" placeholder="Email" type="email" name="email">
                                    <label class="contact-list__item-label"></label>
                                </li>
                                <li class="contact-list__item">
                                    <input class="" placeholder="Subject" type="text" name="subject">
                                    <label class="contact-list__item-label"></label>
                                </li>
                                <li class="contact-list__item">
                                    <div class="textarea-box">
                                        <textarea class="" placeholder="Message" name="msg"></textarea>
                                        <label class="contact-list__item-label"></label>
                                    </div>
                                </li>
                                <li class="contact-list__item text-right">
                                    <input id="submit" type="submit"
                                           class="btn btn-outline-white px-5 py-3" value="SEND">
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                <div class="col-md-6">
                    <div>GOOGLE MAP GOES TO THIS SECTION</div>
                </div>
            </div>
        </div>

    </section>
</template>
<script>
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                animatedTitle: [],
                message: `Contacts`,
            }
        },
        mounted() {
            this.$store.dispatch('setMessage', this.message);
            this.animatedTitle = this.charInit();
        },
        methods: {
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
