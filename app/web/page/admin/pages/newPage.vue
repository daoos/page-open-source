<template>
  <div>
    <!--动态组件，固定两个属性
        is: 动态渲染组件名称；
        props：分发组件props(在将要渲染的组件中需固定写上这个props，详情请狂./component/home.vue、about.vue，同时渲染的数组格式需为
        如：data:{typeid:'component-name',props:{msg:"this is a test"}})；
    -->
    <el-row type="flex" justify="space-between">
      <el-col class="component-window" :span="4" style="height: 100%;overflow-y: auto">
        <h3 class="mbsm">选择组件</h3>
        <el-menu default-active="0" class="el-menu-vertical-demo" @select="selectComponent">
            <!-- <el-menu-item index="default">default组件</el-menu-item> -->
          <el-submenu index="1">
            <template slot="title" style="background: #eef1f6">基础组件</template>
            <el-menu-item index="txt" style="padding-left: 0;">
              <img style="border: 1px solid #989393;" src="https://pic.8pig.com/img/pages/upload/QQ20180416-1530042018-04-16484.png">
              <p>文本组件</p>
            </el-menu-item>
            <el-menu-item index="pImg" style="padding-left: 0;">
              <img style="border: 1px solid #989393;" src="https://pic.8pig.com/img/pages/upload/WX20180418-1839422018-04-18285.png">
              <p>图片组件(兼容pc)</p>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>

      <el-col class="preview-window scroll" :span="14" style="height: 100%;padding-bottom: 50px;margin-right: 10px;">
        <h3 class="mbsm" style="text-align: center;">预览窗口(iphone6)
        </h3>
        <div class="window-ip6" ref="preview" style="margin: auto;overflow-y: auto;">
         <div style="position: relative">
           <component
                v-for="(currentView,index) in viewList" :key="index"
                :is="currentView.name" :props.sync="currentView.props" :length="viewList.length"
                :showBtn="currentIndex === index" :index="index"
                :class="{'actived':currentIndex === index}"
                @componentRemove="componentRemove" @componentDown="componentDown"
                @componentTop="componentTop" @componentBottom="componentBottom"
                @componentUp="componentUp" @showEditWindow="showEditWindow">
           </component>
         </div>
        </div>
      </el-col>

      <el-col class="edit-window" :span="6" style="height: 100%;overflow-y: auto">
        <div class="wrapper-common">
          <el-button type="primary" v-if="isNew" @click="handlepublish">发布</el-button>
          <div v-else>
            <el-button type="primary"  @click="handleSave">保存</el-button>
            <!-- <el-button type="warning"  @click="isBackupDialog = true">回滚数据</el-button> -->
          </div>
        </div>
        <h3 class="mbsm" style="margin-top: 30px;">编辑窗口</h3>
        <component :is="`edit-${editData.name}`" :props.sync="editData.props" :index="currentIndex" class="wrapper-common">
          <div slot="common" style="margin-bottom:10px;">
            <div class="title-wrapper">
              <p style="margin-bottom:10px;font-size:14px;color:#909090"><b>页面公共配置：</b> <span class="close-show" v-text="isCommon?'收起配置':'展开配置'" @click="isCommon = !isCommon"></span></p>

              <p class="mtbsm flex"><el-input size="mini" class="default" :readonly="!isNew" v-model="dbData.pid" placeholder="请输入页面英文标识"><template slot="prepend">标识</template></el-input></p>

              <p class="mtbsm flex">
                <el-input size="mini" class="default" v-model="dbData.title" placeholder="请输入标题">
                  <template slot="prepend">H5页面标题</template>
                </el-input>
              </p>

              <transition name="upDown">
                <div v-show="isCommon" class="transition-box">
                  <p class="mtbsm flex" style="margin-top:7px;">
                    <h4>复制已有文章</h4>
                    <el-input size="mini" class="default" v-model="copyPid" placeholder="请输入要复制的页面标识">
                        <template slot="prepend">页面标识</template>
                        <el-button slot="append" @click="copyFromPid">复制</el-button>
                    </el-input>
                  </p>
                </div>
              </transition>
            </div>
          </div>

          <div slot="component">
            <div class="mbsm edit-position">
              <span style="margin-right:10px">当前组件顺序：{{currentIndex+1}}</span>
              <el-input class="mtmd" size="mini" v-model.number="sort" placeholder="填正整数,表示移动到组件列表的第几个前面">
                <template slot="prepend">移动顺序</template>
                <el-button slot="append" @click="moveComponent">确定</el-button>
              </el-input>
            </div>
          </div>
        </component>
      </el-col>
    </el-row>
   
  </div>
</template>

<script type="text/babel">
import componentList from "component/activity/defaultSetting";
import { deepCopy, date, getCsrf, formateDate } from "common/tool";
import { DOMAIN, API_DOMAIN, API_PATH } from "common/conf";
import axios from "axios";
import URL from '../../../common/url'


function createComponents(list, path, type) {
  if (Object.prototype.toString.call(list) !== "[object Array]")
    return alert("数据格式不正确");
  const components = {};
  list.map(function(element) {
    const name = element.name;
    let showname = name;
    if (!!type) showname = type + "-" + name;
    components[showname] = () =>
      import(`../../../component/activity/${path}${name}.vue`); // 动态引入
  });
  return components;
}

const defaultVar = {
  title: '',
  viewList: [{ name: 'default', props: { msg: '在这里新建你的页面吧' }}]

}

export default {
  beforeRouteEnter: (to, from, next) => {
    const pid = to.params.pid;
    next(vm => {
      document.getElementsByClassName('meau-ul')[0].style.display = 'none'
      document.getElementsByClassName('operation-view')[0].style.width = '100%'
      if (pid) {
        axios.get(`/api/pages/${pid}`).then((res)=>{
          const data = res.data
          // console.log(data)
          if(data.ret == 0){
            //success..
            vm.viewList = data.data.comps
            vm.dbData.title = data.data.title || ''
            vm.isNew = false
            vm.dbData.pid = pid
          }
        })
      }else{
         vm.viewList = [{
          name: "default",
          props: { msg: "在这里新建你的页面吧" }
        }]
        vm.title=''
        vm.sign=''
        vm.pid = ''
        vm.isNew = true
      }
    })
  },
  beforeRouteLeave (to,from,next){
    this.$confirm('该页面有可能未保存或未发布，确定退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next()
      }).catch(() => {
        next(false)
      });

  },
  components: Object.assign({}, createComponents(componentList, "preview/"),
    createComponents(componentList, "edit/", "edit")
  ),
  data() {
    return {
      sort:'',
      isCommon:false,
      isNew:true,
      dbData: {
        pid:'',
        title: defaultVar.title,
      },
      copyPid:'',
      viewList: defaultVar.viewList,
      editData: {
        name: 'default',
        props: { msg: '在这里新建你的页面吧' }
      },
      currentIndex: 0,
    };
  },
  methods: {
    async fetch (pid) {
      if(!pid) return
      const { data } = await axios.get(`/api/pages/${pid}`).catch(err => { throw err })
      if(data.ret === 0){
        if (this.viewList[0] && this.viewList[0].name == "default") {
          this.viewList = data.data.comps;
        }
        this.viewList = [...this.viewList,...data.data.comps]
      }else{
        alert(data.resMsg)
      }
    },
    copyFromPid(){
      const pid = this.copyPid
      this.fetch(pid)
    },
    
    selectComponent(name) {
      // isdefault
      if (this.viewList[0] && this.viewList[0].name == "default") {
         this.viewList = [];
      }
      const viewData2 = componentList.filter(function(item) {
        if (item.name == name) {
          return item;
        }
      });
      const viewData = deepCopy(viewData2[0]);
      if (this.currentIndex === this.viewList.length) {
         this.viewList.push(viewData);
        //  this.currentIndex = this.viewList.length - 1;
      } else {
        this.viewList = [...this.viewList.slice(0, this.currentIndex+1), viewData, ...this.viewList.slice(this.currentIndex+1)];
        this.currentIndex += 1
      }
      this.editData = viewData; // deepCopy(viewData);
    },
    showEditWindow(index) {
      this.editData = this.viewList[index];
      this.currentIndex = index;
    },
    scrollToDest (dest) {
      this.$nextTick(() => {
        const DOMpreview = this.$refs.preview
        const position = dest || DOMpreview.scrollHeight
        DOMpreview.scrollTo(0, position)
      })
    },
    componentTop (index) {
      // 当前改变位置项
      const changeItem = this.viewList[index]
      this.viewList = [changeItem,...this.viewList.slice(0,index),...this.viewList.slice(index+1)]
      this.currentIndex = 0
      this.scrollToDest(1)
    },
    componentBottom (index) {
      // 当前改变位置项
      const changeItem = this.viewList[index]
      this.viewList = [...this.viewList.slice(0,index),...this.viewList.slice(index+1),changeItem]
      this.currentIndex = this.viewList.length - 1
      this.scrollToDest()
    },
    componentUp (index) {
      if (this.viewList.length <= 1) {
        return alert("只有一个组件?");
      }
      let item, item2, viewList;
        if (index < 1) return alert("已经在顶部了，不能再上移");
        item = this.viewList[index];
        // console.log(index);
        item2 = this.viewList[index - 1];
        viewList = [
          ...this.viewList.slice(0, index - 1),
          item,
          item2,
          ...this.viewList.slice(index + 1)
        ];
        this.currentIndex = this.currentIndex - 1;
      this.viewList = viewList;
    },
    componentDown (index) {
      if (this.viewList.length <= 1) {
        return alert("只有一个组件?");
      }
      let item, item2, viewList;
      if (index == this.viewList.length - 1) return alert("已经在底部了，不能再下移");
      item = this.viewList[index + 1];
      item2 = this.viewList[index];
      viewList = [
        ...this.viewList.slice(0, index),
        item,
        item2,
        ...this.viewList.slice(index + 2)
      ];
      this.currentIndex = this.currentIndex + 1;
        //this.viewList=viewList
      this.viewList = viewList;
    },
    componentRemove (index) {
      if(typeof window !='object') return ;
      this.$confirm('删除该组件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log("点了确定");
        this.viewList.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    moveComponent(){
      const sort = this.sort < this.viewList.length ? Math.max(this.sort-1,0):this.viewList.length-1 // 未来位置
      const index = this.currentIndex // 原本位置
      const filterComps = this.viewList.splice(index,1)
      this.viewList = this.viewList.slice(0,sort).concat(filterComps,this.viewList.slice(sort))
      this.currentIndex = sort
    },
    deleteComponent() {
      if(typeof window !='object') return ;
      if (window.confirm("确定删除吗？")) {
        this.viewList.splice(this.currentIndex, 1);
      }
    },
    pagesConfirm(pid,title) {
      const link = `${DOMAIN}p2/${pid}`;
      this.$alert(`
        <div>
        H5版请访问：
        </div>
        <div style="text-align:center">
        <a href="${DOMAIN}p/${pid}" target="_blank">${DOMAIN}p2/${pid}</a>
        </div>
        <div>
        PC版请访问：
        </div>
        <div style="text-align:center">
        <a href="${DOMAIN}pc/${pid}" target="_blank">${DOMAIN}pc/${pid}</a>
        </div>
        `, "页面生成提醒", {
        // confirmButtonText: "立刻访问",
        dangerouslyUseHTMLString: true,
        callback: (action) => {
          if(action == 'cancel'){
            window.location.href = `/admin/newpage/${pid}`
            return ;
          }
          window.open(link, "_blank");
        }
      });
    },
    handlepublish() {
      if (!this.dbData.title.trim()) {
        return alert("标题那么寂寞，你确定不填充它？");
      }
       if (!(/^([a-z_A-Z-.0-9]+)$/gi.test(this.dbData.pid))) {
        return alert("请填写或者更换页面标识,标识可为数字，字母，短横线和下划线组合而成，每个标识必须唯一");
      }
      this.dbData.tags = []
      this.tagsOption.forEach((item)=>{
        if(item.isAct){
          this.dbData.tags.push(item.value)
        }
      })
      if (this.sem && this.dbData.tags.indexOf('落地页') < 0) {
        this.dbData.tags.push('落地页')
      }
      let _dynamic = false
      for (let i = 0; i < this.viewList.length; i++) {
        if (this.viewList[i].name === 'tag') {
          _dynamic = true
          break
        }
      }
      const opt = {
        pid: this.dbData.pid,
        title: this.dbData.title,
        comps: this.viewList,
        lastedit: formateDate(new Date())
      };
      axios.post(`/api/pages`, opt).then(res => {
        // console.log(res);
        const pid = res.data.pid;
        this.pagesConfirm(pid,'页面生成成功');
      }).catch(e => {
        console.log('error--',e.response)
        alert(e.response.data.error+' 该错误可能由重复的页面标识导致，尝试修改页面标识')
      });
    },
    handleSave(){
      if (!this.dbData.title.trim()) {
        return alert("标题那么寂寞，你确定不填充它？");
      }
      if (!(/^([a-z_A-Z-.0-9]+)$/gi.test(this.dbData.pid))) {
        return alert("请填写或者更换页面标识,标识可为数字，字母，短横线和下划线组合而成，每个标识必须唯一");
      }
     
      const opt = {
        title: this.dbData.title,
        comps: this.viewList,
        lastedit: formateDate(new Date())
      };
      axios.put(`/api/pages/${this.dbData.pid}`, opt).then(res => {
        if(res.status == 200){
          //success..
        const pid = res.data.pid;
        this.pagesConfirm(pid,'保存成功');
        }
      }).catch(e => {
        throw e;
      });

    }
  }
};
</script>

<style lang="css">
@import "../../../asset/css/variable";
/* @import "../../../asset/css/common.css"; */

.text-color-picker {
  & .el-color-picker__trigger {
    height: 26PX;
  }
  & .el-color-picker__color {
    width: 12PX;
    height: 14PX;
  }
  & .el-color-picker__icon {
    top: -2PX;
  }
}
.admin-default-edit-name{
    padding-top: 10PX;
    margin: 10PX 0;
    font-size: 14PX;
    color: var(--color-lightblack);
    border-top: 1PX dashed #dedede;
}
.mtbsm {
    margin:0 0 5px 0;
}
.mtmd{
  margin-top:10px;
}
.border{
    border: 1PX solid var(--color-gray);
}
.flex{
  display: flex;
}
.flex span{
  /* width:120px; */
  vertical-align: middle;
  display: inline-block;
  padding-top: 7px;
}
.flex input{
  flex: 1;
  vertical-align: top;
}
.preview-window {
  & .window-ip6 {
      border: 1PX solid var(--color-gray);
      /* width: 750PX; */
      width: 630PX;
      /*height: 826px;*/
      /*min-height: 826px;*/
      /*max-height: 826px;*/
      /*max-width: 750px;*/
      /*min-width: 750px;*/
        /*max-width: 560PX;*/
        /*min-width: 560PX;*/
      height: 100%;
      /*width: 380PX;*/
      /*height: 667PX;*/
        overflow-y: auto;
      background: #fff;
      z-index: 0;
      padding: 10PX;
      border-radius: 5px 5px 0 0;
      box-shadow: 0 0 20px rgba(115, 107, 107, 0.31);
  }
}
.wrapper-common {
  /*border: 1PX solid var(--color-gray);*/
  /*padding: var(--margin-small);*/
}
.title-wrapper {
  font-weight: normal;
  font-size: 12px;
  display: block;
}
input.default{
  display:inline-block;
  min-height:30px;
  min-width:100px;
  border: 1PX solid var(--color-gray);
}
textarea.default{
    width: 100%;
    margin-top:3PX;
    line-height: 20PX;
    max-height: 40PX;
    padding: 2PX 3PX;
    border: 1PX solid var(--color-gray);
}
.edit-position{
  padding-bottom:10px;
  margin-bottom:10px;
  border-bottom:1PX dashed var(--color-gray);
}
</style>
<style scoped>
@import 'variable.css';
.transition-box {
  overflow-y: hidden;
}
.upDown-enter-active,.upDown-leave-active{
  transition: all .3s ease;
}
.upDown-enter,.upDown-leave-to{
  transform:translateY(-10%);
  opacity: 0;
}
.close-show{
  float: right;
  font-size:12px;
  color:var(--color-blue);
  cursor: pointer;
}
.actived{
  outline: 2PX solid rgba(78, 173, 255, 0.61961);
  box-shadow: 0 0 0.06667rem 0.04rem #b1dafdd1
}
.fileContainer {
    overflow: hidden;
    position: relative;
    background: #fff;
    border-radius: .5em;
    border:1px solid #ccc;
    float: left;
    padding: .2em .5em;
    margin-bottom:.5em;
}
.fileContainer [type=file] {
    cursor: inherit;
    display: inline-block;
    filter: alpha(opacity=0);
    min-height: 100%;
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
    cursor: pointer;
  }
.tag-item{
  display: inline-block;
  margin:7px;
  padding: 4px 15px;
  border: 1PX solid #b0c6e4;
  color: #5a7192;
  border-radius: 6px;
  background-color: #e3ebf1;
  &.active{
    background-color:#b8e0fd;
    border-color:#66bbf9;
  }
}
.tags{
  display: inline-block;
  margin:4px;
  padding: 4px 10px;
  background-color:#b8e0fd;
  border-color:#66bbf9;
  color: #5a7192;
  border-radius: 6px;
}
  .el-menu-item {
    height: 157PX;
    max-width: 50%;
    min-width: 50%;
    border-right: 1PX solid #e9e9e9;
    border-bottom: 1PX solid #e9e9e9;
    background: #fff;
    padding: 0;
    text-align: center;
    float: left;
    & img {
        width: 100PX;
        height: 100PX;
        /*border: 1PX solid #989393;*/
        margin-top: 10PX;
      }
  }
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 6PX;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 6PX;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
  background: rgba(0,0,0,.1);
}
/*::-webkit-scrollbar-track {!*滚动条里面轨道*!*/
  /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
  /*border-radius: 10px;*/
  /*background: #EDEDED;*/
/*}*/
</style>
