<template>
  <div class="user">
    <!--    <HelloWorld msg="Welcome to Your Vue.common App"/>-->
    <el-container style="border: 2px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" :default-active="'1-1'">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>首页</template>
<!--            <router-link to="/user/:userId/course"></router-link>-->
            <el-menu-item index="1-1" @click="courseClick">教育课程</el-menu-item>
            <el-menu-item index="1-2" @click="serviceClick">服务内容</el-menu-item>
<!--            <router-link to="'/user/'+userId/service">服务内容</router-link>-->
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>敬请期待</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
              <el-menu-item index="3-1" @click="profileClick"><i class="el-icon-setting"></i>个人中心</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>姚震潮</span>
        </el-header>

        <el-main class="loading-area">
          <!--<el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>-->
          <router-view></router-view>
        </el-main>
        <el-footer height="20px">
            <i class="el-icon-user"></i>
            <el-link type="primary" target="_blank" href="https://github.com/xiaoyaoyao1" style="margin-bottom: 5px">My github</el-link>
            Copyright © 2020 · xxxxx · 服务器: xxx ·
            <i class="el-icon-phone"></i>欢迎联系我们:888888
            <el-link type="primary" target="_blank" href="http://www.beian.miit.gov.cn/" style="margin-bottom: 5px">粤ICP备20016429号</el-link>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>



<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .el-footer {
    font-size: 15px;
    color: #333;
  }



</style>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      courseClick() {
        let userId = this.$route.params.userId;
        this.$router.push("/user/"+userId+"/course")
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: '#FFFFFF',
          target: document.querySelector('.loading-area')
        })
        setTimeout(() => {
          loading.close();
        }, 1000);
      },
      serviceClick() {
        let userId = this.$route.params.userId;
        this.$router.push("/user/"+userId+"/service")
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: '#FFFFFF',
          target: document.querySelector('.loading-area')
        })
        setTimeout(() => {
          loading.close();
        }, 1000);
      },
      profileClick() {
        let userId = this.$route.params.userId;
        this.$router.push("/user/"+userId+"/profile")
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: '#FFFFFF',
          target: document.querySelector('.loading-area')
        })
        setTimeout(() => {
          loading.close();
        }, 1000);
      }
    }
  };
</script>