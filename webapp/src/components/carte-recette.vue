<template>
    <router-link :to="'/recette/' + recette.slug" class="recette"
                 :style="recette.photo ? {backgroundImage : 'url(' + photoUrl() + ')'} : ''">
        <div class="nom">
            {{recette.nom}}
        </div>
    </router-link>

</template>

<script>

    import config from "../config";

    export default {

        name: 'carteRecette',

        props: ['recette'],

        methods : {
            photoUrl : function () {
                return config.API_BASE_URL + this.recette.photo.url;
            }
        }


    }

</script>

<style lang="scss" scoped>



    .recette {
        margin-bottom: 20px;
        width: 100%;
        max-width: 300px;
        height: 200px;
        background-size: cover;
        background-position: center;
        position: relative;
        box-shadow: 1px 1px 7px 0px #000;
        font-size: 1.2em;
        transition: 0.1s;
        border-radius : 10px;

        @media (max-width: 740px) {
            width: 100%;
            max-width: 100%
        }

        &:hover{
            opacity: 0.75;
        }

        .nom {
            color: #fff;
            position: absolute;
            bottom: 15px;
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            text-align: center;
            padding: 10px 0;
        }
    }

</style>