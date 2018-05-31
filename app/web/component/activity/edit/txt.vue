<template>
    <div>
        <!-- slot nam=common 公用组件，必须有 -->
        <slot name="common"></slot>
        <p class="admin-default-edit-name"><b>当前组件：基础文本组件</b></p>
        <slot name="component"></slot>
        <p>
            <span style="vertical-align:top;">文本：(双击预览预览窗口文本框切换编辑模式)</span>
            <el-input type="textarea" v-model="props.txt"></el-input>
        </p>
       
        <p>
            字体大小：
            <el-select v-model="props.fontSize" placeholder="请选择" style="width:25%;" size="mini">
                <el-option
                v-for="item in textList"
                :key="item.value"
                :value="item.value">
                </el-option>
            </el-select>
            字体粗细：
            <el-select v-model="props.fontWeight" size="mini" style="width:25%;">
                <el-option label="加粗" value="bold">加粗</el-option>
                <el-option label="正常" value="normal">正常</el-option>
                <el-option label="变细" value="lighter">变细</el-option>
            </el-select>
        </p>
       
        <p>
            字体颜色：
            <el-color-picker class="text-color-picker" v-model="props.color"></el-color-picker>
            <input class="default" v-model="props.color" style="width:1.5rem">
             对齐方式：
            <el-select v-model="props.textAlign" size="mini" style="width:25%;">
                <el-option lable="居左" value="left">居左</el-option>
                <el-option label="居中" value="center">居中</el-option>
                <el-option label="居右" value="right">居右</el-option>
            </el-select>
        </p>
        <p>
            
            背景颜色：
            <el-color-picker class="text-color-picker" v-model="props.bgColor"></el-color-picker>
            <input class="default" style="width:1.5rem" v-model="props.bgColor">
        </p>
        <p>
            边框颜色：
            <el-color-picker class="text-color-picker" v-model="props.borderColor"></el-color-picker>
            <input class="default" v-model="props.borderColor" style="width:1.5rem;"> 
            边框大小：
            <el-select v-model="props.borderWidth" style="width:25%;" size="mini">
                <el-option label="1像素" value="1PX">1像素</el-option>
                <el-option label="2像素" value="2PX">2像素</el-option>
                <el-option label="3像素" value="3PX">3像素</el-option>
                <el-option label="4像素" value="4PX">4像素</el-option>
             </el-select>
            <br/>
            边框线形：
            <el-select v-model="props.borderStyle" style="width:25%;margin-top:0.1rem;" size="mini">
                <el-option label="线形" value="solid">线形</el-option>
                <el-option label="点状" value="dotted">点状</el-option>
                <el-option label="双线" value="double">双线</el-option>
                <el-option label="虚线" value="dashed">虚线</el-option>
             </el-select>
       
        </p>
        <p style="margin-top:12px">
            <span class="tips">
                tips:<br>
                以下宽高／边距，单位可以是px、%,默认值为自动(auto)<br>
                不写单位只写数字，默认的单位为px，如：10 -> 10px<br>
                以750px设计稿像素为准，即750的设计稿某宽高若是10px，输入10px
            </span><br>
            宽度：
            <el-input class="default" v-model="props.width" placeholder="自动" style="width:25%;" size="mini"></el-input>
            高度：
            <el-input class="default" v-model="props.height" placeholder="自动" style="width:25%;" size="mini"></el-input>
        </p>
        <p>
            行高：
            <el-input class="default" v-model="props.lineHeight" placeholder="自动" style="width:25%;" size="mini"></el-input>
       </p>
       <p style="margin-top:12px">
            上外边距：
            <el-input class="default" v-model="props.marginTop" style="width:25%;" size="mini"></el-input>
            下外边距：
            <el-input class="default" v-model="props.marginBottom" style="width:25%;" size="mini"></el-input>
            <br/>
            左外边距：
            <el-input class="default" v-model="props.marginLeft" style="width:25%;" size="mini"></el-input>
            右外边距：
            <el-input class="default" v-model="props.marginRight"  style="width:25%;" size="mini"></el-input>
       </p>
        <p style="margin-bottom:12px;">
            上内边距：
            <el-input class="default" v-model="props.paddingTop"  style="width:25%;" size="mini"></el-input>
            下内边距：
            <el-input class="default" v-model="props.paddingBottom" placeholder="自动" style="width:25%;" size="mini"></el-input>
            <br/>
            左内边距：
            <el-input class="default" v-model="props.paddingLeft" placeholder="自动" style="width:25%;" size="mini"></el-input>
            右内边距：
            <el-input class="default" v-model="props.paddingRight" placeholder="自动" style="width:25%;" size="mini"></el-input>
       </p>
        <p>
            是否独立一行：  
            <input type="radio"  id="one" value="block" v-model="props.display"><label for="one">是</label>
            <input type="radio"  id="two" value="inline-block" v-model="props.display"><label for="two">否</label>
        </p>
        <p>
            是否添加链接： 
            <input type="radio"  id="one" :value="false" v-model="props.isLink"><label for="one">否</label>
            <input type="radio"  id="two" :value="true" v-model="props.isLink"><label for="two">是</label> 
        </p>
        <p v-if="props.isLink">
           链接地址：<el-input size="mini" v-model="props.url" style="width:100%;"></el-input>
        </p>

    </div>
</template>

<script>
export default {
  props: {
    props: Object
  },
  data() {
    return {
      textList: [
        { value: "10px" },
        { value: "11px" },
        { value: "12px" },
        { value: "13px" },
        { value: "14px" },
        { value: "15px" },
        { value: "16px" },
        { value: "18px" },
        { value: "20px" },
        { value: "22px" }
      ],
      isBlock: true
    };
  }
};
</script>
<style scoped lang="css">
p {
  margin: 8px 0;
}
.tips{
    width:100%;
    background-color:azure;
    border:1PX solid #c3f7fb;
    display: inline-block;
    padding:3px 5px;
    margin:0 0 10px 0;
}
</style>

