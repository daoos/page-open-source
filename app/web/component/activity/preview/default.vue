<template>
  <!-- showEditWindow事件必须有 -->
    <div @click="showEditWindow">
      <!-- nav为组件调整顺序使用，仅在preview中有 需要自行粘贴-->
      <nav class="button-nav" v-if="showBtn">
        <div v-if="index !== 0" @click.stop.prevent="componentTop">
          <i class="iconfont icon-up-arrow box"></i>
        </div>
        <div v-if="index !== 0" @click.stop.prevent="componentUp">
          <i class="el-icon-arrow-up box"></i>
        </div>
        <div v-if="index !== length -1" @click.stop.prevent="componentDown">
          <i class="el-icon-arrow-down box"></i>
        </div>
        <div v-if="index !== length -1" @click.stop.prevent="componentBottom">
          <i class="iconfont icon-down box"></i>
        </div>
        <div @click.stop.prevent="componentRemove">
          <i class="el-icon-close box remove"></i>
        </div>
      </nav>
        <p style="margin-top:30px;text-align:center;font-size:16px;">{{props.msg}}</p>
        <!-- <i class="iconfont icon-up-arrow"></i> -->
    </div>
</template>

<script>
export default {
  props:{
     //以下props必须有
      props:Object,
      index:Number,
      length: Number,
      showBtn: Boolean
    },
    methods: {
      showEditWindow() {
        this.$emit("showEditWindow",this.index)
      },
      componentTop () {
        this.$emit("componentTop",this.index)
      },
      componentBottom () {
        this.$emit("componentBottom",this.index)
      },
      componentUp () {
        this.$emit("componentUp",this.index)
      },
      componentDown () {
        this.$emit("componentDown",this.index)
      },
      componentRemove () {
        this.$emit("componentRemove",this.index)
      }
    }
}
</script>
