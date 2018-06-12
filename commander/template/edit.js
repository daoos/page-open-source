const tempStr = `<template>
    <div>
        <!-- slot nam=common 公用组件，必须有 -->
        <slot name="common"></slot>
        <p class="admin-default-edit-name"><b>组件配置（当前组件：default）</b></p>
        <slot name="component"></slot>
        <el-input v-model="props.msg" size="small" placeholder="请输入内容">
            <template slot="prepend">msg</template>
        </el-input>
    </div>
</template>

<script>
    export default {
        props: {
            props: Object
        },
    }
</script>
`
module.exports = tempStr
