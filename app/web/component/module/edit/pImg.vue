<template>
    <div>
        <!-- slot nam=common 公用组件，必须有 -->
        <slot name="common"></slot>
        <p class="admin-default-edit-name"><b>当前组件：图片组件</b></p>
        <slot name="component"></slot>
        <p >
             图片链接：
             <el-input size="mini" v-model="props.imgUrl" style="width:100%; margin:8px 0;" placeholder="图片地址" ></el-input>
        </p>
        <p style="margin:8px 0;">
            <span class="tips">
                tips:<br>
                以下宽高／边距，单位可以是px、%,默认值为自动(auto)<br>
                不写单位只写数字，默认的单位为px，如：10 -> 10px<br>
                以750px设计稿像素为准，即750的设计稿某宽高若是10px，输入10px
            </span><br>
            图片宽度：
            <el-input size="mini" v-model="props.width" style="width:20%" ></el-input>
            图片高度：
            <el-input size="mini" v-model="props.height" style="width:20%" ></el-input>
        </p>
        

         <p style="margin-top:12px">
           <p >以下单位默认为px，需写明</p>
            上外边距：
            <el-input size="mini" v-model="props.marginTop" style="width:25%;"></el-input>
            下外边距：
            <el-input size="mini"  v-model="props.marginBottom" style="width:25%;"></el-input>
            <br/>
            左外边距：
            <el-input size="mini" v-model="props.marginLeft" style="width:25%;"></el-input>
            右外边距：
            <el-input size="mini" v-model="props.marginRight" style="width:25%;"></el-input>
       </p>
        <p style="margin-bottom:12px;">
            上内边距：
            <el-input size="mini" v-model="props.paddingTop" style="width:25%;"></el-input>
            下内边距：
            <el-input size="mini" v-model="props.paddingBottom" style="width:25%;"></el-input>
            <br/>
            左内边距：
            <el-input size="mini" v-model="props.paddingLeft" style="width:25%;"></el-input>
            右内边距：
            <el-input size="mini" v-model="props.paddingRight" style="width:25%;"></el-input>
       </p>
        <p>
            对齐方式：(独立一行起效)
            <el-select v-model="props.textAlign" size="mini">
                <el-option label="居左" value="left">居左</el-option>
                <el-option label="居中" value="center">居中</el-option>
                <el-option label="居右" value="right">居右</el-option>
            </el-select>
        </p>
         <p>
            是否独立一行：  
            <input type="radio"  id="one" value="block" v-model="props.display"><label for="one">是</label>
            <input type="radio"  id="two" value="inline-block" v-model="props.display"><label for="two">否</label>
        </p>
        <p>
            背景颜色：
            <el-color-picker class="text-color-picker" v-model="props.bgColor"></el-color-picker>
            <input  v-model="props.borderColor" style="width:1.5rem"> 
        </p>
        <p>
            边框大小：
            <input  v-model="props.borderWidth" style="width:25%;">
            边框颜色：
            <el-color-picker class="text-color-picker" v-model="props.borderColor"></el-color-picker>
            <input  v-model="props.borderColor" style="width:1.5rem"> 
            <br/>
            边框线形：
            <el-select v-model="props.borderStyle" size="mini" style="width:25%;margin-top:5px;">
                <el-option label="线形" value="solid">线形</el-option>
                <el-option label="点状" value="dotted">点状</el-option>
                <el-option label="双线" value="double">双线</el-option>
                <el-option label="虚线" value="dashed">虚线</el-option>
             </el-select>
       
        </p>
        <p>
            是否添加链接： 
            <input type="radio"  id="one" :value="false" v-model="props.isLink"><label for="one">否</label>
            <input type="radio"  id="two" :value="true" v-model="props.isLink"><label for="two">是</label> 
        </p>
        <p v-if="props.isLink">
           链接地址：<el-input size="mini" v-model="props.url" style="width:100%;"></el-input>
        </p>

        <div>
            <h5>pc版属性设置</h5>
            图片链接：
            <el-input size="mini" v-model="props.pcImgUrl" style="width:100%; margin:8px 0;" placeholder="图片地址" ></el-input>
            <p style="margin:8px 0;">
                <span class="tips">
                    tips:<br>
                    以下宽高/边距 均以单位为 px、% 默认值为自动(auto) <br>
                </span><br>
                图片宽度：
                <el-input size="mini" v-model="props.pcWidth" style="width:20%" ></el-input>
                图片高度：
                <el-input size="mini" v-model="props.pcHeight" style="width:20%" ></el-input>
            </p>
            <p style="margin-top:12px">
           <p >以下单位默认为px，需写明</p>
            上外边距：
            <el-input size="mini" v-model="props.pcMarginTop" style="width:25%;"></el-input>
            下外边距：
            <el-input size="mini"  v-model="props.pcMarginBottom" style="width:25%;"></el-input>
            <br/>
            左外边距：
            <el-input size="mini" v-model="props.pcMarginLeft" style="width:25%;"></el-input>
            右外边距：
            <el-input size="mini" v-model="props.pcMarginRight" style="width:25%;"></el-input>
       </p>
        <p style="margin-bottom:12px;">
            上内边距：
            <el-input size="mini" v-model="props.pcPaddingTop" style="width:25%;"></el-input>
            下内边距：
            <el-input size="mini" v-model="props.pcPaddingBottom" style="width:25%;"></el-input>
            <br/>
            左内边距：
            <el-input size="mini" v-model="props.pcPaddingLeft" style="width:25%;"></el-input>
            右内边距：
            <el-input size="mini" v-model="props.pcPaddingRight" style="width:25%;"></el-input>
       </p>
        <p>
            对齐方式：(独立一行起效)
            <el-select v-model="props.pcTextAlign" size="mini">
                <el-option label="居左" value="left">居左</el-option>
                <el-option label="居中" value="center">居中</el-option>
                <el-option label="居右" value="right">居右</el-option>
            </el-select>
        </p>
         <p>
            是否独立一行：  
            <input type="radio"  id="one" value="block" v-model="props.pcDisplay"><label for="one">是</label>
            <input type="radio"  id="two" value="inline-block" v-model="props.pcDisplay"><label for="two">否</label>
        </p>
        <p>
            背景颜色：
            <el-color-picker class="text-color-picker" v-model="props.pcBgColor"></el-color-picker>
            <input  v-model="props.borderColor" style="width:1.5rem"> 
        </p>
        <p>
            边框大小：
            <input  v-model="props.pcBorderWidth" style="width:25%;">
            边框颜色：
            <el-color-picker class="text-color-picker" v-model="props.pcBorderColor"></el-color-picker>
            <input  v-model="props.borderColor" style="width:1.5rem"> 
            <br/>
            边框线形：
            <el-select v-model="props.pcBorderStyle" size="mini" style="width:25%;margin-top:5px;">
                <el-option label="线形" value="solid">线形</el-option>
                <el-option label="点状" value="dotted">点状</el-option>
                <el-option label="双线" value="double">双线</el-option>
                <el-option label="虚线" value="dashed">虚线</el-option>
             </el-select>
       
        </p>
        <p>
            是否添加链接： 
            <input type="radio"  id="one" :value="false" v-model="props.pcIsLink"><label for="one">否</label>
            <input type="radio"  id="two" :value="true" v-model="props.pcIsLink"><label for="two">是</label> 
        </p>
        
        <p v-if="props.isLink">
           链接地址：<el-input size="mini" v-model="props.pcUrl" style="width:100%;"></el-input>
        </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            props: Object
        }
    }
</script>
<style scoped>
p{
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
