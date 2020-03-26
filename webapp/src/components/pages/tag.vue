<template>
    <div v-if="tag">
        <h1>{{tag.nom}}</h1>
        Voici toutes les recettes avec l'étiquette '{{tag.nom}}'

        <div class="flex recettes">
            <template v-for="recette in tag.recettes">
                <carte-recette :recette="recette"></carte-recette>
            </template>
        </div>

    </div>

</template>

<script>

    import Api from '../../api';
    import VueMarkdown from 'vue-markdown'
    import CarteRecette from "../carte-recette";

    const api = new Api();

    export default {
        components: {CarteRecette},
        data : () => {
            return {
                tag : null
            }
        },

        async created() {
            this.tag = await api.getTag(this.$route.params.slug);
            document.title = this.tag.nom;
        }

    }

</script>

<style>
    .recettes{
        flex-wrap : wrap;
        justify-content: space-around;
    }
</style>