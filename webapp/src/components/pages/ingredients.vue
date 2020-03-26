<template>
    <div v-if="ingredients">
        <h1>Ingrédients</h1>

        <input type="text" placeholder="Recherche" v-model="search">

        <ul>
            <li v-for="ingredient in orderedIngredients" v-if="ingredient.recettes.length > 0">
                <router-link :to="'/ingredient/' + ingredient.slug">{{ingredient.nom}}</router-link>
                ({{ingredient.recettes.length}})
            </li>
        </ul>

    </div>

</template>

<script>

    import Api from '../../api';
    import VueMarkdown from 'vue-markdown'

    const api = new Api();

    export default {

        data: () => {
            return {
                search: '',
                ingredients: []
            }
        },


        computed: {
            orderedIngredients: function () {
                return this.ingredients.filter(ingredient => {
                    return ingredient.nom.toLowerCase().includes(this.search.toLowerCase())
                }).sort((ingredientA, ingredientB) => {
                        return ingredientB.recettes.length - ingredientA.recettes.length;
                    });
            }
        },

        async created() {
            document.title = "Liste des ingrédients";
            this.ingredients = await api.getIngredients();
        }

    }

</script>