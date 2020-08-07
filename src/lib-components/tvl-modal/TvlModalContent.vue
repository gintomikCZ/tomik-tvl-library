<template>
  <transition
    :name="transition"
    @enter="onEnter"
    @after-enter="$emit('show')"
    @after-leave="$emit('hide')">
    <div v-if="show" class="tvl-modal" ref="myModal">
      <div class="tvl-modal-header">
        <slot name="header">
          <div class="tvl-modal-title">{{ title }}</div>
          <div class="tvl-modal-subtitle">{{ subtitle }}</div>
        </slot>
      </div>
      <div class="tvl-modal-body">
        <slot></slot>
      </div>
      <div class="tvl-modal-footer">
        <slot name="footer">
          <tvl-button size="small" :label="closeLabel" @click="$emit('close')"/>
          <tvl-button size="small" :label="okLabel" @click="$emit('ok')"/>
        </slot>
      </div>
    </div>
  </transition>
</template>
<script>
import { generateZindex } from '../../helpers/helper.js'
export default {
  name: 'TvlModalContent',
  props: {
    show: { type: Boolean, required: true },
    transition: { type: String, default: 'tr-modal-content' }
  },
  methods: {
    onEnter () {
      this.$wrap(this.$root, this.$refs.myModal)
      this.$refs.myModal.style.zIndex = generateZindex()
    }
  },
  computed: {
    title () {
      return this.$parent.title
    },
    subtitle () {
      return this.$parent.subtitle
    },
    okLabel () {
      return this.$parent.okLabel
    },
    closeLabel () {
      return this.$parent.closeLabel
    }
  }
}
</script>
<style>
 
</style>