<template>
  <!--active-text-color="#ffd04b"  text-color="#fff"-->
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#ecf5ff"
        style="border-color: #b3d8ff; color: #409EFF">
      <el-menu-item index="1" style="margin-left:112px" @click="indexClick">首页</el-menu-item>
      <el-menu-item index="2" @click="myProfileClick">个人信息</el-menu-item>
      <el-menu-item index="3" @click="skillClick">个人技能</el-menu-item>
    </el-menu>
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="首页" name="index" @click="indexClick"></el-tab-pane>
      <el-tab-pane label="个人信息" name="mine" @click="myProfileClick"></el-tab-pane>
      <el-tab-pane label="个人优势" name="skill" @click="skillClick"></el-tab-pane>
    </el-tabs>-->
    <el-main class="profile-loading-area">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    data() {
      return {
        activeIndex: '1'
        // activeName: 'index'
      }
    },
    methods: {
      /*handleClick(tab, event) {
        console.log(tab, event);
      },*/

      indexClick() {
        let userId = this.$route.params.userId
        this.$router.push("/user/"+userId+"/profile/index")
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: '#FFFFFF',
          target: document.querySelector('.profile-loading-area')
        })
        setTimeout(() => {
          loading.close();
        }, 1000)
      },
      myProfileClick() {
        let userId = this.$route.params.userId;
        this.$router.push("/user/"+userId+"/profile/mine")
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: '#FFFFFF',
          target: document.querySelector('.profile-loading-area')
        })
        setTimeout(() => {
          loading.close();
        }, 1000)
      },
      skillClick() {
        let userId = this.$route.params.userId;
        this.$router.push("/user/"+userId+"/profile/skill")
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: '#FFFFFF',
          target: document.querySelector('.profile-loading-area')
        })
        setTimeout(() => {
          loading.close();
        }, 1000)
      }
    }
  }
</script>

<style scoped>
.el-menu-demo {
  width: 500px;
}
</style>