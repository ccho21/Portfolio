<template>
    <section class="section-about text-white">
        <div class="container-fluid p-5">
            <!--CHANGE H1 HEADING LATER-->
            <div class="pb-5">
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
            </div>
            <div class="row">
                <div class="col-md-6 section-about__cv">
                    <div class="row">
                        <div class="col-md-4">
                            <h3>TECHNOLOGIES</h3>
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h4 class="">PROGRAMMING <br> LANGUAGES</h4>
                                    <ul class="p-5">
                                        <li>HTML5</li>
                                        <li>CSS</li>
                                        <li>JavaScript/jQuery</li>
                                        <li>Vue.js</li>
                                        <li>PHP</li>
                                        <li>WordPress</li>
                                        <li>ASP.NET MVC</li>
                                        <li>JAVA</li>
                                    </ul>
                                </div>
                                <div class="col-sm-6">
                                    <h4>WEB <br> DEVELOPMENT</h4>
                                    <ul class="p-5">
                                        <li>SASS/LESS</li>
                                        <li>Bootstrap 4+</li>
                                        <li>Linux/Unix</li>
                                        <li>NPM</li>
                                        <li>Webpack</li>
                                        <li>Git/Github</li>
                                        <li>Gulp</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <h3>WORK EXPERIENCES</h3>
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h3>AST Stone - Web Developer</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto
                                        culpa cum eos ipsa ipsam iure iusto magni minima nisi, nulla obcaecati officia
                                        quaerat qui, ratione recusandae reiciendis repudiandae voluptas?</p>
                                </div>
                                <div class="col-sm-12">
                                    <h3>Pilgrim Community Church - Web Developer</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto
                                        culpa cum eos ipsa ipsam iure iusto magni minima nisi, nulla obcaecati officia
                                        quaerat qui, ratione recusandae reiciendis repudiandae voluptas?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    PICTURE OR SKILLS
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
                message: `About Us`,
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
<style lang="scss" scoped>

</style>
