<template>
    <div :style="{display:props.display}">
        <!-- 发布代码的完整代码 -->
        <pre v-if="!props.isLink" :style="{fontSize:props.fontSize,
        whiteSpace: 'pre-wrap',
        color:props.color,
        fontWeight:props.fontWeight,
        width:props.width,
        height:props.height,
        lineHeight:props.lineHeight,
        textAlign:props.textAlign,
        display:props.display,
        marginTop:props.marginTop,
        marginLeft:props.marginLeft,
        marginRight:props.marginRight,
        marginBottom:props.marginBottom,
        paddingTop:props.paddingTop,
        paddingBottom:props.paddingBottom,
        paddingLeft:props.paddingLeft,
        paddingRight:props.paddingRight,
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
        width:props.width,
        height:props.height,
        lineHeight:props.lineHeight,
        textAlign:props.textAlign,
        display:props.display,
        marginTop:props.marginTop,
        marginLeft:props.marginLeft,
        marginRight:props.marginRight,
        marginBottom:props.marginBottom,
        paddingTop:props.paddingTop,
        paddingBottom:props.paddingBottom,
        paddingLeft:props.paddingLeft,
        paddingRight:props.paddingRight,
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
    }
}
</script>
