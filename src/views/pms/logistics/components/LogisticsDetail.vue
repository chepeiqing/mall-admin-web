<template>
  <el-card class="form-container form-container1" shadow="never">
    <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" size="small">
      <el-form-item label="模板名称：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="运费收取方式:" prop="postType">
        <el-radio-group v-model="formData.postType" size="small" @change="handlePostType">
          <el-radio-button :label="0">包邮</el-radio-button>
          <el-radio-button :label="1">按订单计价</el-radio-button>
          <el-radio-button :label="2">按重量计价</el-radio-button>
          <el-radio-button :label="3">按件数计价</el-radio-button>
          <el-radio-button :label="4">按体积计价</el-radio-button>
          <el-radio-button :label="5">满多少包邮</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formData.postType === 0">
        <el-table :data="formData.details" border size="mini">
          <el-table-column
            label="配送地区"
            align="center"
            width="400">
            <template slot-scope="scope">
              <el-cascader-multi
                :ref="'cas'+ formData.postType + scope.$index"
                v-model="scope.row.cityList"
                :data="provinceList"
                class="cascader-multi"
                separator="/"
                collapse-tags
                clearable />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.$index !== 0" type="text" @click="handleRemovePostType(scope.$index)">删除</el-button>
              <el-button type="text" @click="handleAddPostType()">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-if="formData.postType === 1">
        <el-table :data="formData.details" border size="mini">
          <el-table-column
            label="配送地区"
            align="center"
            width="400">
            <template slot-scope="scope">
              <el-cascader-multi
                :ref="'cas'+ formData.postType + scope.$index"
                v-model="scope.row.cityList"
                :data="provinceList"
                class="cascader-multi"
                separator="/"
                collapse-tags
                clearable />
            </template>
          </el-table-column>
          <el-table-column
            label="每笔订单(元)"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.freight"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.$index !== 0" type="text" @click="handleRemovePostType(scope.$index)">删除</el-button>
              <el-button type="text" @click="handleAddPostType()">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-if="formData.postType === 2">
        <el-table :data="formData.details" border size="mini">
          <el-table-column
            label="配送地区"
            align="center"
            width="400">
            <template slot-scope="scope">
              <el-cascader-multi
                :ref="'cas' + formData.postType + scope.$index"
                v-model="scope.row.cityList"
                :data="provinceList"
                class="cascader-multi"
                separator="/"
                collapse-tags
                clearable />
            </template>
          </el-table-column>
          <el-table-column
            label="默认(kg)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.firstItem"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="运费(元)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.freight"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="续件(kg)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.continuedItem"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="运费(元)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.continuedFreight"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            min-width="150">
            <template slot-scope="scope">
              <el-button v-if="scope.$index !== 0" type="text" @click="handleRemovePostType(scope.$index)">删除</el-button>
              <el-button type="text" @click="handleAddPostType()">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-if="formData.postType === 3">
        <el-table :data="formData.details" border size="mini">
          <el-table-column
            label="配送地区"
            align="center"
            width="400">
            <template slot-scope="scope">
              <el-cascader-multi
                :ref="'cas' + formData.postType +scope.$index"
                v-model="scope.row.cityList"
                :data="provinceList"
                class="cascader-multi"
                separator="/"
                collapse-tags
                clearable />
            </template>
          </el-table-column>
          <el-table-column
            label="默认(个)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.firstItem"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="运费(元)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.freight"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="续件(个)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.continuedItem"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="运费(元)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.continuedFreight"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            min-width="150"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.$index !== 0" type="text" @click="handleRemovePostType(scope.$index)">删除</el-button>
              <el-button type="text" @click="handleAddPostType()">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-if="formData.postType === 4">
        <el-table :data="formData.details" border size="mini">
          <el-table-column
            label="配送地区"
            align="center"
            width="400">
            <template slot-scope="scope">
              <el-cascader-multi
                :ref="'cas' + formData.postType + scope.$index"
                v-model="scope.row.cityList"
                :data="provinceList"
                class="cascader-multi"
                separator="/"
                collapse-tags
                clearable/>
            </template>
          </el-table-column>
          <el-table-column
            label="默认(m³)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.firstItem"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="运费(元)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.freight"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="续件(m³)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.continuedItem"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="运费(元)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.continuedFreight"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            min-width="150"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.$index !== 0" type="text" @click="handleRemovePostType(scope.$index)">删除</el-button>
              <el-button type="text" @click="handleAddPostType()">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-if="formData.postType === 5">
        <el-table :data="formData.details" border size="mini">
          <el-table-column
            label="配送地区"
            align="center"
            width="400">
            <template slot-scope="scope">
              <el-cascader-multi
                :ref="'cas' + formData.postType + scope.$index"
                v-model="scope.row.cityList"
                :data="provinceList"
                class="cascader-multi"
                separator="/"
                collapse-tags
                clearable />
            </template>
          </el-table-column>
          <el-table-column
            label="不满(元)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.firstItem"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="运费(元)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.freight"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="满(元)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.continuedItem"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="运费(元)"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-input v-model="scope.row.continuedFreight" value="0" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            min-width="150"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.$index !== 0" type="text" @click="handleRemovePostType(scope.$index)">删除</el-button>
              <el-button type="text" @click="handleAddPostType()">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formData')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {areaJson} from '@/utils/allCity'
  import { addExpense, getExpenseItem,updateExpense } from '@/api/logistics'
  const defaultLogistics = {
    name: '',
    postType: 0,
    details: [{
      cityList: [],
      firstItem: 0,
      freight: 0,
      continuedItem: 0,
      continuedFreight: 0
    }]
  };
  export default {
    name: "LogisticsDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        formData: Object.assign({}, defaultLogistics),
        formLabelWidth: '150px',
        rules: {
          name: [
            {required: true, message: '请输入品牌名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
        },
        provinceList: areaJson,
        props: {
          value: 'code',
          label: 'name'
        }
      }
    },
    created() {
      if (this.isEdit) {
        getExpenseItem(this.$route.query.id).then(response => {
          var data = response.data
          data.details.forEach((item) => {
            item.cityList = JSON.parse(item.sendArea)
          })
          this.formData = data;
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
              this.formData.details.forEach((item) => {
                item.sendArea = JSON.stringify(item.cityList)
                item.cityList = []
              })
              if (!this.isEdit) {
                addExpense(this.formData).then(resp => {
                  this.$refs[formName].resetFields();
                  this.formData = Object.assign({}, defaultLogistics);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                })
              } else {
                updateExpense(this.formData).then(resp => {
                  this.$refs[formName].resetFields();
                  this.formData = Object.assign({}, defaultLogistics);
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                })
              }
            })
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.formData = Object.assign({}, defaultLogistics);
      },
      handlePostType(data) {
        this.formData.details = [{
          cityList: [],
          firstItem: 0,
          freight: 0,
          continuedItem: 0,
          continuedFreight: 0
        }]
      },
      handleAddPostType() {
        this.formData.details.push({
          cityList: [],
          firstItem: 0,
          freight: 0,
          continuedItem: 0,
          continuedFreight: 0
        })
      },
      handleRemovePostType(index) {
        if (this.formData.details.length > 1) {
          this.formData.details.splice(index, 1)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .form-container1 {
    width: 60%;
    min-width: 900px;
  }
  .cascader-multi {
    .el-select {
      width: 100%;
    }
  }
</style>
