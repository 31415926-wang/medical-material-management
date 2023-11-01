import { ElLoading } from 'element-plus';
//用于区域性的加载，可定制改变，不影响单个按钮的样式
let loading: { close: () => void; };
function openLoading(target:HTMLElement) {
    loading = ElLoading.service({
        target,
        text: '加载中…',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)',
        customClass:'customLoading',
        lock:true,
})
    
}
function closeLoading() {
    loading.close();
    
}
export default {
    openLoading,
    closeLoading
}





