<template>
    <div :style="{display:props.pcDisplay}">
            <v-img v-if="!props.pcIsLink" :data-list="[imgUrl]"
            :style="{
            width:props.pcWidth,
            height:props.pcHeight,
            marginTop:pcMarginTop,
            marginBottom:pcMarginBottom,
            marginLeft:pcMarginLeft,
            marginRight:pcMarginRight,
            paddingTop:pcPaddingTop,
            paddingBottom:pcPaddingBottom,
            paddingLeft:pcPaddingLeft,
            paddingRight:pcPaddingRight,
            backgroundColor:props.pcBgColor,
            borderWidth:props.pcBorderWidth,
            borderStyle:props.pcBorderStyle,
            borderColor:props.pcBorderColor,
            }"
            style="max-width:100%;"
            ></v-img>
          <a  v-else :href="props.pcUrl" target="_blank">
              <v-img :data-list="[imgUrl]"
            :style="{
            width:props.pcWidth,
            height:props.pcHeight,
            marginTop:pcMarginTop,
            marginBottom:pcMarginBottom,
            marginLeft:pcMarginLeft,
            marginRight:pcMarginRight,
            paddingTop:pcPaddingTop,
            paddingBottom:pcPaddingBottom,
            paddingLeft:pcPaddingLeft,
            paddingRight:pcPaddingRight,
            backgroundColor:props.pcBgColor,
            borderWidth:props.pcBorderWidth,
            borderStyle:props.pcBorderStyle,
            borderColor:props.pcBorderColor,
            }"
            style="max-width:100%;"
            ></v-img>
              </a>   
    </div>
</template>

<script>
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
                return this.props.pcImgUrl?this.props.pcImgUrl : (this.props.imgUrl? this.props.imgUrl:defaultImg)
            },
            pcMarginTop () {
                return this.props.pcMarginTop ? this.props.pcMarginTop : 'auto'
            },
            pcMarginBottom () {
                return this.props.pcMarginBottom ? this.props.pcMarginBottom : 'auto'
            },
            pcMarginLeft () {
                return this.props.pcMarginLeft ? this.props.pcMarginLeft : 'auto'
            },
            pcMarginRight () {
                return this.props.pcMarginRight ? this.props.pcMarginRight : 'auto'
            },
            pcPaddingTop () {
                return this.props.pcPaddingTop ? this.props.pcPaddingTop : 'auto'
            },
            pcPaddingBottom () {
                return this.props.pcPaddingBottom ? this.props.pcPaddingBottom : 'auto'
            },
            pcPaddingLeft () {
                return this.props.pcPaddingLeft ? this.props.pcPaddingLeft : 'auto'
            },
            pcPaddingRight () {
                return this.props.pcPaddingRight ? this.props.pcPaddingRight : 'auto'
            }
        }
    }
</script>