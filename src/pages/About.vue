<template>
  <div>
    About page
    <TestComponent2>Slot in remote</TestComponent2>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "About",
  components: {
    TestComponent2: defineAsyncComponent(() => import('auth/components/TestComponent2'))
  }
};
</script>

<style scoped>

</style>
