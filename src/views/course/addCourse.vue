<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="课程名称" prop="title" style="width:30%">
      <el-input v-model="ruleForm.title" id="focus"></el-input>
    </el-form-item>
    <el-form-item label="课程类别" prop="ctype">
      <el-select v-model="ruleForm.ctype" placeholder="请选择课程类别">
        <el-option label="语文" value="语文"></el-option>
        <el-option label="数学" value="数学"></el-option>
        <el-option label="英语" value="英语"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="课程价格" prop="price" style="width:20%">
      <el-input v-model="ruleForm.price"></el-input>
    </el-form-item>
    <el-form-item label="课程级别" prop="clevel">
      <el-select v-model="ruleForm.clevel" placeholder="请选择课程级别">
        <el-option label="初级" value="初级"></el-option>
        <el-option label="中级" value="中级"></el-option>
        <el-option label="高级" value="高级"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="课程视图" prop="cover">
      <el-upload
          name="multipartfiles"
          ref="upload"
          class="upload-demo"
          action="http://localhost:8081/file/upload"
          accept="image/png,image/jpg,image/jpeg"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="onSuccess"
          :limit="1"
          :on-exceed="handleExceed">
        <!--          :auto-upload="true"-->
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
      <!--      <el-button @click="publish()">发布</el-button>-->
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          title: '',
          ctype: '',
          cover: '',
          price: 0,
          clevel: '',
          views: 0,
          isNew: true,
        },
        rules: {
          title: [
            {required: true, message: '课程名称不能为空', trigger: 'blur'},
            {min: 2, message: '长度至少达到2个字符', trigger: 'blur'}
          ],
          ctype: [
            {required: true, message: '请选择一个课程类别', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入课程价格', trigger: 'blur'}
          ],
          clevel: [
            {required: true, message: '请选择课程级别', trigger: 'blur'}
          ],
          cover: [
            {required: true, message: '请上传课程视图', trigger: 'blur'}
          ],
        }
      };
    },
    mounted() {
      let inputelement=document.getElementById('focus')
      inputelement.focus()
    },
    methods: {
      submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(_this.ruleForm)
            this.$axios.post('http://localhost:8081/edu/insertCourse',this.ruleForm).then(function(response) {
              if(response.data == 'success') {
                // alert("添加成功")
                // console.log(response)
                _this.$message({
                  showClose: true,
                  message: '课程：' + _this.ruleForm.title + '发布成功',
                  type: 'success'
                })
                let userId = _this.$route.params.userId;
               _this.$router.push("/user/"+userId+"/course")
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      /*publish() {
        console.log(this.ruleForm)
      },*/
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onSuccess(response) {
        this.ruleForm.cover = response.url
        // console.log('----------')
        console.log(response.url);
        // console.log('----------')
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>