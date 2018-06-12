<template>
    <div :style="{display:props.display,textAlign:props.textAlign}">
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
            props:Object,
        },
        computed:{
            imgUrl(){
                const defaultImg = 'https://pic.8pig.com/comment_img/u_88/11588/7f44be7f6a2363d0688002af8e311e92.jpeg'
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
        }
    }
</script>