<template>
  <div class="container-fruid">
    <transition name="bounce" leave-active-class="animated bounceOutRight">
      <div class="add-cart-notification" v-if="toggleComfirmCart">
        <p>Bạn muốn xóa sản phẩm :</p>
        <div class="product-add-cart">
          <div class="img">
            <img :src="cart.HomeTeam.image" alt />
          </div>
          <div class="infor-product-cart">
            <p>{{ cart.HomeTeam.name }}</p>
            <!-- <div class="qty">
                số lượng sp trong giỏ hàng :
                <span
                  style="color : red ; font-weight : bold;"
                >{{ pr}}</span>
            </div>-->
            <div class="qty">
              <!-- thành tiền : -->
              <span style="color : red ; font-weight : bold;">{{ cart.HomeTeam.discount }}</span>
            </div>
          </div>
        </div>
        <p @click="deleteCart(cart)">Có</p>
        <p @click="toggleComfirmCart = false">Không</p>
      </div>
    </transition>
    <div class="container-cart">
      <div class="title-cart">
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
            <i class="fas fa-close"></i>Phamquy
            <input type="checkbox" checked="checked" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="cart-main" v-for=" prod in item.cart_details ">
          <div class="pr-cart">
            <label class="container">
              <i class="fas fa-close"></i>
              <input type="checkbox" checked="checked" />
              <span class="checkmark"></span>
            </label>
            <div class="img">
              <img width="42%" :src="prod.HomeTeam.image" alt />
            </div>
            <div class="name">
              <p>{{ prod.HomeTeam.name }}</p>
            </div>
          </div>
          <div class="price">
            <p>₫190.000 ₫ {{ prod.HomeTeam.price }}</p>
          </div>
          <div class="price">
            <div class="qty-action">
              <div class="btn-txt">
                <button @click="reduction(prod)">
                  <i class="fas fa-minus"></i>
                </button>
                <input type="text" class="txt-qty" :value=" prod.qty " />
                <button @click="increment(prod)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="price-sum">
            <p>₫396.000</p>
          </div>
          <div class="action">
            <p @click="showPopCart(prod,item)">Xóa</p>
          </div>
        </div>
      </div>
      <div class="popup-total-cart">
        <div class="total-cart">
          <label class="container">
            Chọn tất cả (8)
            <input type="checkbox" checked="checked" />
            <span class="checkmark"></span>
          </label>
          <div>
            <p>Tổng tiền hàng ({{ sumQtyCart }} sản phẩm): ₫{{sumMoneyCart}}</p>
          </div>
          <div class="btn-action">
            <nuxt-link to="/checkout">
              <button>Thanh toán</button>
            </nuxt-link>
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
export default {
  async asyncData({ $axios, store }) {
    var data = await $axios.get("/api/cart/");
    console.log(data.data);
    // var carts = data.data.filter(data => data.users.length !== 0);
    // store.commit("LIST_CART", carts);
    return { carts: data.data };
  },
  data() {
    return {
      cart: {},
      toggleComfirmCart: false,
      item: ""
    };
  },
  methods: {
    reduction(prod) {
      // if (this.qtyProduct > this.product.qty) {
      //   this.qtyProduct = this.product.qty;
      // } else {
      //   this.qtyProduct = this.qtyProduct + 1;
      // }
      if (prod.qty == 1) {
        prod.qty = 1;
      } else {
        prod.qty = prod.qty - 1;
        this.$axios
          .post("/api/cart/changeQty", {
            ProductId: prod.ProductId,
            qty: prod.qty
          })
          .then(response => {
            console.log(response);
          });
      }
    },
    increment(item) {
      console.log(item);
      if (item.qty < item.HomeTeam.qty) {
        item.qty = item.qty + 1;
        this.$axios.post("/api/cart/changeQty", {
          ProductId: item.ProductId,
          qty: item.qty
        });
      } else {
        item.qty = item.HomeTeam.qty;
      }
    },
    showPopCart(prod, item) {
      this.cart = prod;
      this.item = item;
      this.toggleComfirmCart = true;
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

      this.$axios.post("/api/cart/deleteCart", {
        ProductId: prod.ProductId
      });
    }
  },
  computed: {
    sumQtyCart() {
      var sum = 0;
      for (var i = 0; i < this.carts.length; i++) {
        console.log(this.carts[i])
        for (var j = 0; j < this.carts[i].cart_details.length; j++) {
          var sum = sum + this.carts[i].cart_details[j].qty;
          console.log(this.carts[i].cart_details[j])
        }
      }
      return sum;
    },
    sumMoneyCart() {
      var sum = 0;
      for (var i = 0; i < this.carts.length; i++) {
        for (var j = 0; j < this.carts[i].cart_details.length; j++) {
          var sum = sum + this.carts[i].cart_details[j].HomeTeam.discount * this.carts[i].cart_details[j].qty;
        }
      }
      return sum;
    }
  }
};
</script>
<style lang="scss" scoped>
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
      position: fixed;
      align-items: center;
      -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
      box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
      z-index: 999;
      bottom: 0;
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

