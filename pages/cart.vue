<template>
  <div class="container-fruid">
    <transition name="bounce" leave-active-class="animated bounceOutRight">
      <div class="add-cart-notification" v-if="toggleComfirmCart">
        <div v-if="addCartNofi">
          <p>Bạn muốn xóa sản phẩm :</p>
          <div class="product-add-cart">
            <div class="img">
              <img :src="cart.HomeTeam.image" alt />
            </div>
            <div class="infor-product-cart" style="padding-left : 20px;">
              <p>{{ cart.HomeTeam.name }}</p>

              <div class="qty">
                <!-- thành tiền : -->
                <span style="color : red ; font-weight : bold;">{{ cart.HomeTeam.discount }}</span>
              </div>
            </div>
          </div>
          <div style="display:flex;">
            <button
              @click="deleteCart(cart)"
              style="width : 150px;height : 33px;margin : 10px 50px; background:white;color:red;border:1px solid red;"
            >Có</button>
            <button
              @click="toggleComfirmCart = false"
              style="width : 150px;margin : 10px 50px;height : 33px; background:red;color:white;border:none;"
            >Không</button>
          </div>
        </div>
        <div v-else>
          <p v-if="sumMoneyCart == 0 && !notEnough">Bạn chưa chọn sản phẩm nào để mua</p>
          <p v-if="notEnough">Kho hàng của sản phẩm không đủ.</p>
          <button
            @click="nofiCartBlank"
            style="width : 100%;    background: #ee4d2d; height : 30px; color : white; margin-top : 30%; border :none;  "
          >OK</button>
        </div>
      </div>
    </transition>
    <div class="container-cart">
      <div class="title-cart" v-if="carts.length">
        <div class="check">
          <label class="container">
            sản phẩm
            <input type="checkbox" checked="checked" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="bill">Đơn Giá</div>
        <div class="qty">Số Lượng</div>
        <div class="money">Số Tiền</div>
        <div class="action">Thao Tác</div>
      </div>
      <div class="cart-product" v-for="item in carts " :key="item.id">
        <!-- <h1>sdadsasda</h1>
        <div class="" v-for=" prod in item.cart_details ">
          <img :src="prod.HomeTeam.image" alt="">
        </div>-->
        <div class="saler-cart">
          <label class="container">
            <i class="fas fa-close"></i>
            {{ item.user.name }}
            <input type="checkbox" checked="checked" />
          </label>
        </div>
        <div class="cart-main" v-for=" prod in item.cart_details " :key="prod.id">
          <div class="pr-cart">
            <label class="container" v-if="prod.HomeTeam.qty > 0">
              <i class="fas fa-close"></i>
              <input
                type="checkbox"
                checked="checked"
                v-if="prod.checkBuy == 1"
                @click="changeStatus(prod)"
              />
              <input type="checkbox" v-else @click="changeStatus(prod)" />
              <span class="checkmark"></span>
            </label>
            <p v-if="prod.HomeTeam.qty == 0" class="hethang">Hết hàng</p>

            <div class="img">
              <img width="42%" :src="prod.HomeTeam.image" alt />
            </div>
            <div class="name">
              <p>{{ prod.HomeTeam.name }}</p>
              <div v-if=" prod.classifies != null ">
                <span>phân loại hàng :</span>
                <span>{{ prod.classifies.name }}</span>
              </div>
              <span @click="prod.is_tab = true" v-if=" prod.classifies != null">Đổi loại hàng</span>
              <div class="pop-classify" v-if=" prod.is_tab">
                <button
                  v-for="item in prod.HomeTeam.classifies "
                  :key="item.id"
                  :class="{ activeClassify:item.id == prod.classifies.id} "
                  v-if=" prod.classifies != null && item.qty == 0"
                  class="button disabled"
                >{{ item.name }}</button>
                <p v-if="item.qty == 0" class="hethang">Hết hàng</p>
                <button
                  v-for="item in prod.HomeTeam.classifies"
                  :key="item.id"
                  :class="{ activeClassify:item.id == selected} "
                  v-if=" prod.classifies != null && item.qty != 0 && prod.is_tab"
                  @click="selectClassify(item)"
                >{{ item.name }}</button>
                
                <button @click="comfirmChangeClassify(prod)">Xác nhận</button>
              </div>
            </div>
          </div>
          <div class="price" v-if=" prod.classifies == null ">
            <p>₫{{ formatPrice(prod.HomeTeam.price) }} ₫ {{ formatPrice(prod.HomeTeam.discount) }}</p>
          </div>
          <div class="price" v-else>
            <p>₫{{ formatPrice(prod.classifies.price) }}</p>
          </div>
          <div class="price" v-if=" prod.classifies == null ">
            <div class="qty-action">
              <div class="btn-txt">
                <button @click="reduction(prod,item)">
                  <i class="fas fa-minus"></i>
                </button>
                <input type="text" class="txt-qty" :value=" prod.qty " />
                <button @click="increment(prod,item)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="price" v-else>
            <div class="qty-action">
              <div class="btn-txt">
                <button @click="reduction(prod,item)">
                  <i class="fas fa-minus"></i>
                </button>
                <input type="text" class="txt-qty" :value=" prod.qty " />
                <button @click="increment(prod,item)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="price-sum" v-if=" prod.classifies == null ">
            <p>₫{{ formatPrice(prod.qty * prod.HomeTeam.discount) }}</p>
          </div>
          <div class="price-sum" v-else>
            <p>₫{{ formatPrice(prod.qty * prod.classifies.price) }}</p>
          </div>
          <div class="action">
            <p @click="showPopCart(prod,item)">Xóa</p>
          </div>
        </div>
      </div>
      <div class="popup-total-cart" v-if="carts.length">
        <div class="total-cart">
          <!-- <label class="container">
            Chọn tất cả (8)
            <input type="checkbox" checked="checked" />
            <span class="checkmark"></span>
          </label>-->
          <div>
            <p>
              Tổng tiền hàng ({{ sumQtyCart }} sản phẩm):
              <span
                class="sum-money"
              >₫{{ formatPrice(sumMoneyCart) }}</span>
            </p>
          </div>
          <div class="btn-action">
            <nuxt-link to="/checkout" v-if="sumMoneyCart > 0">
              <button class="btn-buy">Thanh toán</button>
            </nuxt-link>
            <button v-if="sumMoneyCart == 0" @click=" nofiCartBlank" class="btn-buy">Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!carts.length" class="container-fruid">
      <div class="container-cart">
        <div class="img-blank">
          <img src="/img/cart_blank.png" alt />
          <div class="btn">
            <p>Giỏ hàng của bạn còn trống</p>
            <nuxt-link to="/">
              <button>mua ngay</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  async asyncData({ $axios, store }) {
    var data = await $axios.get("/api/cart/");
    console.log(data.data);
    // var carts = data.data.filter(data => data.users.length !== 0);
    // store.commit("LIST_CART", carts);
    data.data.forEach(item => {
      item.cart_details.forEach(prod => {
        Vue.set(prod, "is_tab", false);
      });
    });  

    return { carts: data.data };
  },
  head: {
    title: 'Giỏ Hàng',
  },
  data() {
    return {
      cart: {},
      toggleComfirmCart: false,
      item: "",
      addCartNofi: false,
      selected: "",
      notEnough : false
    };
  },
  methods: {
    comfirmChangeClassify(item) {
      console.log(item)
      this.$axios
        .post("/api/cart/changeClassify", {
          id: this.selected,
          ProductId: item.HomeTeam.id
        })
        .then(response => {
          console.log(response);
          item.is_tab = false
          item.classifies = response.data;
        });
    },
    selectClassify(item) {
      this.selected = item.id;
    },
    nofiCartBlank() {
      this.toggleComfirmCart = !this.toggleComfirmCart;
      this.notEnough = false
      this.addCartNofi = false
    },
    changeStatus(prod) {
      if (prod.checkBuy == 1) {
        prod.checkBuy = 0;
      } else {
        prod.checkBuy = 1;
      }
      this.$axios
        .post("/api/cart/changeCheckBuy", {
          checkBuy: prod.checkBuy,
          id: prod.id
        })
        .then(response => {
          console.log(response);
        });
    },
    reduction(prod) {
      if (prod.qty == 1) {
        this.cart = prod;
        this.toggleComfirmCart = true;
        this.addCartNofi = true;
      } else {
        prod.qty = prod.qty - 1;
        this.$axios
          .post("/api/cart/changeQty", {
            ProductId: prod.ProductId,
            qty: prod.qty
          })
          .then(response => {
            this.$store.commit("REDUC_CART");
          });
      }
    },
    increment(item) {
      console.log(item);
      if (item.classifies == null) {
        if (item.qty < item.HomeTeam.qty) {
          console.log("null");
          item.qty = item.qty + 1;
          this.$axios
            .post("/api/cart/changeQty", {
              ProductId: item.ProductId,
              qty: item.qty
            })
            .then(response => {
              this.$store.commit("ADD_CART");
            });
        } else {
          this.toggleComfirmCart = true;
          this.notEnough = true;
          item.qty = item.HomeTeam.qty;
        }
      } else {
        if (item.qty < item.classifies.qty) {
          console.log("j");
          item.qty = item.qty + 1;
          this.$axios
            .post("/api/cart/changeQty", {
              ProductId: item.ProductId,
              qty: item.qty,
              ClassifyId: item.ClassifyId
            })
            .then(response => {
              this.$store.commit("ADD_CART");
            });
        } else {
          this.toggleComfirmCart = true;
          this.notEnough = true;
          item.qty = item.classifies.qty;
        }
      }
    },
    showPopCart(prod, item) {
      this.cart = prod;
      this.item = item;
      this.toggleComfirmCart = true;
      this.addCartNofi = true;
    },
    deleteCart(prod) {
      console.log(prod);
      this.cart = {};
      this.toggleComfirmCart = false;
      // var index = this.carts.indexOf(item);
      for (var i = 0; i < this.carts.length; i++) {
        var index = this.carts[i].cart_details.indexOf(prod);
        if (index > -1) {
          this.carts[i].cart_details.splice(index, 1);
          if (this.carts[i].cart_details.length == 0) {
            console.log(this.carts);
            var index = this.carts.indexOf(this.item);
            this.carts.splice(index, 1);
          }
        }

        console.log(index);
      }

      this.$axios
        .post("/api/cart/deleteCart", {
          ProductId: prod.ProductId
        })
        .then(response => {
          this.$store.commit("DELETE_CART", prod.qty);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  computed: {
    sumQtyCart() {
      var sum = 0;
      for (var i = 0; i < this.carts.length; i++) {
        console.log(this.carts[i]);
        for (var j = 0; j < this.carts[i].cart_details.length; j++) {
          if (this.carts[i].cart_details[j].checkBuy == 1) {
            var sum = sum + this.carts[i].cart_details[j].qty;
          }
          console.log(this.carts[i].cart_details[j]);
        }
      }
      return sum;
    },
    sumMoneyCart() {
      var sum = 0;
      for (var i = 0; i < this.carts.length; i++) {
        for (var j = 0; j < this.carts[i].cart_details.length; j++) {
          if (
            this.carts[i].cart_details[j].checkBuy == 1 &&
            this.carts[i].cart_details[j].classifies == null
          ) {
            var sum =
              sum +
              this.carts[i].cart_details[j].HomeTeam.discount *
                this.carts[i].cart_details[j].qty;
          } else if (
            this.carts[i].cart_details[j].checkBuy == 1 &&
            this.carts[i].cart_details[j].classifies != null
          ) {
            console.log(" no null");
            var sum =
              sum +
              this.carts[i].cart_details[j].classifies.price *
                this.carts[i].cart_details[j].qty;
          }
        }
      }
      return sum;
    }
  }
};
</script>
<style lang="scss" scoped>
.hethang {
  width: 50px;
  margin-right: 10px;
  padding: 5px 10px;
  color: white;
  background: black;
}
.activeClassify {
  border: 1px solid red !important ;
  color: red !important ;
}
.total-cart {
  margin-left: 40%;
  .sum-money {
    font-size: 1.875rem;
    line-height: 1.875rem;
    margin-left: 0.3125rem;
    color: #ee4d2d;
  }
}
.btn-buy {
  width: 230px;
  background: red;
  color: white;
  border: none;
  margin-left: 10px;
  height: 50px;
  margin-left: 30px;
}
.img-blank {
  width: 1200px;
  background: white;
  margin: auto;
  img {
    margin-left: 35%;
  }
  .btn {
    text-align: center;
    margin-top: 30px;
    width: 20%;
    margin: auto;
    font-weight: bold;
    font-size: 17px;
    button {
      width: 60%;
      margin: 20px;
      height: 40px;
      background-color: #2b3278;
      color: white;
      border: none;
      text-transform: uppercase;
    }
  }
}
button {
  cursor: pointer;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
.container-detail {
  background: #f0f0f0;
}
.container {
  background: white;
  margin-top: 100px;
}
.add-cart-notification {
  position: fixed;
  z-index: 20;
  top: 20%;
  width: 24%;
  left: 36%;
  right: 0;
  padding: 10px;
  background: white;
  height: 300px;
  text-align: center;
  border-radius: 10px;
  -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  p {
    color: black;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .product-add-cart {
    display: flex;
    text-align: center;
    .img {
      width: 40%;
      img {
        width: 100%;
      }
    }
    .qty {
      margin-top: 10px;
    }
  }
}
.qty-action {
  display: flex;
  margin: 4% 0%;
  .btn-txt {
    margin: 0px 20px;
  }
  button {
    background: white;
    border: none;
    height: 100%;
    outline: none;
    border: 1px solid grey;
    cursor: pointer;
  }
  .txt-qty {
    width: 30px;
    padding: 3px 0px;
  }
}
.container-fruid {
  width: 100%;
  background: #f5f5f5;
  position: relative;
  .container-cart {
    width: 1200px;
    margin: auto;
    .popup-total-cart {
      // position: fixed;
      // align-items: center;
      // -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
      // -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
      // box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
      // z-index: 999;
      // bottom: 0;
      width: 1200px;
      margin: auto;
      height: 120px;
      background: white;
      .total-cart {
        display: flex;
      }
    }
    .cart-product {
      margin-top: 20px;
      width: 100%;
      background: white;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
      border-radius: 0.125rem;
      overflow: hidden;
      border-radius: 3px;
      height: auto;
      font-size: 0.875rem;
      background: #fff;
      text-transform: capitalize;
      color: #888;
      align-items: center;
      padding: 7px 20px;
      .cart-main {
        display: flex;
        width: 100%;
        align-items: center;
        color: black;
        border-top: 1px solid #e8e8e8;
        padding-top: 20px;
        .pr-cart {
          width: 45%;
          display: flex;
          .img {
            width: 30%;
            img {
              width: 80%;
            }
          }
          .name {
            width: 70%;
            p {
              font-weight: bold;
            }
            .pop-classify {
              width: 300px;
              height: 200px;
              position: absolute;
              z-index: 99;
              box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
              padding: 20px;
              background: white;
            }
            button {
              margin: 4px;
              width: 30%;
              cursor: pointer;
              display: inline-block;
              min-width: 5rem;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
              padding: 0 0.75rem;
              height: 2.125rem;
              line-height: 1;
              margin: 0 8px 8px 0;
              color: rgba(0, 0, 0, 0.8);
              text-align: center;
              white-space: nowrap;
              border-radius: 2px;
              border: 1px solid rgba(0, 0, 0, 0.09);
              position: relative;
              background: #fff;
              outline: 0;
              &:hover {
                color: red;
                border: 1px solid red;
              }
            }
            button.disabled {
              opacity: 0.65;
              cursor: not-allowed;
              &:hover {
                color: rgba(0, 0, 0, 0.8) !important;
                border: 1px solid rgba(0, 0, 0, 0.09) !important;
              }
            }
          }
        }
        .price-sum {
          width: 13.65%;
          color: red;
        }
        .price {
          width: 13.65%;
        }
        .action {
          width: 13.65%;
          p {
            cursor: pointer;
          }
        }
      }
    }
    .title-cart {
      display: flex;
      width: 100%;
      background: white;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
      border-radius: 0.125rem;
      overflow: hidden;
      border-radius: 3px;
      height: 3.4375rem;
      font-size: 0.875rem;
      background: #fff;
      text-transform: capitalize;
      color: #888;
      align-items: center;
      padding: 0 20px;
      .check {
        width: 45%;
      }
      .bill {
        width: 13.75%;
      }
      .qty {
        width: 13.75%;
      }
      .money {
        width: 13.75%;
      }
      .action {
        width: 13.75%;
      }
    }
  }
}
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>

