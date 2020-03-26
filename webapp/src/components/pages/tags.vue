<template>
    <div v-if="tags">
        <h1>Étiquettes</h1>


        <ul>
            <li v-for="tag in orderedTags" v-if="tag.recettes.length > 0">
                    <router-link :to="'/etiquette/' + tag.slug">{{tag.nom}}</router-link>
                    ({{tag.recettes.length}})
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
                tags: []
            }
        },

        async created() {
            this.tags = await api.getTags();
        },

        computed: {
          orderedTags : function(){
              return this.tags.sort((tagA, tagB) => {
                  return tagB.recettes.length - tagA.recettes.length;
              })
          }
        }

    }

</script>