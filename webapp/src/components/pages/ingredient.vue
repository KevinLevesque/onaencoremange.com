<template>
    <div v-if="ingredient">
        <h1>{{ingredient.nom}}</h1>
        Voici toutes les recettes avec l'ingrédient '{{ingredient.nom}}'

        <div class="flex recettes">
            <template v-for="recette in recettes">
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
                ingredient : null,
                recettes: []
            }
        },

        async created() {
            this.ingredient = await api.getIngredient(this.$route.params.slug);
            document.title = this.ingredient.nom;
            this.recettes = await api.getRecettesFromIngredient(this.ingredient);
        }

    }

</script>

<style lang="scss">

    .recettes{
        flex-wrap : wrap;
        justify-content: space-around;
    }

</style>