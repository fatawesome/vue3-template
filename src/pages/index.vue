<template>
  <div>index lol</div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "index",
  components: {
    I8LoginForm: defineAsyncComponent(() => import('auth/components/I8LoginForm'))
  },
  mounted() {
    // TODO: delete
    console.log('-'.repeat(80));
    console.log(this.$options.components.I8LoginForm);
    console.log('-'.repeat(80));
  }
});
</script>

<style scoped>

</style>
