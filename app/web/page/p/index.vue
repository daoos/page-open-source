<template>
    <mobile-layout :title="pageData.title">
        <div class="pages-layout-wrapper">
          <component v-for="(currentView,index) in pageData.comps" :key="index" :is="currentView.name" :index="index" :props="currentView.props">
          </component>
        </div>
    </mobile-layout>
</template>

<script type="text/babel">
import Vue from 'vue'
import Layout from "layout/mobile";
import App from "app";
App.component(Layout.name, Layout);

import componentList from "component/module/defaultSetting";
import { createComponents } from "common/utils";

export default {
  components: createComponents(componentList, "pubilsh/"),
};
</script>
<style scoped>
.pages-layout-wrapper {
  width: 10rem;
  box-sizing: border-box;
  margin: 0 auto;
  padding-bottom: 30px;
}
</style>
