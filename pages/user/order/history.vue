<template>
  <div class="container-fruid">
    <div class="container">
      <NavBar />
      <div class="content-right">
        <div class="content-main">
          <h1>Hóa đơn</h1>
          <div class="choose-nofi">
            <div class="btn-act">
              <button>Cập nhật đơn hàng</button>
            </div>
            <div class="btn-act">
              <button>Cập nhật đánh giá</button>
            </div>
            <div class="btn-act">
              <button>Hoạt động</button>
            </div>
            <div class="btn-act">
              <button>Cập nhật sản phẩm</button>
            </div>
          </div>
          <div class="content-nofi">
            <div class="img" v-if="bills.length == 0">
              <img src="/img/anhdep.png" alt />
              <p>Bạn chưa có thông báo</p>
              <button>Tiếp tục mua sắm</button>
            </div>
            <div class="bill-content" v-else>
              <div class="bill-div" v-for="item in bills" :key="item.id">
                <div class="title">
                  <div class="div-name">
                    <div class="img">
                      <img src="https://cf.shopee.vn/file/aaa24a79e7015ab1d6c73392b4b54c93_tn" alt />
                    </div>
                    <div class="name">
                      <p>{{ item.user.name }}</p>
                    </div>
                    <div class="btn-action-user">
                      <button>chat</button>
                      <button>xem shop</button>
                    </div>
                  </div>
                </div>
                <div class="content-main-product">
                  <div class="include-div" v-for="prod in item.bill_details" :key="prod.id">
                    <div class="img-bill">
                      <img :src="prod.image" alt />
                    </div>
                    <div class="detail-bill">
                      <p>{{ prod.product.name }}</p>
                      <p>x {{ prod.qty }}</p>
                    </div>
                    <div class="total-money-pr">
                      <p>₫{{ formatPrice(prod.product.discount) }}</p>
                    </div>
                  </div>
                </div>
                <div class="content-bottom">
                  <div class="div-right">
                    <div class="sum-bill">
                      <p>
                        Tổng số tiền:
                        <span>₫{{ formatPrice(item.sum) }}</span>
                      </p>
                    </div>
                    <div class="btn-choose">
                      <button>Chi tiết</button>
                      <button>Mua lần nữa</button>
                    </div>
                  </div>
                  <div style="clear: bold;"></div>
                </div>
              </div>
              <!-- <div class="" v-for="item in bills">
                  <h1>{{ item.user.name }}</h1>
                  <div class="" v-for="prod in item.bill_details">
                    <img :src="prod.image" alt="">
                  </div>
              </div>-->
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
export default {
  // middleware: 'authenticated',
  async asyncData({ $axios }) {
    var data = await $axios.get("/api/bill/");
    return {
      bills: data.data
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
    // this.getLocal();
  },
  methods: {
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
