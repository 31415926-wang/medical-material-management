
import { ElMessageBox } from 'element-plus'

export default function Confirm(title: string, successFn: Function,
    errorFn?: Function) {

    //二次封装确认弹出框
    ElMessageBox.confirm(
        `确定要永久${title}所选项吗?`,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            successFn();
        })
        .catch(() => {
            errorFn!();
        })
}

