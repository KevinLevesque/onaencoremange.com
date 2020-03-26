import axios from 'axios';
import config from './config';


const BASE_URL = config.API_BASE_URL;



export default class {


    constructor(){
        this.http = axios.create({
            baseURL: BASE_URL,
        });
    }


    async getRecettes() {
        const response = await this.http.get('/recettes');
        return response.data;
    }


    async getRecette(slug) {
        const response = await this.http.get('/recettes?slug=' + slug);
        return response.data[0];
    }

    async getTag(slug) {
        const response = await this.http.get('/tags?slug=' + slug);
        return response.data[0];
    }

    async getIngredient(slug) {
        const response = await this.http.get('/ingredients?slug=' + slug);
        return response.data[0];
    }

    async getRecettesFromIngredient(ingredientToFind) {

        let recettes = await this.getRecettes();

        recettes = recettes.filter(recette => {

            let found = false;

            recette.composantes.forEach(composante => {
                composante.ingredients.forEach(ingredient => {
                    if (ingredient.ingredient.id === ingredientToFind.id) {
                        found = true;
                    }
                });
            });
            return found;
        });

        return recettes;
    }

    async getTags() {
        const response = await this.http.get('/tags');

        return response.data;
    }

    async getIngredients() {
        const response = await this.http.get('/ingredients');
        return response.data;
    }

    async recherche(ingredientsIds) {

        const response = await this.http.get('/recettes/search', {
            params : {
                ingredients : ingredientsIds
            }
        });
        return response.data;
    }
}