import isHasAuth from "./isHasAuth";

//全局自定义指令
export default (app: any) => {

    app.directive('auth', {
        mounted(el: HTMLElement, binding: any) {
            
            let hasAuth=isHasAuth(binding.value);
            

            if (!hasAuth) {
                el.parentNode?.removeChild(el);
            }
            // console.log("指令-mounted", el, binding.value);
        }
    })

}

