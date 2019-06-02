<template> 
  <div>
    <el-upload
      action="https://upload.qbox.me"
      :data="dataObj"
      list-type="picture"
      :multiple="false" :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policy} from '@/api/oss'
  import { getFilePathName } from '@/utils'
  var domain = ''
  export default {
    name: 'singleUpload',
    props: {
      value: String
    },
    data() {
      return {
        dataObj: {
          token: '',
          key: '',
          domain: ''
        },
        dialogVisible: false
      };
    },
    created() {
      domain = this.$store.getters.domain
    },
    computed: {
      imageUrl() {
        if (this.value) {
          if (this.value.indexOf('http') >= 0) {
            return this.value
          } else {
            return domain + this.value
          }
        } else {
          return this.value
        }
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
        }
      }
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        this.emitInput('');
      },
      handlePreview(file) {
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        let _self = this;
        return new Promise((resolve, reject) => {
          policy().then(response => {
            _self.dataObj.token = response.data.token;
            _self.dataObj.key = getFilePathName(file.name)
            domain = response.data.domain
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      handleUploadSuccess(res, file) {
        this.showFileList = true;
        this.fileList.pop();
        this.fileList.push({name: file.name, url: res.key});
        this.emitInput(res.key);
      }
    }
  }
</script>
<style>

</style>


