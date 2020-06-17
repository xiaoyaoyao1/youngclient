<template>
  <el-calendar>
    <template
        slot="dateCell"
        slot-scope="{date, data}">
      <!--日期内容-->
      <div>
        <div class="calendar-day" style="text-align: center">
            <el-tooltip v-if="brightDate.indexOf(data.day) != -1" class="item" effect="dark"
                        :content="content(data.day)" placement="bottom">
            <span class="everyDay">{{ data.day.split('-').slice(2).join('-') }}
            </span>
            </el-tooltip>
            <span v-else :editMemorandum="editMemorandum(date)">{{ data.day.split('-').slice(2).join('-') }}
            </span>
        </div>
      </div>
<!--      <el-button class="memorandum" type="text" icon="el-icon-date" size="small"></el-button>-->
    </template>
  </el-calendar>
</template>
<el-button type="primary" icon="el-icon-search">搜索</el-button>
<script>
  export default {
    data() {
      return {
        calendarData: [
          {
            'name': 'yyy',
            'content': '完成练习',
            'startDate': '2020-06-16',
          },
          {
            'name': 'yyy',
            'content': '完成算法设计',
            'startDate': '2020-06-17',
          },
          {
            'name': 'yyy',
            'content': '项目展示',
            'startDate': '2020-06-18',
          },
          {
            'name': 'yyy',
            'content': '上课',
            'startDate': '2020-06-19',
          }
        ],
        value: new Date()
      }
    },
    computed: {
      // 时间高亮的数组
      brightDate() {
        let ary = []
        for (let i in this.calendarData) {
          ary.push(this.calendarData[i].startDate)
        }
        return ary
      }
    },
    methods: {
      // 数据浮出
      content(date) {
        let content = ''
        for (let i in this.calendarData) {
          if (date === this.calendarData[i].startDate) {
            content = this.calendarData[i].name + ` ` + this.calendarData[i].content
          }
        }
        return content
      },
      editMemorandum(date) {
        console.log(date)
      }
    }
  }
</script>
<style scoped>
  .everyDay {
    display: inline-block;
    width: 30px;
    height: 20px;
    background-color: #409eff;
    color: #fff;
    border-radius: 40%;
  }

  .memorandum {
    margin-left: 120px;
    margin-top: 30px;
  }
</style>