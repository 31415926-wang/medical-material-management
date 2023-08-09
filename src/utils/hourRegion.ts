export let getTimeState = () => {
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 设置默认文字
    let text = ``;
    // 判断当前时间段
    if (hours >= 0 && hours <= 10) {
        text = `早上`;
    } else if (hours > 10 && hours <= 14) {
        text = `中午`;
    } else if (hours > 14 && hours <= 18) {
        text = `下午`;
    } else if (hours > 18 && hours <= 24) {
        text = `晚上`;
    }
    // 返回当前时间段对应的状态
    return text;
};
