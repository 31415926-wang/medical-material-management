<template>
    <CrudTable ref="CrudTableRef" @openBefore="handleopenBefore" :operateColWidth="260" :needOperate="true"
        :addCheckForm="addCheckForm" :editorCheckForm="editorCheckForm" :dialogWidths="{
            add: '34%',
            editor: '34%',
            detail: '34%'
        }">

        <!-- 自定义添加查询内容 -->
        <template #search-custom="{ scope }">
            <br>
            <el-form-item label="部门">
                <el-select v-model="scope.searchParam.departmentId" clearable placeholder="请选择部门">
                    <el-option v-for="item in departmentList" :key="Number(item.id)" :label="item.name"
                        :value="Number(item.id)">
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right;"><el-text type="primary">{{ item.total }}人</el-text></span>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="性别">
                <el-radio-group v-model="scope.searchParam.sex">
                    <el-radio :label="1" size="large" style="padding-bottom: 3px;">男</el-radio>
                    <el-radio :label="0" size="large" style="padding-bottom: 3px;">女</el-radio>
                    <el-radio :label="undefined" size="large" style="padding-bottom: 3px;">全部</el-radio>
                </el-radio-group>
            </el-form-item>
        </template>


        <!-- 自定义列 -->
        <template v-slot:sexCol="{ scope }">
            <el-tag :type="scope.row.sex === 0 ? 'danger' : ''">{{ GetLabel(scope.row.sex, SEX_OPTIONS) }}</el-tag>
        </template>
        <template v-slot:emailCol="{ scope }">
            <el-text type="warning">{{ scope.row.email }}</el-text>
        </template>
        <template v-slot:statusCol="{ scope }">
            <el-switch v-model="scope.row.status" :loading="scope.row.loadingStatus"
                :before-change="() => { return beforeChangeStatus(scope.row) }" />
        </template>

        <!--自定义行拓展功能 -->
        <template #operateExpand="{ rowInfo }">
            <el-tooltip content="分配角色" placement="top" effect="dark">
                <el-button icon="Setting" type="success" @click="openSetDialog(rowInfo)"></el-button>
            </el-tooltip>
        </template>


        <!-- 新增弹框 ：后台对邮箱、手机号、日期格式都做了限制-->
        <template v-slot:addForm="{ formInfo }">
            <el-form ref="addCheckForm" :model="formInfo" label-width="80px" :rules="rules">

                <el-row>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="formInfo.username" placeholder="请输入用户名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="部门" prop="departmentId">
                            <el-select v-model="formInfo.departmentId" clearable placeholder="请选择部门">
                                <el-option v-for="item in departmentList" :key="Number(item.id)" :label="item.name"
                                    :value="Number(item.id)">
                                    <span style="float: left">{{ item.name }}</span>
                                    <span style="float: right;"><el-text type="primary">{{ item.total }}人</el-text></span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="formInfo.nickname" placeholder="请输入昵称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="formInfo.sex">
                                <el-radio :label="1" size="large" style="padding-bottom: 3px;">男</el-radio>
                                <el-radio :label="0" size="large" style="padding-bottom: 3px;">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="手机号码" prop="phoneNumber">
                            <el-input v-model="formInfo.phoneNumber" placeholder="请输入手机号码" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="formInfo.email" placeholder="请输入邮箱" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="formInfo.password" type="password" show-password placeholder="请输入密码" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="生日" prop="birth">
                            <el-date-picker v-model="formInfo.birth" type="date" placeholder="请选择日期" size="default"
                                value-format="YYYY年MM月DD日" />
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </template>




        <!-- 编辑框 -->
        <template v-slot:editorForm="{ formInfo }">
            <el-form ref="editorCheckForm" :model="formInfo" label-width="80px" :rules="rules">

                <el-row>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="用户名" prop="username">
                            <el-input disabled v-model="formInfo.username" placeholder="请输入用户名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="部门" prop="departmentId">
                            <el-select v-model="formInfo.departmentId" clearable placeholder="请选择部门">
                                <el-option v-for="item in departmentList" :key="Number(item.id)" :label="item.name"
                                    :value="Number(item.id)">
                                    <span style="float: left">{{ item.name }}</span>
                                    <span style="float: right;"><el-tag effect="plain">{{ item.total }}人</el-tag></span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="formInfo.nickname" placeholder="请输入昵称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="formInfo.sex">
                                <el-radio :label="1" size="large" style="padding-bottom: 3px;">男</el-radio>
                                <el-radio :label="0" size="large" style="padding-bottom: 3px;">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="手机号码" prop="phoneNumber">
                            <el-input v-model="formInfo.phoneNumber" placeholder="请输入手机号码" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="formInfo.email" placeholder="请输入邮箱" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" :lg="12">
                        <el-form-item label="生日" prop="birth">
                            <el-date-picker v-model="formInfo.birth" type="date" placeholder="请选择日期" size="default"
                                value-format="YYYY年MM月DD日" />
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </template>
    </CrudTable>


    <!-- 分配角色弹框-->
    <el-dialog v-model="dialogSetShow" title="分配角色" :before-close="handleSetCloseBefore">
        <div class="custom-scrollbar dialog-container">
            <el-transfer
                v-model="transferSelected"
                :data="optionList"
                filterable
                filter-placeholder="请输入搜索内容"
                :titles="['可分配角色列表', '已选中的角色列表']"
                :button-texts="['移除角色', '添加角色']"
             />
        </div>
        <template #footer>
            <el-button icon="CloseBold" @click="handleSetCloseBefore">
                取消分配
            </el-button>
            <el-button type="primary" icon="Setting" :loading="loadingSetStatus" @click="handleSetSumit">确定分配</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import initCrud from '@/hook/crud/initCrud'
import userApiMethod from '@/api/authority/userManage/index';
import departApiMethod from '@/api/authority/department/index';
import { tableCol } from "@/types/common/Crud/index"
import { depListItem } from '@/types/api/authority/department'
import { SEX_OPTIONS, GetLabel } from "@/bus/shareData"
import Tip from '@/utils/element/elMessageTip'
import { userListItem, role } from "@/types/api/authority/userManage"
import { rulesValidatePhone, rulesValidateEmail } from '@/utils/validate'
import LoadingTool from "@/utils/element/elLoading"




let addCheckForm = ref();
let editorCheckForm = ref();

let CrudTableRef = ref();
let tableCols = reactive([
    {
        prop: 'username',
        label: '用户名',
        width: 2,
        searchType: 'input'
    },
    {
        prop: 'nickname',
        label: '昵称',
        width: 2,
        searchType: 'input'
    },
    {
        prop: 'sex',
        label: '性别',
        width: 1,
        rebuild: true
    },
    {
        prop: 'departmentName',
        label: '所属部门',
        width: 2,
    },
    {
        prop: 'birth',
        label: '生日',
        width: 2,
        sortable: true
    },
    {
        prop: 'email',
        label: '邮箱',
        width: 2,
        searchType: 'input',
        rebuild: true
    },
    {
        prop: 'phoneNumber',
        label: '电话',
        width: 2,
    },
    {
        prop: 'status',
        label: '是否禁用',
        width: 1,
        rebuild: true
    }
] as tableCol[]);

//获得表格数据后再进行处理
const getDataAfter = (tableDate: any) => {
    //追加属性
    tableDate.rows.forEach((item: userListItem) => {
        item.loadingStatus = false
    })

}

initCrud(CrudTableRef, {
    title: '用户',
    apiMethod: userApiMethod
},
    tableCols, getDataAfter
);


//@ts-ignore
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    departmentId: [
        { required: true, message: '请选中所在部门', trigger: 'change' }
    ],
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
    ],
    sex: [
        { required: true, message: '请选择性别', trigger: 'change' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { validator: rulesValidateEmail, trigger: 'blur' }
    ],
    phoneNumber: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { validator: rulesValidatePhone, trigger: 'blur' }
    ],
    birth: [
        { required: true, message: '请选择出生日期', trigger: 'blur' },
    ]

})

//部门下拉框
let departmentList = ref([] as depListItem[]);

const beforeChangeStatus = (row: userListItem) => {
    // console.log("1状态", row);  //能拿到的是改变前的状态

    row.loadingStatus = true;
    return new Promise((resolve, reject) => {

        userApiMethod.isBan(row.id, !row.status).then(() => {
            row.loadingStatus = false;
            resolve(true)
            Tip('success', '修改状态成功');

        }).catch(() => {
            row.loadingStatus = false;
            reject(true)
        })
    })
}

//弹框打开时增加的回调
const handleopenBefore = () => {
    //请求部门下拉框
    departApiMethod.getListAll().then((result) => {
        departmentList.value = result.data;
        // console.log("获取列表",departmentList.value);
    }).catch(() => {
        Tip('error', '获取部门下拉列表失败')
    })

}

//分配角色弹框
let dialogSetShow = ref(false);
let loadingSetStatus = ref(false);
let setId=ref<number>();//存储选中行的id
const transferSelected = ref<number[]>([]); // 已选中的角色
const optionList = ref<role[]>([]); // 可选的角色


const openSetDialog = (row: userListItem) => {
    dialogSetShow.value = true;
    setId.value=row.id; 
    LoadingTool.openLoading(document.querySelector('.dialog-container') as HTMLElement);
    //获取该用户分配的数据情况
    userApiMethod.getUserRolesCase(setId.value).then((result) => {
        console.log("获取分配信息情况", result.data);
        transferSelected.value = result.data.values;
        optionList.value = result.data.roles;
        LoadingTool.closeLoading();
    }).catch(() => {
        LoadingTool.closeLoading();
        Tip('success', '获取分配角色列表失败');
     })
}

const handleSetCloseBefore = () => {
    dialogSetShow.value = false;
    transferSelected.value = <number[]>[];
    optionList.value = <role[]>[];
}

const handleSetSumit = async () => {
    loadingSetStatus.value = true
    userApiMethod.assignRoles(<number>setId.value, transferSelected.value).then(() => {
        loadingSetStatus.value = false
        handleSetCloseBefore();
        Tip('success', '分配角色成功');
    }).catch(() => {
        loadingSetStatus.value = false
    })

}


onMounted(() => {
    // 查询需要下拉框
    handleopenBefore();
})

</script>

<style scoped lang='scss'></style>