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

import componentList from "component/activity/defaultSetting";

function createComponents(list, path, type) {
  if (Object.prototype.toString.call(list) !== "[object Array]")
    return alert("数据格式不正确");
  const components = {};
  list.map(function(element) {
    const name = element.name;
    let showname = name;
    if (!!type) showname = type + "-" + name;
    components[showname] = () =>
      import(`../../component/activity/${path}${name}.vue`);
  });
  return components;
}


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
