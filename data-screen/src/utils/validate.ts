
export function isValidPhone(phone: string | number) {
    let phoneValue = parseInt(String(phone));
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(String(phoneValue));
}

export function isValidEmail(email: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}


//直接供表单使用
export const rulesValidatePhone = (rule: any, value: any, callback: any) => {
    if (!isValidPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
    } else {
        callback()
    }
}
export const rulesValidateEmail = (rule: any, value: any, callback: any) => {
    if (!isValidEmail(value)) {
        callback(new Error('请输入正确的邮箱格式'))
    } else {
        callback()
    }
}

