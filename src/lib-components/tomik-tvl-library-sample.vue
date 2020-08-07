<script>
export default {
  name: 'TomikTvlLibrarySample',
  data () {
    return {
      modalShow: false
    }
  },
  methods: {
    onClick () {
      this.modalShow=!this.modalShow
    }
  }
};
</script>

<template>
  <div style="text-align: center; padding: 20px 0;">
    <tvl-modal :show="modalShow" title="modal title" subtitle="modal subtitle" @hide="modalShow = false">
      <div>modal content</div>
      <template slot="footer">
        <tvl-button size="small" label="OK" color="blue500" @click="modalShow=false"/>
        </template>
    </tvl-modal>
    <h1>tvl-button</h1>
    <div style="display: flex; justify-content: center;">
      <tvl-button color="pink750" label="i trigger a modal" size="medium" @click="onClick"/>
      <tvl-button color="blue800" label="blue700"/>
    </div>
  <div style="color: #4F4F4F;">
    <p>another text in a paragraph</p>
    <h2>nadpis pičo</h2>
    <p> a další vodstavec</p>
  </div>

  </div>

</template>
<style>
</style>
