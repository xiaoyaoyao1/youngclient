<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="rules"
             status-icon
             ref="loginForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">益YOUNG后台管理系统
      <i class="el-icon-s-promotion"></i>
      </h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="密码"
                  @keyup.enter.native="onLogin"
        ></el-input>
      </el-form-item>
      <el-form-item label="记住密码" label-width="80px">
        <el-switch v-model="remember"></el-switch>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="onLogin('loginForm')" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>

  import {saveToLocal,loadFromLocal} from "../../common/local-storage";
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          username: 'admin',
          password: '123456',
        },
        rules: {
          username: [{required: true, message: '请输入您的账号', trigger: 'blur'}],
          password: [{required: true, message: '请输入您的密码', trigger: 'blur'}]
        },
        remember: false
      }
    },
    created() {
      // 初始化时读取localStorage用户信息
      if (loadFromLocal('remember', false)) {
        this.loginForm.username = loadFromLocal('username', '')
        this.loginForm.pwd = loadFromLocal('password', '')
      } else {
        this.loginForm.username = ''
        this.loginForm.password = ''
      }
    },
    methods: {
      onLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true
            if (this.loginForm.username === 'admin' &&
                this.loginForm.password === '123456') {
              this.$store.commit('SET_USER',this.loginForm.username)
              this.$router.push({
                path: '/user/'+this.loginForm.username
              })
              this.$message({
                showClose: true,
                message: '欢迎您'+this.loginForm.username,
                type: 'success'
              })
             /* this.$axios.get('http://localhost:8081/edu').then(function (response) {
                console.log(response)
              })*/
            } else {
              this.logining = false;
              this.$message({
                showClose: true,
                message: '您输入的账号或密码不正确',
                type: 'error'
              })
            }
          } else {
            console.log('error submit!')
            return false
          }
        })
      }
    }
  };
</script>

<style scoped>
  .el-card {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -300px 0 0 -200px;
    width: 400px;
    height: 450px;
    background: #fff;
  }

  .el-card-header {
    text-align: center;
  }

  .login-container {
    width: 100%;
    height: 100%;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }

  .login-title {
    margin: 0;
    text-align: center;
  }
</style>