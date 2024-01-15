<template>
  <div :style="`${activateFlexGrow ? 'flex-grow:1;' : ''}`">
    <div @click="!disabled ? $emit('action') : ''">
      <div
        v-if="iconOnLeftSide"
        style="display: flex; cursor: pointer"
        class="divop"
        :style="divopStyle"
      >
        <div
          :style="`background-color:${btnColor};filter: brightness(95%);height:${height}; width:${iconWidth};${iconLeftBorderRadius};${manualIconStyle}`"
          style="display: flex; justify-content: center"
        >
          <v-progress-circular
            v-if="iconLoading"
            indeterminate
            :color="iconLoadingColor"
            size="20"
            width="2"
            style="display: flex; align-self: center"
          ></v-progress-circular>
          <v-icon
            v-if="!hasTextInsteadIcon && !iconLoading"
            :small="isSmallIcon"
            :size="iconSize"
            :color="iconColor"
            >{{ icon }}</v-icon
          >
          <span
            v-else-if="hasTextInsteadIcon && !iconLoading"
            :style="textManualStyle"
            style="place-self: center"
            >{{ textOnIconSide }}</span
          >
        </div>
        <v-btn
          v-if="!hasIconOnly"
          :to="`${to}`"
          :style="`${manualBtnStyle};background-color:${btnColor}; height:${height};width:${width}; ${
            activateFlexGrow ? 'flex-grow:1;' : ''
          }`"
          style="border-bottom-left-radius: 0px; border-top-left-radius: 0px"
          class="pr-5"
          elevation="0"
          :loading="loading"
          ><span
            :style="`color: ${labelColor}; font-size:${fontSize};font-weight:${fontWeight}`"
            class="tab-title"
            >{{ title }}</span
          ></v-btn
        >
      </div>

      <div v-else style="display: flex; cursor: pointer" class="divop">
        <v-btn
          v-if="!hasIconOnly"
          :to="`${to}`"
          :style="`${manualBtnStyle};background-color:${btnColor}; height:${height}; width:${width}; ${
            hasInputBefore
              ? 'border-bottom-left-radius:0;border-top-left-radius:0;'
              : ''
          }${activateFlexGrow ? 'flex-grow:1;' : ''}`"
          style="border-bottom-right-radius: 0px; border-top-right-radius: 0px"
          class="pr-5"
          elevation="0"
          :loading="loading"
          ><span
            :style="`color: ${labelColor}; font-size:${fontSize}; font-weight:${fontWeight}`"
            class="tab-title"
            >{{ title }}</span
          ></v-btn
        >
        <div
          :style="`${manualIconStyle};background-color:${btnColor};filter: brightness(95%);height:${height}; width:${iconWidth};${iconRightBorderRadius}`"
          style="display: flex; justify-content: center"
        >
          <v-progress-circular
            v-if="iconLoading"
            indeterminate
            :color="iconLoadingColor"
            size="20"
            width="2"
            style="display: flex; align-self: center"
          ></v-progress-circular>
          <v-icon
            v-if="!hasTextInsteadIcon && !iconLoading"
            :small="isSmallIcon"
            :size="iconSize"
            :color="iconColor"
            >{{ icon }}</v-icon
          >
          <span
            v-else-if="hasTextInsteadIcon && !iconLoading"
            :style="textManualStyle"
            style="place-self: center"
            >{{ textOnIconSide }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BtnIconComponent',
  props: {
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    btnColor: { type: String, default: '' },
    height: { type: String, default: '36px' },
    width: { type: String, default: '' },
    iconOnLeftSide: { type: Boolean, default: true },
    to: { type: String, default: '' },
    hasInputBefore: { type: Boolean, default: false },
    // if you want to use nuxt.config colors, you have to set 'var(--v-colorName-base)'
    labelColor: { type: String, default: 'white' },
    iconColor: { type: String, default: 'white' },
    isSmallIcon: { type: Boolean, default: false },
    hasIconOnly: { type: Boolean, default: false },
    fontSize: { type: String, default: '' },
    iconWidth: { type: String, default: '36px' },
    iconLeftBorderRadius: {
      type: String,
      default:
        'border-bottom-right-radius: 0px; border-top-right-radius: 0px;border-bottom-left-radius: 0.28571429rem;border-top-left-radius: 0.28571429rem;',
    },
    iconRightBorderRadius: {
      type: String,
      default:
        'border-bottom-left-radius: 0px; border-top-left-radius: 0px;border-bottom-right-radius: 0.28571429rem;border-top-right-radius: 0.28571429rem;',
    },
    loading: { type: Boolean, default: false },
    manualIconStyle: { type: String, default: '' },
    manualBtnStyle: { type: String, default: '' },
    fontWeight: { type: String, default: '700' },
    activateFlexGrow: { type: Boolean, default: false },
    hasTextInsteadIcon: { type: Boolean, default: false },
    textOnIconSide: { type: String, default: '' },
    textManualStyle: { type: String, default: '' },
    titleHasTranslation: { type: Boolean, default: true },
    iconSize: { type: String, default: '18' },
    iconLoading: { type: Boolean, default: false },
    iconLoadingColor: { type: String, default: 'white' },
    divopStyle: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
}
</script>
<style scoped>
.divop:hover {
  filter: brightness(90%);
}
</style>
