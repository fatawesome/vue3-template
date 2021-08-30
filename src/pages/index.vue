<template>
  <div class="test">
    Index page
    <TestComponent>
      Slot in remote
    </TestComponent>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "index",
  components: {
    TestComponent: defineAsyncComponent(() => import('auth/components/TestComponent'))
  }
});
</script>

<style lang="scss">
.test {
  color: coral;
}
</style>
