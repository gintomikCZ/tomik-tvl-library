<template>
  <button 
    :type="buttonType"
    ref="myBtn"
    :class="[
      'tvl-button',
      'tvl-button-' + size,
      disabled ? 'tvl-button-disabled' : '']"
      @click="onClick">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'TvlButtonButton',
  props: {
    buttonType: { type: String, default: 'button' },
    size: { type: String, default: 'medium' },
    disabled: { type: Boolean, default: false },
    plain: { type: Boolean, default: false }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.disabled) {
        this.$refs.myBtn.setAttribute('disabled', 'disabled')
      }
    })
  },
  methods: {
    onClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>
<style>
 
</style>