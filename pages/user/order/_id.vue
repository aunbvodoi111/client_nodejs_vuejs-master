<template>
  <div class="container-fruid">
    <div class="container">
      <NavBar />
      <div class="content-right">
        <div class="content-main">
          <h1>Hóa đơn</h1>
          <div class="content-nofi">
            <div class="title-bill">
              <p>
                ID ĐƠN HÀNG. 19050607587GDJD |
                <span>Đã giao</span>
              </p>
            </div>
            <div class="step">
              <div class="step-one">
                <div class="step-div">
                  <div class="step-icon">
                    <i class="fas fa-check-double"></i>
                  </div>
                  <div class="step-text">
                    <span>Đã tạo Đơn hàng</span>
                  </div>
                  <div class="step-date">
                    <span>11:03 07-05-2019</span>
                  </div>
                </div>
              </div>
              <div class="step-one">
                <div class="step-div">
                  <div class="step-icon">
                    <i class="fas fa-money-check-alt"></i>
                  </div>
                  <div class="step-text">
                    <span>Đã tạo Đơn hàng</span>
                  </div>
                  <div class="step-date">
                    <span>11:03 07-05-2019</span>
                  </div>
                </div>
              </div>
              <div class="step-one">
                <div class="step-div">
                  <div class="step-icon">
                    <i class="fas fa-truck"></i>
                  </div>
                  <div class="step-text">
                    <span>Đã tạo Đơn hàng</span>
                  </div>
                  <div class="step-date">
                    <span>11:03 07-05-2019</span>
                  </div>
                </div>
              </div>
              <div class="step-one">
                <div class="step-div">
                  <div class="step-icon">
                    <i class="far fa-star"></i>
                  </div>
                  <div class="step-text">
                    <span>Đã tạo Đơn hàng</span>
                  </div>
                  <div class="step-date">
                    <span>11:03 07-05-2019</span>
                  </div>
                </div>
              </div>
              <!-- <div class="step-two"></div>
              <div class="step-three"></div>
              <div class="step-four"></div>-->
              <div class="step-line"></div>
            </div>
            <div class="infor-bill">
              <div class="address">
                <h4>Địa chỉ nhận hàng</h4>
                <p>Đỗ Ngọc Hoa</p>
                <p>84354389544</p>
                <p>Toà hei tower số 1 Nguỵ Như Kon Tum, Phường Nhân Chính, Quận Thanh Xuân, Hà Nội</p>
              </div>
              <div class="status-bill">
                <ul>
                  <li>
                    12:44 07-05-2019
                    [VN]Đã giao hàng/Chưa đối soát
                  </li>
                  <li>
                    12:44 07-05-2019
                    [VN]Đã giao hàng/Chưa đối soát
                  </li>
                  <li>
                    12:44 07-05-2019
                    [VN]Đã giao hàng/Chưa đối soát
                  </li>
                  <li>
                    12:44 07-05-2019
                    [VN]Đã giao hàng/Chưa đối soát
                  </li>
                </ul>
              </div>
            </div>
            <div class="bill-content">
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
                      <div class="title-sum">Tổng tiền hàng</div>
                      <div class="content">₫{{ formatPrice(item.sum) }}</div>
                    </div>
                    <div class="sum-bill">
                      <div class="title-sum">Vận chuyển</div>
                      <div class="content">
                        <span>₫{{ formatPrice(item.sum) }}</span>
                      </div>
                    </div>
                    <div class="sum-bill">
                      <div class="title-sum">Tổng số tiền</div>
                      <div class="content">₫{{ formatPrice(item.sum) }}</div>
                    </div>
                    <div class="sum-bill">
                      <div class="title-sum">Phương thức Thanh toán</div>
                      <div class="content">Thanh toán khi nhận hàng</div>
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
        .infor-bill {
          padding: 20px;
          width: 100%;
          display: flex;
          margin-top: 140px;
          .address {
            width: 40%;
            p{
              color: rgba(0, 0, 0, 0.54);
                font-size: 0.875rem;
                line-height: 2rem;
            }
          }
          .status-bill {
            width: 60%;
            ul {
              li {
                color: rgba(0, 0, 0, 0.54);
                font-size: 0.875rem;
                line-height: 2rem;
              }
            }
          }
        }
        .step {
          padding: 20px;
          width: 100%;
          display: flex;
          position: relative;
          .step-one {
            width: 25%;
            position: relative;
            background: white;
            .step-div {
              width: 50%;
              z-index: 20;
              position: absolute;
              .step-icon {
                border: 3px solid #2dc258;
                color: #2dc258;
                margin-left: 16px;
                background: white;
                height: 80px;
                width: 80px;
                border-radius: 100%;
                i {
                  margin: 26px;
                  align-items: center;
                  font-size: 20px;
                }
              }
              .step-text {
                margin-top: 20px;
                font-size: 13px;
                text-align: center;
              }
              .step-date {
                color: grey;
                font-size: 13px;
                text-align: center;
              }
            }
          }
          .step-two {
            width: 25%;
          }
          .step-three {
            width: 25%;
          }
          .step-four {
            width: 25%;
          }
          .step-line {
            width: 80%;
            margin: auto;
            top: 53px;
            left: 36px;
            position: absolute;
            border: 3px solid #2dc258;
            color: #2dc258;
          }
        }
        .bill-content {
          position: relative;
          display: block;
          width: 100%;
          padding: 15px;
          margin: 20px 30px 0px 0px;
          background: white;
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
            padding-right: 30px;
            .div-right {
              width: 40%;
              margin-left: 65%;

              .sum-bill {
                display: flex;
                margin-top: 10px;
                .title-sum {
                  width: 40%;
                  border-right: 1px dotted rgba(0, 0, 0, 0.09);
                  font-size: 0.75rem;
                  color: rgba(0, 0, 0, 0.54);
                }
                .content {
                  width: 60%;
                  text-align: right;
                  padding-right: 10px;
                  font-size: 14px;
                  span {
                    color: #ee4d2d;
                    font-size: 1.875rem;
                    line-height: 2rem;
                  }
                }
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
      }
    }
  }
}
</style>
