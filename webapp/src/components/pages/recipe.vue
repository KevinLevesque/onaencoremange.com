<template>
    <div v-if="recette">
        <div class="flex tags">
            <router-link class="tag" v-for="tag in recette.tags" :to="'/etiquette/' + tag.slug">{{tag.nom}}
            </router-link>
        </div>
        <h1>{{recette.nom}}</h1>




        <div class="flex" style="flex-wrap: wrap-reverse">

            <div>
                <h2>Ingrédients</h2>

                <div v-for="composante in recette.composantes">
                    <h3 v-if="recette.composantes.length > 1 && composante">{{ composante.Nom }}</h3>
                    <ul>
                        <li v-for="ingredient in composante.ingredients">
                            ({{quantity(ingredient)}}<template v-if="ingredient.mesure.nom != 'qte'"> {{ingredient.mesure.nom}}</template>) -
                            <router-link :to="'/ingredient/' + ingredient.ingredient.slug">{{ingredient.ingredient.nom}}</router-link><span v-if="ingredient.Preparation">, {{ingredient.Preparation.toString().toLowerCase()}}</span>
                        </li>
                    </ul>
                </div>

                <div v-for="recettes_necessaire in recette.recettes_necessaires" class="recette-necessaire">
                    <h3><router-link :to="'/recette/' + recettes_necessaire.slug">{{recettes_necessaire.nom}}</router-link></h3>
                    <div v-for="composante in recettes_necessaire.composantes">
                        <ul>
                            <li v-for="ingredient in composante.ingredients">
                                ({{quantity(ingredient)}}<template v-if="ingredient.mesure.nom != 'qte'"> {{ingredient.mesure.nom}}</template>) -
                                <router-link :to="'/ingredient/' + ingredient.ingredient.slug">{{ingredient.ingredient.nom}}</router-link><span v-if="ingredient.Preparation">, {{ingredient.Preparation.toString().toLowerCase()}}</span>
                            </li>
                        </ul>
                    </div>

                </div>


            </div>

            <div class="photo"
                 :style="recette.photo ? { backgroundImage : 'url(' + photoUrl() + ')' } : ''"
                 v-if="recette.photo"></div>
        </div>


        <h2>Instructions</h2>
        <div v-html="recette.Instructions" class="instructions"></div>

        <div v-if="recette.alternatives">
            <h3>Alternatives</h3>
            <div v-html="recette.alternatives"></div>
        </div>



        <div v-if="recette.utilise_dans_recettes.length > 0">
            <hr>
            <h4>Cette recette est une composante des recettes suivantes : </h4>
            <div class="flex recettes">
                <template v-for="utilise_dans_recette in recette.utilise_dans_recettes">
                    <carte-recette :recette="utilise_dans_recette"></carte-recette>
                </template>
            </div>
        </div>


        <div v-if="recette.references.length > 0" >
            <hr>
            <h5>Références </h5>
            <div v-html="recette.references" class="references"></div>
        </div>


    </div>
</template>

<script>

    import Api from '../../api';
    import VueMarkdown from 'vue-markdown'
    import config from "../../config";
    import CarteRecette from "../carte-recette";

    const api = new Api();

    export default {

        components: {CarteRecette, VueMarkdown},

        data: () => {
            return {
                recette: null
            }
        },


        methods: {
            photoUrl() {
                return config.API_BASE_URL + this.recette.photo.url;
            },

            quantity(ingredient) {
                let amount = '';
                let amountWithoutDecimal = Math.floor(ingredient.quantite);

                let amountDecimal = ingredient.quantite - amountWithoutDecimal;

                if (amountWithoutDecimal > 0) {
                    amount = amountWithoutDecimal.toString();
                }

                if (amountDecimal > 0) {

                    if (amount.length > 0)
                        amount += ' + ';

                    switch (amountDecimal) {
                        case 0.25:
                            amount += '1/4';
                            break;
                        case 0.33:
                            amount += '1/3';
                            break;
                        case 0.5:
                            amount += '1/2';
                            break;
                        case 0.66:
                            amount += '2/3';
                            break;
                        case 0.75:
                            amount += '3/4'
                    }

                }


                return amount;
            }
        },

        async created() {
            this.recette = await api.getRecette(this.$route.params.slug);
            document.title = this.recette.nom;
        },

        async beforeRouteUpdate (to, from, next) {
            this.recette = await api.getRecette(to.params.slug);
            next();
        }

    }

</script>

<style lang="scss" scoped>


    .references{
        font-size: 0.7em;
    }

    .instructions{
        ol >li {
            margin: 10px 0;
        }
    }

    .recettes {
        margin-top: 3em;
        flex-wrap: wrap;
        justify-content: space-around;
    }


    .recette-necessaire{
        background-color: #eee;
        padding: 5px;

        &:not(:first-child){
            margin-top: 10px;
        }
    }

    .photo {
        margin: 0 auto;
        box-shadow: 1px 1px 6px #000;
        width: 300px;
        height: 300px;
        background-position: center;
        background-size: cover;
        align-self : flex-end;
    }

    h1 {
        margin-top: 5px;
    }

    .tags {
        flex-shrink: 1;
        align-self: center;
    }

    a.tag {
        padding: 5px;
        background-color: #757575;
        border-radius: 30px;
        font-size: 0.6rem;
        text-decoration: none;
        color: #fff;

        &:hover {
            transition: 0.2s;
            background-color: #000;
        }

        &:not(:first-child) {
            margin-left: 5px;
        }
    }
</style>