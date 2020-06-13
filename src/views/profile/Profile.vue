<template>
  <div>
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#B3C0D1"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1" style="margin-left:112px" @click="indexClick">首页</el-menu-item>
      <el-menu-item index="2" @click="myProfileClick">个人信息</el-menu-item>
      <el-menu-item index="3" @click="skillClick">个人技能</el-menu-item>
    </el-menu>
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
        activeIndex2: '1'
      }
    },
    methods: {
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
  overflow-x:hidden;
}
</style>