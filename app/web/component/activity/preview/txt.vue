<template>
  <div @click="showEditWindow" style="width:10rem;">
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
    <div @dblclick="showInputBox" :style="{display:props.display}">
      <!-- showEditWindow事件必须有 -->
      <pre v-if="!props.isLink && !isInput" :style="{
            fontSize:props.fontSize,
            whiteSpace: 'pre-wrap',
            color:props.color,
            fontWeight:props.fontWeight,
            width:width,
            height:height,
            lineHeight:lineHeight,
            textAlign:props.textAlign,
            display:props.display,
            marginTop:marginTop,
            marginLeft:marginLeft,
            marginRight:marginRight,
            marginBottom:marginBottom,
            paddingTop:paddingTop,
            paddingBottom:paddingBottom,
            paddingLeft:paddingLeft,
            paddingRight:paddingRight,
            backgroundColor:props.bgColor,
            borderWidth:props.borderWidth,
            borderStyle:props.borderStyle,
            borderColor:props.borderColor,
        }">{{props.txt}}</pre>

      <el-input type="textarea" v-else-if="isInput" v-model="props.txt" :style="{
            fontSize:props.fontSize,
            whiteSpace: 'pre-wrap',
            color:props.color,
            fontWeight:props.fontWeight,
            width:width,
            height:height,
            lineHeight:lineHeight,
            textAlign:props.textAlign,
            display:props.display,
            marginTop:marginTop,
            marginLeft:marginLeft,
            marginRight:marginRight,
            marginBottom:marginBottom,
            paddingTop:paddingTop,
            paddingBottom:paddingBottom,
            paddingLeft:paddingLeft,
            paddingRight:paddingRight,
            backgroundColor:props.bgColor,
            borderWidth:props.borderWidth,
            borderStyle:props.borderStyle,
            borderColor:props.borderColor,
        }"></el-input>

      <a  v-else :data-href="props.url" >
            <pre :style="{
            fontSize:props.fontSize,
            whiteSpace: 'pre-wrap',
            color:props.color,
            fontWeight:props.fontWeight,
            width:width,
            height:height,
            lineHeight:lineHeight,
            textAlign:props.textAlign,
            display:props.display,
            marginTop:marginTop,
            marginLeft:marginLeft,
            marginRight:marginRight,
            marginBottom:marginBottom,
            paddingTop:paddingTop,
            paddingBottom:paddingBottom,
            paddingLeft:paddingLeft,
            paddingRight:paddingRight,
            backgroundColor:props.bgColor,
            borderWidth:props.borderWidth,
            borderStyle:props.borderStyle,
            borderColor:props.borderColor,
        }">{{props.txt}}</pre></a>
    </div>
  </div>
</template>

<script>
import { formatProps } from 'common/utils'
export default {
    props:{
        //以下两个props必须有
      props:Object,
      index:Number,
      length: Number,
      showBtn: Boolean
    },
    data(){
        return {
            isInput:false
        }
    },
    computed:{
        width(){
            return formatProps(this.props.width,'auto')
        },
        height(){
            return formatProps(this.props.height,'auto')
        },
        lineHeight(){
            return formatProps(this.props.lineHeight,'auto')
        },
        marginTop(){
            return formatProps(this.props.marginTop,0)
        },
        marginLeft(){
            return formatProps(this.props.marginLeft,0)
        },
        marginRight(){
            return formatProps(this.props.marginRight,0)
        },
        marginBottom(){
            return formatProps(this.props.marginBottom,0)
        },
        paddingTop(){
            return formatProps(this.props.paddingTop,0)
        },
        paddingLeft(){
            return formatProps(this.props.paddingLeft,0)
        },
        paddingRight(){
            return formatProps(this.props.paddingRight,0)
        },
        paddingBottom(){
            return formatProps(this.props.paddingBottom,0)
        }
    },
    methods: {
      showEditWindow() {
        this.$emit("showEditWindow",this.index)
      },
      componentUp () {
        this.$emit("componentUp",this.index)
      },
      componentDown () {
        this.$emit("componentDown",this.index)
      },
      componentTop () {
        this.$emit("componentTop",this.index)
      },
      componentBottom () {
        this.$emit("componentBottom",this.index)
      },
      componentRemove () {
        this.$emit("componentRemove",this.index)
      },
        showInputBox(){
            this.showEditWindow()
            this.isInput = !this.isInput
        }
    }
}
</script>
