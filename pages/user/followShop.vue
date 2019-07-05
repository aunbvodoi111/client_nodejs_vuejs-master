<template>
  <div class="container-fruid">
    <div class="container">
      <NavBar />
      <div class="content-right">
        <div class="content-main">
          <h1>Shop yêu thích</h1>
          <div class="content-nofi">
            <div class="img" v-if="follow.length == 0">
              <img src="/img/anhdep.png" alt />
              <p>Bạn chưa có thông báo</p>
              <button>Tiếp tục mua sắm</button>
            </div>
            <div class="div-shop-follow" v-else>
              <div class="shop" v-for=" item in follow ">
                <div class="img">
                  <img
                    src="https://media3.scdn.vn/img2/2018/5_15/SHZQTq_simg_d13049_158x78_maxb.jpg"
                    alt
                  />
                </div>
                <div class="infor-shop">
                  <p>{{ item.user.name }}</p>
                </div>
                <div class="btn-action-shop">
                  <nuxt-link :to="`/shop/${item.user.id}`">
                    <button>Vào shop</button>
                  </nuxt-link>
                  <button @click="showDivChat(item)">Gửi tin nhắn</button>
                  <button @click ="followSaler(item)">Bỏ yêu thích</button>
                </div>
              </div>
              <div style=" clear:both;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "./../../components/navUser/navbar";
export default {
  async asyncData({ $axios }) {
    var data = await $axios.get("/api/user/listFollow");
    console.log(data.data);

    return {
      follow: data.data
    };
  },
  components: {
    NavBar
  },
  data() {
    return {
      local: []
    };
  },
  created() {
    this.getLocal();
  },
  methods: {
    getLocal() {
      if (process.browser) {
        this.local = JSON.parse(localStorage.getItem("products"));
        console.log(JSON.parse(localStorage.getItem("products")));
      }
    },
    showDivChat(item) {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.$axios
          .post("/api/room/add", {
            user: item.user.name
          })
          .then(response => {
            console.log(response);
            this.rooms = response.data;
            this.$store.commit("ROOMS", response.data);
          });
        // this.$axios.$get("/api/room/").then(response => {
        //   console.log(response);
        // });
        this.$store.commit("TOGGLE_CHAT");
      }
    },
    followSaler(item) {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        var find = this.follow.find(
          follow => follow.UserIdFollow === item.user.id
        );
        var index = this.follow.indexOf(find);
        if (find) {
          this.follow.splice(index, 1);

        } 
        this.$axios
          .$get("/api/follow/delete/"+ item.user.id)
          .then(response => {
          });
      }
    },
  }
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
ul li {
  list-style-type: none;
}
.product-content {
  width: 100%;
  .product {
    float: left;
    width: 20%;
    height: 275px;
    padding: 3px;

    .product-div {
      border: 1px solid transparent;
      background: white;
      cursor: pointer;
      .img-product {
        width: 100%;
        img {
          width: 100%;
          height: 188px;
        }
      }
      .name a {
        padding: 4px;
        word-wrap: break-word;
        line-height: 1.125rem;
        height: 2.25rem;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .price p {
        padding: 4px;
        color: red;
        margin-top: 10px;
      }
    }
  }
}
.container-fruid {
  height: 500px;
  margin-top: 20px;
  width: 100%;
}
.container {
  width: 1200px;
  display: flex;
  height: auto;
  margin: auto;
  .content-left {
    width: 20%;
    .title {
      display: flex;
      width: 100%;
      .img {
        width: 20%;
        img {
          width: 100%;
          border-radius: 100%;
        }
      }
      .name-user {
        width: 70%;
        margin-left: 10px;
        p {
          font-size: 13px;
          margin-bottom: 5px;
          color: #242424;
          margin-top: 5px;
          font-family: Roboto;
          font-weight: 300;
        }
        span {
          margin: 0;
          font-family: Roboto;
          font-size: 17px;
          font-weight: 400;
          font-style: normal;
          font-stretch: normal;
          color: #242424;
        }
      }
    }
    .nav-tab {
      width: 100%;
      ul {
        width: 100%;
        padding: 0px;
        margin-top: 15px;
        li {
          margin-top: 15px;
          i {
            width: 10%;
            color: #999;
          }
          a {
            width: 85%;
            color: #4a4a4a;
            font-size: 15px;
            font-weight: 400;
            font-style: normal;
            font-stretch: normal;
            text-align: left;
          }
        }
      }
    }
  }
  .content-right {
    width: 80%;
    .content-main {
      h1 {
        margin-bottom: 15px;
        font-family: Roboto;
        font-size: 19px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        color: #242424;
      }
      .choose-nofi {
        display: flex;
        .btn-act {
          width: 20%;
          button {
            padding: 13px 20px;
            width: 85%;
            background-color: #2b3278;
            color: white;
            border: none;
            cursor: pointer;
          }
        }
      }
      .content-nofi {
        width: 100%;
        margin-top: 20px;
        align-items: center;
        .div-shop-follow {
          width: 100%;
          height: auto;
          .shop {
            display: flex;
            .infor-shop {
              width: 20%;
              p {
                font-size: 16px;
                color: #4585f4;
                margin-left: 5px;
                font-weight: bold;
                line-height: 18px;
                word-break: break-all;
              }
            }
            .img {
              width: 20%;
              img {
                width: 100%;
              }
            }
            .btn-action-shop {
              display: flex;
              width: 60%;
              button {
                background-color: #2b3278;
                cursor: pointer;
                border: none;
                color: white;
                width: 100px;
                height: 35px;
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
