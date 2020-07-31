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
