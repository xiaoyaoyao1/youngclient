<template>
  <div>
    <el-button @click="addCourse" type="primary" size="small" icon="el-icon-plus" style="margin-bottom: 15px">添加课程
    </el-button>
    <el-table
        :data="course"
        border
        style="width: 100%"
        class="loading-course"
        header-row-class-name="center">
      <el-table-column
          fixed
          prop="cid"
          label="编号"
          width="150"
          align="center"
          header-align="center">
      </el-table-column>
      <el-table-column
          prop="title"
          label="标题"
          width="230"
          align="center"
          header-align="center">
      </el-table-column>
      <el-table-column
          prop="ctype"
          label="类别"
          width="120"
          align="center"
          header-align="center">
      </el-table-column>
      <el-table-column
          prop="cover"
          label="视图"
          width="220"
          align="center"
          header-align="center">
        <template scope="scope">
<!--          　<img :src="scope.row.cover" width="80" height="70"/>-->
          <el-image style="width: 80px; height: 80px" :src="scope.row.cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="price"
          label="价格"
          width="100"
          align="center"
          header-align="center">
      </el-table-column>
      <el-table-column
          prop="clevel"
          label="级别"
          width="120"
          align="center"
          header-align="center">
      </el-table-column>
      <el-table-column
          prop="views"
          label="阅读人数"
          width="120"
          align="center"
          header-align="center">
      </el-table-column>
      <el-table-column
          prop="isnew"
          label="是否最新"
          width="90"
          align="center"
          header-align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.isNew===true">✓</p>
          <p v-else>✕</p>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100"
          align="center"
          header-align="center">
        <template slot-scope="scope">
          <el-button @click="editCourse(scope.row)" size="small" type="primary" icon="el-icon-edit" circle></el-button>
          <el-popconfirm
              confirmButtonText='确定'
              cancelButtonText='取消'
              icon="el-icon-delete"
              iconColor="red"
              title="确定删除该课程吗？"
              @onConfirm="deleteCourse(scope.row)"
          >
          <el-button slot="reference" size="small" type="danger" icon="el-icon-delete" circle style="margin-left: 5px"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="6"
        :total="total"
        @current-change="page">
    </el-pagination>

    <!--编辑--> <!--:close-on-click-modal="false" 点击空白不会关闭弹窗-->
    <el-dialog
        title="编辑课程"
        :visible.sync="centerDialogVisible"
        width="30%"
        :append-to-body="true"
        @close="closeDialog"
        center>
      <!--      <span>需要注意的是内容是默认不居中的</span>-->
      <el-form :model="editForm" ref="editForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="课程名称" prop="title" style="width: 75%">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="课程类别" prop="ctype" style="width: 50%">
          <el-select v-model="editForm.ctype" placeholder="请选择课程类别">
            <el-option label="语文" value="语文"></el-option>
            <el-option label="数学" value="数学"></el-option>
            <el-option label="英语" value="英语"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程价格" prop="price" style="width:40%">
          <el-input v-model="editForm.price"></el-input>
        </el-form-item>
        <el-form-item label="课程级别" prop="clevel" style="width: 40%">
          <el-select v-model="editForm.clevel" placeholder="请选择课程级别">
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
              :file-list="fileList"
              :on-exceed="handleExceed">
            <!--          :auto-upload="true"-->
            <el-button size="small" type="primary" icon="el-icon-upload" plain>点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false" plain>取 消</el-button>
    <el-button type="primary" @click="courseEdit" plain>修 改</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<style>
  .el-dialog__footer {
    margin-top: -42px
  }

</style>

<script>
  export default {
    inject: ['reload'],
    created() {
      const _this = this
      this.$axios.get('http://localhost:8081/edu/1/6').then(function (response) {
        _this.course = response.data.content
        _this.pageSize = response.data.size
        _this.total = response.data.totalElements
        const loading = _this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: '#FFFFFF',
          target: document.querySelector('.loading-course')
        })
        setTimeout(() => {
          loading.close();
        }, 1000)
      })
    },
    methods: {
      deleteCourse(row) {
        // console.log(row)
        const _this = this
        this.$axios.delete('http://localhost:8081/edu/deleteCourse/'+row.cid).then(function (response) {
          if(response.data == 'success') {
            // alert("添加成功")
            // console.log(response)
            _this.$message({
              showClose: true,
              message: '课程：' + row.title + '删除成功',
              type: 'success'
            })
            _this.reload()
          }
        })
      },
      editCourse(row) {
        /*let userId = this.$route.params.userId;
        console.log(userId)
        this.$router.push("/user/"+userId+"/editcourse")*/
        this.centerDialogVisible = true
        this.editForm = Object.assign({}, row);
        let obj = new Object()
        obj.name = row.title
        obj.url = row.cover
        this.fileList.push(obj)
        // console.log(row)
      },
      closeDialog() {
        this.fileList.length = 0
      },
      courseEdit() {
        this.fileList.length = 0

        if (this.editForm.title === '' || this.editForm.price === '' || this.editForm.clevel === '' || this.editForm.cover === '') {
          this.$message.error("修改内容不能为空")
        } else {
          const _this = this
          // console.log(_this.ruleForm)
          this.$axios.put('http://localhost:8081/edu/updateCourse', this.editForm).then(function (response) {
            if (response.data == 'success') {
              // alert("添加成功")
              // console.log(response)
              _this.$message({
                showClose: true,
                message: '课程：' + _this.editForm.title + '修改成功',
                type: 'success'
              })
              _this.centerDialogVisible = false
              _this.reload()
            } else {
              // console.log('error submit!!');
              return false;
            }
          })
        }
      },
      addCourse() {
        let userId = this.$route.params.userId;
        // console.log(userId)
        this.$router.push("/user/" + userId + "/addcourse")
      },
      page(currentPage) {
        const _this = this
        this.$axios.get('http://localhost:8081/edu/' + currentPage + '/' + _this.pageSize).then(function (response) {
          _this.course = response.data.content
          _this.pageSize = response.data.size
          _this.total = response.data.totalElements
          /*const loading = _this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: '#FFFFFF',
            target: document.querySelector('.loading-course')
          })
          setTimeout(() => {
            loading.close();
          }, 1000)*/
          // console.log(response)
        })
      },
      onSuccess(response) {
        this.editForm.cover = response.url
        console.log(response.url);
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
    },
    data() {
      return {
        fileList: [],
        course: null,
        editForm: [{
          cid: '',
          title: '',
          ctype: '',
          cover: '',
          price: 0,
          clevel: '',
          views: 0,
          isNew: true,
        }],
        pageSize: null,
        total: null,
        centerDialogVisible: false
      }
    }
  }
</script>