<template>
  <div>
    <el-row class="activity-manage">
      <el-col :span="24" class="mtsm">
        <el-button type="primary" class="btn-primary">
          <router-link to="/newpage" class="alink" target="_blank">新建页面</router-link>
        </el-button>
      </el-col>
      <el-col :span="24" class="mtsm">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="lastedit" label="页面生成日期" width="200"></el-table-column>
          <el-table-column label="页面标识" prop="link">
            <template slot-scope="scope">
             <p>{{scope.row.pid}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="H5页面标题">
            <template slot-scope="scope">
              <el-popover
                ref="popover1"
                placement="right"
                title=""
                width="200"
                trigger="hover"
                :content="scope.row.sign">
              </el-popover>
              <a href="javascript:" @click="chooseUrl(scope.row.pid)" v-popover:popover1>{{scope.row.title}}</a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-row :gutter="20">
                <el-button-group>
                  <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                    <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="复制" placement="top">
                    <el-button @click="handleCopy(scope.row)" type="warning" icon="el-icon-document"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete"></el-button>
                  </el-tooltip>
                </el-button-group>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <el-col class="mtsm text-right">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="pageNo"
                         :page-sizes="[15, 25, 40, 1000]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalCount">
          </el-pagination>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="css" scoped>
  .activity-manage {
    position: relative;
    & .btn-primary {
      float: right;
      & .alink {
        color: #fff;
      }
    }
    & .stat {
      margin-right: 10PX;
    }
  }
  .default {
    width: 20%;
  }
</style>
<script type="text/babel">
  import axios from "axios";
  import {DOMAIN, MONGO_FIND, isProd} from "common/conf";
  import URL from '../../../common/url'

  export default {
    created() {
      this.fetch()
    },
    data() {
      return {
        tableData: [],
        pageSize: 15,
        pageNo: 1,
        totalCount: 0
      };
    },
    
    methods: {
      async fetch() {
        const { data } = await axios.get(`/api/pages?pageSize=${this.pageSize}&pageNo=${this.pageNo}`).catch(err => {throw err })
        if (data.ret == 0) {
          //sucess..
          let tableData = data.data;
          tableData.forEach(function(item) {
            item.link = `${DOMAIN}p/${item.pid}`;
          });
          this.tableData = tableData;
          this.totalCount = data.pager.totalCount;
          this.pageSize = data.pager.pageSize;
          this.pageNo = data.pager.pageNo;
        } else {
          console.log("列表获取失败");
        }
      },
      handleCheck(row) {
        window.open(row.link, '_blank');
      },
      handleEdit(row) {
        let options = {
            name: 'newpage',
            params: {pid: row.pid},
        }
        let routeData = this.$router.resolve(options);
        window.open(routeData.href, '_blank');
      },
      handleCopy(row) {
        let options = {
          name: 'newpage',
          query: {copyFrom: row.pid}
        }
        if (this.isSem) {
          options.query.tag = 'sem'
        }
        let routeData = this.$router.resolve(options)
        window.open(routeData.href, '_blank');
      },
      
      chooseUrl(pid) {
        this.$alert(`
          <div>
          H5版请访问：
          </div>
          <div style="text-align:center">
          <a href="${DOMAIN}p/${pid}" target="_blank">${DOMAIN}p/${pid}</a>
          </div>
          `,
          '点击链接访问',
          {
            dangerouslyUseHTMLString: true
          })
      },
      handleSizeChange(pageSize) {
        //pageSize --每页多少条 pageNo --当前页
        this.pageSize = Number(pageSize)
        this.fetch()
      },
      handleCurrentChange(pageNo) {
        // console.log('pageno',pageNo);
        this.pageNo = pageNo
        this.fetch()
      },

      handleDelete({pid}) {
        this.$confirm('确定要删除当前页面吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deletePages(pid)
          const arr = this.tableData.filter(item => {
            if (item.pid !== pid) {
              return item
            }
          })
          this.tableData = arr
        })
      },

      async handleCleanup({pid}) {
        //fetch backup data
        const {data} = await axios.get('/api/cleanup/'+pid).catch(e => {
          this.$notify.error({
            title: '异常',
            message: 'e.message'
          });
        })
        if (data.ret === 0) {
          this.$notify({
            title: '成功',
            message: '清除缓存已完成',
            type: 'success'
          });
        }
        else {
          this.$notify.error({
            title: '失败',
            message: data.error || '清除缓存失败'
          });
        }
      },

      async deletePages(pid) {
        const re = /(^|\s)csrfToken=([^;]*)(;|$)/
        const str = re.exec(document.cookie)
        let csrfToken = null
        if (str) {
          csrfToken = re.exec(document.cookie)[2]
        }
        const options = {
          headers: {
            'x-csrf-token': csrfToken
          }
        }
        await axios.delete(`/api/pages/${pid}`, options).catch(e => {
          throw e
        })
      },
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
  };
</script>
