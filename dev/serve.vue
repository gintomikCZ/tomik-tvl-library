<script>
import Vue from 'vue';
import { TomikTvlLibrarySample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    TomikTvlLibrarySample,
  }
});
</script>

<template>
  <div id="app">
    <tomik-tvl-library-sample />
  </div>
</template>
<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@400;500;600;700;800&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Rosario:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
</style>