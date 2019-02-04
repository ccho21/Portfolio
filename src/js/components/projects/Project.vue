<template>
    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 p-0">
        <div >
            <a href="" class="project-link d-block" data-toggle="modal" :data-target="`project-detail-${project.id}`"
               @click.prevent="openModal"
               @keyup.esc="closeModal">
                <div class="project-wrap">
                    <div class="project-content">
                        <img class="card-img" alt="" :src="getSourceURL(project.images[0])">
                        <p class="project-content__link text-white"><span>VIEW PROJECTS</span></p>
                    </div>
                </div>
            </a>
        </div>
        <div class="modal fade"
             :id="`project-detail-${project.id}`"
             @click="closeModal"
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
                        <img :src="getSourceURL(image)" alt="image" class="w-100">
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
    </div>
</template>
<script>
    export default {
        props: ['project'],
        data() {
            return {
                slideIndex: 1,
            }
        },
        methods: {
            getSourceURL(src) {
                return require('../../../assets/images/' + src);
            },
            openModal(e) {

                const dataTarget = e.target.closest('.project-link').dataset.target;
                const targetModal = document.querySelector(`#${dataTarget}`);
                targetModal.style.display = "block";
                targetModal.classList.add('show');
                this.showSlides(this.slideIndex);
            },
            closeModal(e) {
                const data = e.target;
                const target = document.querySelector(`#project-detail-${this.project.id}`);
                if (data.dataset.dismiss === 'modal' || data.parentNode.dataset.dismiss === 'modal' || e.key === 'Escape') {
                    target.classList.remove('show');
                    target.style.display = "none";
                    this.slideIndex = 1;
                }
            },
            plusSlides(n) {
                this.slideIndex += n
                this.showSlides(this.slideIndex);
            },

            showSlides(n) {
                let slides = document.querySelectorAll(`.mySlides-${this.project.id}`);
                if (n > slides.length) {
                    this.slideIndex = 1;
                }
                // if you go back to slide from first slide, then change index to length;
                if (n < 1) {
                    this.slideIndex = slides.length
                }
                // change every slides to none
                slides.forEach((cur, i) => {
                    cur.style.display = 'none';
                });
                slides[this.slideIndex - 1].style.display = "block";
            }

        }
    }
</script>
<style lang="scss" scoped>
    .project {
        &-wrap {
            padding: 0;
            height: 100%;
        }

        &-content {
            height: 100%;
            padding: 0;
            position: relative;
            overflow: hidden;

            & > img {
                transition: transform .5s;
                width: 100%;
                height: 100%;
            }

            &__link {
                margin: 0;
                position: absolute;
                top: 50%;
                left: 50%;
                opacity: 0;
                width: 9rem;
                height: 9rem;
                border: white .2rem solid;
                border-radius: 50%;
                background-color: white;
                color: black !important;
                padding: 1.5rem;
                transform: translate(-50%, -50%);
                transition: opacity .4s;

                /**/
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                font-size: 1.2rem;

                & > span {
                    display: table-cell;
                    vertical-align: middle;
                }
            }

            &:after {
                transition: background-color .2s;
                content: '';
                position: absolute;
                background-color: rgba(0, 0, 0, .6);
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            /*PROJECT ALL CSS FOR HOVERING*/
            &:hover {
                & > img {
                    transform: scale(1.1);
                }

                & > .project-content__link {
                    opacity: 1;
                }

                &:after {
                    background-color: rgba(0, 0, 0, 0);
                }
            }

        }
    }


    /*LIGHT BOX*/
    /* The Modal (background) */

    /* The Close Button */
    .modal {
        overflow-y: scroll;
    }
    .modal-close {
        position: absolute;
        top: 0;
        right: 0;
        width: 3rem;
        height: 3rem;
        z-index: 2000;

        & > button {
            font-size: 3rem;
        }
    }

    .mySlides {
        display: none;
    }

    .cursor {
        cursor: pointer;
    }

    /* Next & previous buttons */
    .prev,
    .next {
        cursor: pointer;
        position: absolute;
        height: 100%;
        display: flex;
        align-items: center;
        width: auto;
        padding: 16px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
        -webkit-user-select: none;
        & > a {
            opacity: .2;
        }
        &:hover {
            & > a {
                opacity: 1;
            }
        }
    }

    /* Position the "next button" to the right */
    .next {
        right: 0;
        border-radius: 3px 0 0 3px;
    }

    /* Number text (1/3 etc) */
    .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
    }

    img {
        margin-bottom: -4px;
    }

    .caption-container {
        text-align: center;
        background-color: black;
        padding: 2px 16px;
        color: white;
    }

    .demo {
        opacity: 0.6;
    }

    .active,
    .demo:hover {
        opacity: 1;
    }

    img.hover-shadow {
        transition: 0.3s;
    }

    .hover-shadow:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>
