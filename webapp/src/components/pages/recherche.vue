<template>
    <div v-if="ingredients && recettes">
        <h1>Recherche</h1>

        <multiselect :options="orderedIngredients" :multiple="true" :customLabel="labelIngredient" track-by="nom"
                     v-model="selectedIngredients" @input="launchSearch"></multiselect>

        <div class="flex recettes">
            <template v-for="recette in recettes">
                <carte-recette :recette="recette"></carte-recette>
            </template>
        </div>


    </div>

</template>

<script>

    import Api from '../../api';

    import CarteRecette from "../carte-recette";
    import Multiselect from 'vue-multiselect';

    const api = new Api();

    export default {
        components: {CarteRecette, Multiselect},
        data: () => {
            return {
                ingredients: [],
                selectedIngredients: [],
                recettes: []
            }
        },

        methods: {
            launchSearch: async function () {
                if (this.selectedIngredientsIds.length === 0) {
                    this.recettes = await api.getRecettes();
                } else {
                    this.recettes = await api.recherche(this.selectedIngredientsIds);
                }

            },

            labelIngredient : function(ingredient) {
                return ingredient.nom + " (" + ingredient.recettes.length + ")";
            }
        },

        async created() {
            document.title = "Recherche";
            await this.launchSearch();
            this.ingredients = await api.getIngredients();
        },

        computed: {
            selectedIngredientsIds: function () {
                return this.selectedIngredients.map(ingredient => {
                    return ingredient.id
                });
            },

            orderedIngredients: function () {
                return this.ingredients.sort((ingredientA, ingredientB) => {
                    return ingredientB.recettes.length - ingredientA.recettes.length;
                });
            }
        },


    }

</script>

<style lang="scss">

    .recettes {
        margin-top: 3em;
        flex-wrap: wrap;
        justify-content: space-around;
    }

</style>