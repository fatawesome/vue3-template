<template>
  <div class="container">
    <div class="block host">
      Host content
    </div>
    <div class="block remote">
      <TestComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
const TestComponent = defineAsyncComponent(() => import('auth/components/TestComponent'));

export default defineComponent({
  name: 'App',
  components: { TestComponent },
  mounted() {},
  methods: {
    handleClick() {}
  }
});
</script>

<style lang="scss">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
  Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  background-color: #f2f3f5;
  margin: 0;
  color: #2e495e;
  overflow-y: scroll;
}

.container {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  width: 100%;
  height: 100%;
  border: 2px dashed black;
  font-size: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.host {
  background: cyan;
  color: red;
}
.remote {
  background: chartreuse;
  color: black;
}

</style>
