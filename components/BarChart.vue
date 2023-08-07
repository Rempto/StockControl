<template>
    <v-card class=" pa-8 theme--light" style="border-radius: 20px; margin-top: 5px;">
        <div class="caption grey--text">vendas por mes</div>

        <v-radio-group v-model="move" @change="getGraphs">
            <v-radio v-for="(item, index) in movements" :key="index" :label="item.name" :value="item.value"></v-radio>
        </v-radio-group>
        <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
            :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
    </v-card>
</template>
<script>
import { Bar } from 'vue-chartjs/legacy'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    name: 'BarChart',
    components: {
        Bar
    },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
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
        this.getGraphs()
        this.getmonths()
    },
    data() {
        return {
            move: 0,
            movements: [
                { name: 'Saida', value: 0 },
                { name: 'Entrada', value: 1 },
            ],
            chartData: {
                labels: null,
                datasets: [{
                    label: 'Bar Chart',
                    borderWidth: 1,
                    backgroundColor: [

                        'rgba(54, 162, 235, 0.2)',

                    ],
                    borderColor: [

                        'rgba(54, 162, 235, 1)',

                    ],
                    pointBorderColor: '#2554FF',
                    data: null
                }]
            },
            legend: {
                display: true
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        async getGraphs() {
            await this.$axios.$get(`movement/get-graphs-by-date?filteredMonth=${this.$moment().format("yyyy-MM-DD")}&moveType=${this.move}`).then((response) => {
                console.log(response)
                this.chartData.datasets[0].data = response
            }).catch((e) => {
                console.log(e)
            })
        },
        getmonths() {
            const month = [];
            const currentmonth = this.$moment().locale("pt-br").format('MMMM');
            month.push(currentmonth);

            for (let i = 1; i <= 2; i++) {
                const mesAnterior = this.$moment().subtract(i, 'months').format('MMMM');
                month.push(mesAnterior);
            }

            this.chartData.labels = month.reverse();
        }
    }
}
</script>