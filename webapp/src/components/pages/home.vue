<template>
    <div>
        <h1>En vedette</h1>

        <div class="flex recettes">
            <template v-for="recette in recettes" v-if="recette.photo">
                <carte-recette :recette="recette" />
            </template>
        </div>
    </div>
</template>

<script>

    import Api from '../../api';
    import CarteRecette from "../carte-recette";

    const api = new Api();

    export default {
        components: {CarteRecette},
        data : () => {
            return {
                recettes : []
            }
        },


        async created() {
            document.title = "On a encore mangé";
            this.recettes = await api.getRecettes();
        }

    }

</script>

<style>
    .recettes{
        flex-wrap : wrap;
        justify-content: space-around;
    }
</style>