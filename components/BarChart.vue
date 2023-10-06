<template>
  <v-card
    class="pa-8 theme--light"
    style="border-radius: 20px; margin-top: 5px"
  >
    <div class="caption grey--text">vendas por mes</div>
    <v-row class="ma-0 d-flex justify-space-between">
      <v-col :cols="$vuetify.breakpoint.smAndDown ? '6' : '3'">
        <v-radio-group v-model="move" @change="getGraphs">
          <v-radio
            v-for="(item, index) in movements"
            :key="index"
            :label="item.name"
            :value="item.value"
            style="width: 50px"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col :cols="$vuetify.breakpoint.smAndDown ? '6' : '3'" class="pt-8">
        <v-select
          label="Produto"
          v-model="productId"
          :items="items"
          @change="getGraphs"
          clearable
          @click:clear="productId = null"
          item-text="name"
          item-value="id"
          required
          outlined
        ></v-select>
      </v-col>
    </v-row>

    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
    <v-btn icon @click="getExcelFile()"
      ><v-icon>mdi-file-excel-outline</v-icon></v-btn
    >
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
  LinearScale,
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name: 'BarChart',
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.getGraphs()
    this.ProductList()
    this.getmonths()
  },
  data() {
    return {
      items: [],
      productId: null,
      move: 0,
      movements: [
        { name: 'Saida', value: 0 },
        { name: 'Entrada', value: 1 },
      ],
      chartData: {
        labels: null,
        datasets: [
          {
            label: 'Movimentações',
            borderWidth: 1,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            pointBorderColor: '#2554FF',
            data: null,
          },
        ],
      },
      legend: {
        display: true,
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  methods: {
    async ProductList() {
      await this.$axios
        .$get(`product/get`)
        .then((response) => {
          this.items = response
        })
        .catch(() => {})
    },
    async getGraphs() {
      const model = {
        filteredMonth: this.$moment().format('yyyy-MM-DD'),
        moveType: this.move,
      }
      if (this.productId !== null && this.productId !== '') {
        model.prodId = this.productId
      }
      await this.$axios
        .$get(
          `movement/get-graphs-by-date?${this.$convertToQueryString(model)}`
        )
        .then((response) => {
          this.chartData.datasets[0].data = response
        })
        .catch(() => {})
    },
    getmonths() {
      const month = []
      const currentmonth = this.$moment().locale('pt-br').format('MMMM')
      month.push(currentmonth)

      for (let i = 1; i <= 2; i++) {
        const mesAnterior = this.$moment().subtract(i, 'months').format('MMMM')
        month.push(mesAnterior)
      }

      this.chartData.labels = month.reverse()
    },
    async getExcelFile() {
      // prodId= this.productId
      const model = {
        filteredMonth: this.$moment().format('yyyy-MM-DD'),
      }
      if (this.productId !== null && this.productId !== '') {
        model.prodId = this.productId
      }
      await this.$axios
        .$get(
          `movement/get-bar-chart-excel?${this.$convertToQueryString(model)}`
        )
        .then((response) => {
          const linkSource = 'data:application/vnd.ms-excel;base64,' + response
          const downloadLink = document.createElement('a')
          downloadLink.href = linkSource
          downloadLink.download = 'arquivo.' + 'xlsx'
          downloadLink.click()
        })
        .catch(() => {})
    },
  },
}
</script>
