'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  find: async ctx => {
    let ingredients = await strapi.query('ingredients').find(ctx.query);

    for (const ingredient of ingredients) {

      let recettes = await strapi
        .query('recettes')
        .model.query(function(qb) {
          qb.innerJoin('recettes_components', 'recettes.id', 'recettes_components.recette_id')
            .innerJoin('components_prepatation_sections', 'recettes_components.component_id', 'components_prepatation_sections.id')
            .innerJoin('components_prepatation_sections_components', 'components_prepatation_sections.id', 'components_prepatation_sections_components.components_prepatation_section_id')
            .innerJoin('components_prepatation_ingredients', 'components_prepatation_sections_components.component_id', 'components_prepatation_ingredients.id')
            .innerJoin('ingredients', 'components_prepatation_ingredients.ingredient', 'ingredients.id')
            .where('recettes_components.field', 'composantes')
            .andWhere('ingredients.id', ingredient.id);
        }).fetchAll();

      ingredient.recettes = recettes;
    }


    ctx.send(ingredients);
  }

};
