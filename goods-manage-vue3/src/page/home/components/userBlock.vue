<template>
    <div class="userBlock">
        <el-avatar shape="square" :size="85" :src="UserStore.userInfo.avatar" />

        <el-table :data="[UserStore?.userInfo]"
        :cell-style="{'height':'55px'}" >
            <el-table-column prop="username" label="账号" width="110" />
            <el-table-column prop="nickname" label="昵称" width="110" />
            <el-table-column prop="department" label="所属部门" width="110" />
            <el-table-column  label="角色" width="110">
                <template #default="scope">
                    {{scope.row.isAdmin?"超级管理员":(scope.row.roles?.join('、'))}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang='ts'>
import useUserStore from "@/store/modules/user";

let UserStore = useUserStore();


</script>


<style scoped lang='scss'>
.userBlock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 35px 0 20px;
}

.el-table{
    width:auto;

  ::v-deep .el-table__header th{
        background-color: transparent !important;
    }
}
</style>
