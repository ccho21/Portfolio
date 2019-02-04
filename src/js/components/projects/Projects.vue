<template>
    <div class="row m-0">
        <router-view v-for="project in projects" :key="project.title" :project="project"></router-view>
    </div>

</template>
<script>
    import {mapGetters} from 'vuex';
    import axios from 'axios';

    export default {
        computed: {
            ...mapGetters({
                projects: 'projects'
            })
        },
        created() {
            this.$store.dispatch('initProjects');


        },
        methods: {
            saveData() {
                const projects = this.$store.getters.projects;
                let data = projects.map((cur, index) => {
                    return {
                        id: cur.id,
                        title: cur.title,
                        images: cur.images,
                        languages: cur.languages,
                        url: cur.url,
                    }
                });
                console.log(data);
                axios.put('projects.json', data);
            },
        },
    }
</script>
<style lang="scss">
    .card-columns {
        column-gap: 0;
        column-count: 4;
    }
</style>
