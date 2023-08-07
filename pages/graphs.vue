<template>
    <div>
        <header>
            <v-card class=" pa-8 theme--light" style="border-radius: 20px; margin-top: 5px;">
                <v-row>
                    <v-col>
                        <v-flex>
                            <!---->
                            <h2 id="title" class=" mb-3 ml-1">Graficos</h2>
                        </v-flex>
                        <p class="paragraph-2">observe os graficos de movimentacao</p>
                    </v-col>
                </v-row>
            </v-card>
        </header>
        <div>
            <v-container my-8>


            </v-container>
            <v-row class="ma-0">
                <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '12'" class="pa-0">

                    <BarChart></BarChart>

                </v-col>
                <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '12'" class="pa-0">
                    <v-card class=" pa-8 theme--light" style="border-radius: 20px; margin-top: 5px;">
                        <div class="caption grey--text">Lucros por mes</div>
                        <LineChart></LineChart>
                    </v-card>
                </v-col>
            </v-row>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    }
}
</script>