<template>
    <div class="ueditor-wrapper">
        <script :id="randomId"  type="text/plain"></script>
    </div>
</template>
<script>

import {DOMAIN} from 'common/conf'
export default {
  props: {
    //配置可以传递进来
    ueditorConfig: {}
  },
  data() {
    return {
      //每个编辑器生成不同的id,以防止冲突
      randomId: "editor_" + Math.random() * 100000000000000000,
      //编辑器实例
      instance: null
    };
  },
  mounted() {
    console.log('url--',UE.getUEBasePath())
    this.initEditor();
  },

  beforeDestroy() {
    // 组件销毁的时候，要销毁 UEditor 实例
    if (this.instance !== null && this.instance.destroy) {
      this.instance.destroy();
    }
  },
  methods: {
    initEditor() {
      //dom元素已经挂载上去了
      this.$nextTick(() => {
        const options = {
          UEDITOR_HOME_URL: `${DOMAIN}ueditor/`
        };
        this.instance = UE.getEditor(
          this.randomId,
          Object.assign(options, this.ueditorConfig)
        );
        // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
        this.instance.addListener("ready", () => {
          this.$emit("ready", this.instance);
        });
      });
    }
  }
};
</script>

<style scoped>

</style>