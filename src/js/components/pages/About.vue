<template>
    <section class="section-about text-white">
        <div class="container-fluid p-5">
            <!--CHANGE H1 HEADING LATER-->
            <div class="pb-5">
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
                    <div class="container">
                        <transition-group
                            tag="ul"
                            class="list-unstyled"
                            v-bind:css="false"
                            v-on:before-enter="beforeSkill"
                            v-on:enter="enterSkill"
                            v-on:after-enter="afterSkill" appear>
                            <li class="" v-for="(skill) in skills" v-bind:key="skill.id" :data-level="skill.level">
                                <div class="text-white">{{skill.language}} </div>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" :aria-valuenow="skill.level" aria-valuemin="0"
                                         aria-valuemax="100" :style="{width: skill.level+'%'}">
                                        <span class="sr-only">{{skill.level}} Complete</span>
                                    </div>
                                </div>
                            </li>
                        </transition-group>

                    </div>
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
                skills: [
                    {language: 'JAVASCRIPT', level: 70, id: 1},
                    {language: 'HTML5', level: 80, id: 2},
                    {language: 'CSS3', level: 70, id: 3},
                    {language: 'VUE.JS', level: 60, id: 4},
                    {language: 'LARAVEL', level: 60, id: 5},
                    {language: 'JQUERY', level: 70, id: 6},
                    {language: 'WORDPRESS', level: 50, id: 7},
                    {language: 'BOOTSTRAP 4', level: 80, id: 8},
                ]
            }
        },
        mounted() {
            this.animatedTitle = this.$parent.charInit(this.message);
        },
        methods: {
            /*SKILL ANIMATION*/

            beforeSkill(el) {
                console.log('before');
                el.style.width = 0;
            },
            enterSkill(el) {
                console.log(el.dataset.level);
                const level = el.dataset.level;
                el.style.width = `${level}%`;
            },
            afterSkill() {
                console.log('after');
            },
        }
    }
</script>
<style>
</style>
