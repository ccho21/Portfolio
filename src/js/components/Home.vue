<template>
    <section class="section-home">
        <div class="section-home__heading">

            <transition-group tag="h1"
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

            <h6 class="text-white-50">Front End Developer / WordPress / Vue js</h6>
            <p class="mt-5">
                <router-link to="/projects" class="btn btn-outline-white px-5 py-3">View my work</router-link>
            </p>
        </div>
    </section>
</template>
<script>

    export default {
        data() {
            return {
                animatedTitle: [],
                message: `Hi!, I'm Changsoo Cho, Front-end Developer.`,
            }
        },
        mounted() {
            // this.$parent.test();
            this.animatedTitle = this.$parent.charInit(this.message);
        },
        methods: {

        }
    }
</script>
<style lang="scss">

</style>
