<template>
  <v-card
    max-width="600"
    class="primary-card pa-8 theme--light"
    style="border-radius: 20px; margin-top: 5px"
  >
    <div class="d-flex justify-center mb-2">
      <h1>Criar produto</h1>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="obj.Name"
        :rules="[(v) => (!!v && v.length > 0) || 'Campo obrigatório']"
        label="Nome"
        required
        outlined
      ></v-text-field>

      <v-text-field
        v-model="obj.Price"
        type="number"
        label="Preço unitario"
        prefix="R$"
        required
        outlined
      ></v-text-field>

      <v-text-field
        v-model="obj.PriceSale"
        type="number"
        label="Preço revenda"
        prefix="R$"
        required
        outlined
      ></v-text-field>

      <!-- <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        :loading="loading"
        @click="validate"
      >
        Registrar
      </v-btn> -->
      <div class="d-flex justify-center">
        <BtnIcon
          :icon-loading="loading"
          :title="'Registrar'"
          :btn-color="'#4c77b4'"
          :icon="'mdi-plus'"
          :icon-width="'38px !important'"
          height="38px"
          icon-size="22"
          :disabled="!valid"
          @action="validate"
        >
        </BtnIcon>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    valid: true,
    obj: {
      Name: '',
      Price: null,
      PriceSale: null,
      StockAmount: 0,
      userId: '',
    },
  }),

  created() {
    this.obj.userId = this.$store.state.user.user.id
  },

  methods: {
    validate() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.$emit('product', this.obj)
      // this.loading=true
    },
  },
}
</script>
