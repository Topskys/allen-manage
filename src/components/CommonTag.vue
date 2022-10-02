<!--
 * @Author: Topskys
 * @Date: 2022-09-28 15:52:00
 * @LastEditTime: 2022-09-28 16:22:27
-->
<template>
    <div class="tag">
        <el-tag v-for="(tag,index) in tags" :key="tag.name" :closable="tag.name!=='home'"
            :effect="tag.name===$route.name?'dark':'plain'" @click="changeMenu(tag)" @close="handleClose(tag,index)"
            size="small">
            {{ tag.name}}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
export default {
    name: "CommonTag",
    data() {
        return {}
    },
    computed: {
        ...mapState({
            tags: state => state.m_tab.tabList
        })
    },
    methods: {
        ...mapMutations({
            close: 'closeTag'
        }),
        changeMenu(tag) {
            this.$router.push({ name: tag.name })
        },
        handleClose(tag, index) {
            const length = this.tags.length - 1
            this.close(tag)
            if (tag.name !== this.$route.name) {
                return
            }
            if (index === length) {
                // 焦点在最右侧，向左跳
                this.$router.push({ name: this.tags[index - 1].name })
            } else {
                // 焦点在中间，向右跳
                this.$router.push({ name: this.tags[index + 1].name })
            }
        },
    }

}
</script>

<style lang="less" scoped="true">
.tag {
    padding: 5px 20px;
    // background-color: #eee;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>