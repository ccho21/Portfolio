<template>
    <div>
        <div class="p-5">
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
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                       v-model="searchKeyword">
                <button class="btn btn-primary" @click.prevent="getAvailableTags">TAG</button>
            </form>
        </div>
        <div class="row m-0">
            <router-view v-for="project in searchByKeyword" :key="project.title" :project="project"></router-view>
        </div>
    </div>

</template>
<script>
    export default {
        computed: {
            searchByKeyword() {
                const allProjects = this.projects;
                const searchString = this.searchKeyword.toLowerCase();
                const filteredProjects = allProjects.filter((project, i) => {
                    if (project.title.toLowerCase().includes(searchString)) {
                        return project;
                    } else {
                        let languages = project.languages.filter((cur) => {
                            if (cur.toLowerCase().includes(searchString)) {
                                return cur;
                            }
                        });
                        if (languages.length > 0) {
                            return project;
                        }
                    }
                });
                return filteredProjects;
            },

        },
        data() {
            return {
                animatedTitle: [],
                message: `Works`,
                projects: [],
                searchKeyword: ''
            }
        },
        created() {
            this.animatedTitle = this.$parent.charInit(this.message);
            this.$store.dispatch('fetchProjects').then((res) => {
                this.projects = res.data;
            });
        },
        methods: {
            getAvailableTags() {
                const allProjects = this.searchByKeyword;
                // practice by languages
                const getAllTags = [];
                for (const key in allProjects) {
                    getAllTags.push(...allProjects[key].languages);
                }
                const filteredTag = [...new Set(getAllTags)];
                console.log(filteredTag);
            },
            sortByTag() {
                const allProjects = this.searchByKeyword;
                const tag = 'pilgrim'.toLowerCase();
                const filteredProjects = allProjects.filter((project) => {
                    return project.title.toLowerCase().includes(tag);
                });
                console.log(filteredProjects);
                return filteredProjects;
            }
        },
    }
</script>
<style lang="scss">
    .card-columns {
        column-gap: 0;
        column-count: 4;
    }
</style>
