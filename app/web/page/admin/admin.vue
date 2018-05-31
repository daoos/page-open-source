<template>
    <Layout class="admin-layout">
        <el-row class="header">
            <el-col :span="18" class="logo-box">
                <span class="logo"></span>
                <span class="name">配置页面平台</span>
            </el-col>
            <el-col :span="6" class="operation-center">
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="meau-wrapper" >
              <el-menu :router="true" default-active="/count"
              class="meau-ul"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
                  <!--index为路由的路径-->
                <el-menu-item index="/list"><i class="el-icon-document"></i>首页</el-menu-item>

              </el-menu>
          </el-col>
          <el-col :span="21" class="operation-view">
              <transition name="fade" mode="out-in">
                  <keep-alive>
                      <router-view></router-view>
                  </keep-alive>
              </transition>
          </el-col>
        </el-row>
    </Layout>
</template>
<script  type="text/babel">
//这种方式引入layout
import Layout from 'layout/standard'
import App from 'app'
App.component(Layout.name, Layout);
export default {
}
</script>
<style lang="css" scoped>
@import "../../asset/css/variable";
/* @import "../../asset/css/common"; */
.a-click {
  cursor: pointer;
}
.header {
  height: 54PX;
  background: var(--color-black);
  color: #fff;
  padding: 0 15PX;
  line-height: 54PX;
}

.logo-box {
  height: 54PX;
  display: flex;
  align-items: center;
  & .name {
    font-size: 24PX;
    margin-left: 10PX;
  }
  & .logo {
    display: inline-block;
    width: 30PX;
    height: 30PX;
    background-image: url('https://pic.8pig.com/img/pages/upload/peppa2018-04-16395.jpg@30w');
    border-radius: 15PX;
  }
}

.operation-center {
  text-align: right;
  & .user-info {
    display: inline-block;
  }
  & .user-type{
    margin-right: var(--margin-small);
  }
}

.meau-wrapper {
  & .meau-ul {
    min-height: 100%;
  }
  & .el-menu-item{
    min-width: auto;
  }
}
.operation-view {
  height:100%;
  overflow: auto;
  padding: var(--margin) var(--margin-middle);
}

</style>
