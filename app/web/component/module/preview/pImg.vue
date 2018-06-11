<template>
    <div @click="showEditWindow" :style="{display:props.display,textAlign:props.textAlign}">
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
      <!-- showEditWindow事件必须有 -->
      <v-img v-if="!props.isLink" :data-list="[imgUrl]"
             :style="{
            width:width,
            height:height,
            marginTop:marginTop,
            marginBottom:marginBottom,
            marginLeft:marginLeft,
            marginRight:marginRight,
            paddingTop:paddingTop,
            paddingBottom:paddingBottom,
            paddingLeft:paddingLeft,
            paddingRight:paddingRight,
            backgroundColor:props.bgColor,
            borderWidth:props.borderWidth,
            borderStyle:props.borderStyle,
            borderColor:props.borderColor,
            }"
             style="max-width:100%;"
      ></v-img>
      <a  v-else :href="props.url" target="_blank">
        <v-img :data-list="[imgUrl]"
               :style="{
            width:width,
            height:height,
            marginTop:marginTop,
            marginBottom:marginBottom,
            marginLeft:marginLeft,
            marginRight:marginRight,
            paddingTop:paddingTop,
            paddingBottom:paddingBottom,
            paddingLeft:paddingLeft,
            paddingRight:paddingRight,
            backgroundColor:props.bgColor,
            borderWidth:props.borderWidth,
            borderStyle:props.borderStyle,
            borderColor:props.borderColor,
            }"
               style="max-width:100%;"
        ></v-img>
      </a>
    </div>
</template>

<script>
import { formatProps } from 'common/utils'
import vImg from 'component/common/img'
    export default {
        components:{
            vImg
        } ,
         props:{
            //以下两个props必须有
            props:Object,
            index:Number,
           length: Number,
           showBtn: Boolean
         },
        computed:{
            imgUrl(){
                const defaultImg = 'https://pic.8pig.com/img/pc/new/index/banner/20170209guides.jpg'
                return this.props.imgUrl?this.props.imgUrl : defaultImg
            },
            width(){
                return formatProps(this.props.width,'auto')
            },
            height(){
                return formatProps(this.props.height,'auto')
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
          }
        },
    }
</script>
