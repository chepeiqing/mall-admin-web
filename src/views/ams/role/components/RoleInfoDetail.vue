<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="formData" :rules="rules" ref="formData" label-width="150px">
      <el-form-item label="角色名：" prop="name">
        <el-input v-model="formData.name" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="角色说明：" prop="description">
        <el-input v-model="formData.description" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="用户权限" required >
        <el-tree
          v-loading="roleLoading"
          ref="tree"
          :data="permissionTreeList"
          :props="defaultProps"
          :expand-on-click-node="false"
          :indent="indent"
          show-checkbox
          node-key="id"
          highlight-current >
        </el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formData')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  const defaultRole={
    name: '',
    description: '',
  };
  import { getPermissionTreeList } from '@/api/permission'
  import { getRolePermissionList,updateRolePermission } from '@/api/role'
  export default {
    name: "RoleInfoDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        formData: Object.assign({}, defaultRole),
        permissionTreeList: [],
        roleLoading: true,
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        indent: 25,
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
    created() {
      getPermissionTreeList().then(resp => {
        this.roleLoading = false
        this.permissionTreeList = resp.data
      })
      if (this.isEdit) {
        this.formData = this.$route.params.item
        getRolePermissionList(this.formData.id).then(response => {
          var ids = []
          if (response.data) {
            response.data.forEach((item) => {
              ids.push(item.id)
            })
            if (this.formData.halfMenu) {
              const halfMenu = JSON.parse(this.formData.halfMenu)
              halfMenu.forEach(val => {
                ids.splice(ids.indexOf(val), 1)
              })
            }
            this.$refs.tree.setCheckedKeys(ids)
          }
        });
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var halfMenu = JSON.stringify(this.$refs.tree.getHalfCheckedKeys() || [])
              var permissionIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys() || [])
              if (!permissionIds) {
                this.$message.error('请选择角色菜单权限')
                return false
              }
              let params = new URLSearchParams();
              params.append('roleId', this.formData.id);
              params.append('permissionIds', permissionIds);
              params.append('halfMenu', halfMenu);
              updateRolePermission(params).then(resp => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration:1000
                });
                this.$router.back();
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
        this.$refs[formName].resetFields();
        this.formData = Object.assign({},defaultRole);
      }
    }
  }
</script>

<style scoped>

</style>
