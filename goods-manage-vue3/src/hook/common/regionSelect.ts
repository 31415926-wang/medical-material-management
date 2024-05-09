
import { ref, onMounted, computed, watch, Ref } from 'vue';
import { getCityList } from "@/api/goods/destination";
import { cityItem } from "@/types/api/goods/source";
import destinationApiMethod from "@/api/goods/destination";

export default function useRegionSelect(fromObj: Ref, provinceKey: string, cityKey: string, districtKey: string) { //实际表单的key



    //地区选项
    const optionList = ref([] as cityItem[]);
    const options1 = computed(() => {
        return optionList.value.filter((item) => !item.parent)
    });
    const options2 = computed(() => {
        return optionList.value.filter((item) => fromObj.value[provinceKey] == item.parent)
    });
    const options3 = computed(() => {
        return optionList.value.filter((item) => fromObj.value[cityKey] == item.parent)
    });


    watch(() => fromObj.value[provinceKey], (newValue, oldValue) => {
        console.log("选省变化");
        fromObj.value[cityKey] = '';
        fromObj.value[districtKey] = '';
    })
    watch(() => fromObj.value[cityKey], (newValue, oldValue) => {
        console.log("选市区变化");
        fromObj.value[districtKey] = '';
    })

    const reqSpareOption = async () => {
        let result = await destinationApiMethod.getCityList();
        optionList.value = result.data;
        // console.log("城市列表", result.data);
    }

    //输入编号获取地区名称
    const getName=(id:string)=>{
         let goal=optionList.value.find((item:cityItem)=>item.value==id) ;
         return goal?.name;
    }

    return {
        options1,
        options2,
        options3,
        reqSpareOption,
        getName
    }
}