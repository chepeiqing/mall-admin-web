<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="formData" :rules="rules" ref="formData" label-width="150px">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" v-if="!isEdit" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="用户头像：" prop="icon">
        <single-upload v-model="formData.icon"></single-upload>
      </el-form-item>
      <el-form-item label="用户昵称：" prop="nickName">
        <el-input v-model="formData.nickName"></el-input>
      </el-form-item>
      <el-form-item label="E-Mail：" prop="sort">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formData')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  const defaultAdmin={
    username: '',
    nickName: '',
    password: '',
    icon: '',
    email: '',
  };
  import SingleUpload from '@/components/Upload/singleUpload'
  import {adminRegister,updateAdmin,getAdminInfo} from '@/api/admin'
  export default {
    name: "AdminInfoDetail",
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        formData: Object.assign({}, defaultAdmin),
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          icon: [
            {required: true, message: '请选择用户头像', trigger: 'blur'}
          ],
          nickName: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        getAdminInfo(this.$route.params.id).then(response => {
          this.formData = response.data;
          this.formData.password = ''
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
              if (this.isEdit) {
                updateAdmin(this.$route.params.id, this.formData).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                adminRegister(this.formData).then(response => {
                  this.$refs[formName].resetFields();
                  this.formData = Object.assign({},defaultAdmin);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
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
        this.$refs[formName].resetFields();
        this.brand = Object.assign({},defaultAdmin);
      }
    }
  }
</script>

<style scoped>

</style>
