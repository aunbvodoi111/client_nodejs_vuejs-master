<template>
  <div class="container-checkout">
    <div class="container">
      <div class="popup-infor-customer" v-if="showPopInforCustom">
        <div class="pop">
          <div class="title">
            <h3>Thêm 1 địa chỉ mới</h3>
          </div>
          <!-- <div class="form">
            <p>Để đặt hàng, vui lòng thêm địa chỉ nhận hàng</p>
            <div class="from-control">
              <input
                type="text"
                class="form-input"
                @mousedown="handleItemClick"
                @mouseover="pointer"
                v-model="name"
                placeholder="Tên"
              />
            </div>
            <span v-show="errorName">{{ errorName }}</span>
            <div class="from-control">
              <input type="number" class="form-input" placeholder="Số điện thoại" />
            </div>
            <div class="from-control">
              <select name id class="form-input" >
                <option value>Tỉnh/Thành phố</option>
                <option value v-for="item in provinces" :key="item.id">{{ item.province_name }}</option>
              </select>
            </div>
            <div class="from-control">
              <select name id class="form-input">
                <option value>Quận/huyện</option>
                <option value>anhquy</option>
              </select>
            </div>
            <div class="from-control">
              <input type="text" class="form-input" placeholder="Tòa nhà , Tên đường"/>
            </div>
          </div>-->
          <div class="btn-action">
            <button @click=" back">Trở lại</button>
            <button>Hoàn thành</button>
          </div>
        </div>
      </div>
      <div class="infor-customer">
        <p>Địa Chỉ Nhận Hàng</p>
        <p>
          <strong>quy (+84) 365373705</strong> 123-Cửu Việt 2 , Thị Trấn Trâu Quỳ, Huyện Gia Lâm, Hà Nội
        </p>
      </div>
      <div class="product-checkout" v-for="item in carts" :key="item.id">
        <div class="product" v-for=" prod in item.cart_details" :key="prod.id">
          <div class="name">
            <div class="name-shop">
              <h4>Sản phẩm</h4>
              <p>
                <span>{{ item.user.name }}</span>
                <span @click="showDivChat(prod)">Chat ngay</span>
              </p>
            </div>
            <div class="img-name-pr">
              <div class="img">
                <img :src="prod.HomeTeam.image" alt />
              </div>
              <div class="name-pr">
                <a>{{ prod.HomeTeam.name }}</a>
              </div>
            </div>
          </div>
          <div class="price">
            <p>Đơn giá</p>
            <div class="infor">
              <p>₫{{ prod.HomeTeam.discount }}</p>
            </div>
          </div>
          <div class="qty">
            <p>Số lượng</p>
            <div class="infor">
              <p>{{ prod.qty }}</p>
            </div>
          </div>
          <div class="total-money">
            <p>Thành tiền</p>
            <div class="infor">
              <!-- <p>₫{{ item.users[0].carts.qty * item.discount }}</p> -->
            </div>
          </div>
        </div>
        <!-- <div class="send-saler">
          <span>Lời nhắn:</span>
          <input type="text" />
        </div>-->
        <!-- <div class="total-money-product">
          <p>
            Tổng số tiền ({{ item.users[0].carts.qty }} sản phẩm):
            <span
              style="color :red "
            >₫{{ item.users[0].carts.qty * item.discount }}</span>
          </p>
        </div>-->
      </div>
      <div class="check-out">
        <div class="title">
          <div class="title-pay">
            <p>Phương thức thanh toán</p>
          </div>
          <div class="title-choose-pay">
            <p>Thanh toán khi nhận hàng</p>
          </div>
          <div class="change-pay">
            <p>Thay dổi</p>
          </div>
        </div>
        <div class="check-end">
          <div class="div-right">
            <div class="div">
              <div>Tổng tiền hàng</div>
              <!-- <div>₫{{ sumMoneyCart }}</div> -->
            </div>
            <div class="div">
              <div>Phí vận chuyển</div>
              <div>₫0</div>
            </div>
            <div class="div">
              <div>Tổng tiền hàng</div>
              <div class="money-sum">₫{{ sumMoneyCart }}</div>
            </div>
          </div>
          <div style="clear:bold;"></div>
        </div>
        <div class="button">
          <div class="btn-action">
            <nuxt-link to="/user/order/history">
              <button @click="checkoutCart">Đặt hàng</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // showPopInforCustom: false,
      name: "",
      errorName: "",
      phone: "",
      address: "",
      sum: "",
      UserIdSaler: "",
      note: ""
    };
  },

  async asyncData({ $axios, store }) {
    var data = await $axios.get("/api/cart/checkout");
    console.log(data);
    var showPopInforCustom = false;
    if (store.state.authUser) {
      if (store.state.authUser.phone == 0) {
        showPopInforCustom = false;
      } else if (store.state.authUser.phone == 0) {
        showPopInforCustom = false;
      }
    }

    return {
      carts: data.data.carts,
      showPopInforCustom: showPopInforCustom
    };
  },
  computed: {
    // sumMoneyCart() {
    //   var sum = 0;
    //   for (var i = 0; i < this.carts.length; i++) {
    //     var sum = sum + this.carts[i].discount * this.carts[i].users[0].carts.qty;
    //   }
    //   return sum;
    // },
  },
  methods: {
    back() {
      this.showPopInforCustom = false;
      this.$router.push("/cart");
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
        this.$store.commit("TOGGLE_CHAT");
      }
    },
    handleItemClick() {
      console.log("vao");
    },
    pointer() {
      if (this.name == "") {
        console.log("chu nhap giuw lieu");
        this.errorName = "Vui lòng điền Tên";
      } else {
        this.errorName = " ";
      }
    },
    checkoutCart() {
      this.$axios
        .post("/api/cart/addCartCustomer", {
          carts: this.carts,
          phone: this.phone,
          address: this.address,
          UserIdSaler: this.UserIdSaler,
          note: this.note
        })
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
}
.container-checkout {
  width: 100%;
  height: auto;
  background: #f5f5f5;
  .container {
    width: 1200px;
    margin: auto;
    .check-out {
      width: 100%;
      height: 300px;
      padding: 20px 10px;
      margin: 20px 0px;
      background: white;
      .title {
        display: flex;
        .title-pay {
          width: 60%;
        }
        .title-choose-pay {
          width: 25%;
        }
        .change-pay {
          width: 15%;
        }
      }
      .check-end {
        width: 100%;
        .div-right {
          width: 40%;
          margin-left: 72%;
        }
        .div {
          margin: 30px 0px;
          width: 100%;
          display: flex;
          div {
            margin-left: 40px;
            font-size: 0.875rem;
            color: rgba(0, 0, 0, 0.54);
            .money-sum {
              height: 3.125rem;
              font-size: 1.75rem;
              color: #ee4d2d;
            }
          }
        }
      }
      .button {
        width: 100%;
        .btn-action {
          width: 30%;
          margin-left: 82%;
          button {
            width: 50%;
            background-color: #2b3278;
            height: 40px;
            text-transform: uppercase;
            color: white;
            border: none;
          }
        }
      }
    }
    .product-checkout {
      width: 100%;
      height: 300px;
      padding: 20px 10px;
      margin: 20px 0px;
      background: white;

      .product {
        display: flex;
      }
      .send-saler {
        margin-top: 30px;
      }
      .total-money-product {
        width: 30%;
        margin-left: 75%;
      }
      .name {
        width: 40%;
        .name-shop {
          margin-bottom: 30px;
          p {
            margin-top: 20px;
          }
        }
        .img-name-pr {
          display: flex;
          .img {
            width: 30%;
            img {
              width: 100%;
            }
          }
        }
        .name-pr {
          padding-left: 15px;
        }
      }
      .price {
        width: 20%;
        padding-left: 25px;
        .infor {
          margin-top: 80px;
        }
      }
      .qty {
        width: 20%;
        padding-left: 25px;
        .infor {
          margin-top: 80px;
        }
      }
      .total-money {
        padding-left: 25px;
        width: 20%;
        .infor {
          margin-top: 80px;
        }
      }
    }
    .infor-customer {
      background: white;
      padding: 20px 10px;
      p:nth-child(1) {
        color: red;
        margin-bottom: 20px;
      }
    }
    .popup-infor-customer {
      position: fixed;
      width: 100vw;
      height: 100vh;
      z-index: 1001;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.14);
      .pop {
        width: 27%;
        background: white;
        height: auto;
        margin: 10% auto;
        padding: 20px 15px;
        .title {
          margin: 10px 0px;
        }
        .form {
          p {
            font-size: 14px;
            margin-top: 30px;
          }
          width: 100%;
          .from-control {
            width: 100%;
            .form-input {
              border: 1px solid rgba(0, 0, 0, 0.14);
              width: 100%;
              height: 40px;
              margin: 6px 0px;
              padding: 10px;
            }
          }
        }
        .btn-action {
          display: flex;
          margin-top: 30px;
          button {
            width: 140px;
            text-transform: uppercase;
            padding: 10px;
          }
          button:nth-child(1) {
            background: white;
            border: none;
          }
          button:nth-child(2) {
            background-color: #2b3278;
            color: white;
            border: none;
          }
        }
      }
    }
  }
}
</style>
