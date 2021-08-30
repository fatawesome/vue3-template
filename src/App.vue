<template>
  <div>
    <div class="header">
      <router-link to="/">Main</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
<!--    <div class="host block">-->
<!--      Host content-->
<!--    </div>-->
<!--    <div class="remote block">-->
<!--      <TestComponent>-->
<!--        <div class="remote-slot">-->
<!--          Remote slot-->
<!--        </div>-->
<!--      </TestComponent>-->
<!--    </div>-->
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: 'App',
  components: {
    TestComponent: defineAsyncComponent(() => import('auth/components/TestComponent'))
  },
  data() {
    return {
      x: 'im x'
    };
  },
  methods: {
    handleClick() {

    }
  }
});
</script>

<style>
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
.remote-slot {
  height: 50px;
  background: chocolate;
}

</style>
