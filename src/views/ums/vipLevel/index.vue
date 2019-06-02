<template>
  <div class="app-container">
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
        <el-table-column label="会员等级" width="150" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="免运费标准" align="center">
          <template slot-scope="scope">{{ scope.row.freeFreightPoint }}</template>
        </el-table-column>
        <el-table-column label="等级值" align="center">
          <template slot-scope="scope">{{ scope.row.growthPoint }}</template>
        </el-table-column>
        <el-table-column label="成长值" align="center">
          <template slot-scope="scope">{{ scope.row.commentGrowthPoint }}</template>
        </el-table-column>
        <el-table-column label="生日特权" align="center">
          <template slot-scope="scope">{{ scope.row.priviledgeBirthday | formatStatus }}</template>
        </el-table-column>
        <el-table-column label="评论获奖励特权" align="center">
          <template slot-scope="scope">{{ scope.row.priviledgeComment  | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="免邮特权" align="center">
          <template slot-scope="scope">{{scope.row.priviledgeFreeFreight | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="会员价格特权" align="center">
          <template slot-scope="scope">{{scope.row.priviledgeMemberPrice | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="专享活动特权" align="center">
          <template slot-scope="scope">{{scope.row.priviledgePromotion | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="签到特权" align="center">
          <template slot-scope="scope">{{scope.row.priviledgeSignIn | formatStatus}}</template>
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
  </div>
</template>

<script>
  import { fetchList as getMemberList } from '@/api/memberLevel'
  export default {
    name: "vipLevel",
    data() {
      return {
        list: [],
        total: 0,
        listLoading: true
      }
    },
    filters: {
      formatStatus(status) {
        return status === 0 ? '无' : '有'
      }
    },
    created() {
      this.getMemberList()
    },
    methods: {
      getMemberList() {
        getMemberList({defaultStatus: 0}).then(resp => {
          this.listLoading = false
          this.list = resp.data
        })
      },
    }
  }
</script>

<style scoped>

</style>
