<template>
    <div>
        <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
        <v-row class="ma-0">
            <v-col :cols="$vuetify.breakpoint.smAndDown ? '6' : '3'" class="pt-12">
                <v-select label="Produto" v-model="productId" :items="items" @change="getGraphs" clearable
                    @click:clear="productId = null" item-text="name" item-value="id" required outlined></v-select>

            </v-col>
            <v-col :cols="$vuetify.breakpoint.smAndDown ? '6' : '3'" class="pa-0">
                <v-card class="pa-8 ma-2">
                    <div class="caption grey--text">Investimento</div>
                    <div>R$ {{ entry }}</div>
                </v-card>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.smAndDown ? '6' : '3'" class="pa-0">
                <v-card class="pa-8 ma-2">
                    <div class="caption grey--text">vendas</div>
                    <div>R$ {{ sale }}</div>
                </v-card>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.smAndDown ? '6' : '3'" class="pa-0">
                <v-card class="pa-8 ma-2">
                    <div class="caption grey--text">lucro</div>
                    <div>R$ {{ earnings }}</div>
                </v-card>
            </v-col>

        </v-row>
    </div>
</template>
<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
} from 'chart.js'
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
)
export default {
    name: 'LineChart',
    components: {
        LineChartGenerator
    },
    props: {
        chartId: {
            type: String,
            default: 'line-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Array,
            default: () => []
        }
    },
    created() {
        this.getGraphs();
        this.ProductList();
    },
    data() {
        return {
            productId: null,
            sale: null,
            earnings: null,
            entry: null,
            items: [],
            chartData: {
                labels: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
                datasets: [
                    {
                        label: 'lucro',
                        data: null,
                        fill: false,
                        borderColor: '#2554FF',
                        backgroundColor: '#2554FF',
                        borderWidth: 1
                    }
                ]
            },
            chartOptions: {
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        async getGraphs() {
            // prodId= this.productId
            const model = {
                filteredMonth: this.$moment().format("yyyy-MM-DD")
            }
            if (this.productId !== null && this.productId !== "") {
                model.prodId = this.productId
            }
            await this.$axios.$get(`movement/get-graphs-earnings?${this.$convertToQueryString(model)}`)
                .then((response) => {
                    console.log(response)
                    this.chartData.datasets[0].data = response.earnings
                    this.sale = response.sales.toFixed(2)
                    this.entry = response.entry.toFixed(2)
                    this.earnings = (this.sale - this.entry).toFixed(2)

                }).catch((e) => {
                    console.log(e)
                })
        },

        async ProductList() {
            await this.$axios
                .$get(`product/get`)
                .then((response) => {
                    this.items = response
                })
                .catch(() => {
                })
        },
    }
}
</script>