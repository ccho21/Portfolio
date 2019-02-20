<template>

    <div class="modal fade"
         :id="`project-detail-${project.id}`"
         @click="$parent.closeModal"
         data-dismiss="modal"
         tabindex="-1" role="dialog" aria-labelledby="project-detail"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-close d-flex justify-content-center align-content-center">
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        &times;
                    </button>
                </div>
                <div :class="`mySlides-${project.id}`" v-for="(image, index) in project.images">
                    <div class="numbertext">{{index + 1}} / {{project.images.length}}</div>
                    <img :src="$parent.getSourceURL(image)" alt="image" class="w-100">
                </div>

                <div class="prev" @click="plusSlides(-1)">
                    <a class="text-white-50">&#10094;</a>
                </div>
                <div class="next" @click="plusSlides(1)">
                    <a class="text-white-50">&#10095;</a>
                </div>
                <div class="caption-container">
                    <p id="caption"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['project'],
        created() {

        },
        methods :{

        }
    }
</script>
