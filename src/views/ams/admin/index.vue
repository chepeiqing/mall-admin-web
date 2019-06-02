<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="getAdminList()"
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
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addAdmin()"
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
        <el-table-column label="头像" width="150" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.icon.indexOf('http') >= 0 ? scope.row.icon : ($store.getters.domain + scope.row.icon)" style="width: 35px; height: 35px; border-radius: 50%"/>
          </template>
        </el-table-column>
        <el-table-column label="登录名" width="150" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">{{ scope.row.nickName }}</template>
        </el-table-column>
        <el-table-column label="最近登录时间" align="center">
          <template slot-scope="scope">{{scope.row.loginTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑用户信息
            </el-button>
            <el-button
              size="mini"
              @click="handleAssignRole(scope.$index, scope.row)">分配角色
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
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="100px">
        <el-form-item label="分配角色：" prop="name">
          <el-select v-model="formData.roleIds" collapse-tags multiple :multiple-limit="roleList.length" placeholder="请选择角色" style="width: 260px" @change="onRoleSelectChange">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getAdminList,getAdminRole,updateAdminRole } from '@/api/admin'
  import { getRoleList } from '@/api/role'
  import {formatDate} from '@/utils/date';
  export default {
    name: "adminList",
    data() {
      return {
        list: [],
        roleList: [],
        total: 0,
        listLoading: true,
        listQuery: {
          pageSize: 10,
          pageNum: 1
        },
        userStatusOptions: [{
          value: 1,
          label: '启用'
        }, {
          value: 0,
          label: '禁用'
        }],
        dialogVisible: false,
        formData: {
          roleIds: ''
        },
        rules: {}
      }
    },
    created() {
      this.getAdminList()
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
    methods: {
      getAdminList() {
        getAdminList(this.listQuery).then(resp => {
          this.listLoading = false
          this.total = resp.data.total
          this.list = resp.data.list
        })
      },
      getRoleList() {
        getRoleList().then(resp => {
          this.roleList = resp.data
        })
      },
      onRoleSelectChange(value) {
      },
      handleResetSearch() {
        this.listQuery = {
          pageSize: 10,
          pageNum: 1
        };
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getAdminList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getAdminList();
      },
      addAdmin() {
        // this.$router.push({name: 'addAdmin'});
        this.$router.push({path: '/ams/admin/addAdmin'});
      },
      handleUpdate(index, row) {
        this.$router.push({name: 'updateAdmin', params: {id: row.id}});
      },
      handleAssignRole(index, row) {
        this.resetForm('formData')
        this.getRoleList()
        getAdminRole(row.id).then(resp => {
          if (resp.data) {
            var ids = []
            resp.data.forEach((item) => {
              ids.push(item.id)
            })
            this.formData.roleIds = ids
          }
          this.formData.adminId = row.id
          this.dialogVisible = true
        })
      },
      confirm() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let params = new URLSearchParams();
              params.append('adminId', this.formData.adminId);
              params.append('roleIds', this.formData.roleIds);
              updateAdminRole(params).then(resp => {
                this.$message({
                  message: '分配成功',
                  type: 'success',
                  duration:1000
                });
                this.dialogVisible = false
                this.listQuery.pageNum = 1;
                this.getAdminList()
              })
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        if (this.$refs[formName]) {
          this.$refs[formName].resetFields();
          this.formData = {roleIds: ''}
        }
      }
    }
  }
</script>

<style scoped>

</style>
