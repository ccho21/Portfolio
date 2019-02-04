<template>
    <section class="section-home">
        <div class="section-home__heading">

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
            this.charInit();
        },
        methods: {
            charInit() {
                let messageArr = this.message.split("");
                this.animatedTitle = messageArr.map((cur, index) => {
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

</style>
