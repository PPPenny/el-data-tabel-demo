<template>
  <div class="index">
    <el-data-table ref="dataTable" v-bind="tableConfig"> </el-data-table>
  </div>
</template>

<script>
import Vue from 'vue'
import ElDataTable from 'el-data-table'
Vue.component('el-data-table', ElDataTable)
import format from '@/const/filter'
import {Lang, Type, Status} from './typeConfig'
export default {
  layout: 'list',
  name: 'list',
  data() {
    return {
      tableConfig: {
        url: '/api/getList',
        hasEdit: false,
        operationAttrs: {
          width: '210px'
        },
        searchForm: [
          {
            $el: {placeholder: '请输入'},
            label: '组件名称',
            $id: 'title',
            $type: 'input'
          },
          {
            $el: {placeholder: '请选择'},
            label: '分类',
            $id: 'type',
            $type: 'select',
            $options: Type.map(f => ({label: f.name, value: f.id}))
          },
          {
            $el: {placeholder: '请选择'},
            label: '状态',
            $id: 'status',
            $type: 'select',
            $options: Status.map(f => ({label: f.name, value: f.id}))
          }
        ],
        form: [
          {
            $type: 'input',
            $id: 'name',
            label: '组件名称',
            rules: [
              {
                required: true,
                message: '请输入组件名称',
                trigger: 'blur',
                transform: v => v && v.trim()
              }
            ],
            $el: {placeholder: '请输入'}
          },
          {
            $type: 'select',
            $id: 'type',
            label: '选择分类',
            rules: [{required: true, message: '请选择分类', trigger: 'blur'}],
            $options: Type.map(f => ({label: f.name, value: f.id})),
            $el: {
              placeholder: '请选择'
            }
          },
          {
            $type: 'select',
            $id: 'lang',
            label: '选择语言',
            rules: [{required: true, message: '请选择分类', trigger: 'blur'}],
            $options: Lang.map(f => ({label: f.name, value: f.id})),
            $el: {
              placeholder: '请选择'
            }
          }
        ],
        columns: [
          {type: 'selection', selectable: (row, index) => index > -1},
          {prop: 'name', label: '组件名称'},
          {
            prop: 'type',
            label: '分类',
            formatter: row => Type.find(it => row.type === it.id).name
          },
          {prop: 'ver', label: '版本'},
          {
            prop: 'lang',
            label: '开发语言',
            formatter: row => Lang.find(it => row.lang === it.id).name
          },
          {
            prop: 'up_time',
            label: '最后更新时间',
            minWidth: '110px',
            formatter: row => format(row.up_time, 'YYYY-MM-DD')
          },
          {
            prop: 'status',
            label: '状态',
            formatter: row =>
              row.status === 1 ? (
                <span style={{color: '#67C23A'}}>上架</span>
              ) : (
                <span style={{color: '#909399'}}>下架</span>
              )
          }
        ],
        extraButtons: [
          {
            type: 'primary',
            size: 'small',
            text: '查看',
            atClick: row => {
              return Promise.reject(this.$refs.dataTable.onDefaultView(row))
            }
          },
          {
            text: '编辑',
            size: 'small',
            atClick: row => {
              return Promise.reject(this.$refs.dataTable.onDefaultEdit(row))
            }
          },
          {
            text: '上架',
            size: 'small',
            atClick: row => {
              return Promise.reject(alert('修改' + row.name))
            }
          }
        ]
      }
    }
  },

  methods: {}
}
</script>

<style lang="less">
.index {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
