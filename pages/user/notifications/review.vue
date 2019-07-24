<template>
  <div class="container-fruid">
    <div class="container">
      <NavBar :seleted="seleted" />
      <div class="content-right">
        <div class="content-main">
          <h1>Hóa đơn</h1>
          <!-- <div class="choose-nofi">
            <div class="btn-act">
              <button :class="{active:0 == status }" @click="chooseOrder(0)">Chờ thanh toán</button>
            </div>
            <div class="btn-act">
              <button :class="{active:1 == status }" @click="chooseOrder(1)">Chờ lấy hàng</button>
            </div>
            <div class="btn-act">
              <button :class="{active:2 == status }" @click="chooseOrder(2)">Đang giao</button>
            </div>
            <div class="btn-act">
              <button :class="{active:3 == status }" @click="chooseOrder(3)">Đã giao</button>
            </div>
            <div class="btn-act">
              <button :class="{active:4 == status }" @click="chooseOrder(4)">Đã hủy</button>
            </div>
          </div> -->

          <div class="content-nofi">
            <div class="img" v-if="nofi.length == 0 ">
              <img src="/img/anhdep.png" alt />
              <p>Bạn chưa có đơn hàng</p>
              <button>Tiếp tục mua sắm</button>
            </div>

            <div class="bill-content" v-else>
              <div class="bill-div" v-for="item in nofi" :key="item.id">
                <div class="content">
                  <div class="img">
                    <img :src="item.user.avatar" alt />
                  </div>
                  <div class="div-center">
                    <!-- <h4>Hết hàng</h4> -->
                    <p>
                      <span style="font-weight:bold;">{{ item.user.name }}</span>
                      <span>{{ item.content }}</span>
                    </p>
                    <p> {{ moment(item.created_at).format('LLLL') }}</p>
                  </div>
                  <div class="div-left">
                    <nuxt-link :to="`/${ item.ProductId }`">
                      <button>Xem chi tiết sản phẩm</button>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
            <div style=" clear:both;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "./../../../components/navUser/navbar";
import moment from "moment";
moment.locale("vi");
moment().format('LLLL');
export default {
  // middleware: 'authenticated',
  async asyncData({ $axios }) {
    var data = await $axios.get("/api/notification/review");
    console.log(data);
    return {
      nofi: data.data,
      moment : moment
    };
  },
  components: {
    NavBar
  },
  data() {
    return {
      local: [],
      status: 0,
      seleted : 5
    };
  },
  created() {
    // this.getLocal();
  },
  computed: {
    // billList() {
    //   if (this.status > -1) {
    //     return this.bills.filter(item => item.status === this.status);
    //   } else {
    //     return this.bills;
    //   }
    // }
  },
  methods: {
    chooseOrder(item) {
      this.status = item;
    },
    chatUser(item) {
      this.selected = item.id;
      this.roomname = item.id;
      this.room = this.rooms.find(room => room.id === item.id);
      this.count = "";
      if (item.UserName1 == this.$store.state.authUser.name) {
        this.idUserSend = item.UserName2;
      } else if (item.UserName2 == this.$store.state.authUser.name) {
        this.idUserSend = item.UserName1;
      }
    },
    showDivChat(item) {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.$axios
          .post("/api/room/add", {
            user: item.user
          })
          .then(response => {
            console.log(response);
            this.rooms = response.data;
            this.$store.commit("ROOMS", response.data);
            this.chatUser(this.rooms[0]);
          });
        this.$store.commit("TOGGLE_CHAT");
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
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
button {
  cursor: pointer;
}
.active {
  border: 1px solid #2b3278 !important;
  color: #2b3278 !important;
  background: white !important;
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
      .bill-content {
        width: 100%;
        padding: 15px;
        margin-bottom: 30px;
        .title {
          width: 100%;
          border-bottom: 1px solid rgba(0, 0, 0, 0.09);
          .div-name {
            display: flex;
            width: 30%;
            text-align: center;
            justify-content: center;
            align-items: center;
            .img {
              width: 15%;
              img {
                width: 100%;
                border-radius: 100%;
              }
            }
            .name {
              width: 30%;
              margin-left: 10px;
              p {
                font-weight: bold;
              }
            }
            .btn-action-user {
              width: 40%;
              display: flex;
              margin-left: 10px;
              button:nth-child(1) {
                background: #00bfa5;
                color: white;
                border: none;
                padding: 3px 4px;
              }
              button:nth-child(2) {
                background: #fff;
                color: black;
                margin-left: 5px;
                border: 1px solid rgba(0, 0, 0, 0.09);
                border-radius: 2px;
                padding: 3px 4px;
              }
            }
          }
        }
        .content {
          width: 100%;
          display: flex;
          .img {
            width: 10%;
            padding: 0px;
            img {
              width: 90%;
              padding: 0px;
            }
          }
          .div-center {
            width: 65%;
            h4 {
              font-size: 1rem;
              margin-bottom: 0.625rem;
              color: rgba(0, 0, 0, 0.8);
            }
            p {
              font-size: 0.875rem;
              color: rgba(0, 0, 0, 0.54);
              margin-bottom: 0.3125rem;
            }
          }
          .div-left {
            width: 20%;
            button {
              padding: 0 0.4375rem;
              background-color: #fff;
              min-width: 5rem;
              height: 1.875rem;
              font-size: 0.75rem;
              text-transform: capitalize;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
            }
          }
        }
        .content-main-product {
          width: 100%;
          padding: 10px;
          .include-div {
            display: flex;
            padding: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.09);
            .img-bill {
              width: 10%;
              img {
                width: 100%;
              }
            }
            .detail-bill {
              width: 80%;
              margin-left: 10px;
            }
            .total-money-pr {
            }
          }
        }
        .content-bottom {
          width: 100%;
          .div-right {
            width: 40%;
            margin-left: 65%;
            .sum-bill {
              p {
                span {
                  color: #ee4d2d;
                  font-size: 1.875rem;
                  line-height: 2rem;
                }
              }
            }
            .btn-choose {
              margin-top: 30px;
              width: 100%;
              button {
                width: 40%;
                height: 40px;
                text-transform: uppercase;
              }
              button:nth-child(1) {
                width: 40%;
                background: #ee4d2d;
                color: white;
                border: none;
              }
              button:nth-child(2) {
                width: 40%;
                border: 1px solid rgba(0, 0, 0, 0.09);
                border-radius: 2px;
                background: transparent;
              }
            }
          }
        }
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
        .img {
          margin-top: 100px;
          width: 50%;
          margin: auto;
          img {
            margin-left: 20px;
          }
          p {
            font-size: 14px;
            margin-left: 20px;
          }
          button {
            width: 40%;
            margin-top: 15px;
            background: cornflowerblue;
            height: 40px;
            color: black;
            border: none;
          }
        }
      }
    }
  }
}
</style>
