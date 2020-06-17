<template>
  <div>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="medium">
          <el-card class="box-card">
            <ul>
              <li v-for="item in skill" class="text item" style="list-style: none">
                <span>{{item}}</span>
              </li>
            </ul>
          </el-card>
        </h3>
      </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>
  export default {
    name: "MySkill",
    data() {
      return {
        skill: [
          '熟练使用Java语言进行面向对象程序设计，有良好的编程习惯，熟悉常用的Java API，了解集合框架、多线程（并发编程）、I/O（NIO）、Socket、JDBC、XML、反射等。',
          '熟悉基于JSP和Servlet的JavaWeb开发，对Servlet和JSP的工作原理和生命周期有了解，熟练的使用JSTL和EL表达式，以及MVC架构模式进行Java Web项目开发的经验。',
          '熟悉后端开发框架spring全家桶，了解spring开发机制。',
          '熟悉常用的关系型数据库产品，例如MySQL和Oracle。'
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .text {
    font-size: 15px;
  }

  .item {
    padding: 15px 0;
  }

  .box-card {
    width: 470px;
  }

  .box-card {
    background-color: #ecf5ff;
    margin-top: 10px
  }
</style>