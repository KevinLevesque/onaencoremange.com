<template>
    <div>
        <header>
            <h1 v-resize-text="{maxFontSize: '100px'}">On a encore mangé</h1>
            <h2>Cuisine de Marie-Pier et Kevin</h2>
            <div class="menu">
                <ul>
                    <li>
                        <router-link to="/">Accueil</router-link>
                    </li>
                    <li>
                        <router-link to="/ingredients">Ingrédients</router-link>
                    </li>
                    <li>
                        <router-link to="/etiquettes">Étiquettes</router-link>
                    </li>
                    <li>
                        <router-link to="/recherche">Recettes</router-link>
                    </li>
                </ul>
            </div>
        </header>

        <div class="container">

            <div class="content">
                <router-view/>
            </div>

        </div>
    </div>


</template>

<script>
    export default {
        data: () => {
            return {
                test: 'allo'
            }
        }
    }
</script>

<style lang="scss">

    body{
        margin: 0;
    }

    ul{
        padding: 0;
        list-style : none;
    }

    a{
        color: #000;
        text-decoration: underline;
        &:hover{
            text-decoration: none;
            color: #000;
        }
    }


    input {
        width: 100%;
        padding: 5px;
        border: 2px solid #000;
        box-sizing: border-box;
    }



    header {
        font-family: 'Sofia', cursive;
        h1 {
            text-align: center;
            margin: 0;
            white-space: nowrap;
        }

        h2 {
            text-align: center;
            margin: 0;

        }

        @media (min-width: 960px) {
            h2 {
                font-size: 2.5em;
            }
        }

        .menu {
            margin-top: 2em;

            margin-left: 5px;

            ul {
                margin: 0;
                padding: 0;
                display: flex;
                list-style: none;
                align-items: center;
                
                @media (max-width: 500px) {
                    height:40px;
                    overflow: scroll;
                }

                li {
                    &:not(:first-child) {
                        margin-left: 2.5em;
                    }


                    a {
                        text-decoration: none;
                        color: #000;
                        font-weight: bold;
                        font-size: 4vmax;
                        line-height: 0;

                        @media (min-width: 960px) {
                            font-size: 2em;
                        }

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }


    .container {
        margin-top: -4px;
        height: 100%;
        background-color: #e5d9c9;
        padding: 20px
    }

    .content {
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        max-width: 800px;
        border-radius: 20px;
    }


    .flex {
        display: flex;
    }


</style>