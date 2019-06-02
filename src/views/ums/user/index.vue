<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="用户昵称：">
            <el-input style="width: 203px" v-model="listQuery.nickname" placeholder="用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input style="width: 203px" v-model="listQuery.phone" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item label="会员等级：">
            <el-select v-model="listQuery.memberLevelId" placeholder="全部" clearable>
              <el-option
                v-for="item in levelList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable>
              <el-option
                v-for="item in userStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间：">
            <el-date-picker
              v-model="dateTime"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="brandTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="头像" width="150" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="width: 35px; height: 35px; border-radius: 50%"/>
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="150" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="会员等级" align="center">
          <template slot-scope="scope">{{ scope.row.levelName }}</template>
        </el-table-column>
        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="职业" align="center">
          <template slot-scope="scope">{{ scope.row.job }}</template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { getMemberList } from '@/api/member'
  import {formatDate} from '@/utils/date';
  import { fetchList as getMemberLevelList } from '@/api/memberLevel'
  export default {
    name: "userInfoList",
    data() {
      return {
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          pageSize: 10,
          pageNum: 1
        },
        levelList: [],
        userStatusOptions: [{
          value: 1,
          label: '启用'
        }, {
          value: 0,
          label: '禁用'
        }],
        dateTime: ''
      }
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatus(status) {
        return status === 0 ? '禁用' : '启用'
      }
    },
    created() {
      this.getMemberLevelList()
      this.getMemberList()
    },
    methods: {
      getMemberList() {
        getMemberList(this.listQuery).then(resp => {
          this.listLoading = false
          this.total = resp.data.total
          this.list = resp.data.list
        })
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        if (this.dateTime) {
          this.listQuery.beginTime = this.dateTime[0]
          this.listQuery.endTime = this.dateTime[1]
        }
        this.getMemberList();
      },
      handleResetSearch() {
        this.dateTime = ''
        this.listQuery = {
          pageSize: 10,
          pageNum: 1
        };
      },
      getMemberLevelList() {
        getMemberLevelList({defaultStatus: 0}).then(resp => {
          this.levelList = resp.data
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getMemberList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getMemberList();
      },
    }
  }
</script>

<style scoped>

</style>
