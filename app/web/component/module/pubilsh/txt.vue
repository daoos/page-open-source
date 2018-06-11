<template>
    <div :style="{display:props.display}">
        <!-- 发布代码的完整代码 -->
        <pre v-if="!props.isLink" :style="{fontSize:props.fontSize,
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
        
       <a  v-else :href="props.url" >
            <pre :style="{fontSize:props.fontSize,
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
</template>

<script>
import { formatProps } from 'common/utils'
export default {
    props: {
        props: Object
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
    }
}
</script>
