<template>
    <div>
      <slot name="main"></slot>
    </div>
</template>
<script type="text/babel">
  export default{
    created(){
      if (typeof document === 'object') {
        var loadingMask = document.getElementById('html-fist-loading');
        if (loadingMask) {
          loadingMask.parentNode.removeChild(loadingMask);
        }
      }
    }
  }
</script>
<style lang="css">
	@import "reset.css";
	@import "variable.css";
	@import "common.css";
	@import "iconfont.css";
</style>
