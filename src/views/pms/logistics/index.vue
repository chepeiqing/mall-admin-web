<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddLogistics()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="brandTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <!--<el-table-column type="selection" width="60" align="center"></el-table-column>-->
        <el-table-column label="模板名称" width="150" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="计价方式" align="center">
          <template slot-scope="scope">{{postTypeFmt(scope.row)}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
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
  import { getExpenseList,deleteExpense } from '@/api/logistics'
  import {formatDate} from '@/utils/date';
  export default {
    name: "LogisticsList",
    data() {
      return {
        list: [],
        total: 0,
        listLoading: true,
        multipleSelection: [],
        listQuery: {
          pageSize: 10,
          pageNum: 1
        }
      }
    },
    created() {
      this.getExpenseList()
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      getExpenseList() {
        getExpenseList(this.listQuery).then(resp => {
          this.listLoading = false
          this.total = resp.data.total
          this.list = resp.data.list
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      postTypeFmt: function (row, column) {
        switch (row.postType) {
          case 0:
            return '包邮'
          case 1:
            return '按订单计价'
          case 2:
            return '按重量计价'
          case 3:
            return '按件数计价'
          case 4:
            return '按体积计价'
          case 5:
            return '满多少包邮'
          default:
            return '包邮'
        }
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该物流模板', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteExpense(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getExpenseList();
          });
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getExpenseList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getExpenseList();
      },
      handleAddLogistics() {
        this.$router.push({path: '/pms/addLogistics'})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/pms/updateLogistics', query: {id: row.id}})
      }
    }
  }
</script>

<style scoped>

</style>
