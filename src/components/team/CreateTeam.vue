<script setup lang="ts">
import { NCard, NForm, NFormItem, NInput, NButton, NSelect } from 'naive-ui';
import { SelectMixedOption } from 'naive-ui/lib/select/src/interface';
import { ref, watch } from 'vue'

let campus = ref(null)
let route = ref(null)
let routeOptions = ref<SelectMixedOption[]>()
const campusOptions = [
    {
        label: '朝晖校区',
        value: 'zhaohui'
    },
    {
        label: '屏峰校区',
        value: 'pingfeng'
    },
    {
        label: '莫干山校区',
        value: 'moganshan'
    }
]

function updateRouteOptions() {
    if (campus.value === "zhaohui") {
        routeOptions.value = [{
            label: '朝晖全程',
            value: 1
        }]
    } else if (campus.value === "pingfeng") {
        routeOptions.value = [{
            label: '屏峰半程',
            value: 2
        }, {
            label: '屏峰全程',
            value: 3
        }]
    } else if (campus.value === "moganshan") {
        routeOptions.value = [{
            label: '莫干山半程',
            value: 4
        }, {
            label: '莫干山全程',
            value: 5
        }]
    }
    route.value = null  // 初始化路线选项数据
}

function createTeam() {
    
}
</script>

<template>
    <n-card title="📖 &nbsp 创建团队" embedded :bordered="false">
        <div style="margin-top: 15px;">
            <n-form label-placement="top" ref="formRef">
                <n-form-item label="团队名称" path="user.name">
                    <n-input placeholder="输入名称"></n-input>
                </n-form-item>
                <n-form-item label="团队校区" path="user.age">
                    <n-select :on-update="updateRouteOptions()" v-model:value="campus" placeholder="选择校区" :options="campusOptions"></n-select>
                </n-form-item>
                <n-form-item label="路线选择" path="user.age">
                    <n-select v-model:value="route" placeholder="选择路线" :options="routeOptions"></n-select>
                </n-form-item>
                <n-form-item>
                    <n-button
                        @click="createTeam"
                        style="width: 100%;"
                        type="primary"
                        attr-type="button"
                    >创建</n-button>
                </n-form-item>
            </n-form>
        </div>
    </n-card>
</template>

<style>
</style>