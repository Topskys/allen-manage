<!--
 * @Author: Topskys
 * @Date: 2022-09-27 16:30:27
 * @LastEditTime: 2022-10-02 10:18:48
-->
<template>
    <div class="User">
        <el-dialog :title="operateType==='add'?'新增用户':'更新用户'" :visible.sync="isShow">
            <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow=false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <div class="User-header">
            <div>
                <el-button type="primary" @click="addUser">+ 新增</el-button>
            </div>
            <common-form :formLabel="formLabel" :form="searchForm" :inline="true" ref="form">
                <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </common-form>
        </div>
        <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()"
            @edit="editUser" @del="deleteUser"></common-table>
    </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue';
import CommonTable from '../../components/CommonTable.vue';
import { getUser } from '../../api/data'
export default {
    name: 'User',
    components: {
        CommonForm,
        CommonTable,
    },
    data() {
        return {
            operateType: 'add',
            isShow: false,
            operateFormLabel: [
                {
                    model: 'name', label: '姓名', type: "input"
                },
                {
                    model: 'age', label: "年龄", type: "input"
                },
                {
                    model: 'sex',
                    label: "性别",
                    type: 'select',
                    opts: [
                        {
                            label: '男', value: 1
                        },
                        {
                            label: '女', value: 0
                        }
                    ]
                },
                {
                    model: "birth", label: "出生日期", type: 'date'
                },
                {

                    model: "addr", label: "地址", type: 'input'
                }
            ],
            operateForm: {
                name: "",
                addr: '',
                age: '',
                birth: '',
                sex: ''
            },
            formLabel: [
                {
                    model: "keyword",
                    label: "",
                    type: 'input'
                },
            ],
            searchForm: {
                keyword: "",
            },
            tableData: [],
            tableLabel: [
                {
                    prop: "name", label: "姓名"
                },
                {
                    prop: "age", label: "年龄", width: 180
                }, {
                    prop: "sex", label: "性别", width: 180
                }, {
                    prop: "birth", label: "出生日期"
                }, {
                    prop: "addr", label: "地址"
                },
            ],
            config: {
                page: 1,
                total: 200,
                limit: 10,
            }

        }
    },
    methods: {
        confirm() {
            if (this.operateType === 'edit') {
                this.$http.post(`/user/edit`, this.operateForm).then(() => {
                    this.isShow = false
                    this.getList()
                })
            } else {
                this.$http.post(`/user/add`, this.operateForm).then(() => {
                    this.isShow = false
                    this.getList()
                })
            }
        },
        addUser() {
            this.isShow = true;
            this.operateType = 'add'
            this.operateForm = {
                name: "",
                addr: '',
                age: '',
                birth: '',
                sex: ''
            }
        },
        getList(name = '') {
            this.config.loading = true
            name ? (this.config.page = 1) : ''
            getUser({
                page: this.config.page,
                name,
                limit: this.config.limit
            }).then(({ data }) => {
                const { list, count } = data
                this.tableData = list.map(item => {
                    item.sex = item.sex === 0 ? "女" : "男"
                    return item
                })
                this.config.total = count
                this.config.loading = false
            })
        },
        editUser(row) {
            this.operateType = 'edit'
            this.isShow = true
            this.operateForm = row
        },
        deleteUser(row, index) {
            this.$confirm(`确定永久删除第${index + 1}项数据？`, "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                const id = row.id
                this.$http.get("/user/del", {
                    params: { id }
                }).then(({ data }) => {
                    this.$message({
                        type: "success",
                        message: data.msg
                    })
                    this.getList()
                })
            })
        }
    },
    created() {
        this.getList()
    }

}
</script>

<style lang="less" scoped="true">
.User-header {
    display: flex;
    justify-content: space-between;
    // align-items: center;
}
</style>