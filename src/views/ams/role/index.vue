<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addRole()"
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
        <el-table-column label="角色名" width="150" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="角色说明" align="center">
          <template slot-scope="scope">{{ scope.row.description }}</template>
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
              @click="handleUpdate(scope.$index, scope.row)">修改权限
            </el-button>
            <el-button
              size="mini"
              @click="handleUpdateRole(scope.$index, scope.row)">修改角色
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
    <el-dialog
      :title="isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="100px">
        <el-form-item label="角色名：" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色说明：" prop="description">
          <el-input v-model="formData.description"></el-input>
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
  const defaultRole={
    name: '',
    description: '',
  };
  import { getRoleList,updateRoleInfo,createRole } from '@/api/role'
  import {formatDate} from '@/utils/date';
  export default {
    name: "roleList",
    data() {
      return {
        isAdd: true,
        dialogVisible: false,
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          pageSize: 10,
          pageNum: 1
        },
        formData: Object.assign({}, defaultRole),
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        }
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
      this.getRoleList()
    },
    methods: {
      getRoleList() {
        getRoleList(this.listQuery).then(resp => {
          this.listLoading = false
          this.list = resp.data
        })
      },
      addRole() {
        // this.$router.push({path: '/ams/role/addRole'})
        this.resetForm('formData')
        this.isAdd = true
        this.dialogVisible = true
      },
      handleUpdate(index, row) {
        this.$router.push({name: 'updateRole', params: { item: row}})
      },
      handleUpdateRole(index, row) {
        this.isAdd = false
        this.dialogVisible = true
        this.formData = Object.assign({}, row)
        console.log('00', this.formData)
      },
      confirm() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isAdd) {
                createRole(this.formData).then(resp => {
                  this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration:1000
                  });
                  this.dialogVisible = false
                  this.getRoleList()
                })
              } else {
                updateRoleInfo(this.formData.id, this.formData).then(resp => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.dialogVisible = false
                  this.getRoleList()
                })
              }
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
          this.formData = Object.assign({},defaultRole);
        }
      }
    }
  }
</script>

<style scoped>

</style>
