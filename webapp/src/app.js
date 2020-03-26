import "babel-polyfill";
import dotenv from 'dotenv'

import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueResizeText from 'vue-resize-text';

import 'vue-multiselect/dist/vue-multiselect.min.css';


import Home from './components/pages/home.vue';
import Tags from './components/pages/tags.vue';
import Tag from './components/pages/tag.vue';
import Recherche from './components/pages/recherche.vue';
import Recipe from './components/pages/recipe.vue';
import Ingredient from './components/pages/ingredient.vue';
import Ingredients from './components/pages/ingredients.vue';


dotenv.config();

Vue.use(VueRouter);
Vue.use(VueResizeText)


const routes = [
    { path: '/', component: Home},
    { path: '/etiquettes', component: Tags},
    { path: '/ingredients', component: Ingredients},
    { path: '/recherche', component: Recherche},
    { path: '/recette/:slug', component: Recipe},
    { path: '/etiquette/:slug', component: Tag},
    { path: '/ingredient/:slug', component: Ingredient}
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');