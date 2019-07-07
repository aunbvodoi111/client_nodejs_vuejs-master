<template>
  <div class="container-detail">
    <div class="container">
      <transition name="bounce" leave-active-class="animated bounceOutRight">
        <div class="add-cart-notification" v-show="showNofication" v-if="$store.state.authUser ">
          <p>Bạn vừa thêm sản phẩm :</p>
          <div class="product-add-cart">
            <div class="img">
              <img :src="product.image" alt />
            </div>
            <div class="infor-product-cart">
              <p>{{ product.name }}</p>
              <!-- <div class="qty">
                số lượng sp trong giỏ hàng :
                <span
                  style="color : red ; font-weight : bold;"
                >{{ pr}}</span>
              </div>-->
              <div class="qty">
                <!-- thành tiền : -->
                <span style="color : red ; font-weight : bold;">{{ product.discount }}</span>
              </div>
            </div>
          </div>
          <p>Vào giỏ hàng</p>
        </div>
      </transition>
      <div class="title-content">
        <h4>Trang chủ > Năm sinh</h4>
      </div>
      <div class="content-detail-pr">
        <div class="content-left">
          <div class="img">
            <img :src="product.image" alt />
          </div>
          <div class="icon-share">
            <span>
              Chia sẻ :
              <i class="fab fa-facebook"></i>
              <i class="fab fa-google-plus"></i>
              <i class="fab fa-twitter"></i>
            </span>
            <span @click="addWishe(product)" v-if="checkWishe != undefined ">
              <i class="fas fa-heart"></i>
              Đã thích ({{ count.length }})
            </span>
            <span @click="addWishe(product)" v-if="checkWishe == undefined ">
              <i class="far fa-heart"></i>
              Chưa thích ({{ count.length }})
            </span>
          </div>
        </div>
        <div class="content-right">
          <h2>{{ product.name }}</h2>
          <div class="rating-total-detail">
            <div class="total-rating">
              {{ mediumstar }}
              <i
                class="fas fa-star"
                v-for=" n in Math.floor(mediumstar)"
                :key=" n + 1"
              ></i>
              <i class="far fa-star" v-for=" n in 5-Math.floor(mediumstar)" :key=" n + 200"></i>
            </div>
            <div class="number-rating">{{ product.ratings.length }} đánh giá</div>
            <div class="number-rating">45 đã bán</div>
          </div>
          <div class="price-detail">
            <span class="payment">₫ {{ product.price }}</span>
            <span class="discount">₫{{ product.discount }}</span>
          </div>
          <div class="qty-action">
            <span>Số Lượng</span>
            <div class="btn-txt">
              <button @click="reduction">
                <i class="fas fa-minus"></i>
              </button>
              <input type="text" class="txt-qty" v-model="qtyProduct" @keyup="changeQty" />

              <button @click="increment">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <span>{{ product.qty }} sản phẩm có sẵn</span>
          </div>
          <div class="btn-action-detail">
            <div class="btn-add-to-cart">
              <button @click="addCart">
                <i class="fas fa-shopping-cart"></i>
                Thêm Vào Giỏ Hàng
              </button>
            </div>
            <div class="btn-add-to-buy" @click="buyProduct">
              <nuxt-link to="/cart">
                <button>Mua ngay</button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <saler
      :product="product "
      :follows="follows"
      :totalProduct="totalProduct"
      :totalFollow="totalFollow"
      :sumRating="sumRating"
      :online ="online"
    />
    <Quesiton :product="product " :follows="follows" />
    <Rating :product=" product " @totalRating="totalRating" :productnew="productnew" />
    <ProductRelate />
  </div>
</template>
<script>
import Rating from "./../components/detail/rating";
import ProductRelate from "./../components/detail/productRelate";
import saler from "./../components/detail/saler";
import Quesiton from "./../components/detail/question";
import socket from "~/plugins/socket.io.js";
import Vue from "vue";
export default {
  transition: "bounceok",
  async asyncData({ params, $axios, req, store }) {
    const data = await $axios.get("/api/product/detailPr/" + params.id);
    var rating1 = [];
    data.data.products.ratings.forEach(item => {
      Vue.set(item, "is_rating", false);
      Vue.set(item, "contentcmt", "");
    });
    data.data.products.comments.forEach(item => {
      Vue.set(item, "is_comments", false);
      Vue.set(item, "rep_comment", "");
    });
    var product = data.data.products
    var online = 0
    if (store.state.authUser) {
      await socket.emit("joinRoom", store.state.authUser.name);
      socket.on("userOnline", async (data) => {
       var socketId
          for (socketId in data) {
            if (data[socketId].data === product.user.name) {
              var online = 1;
            }
          }
      });
    }
    var carts = data.data.carts;
    console.log(data.data);
    console.log(online);
    store.commit("LIST_CART", carts);
    return {
      carts: data.data.carts,
      product: data.data.products,
      productnew: data.data.products,
      count: data.data.count,
      follows: data.data.follows,
      online : online,
      totalProduct: data.data.totalProduct,
      totalFollow: data.data.totalFollow,
      sumRating: data.data.totalRating
    };
  },
  components: {
    Rating,
    ProductRelate,
    saler,
    Quesiton
  },
  data() {
    return {
      total: 0,
      mediumstar: 0,
      qtyProduct: 1,
      index: undefined,
      showNofication: false
    };
  },
  created(){

  },
  methods: {
    addWishe(product) {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        var find = this.count.find(
          count => count.UserId === this.$store.state.authUser.id
        );
        var index = this.count.indexOf(find);
        if (find) {
          this.count.splice(index, 1);
          if (this.count.length == 0) {
            this.count = [];
          }
        } else {
          var anhquy = {
            UserId: this.$store.state.authUser.id,
            ProductId: product.id
          };
          this.count.push(anhquy);
        }
        this.$axios
          .post("/api/wishe/add", {
            ProductId: this.product.id,
            qty: this.qtyProduct
          })
          .then(response => {
            console.log(response);
          });
      }
    },
    addCart() {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.showNofication = true;
        setTimeout(() => {
          this.showNofication = false;
        }, 3000);
        this.$axios
          .post("/api/cart/add", {
            ProductId: this.product.id,
            qty: this.qtyProduct,
            UserIdSaler: this.product.user.id
          })
          .then(response => {
            console.log(response);
            this.$store.commit("ADD_CART", response.data);
          });
      }
    },
    buyProduct() {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      }
    },
    changeQty() {
      if (this.qtyProduct > this.product.qty) {
        this.qtyProduct = this.product.qty;
      } else {
        this.qtyProduct = this.qtyProduct;
      }
    },
    totalRating(e) {
      this.total = e.total;
      this.mediumstar = e.mediumstar;
    },
    increment() {
      if (this.qtyProduct > this.product.qty) {
        this.qtyProduct = this.product.qty;
      } else {
        this.qtyProduct = this.qtyProduct + 1;
      }
    },
    reduction() {
      if (this.qtyProduct == 1) {
        this.qtyProduct = 1;
      } else {
        this.qtyProduct = this.qtyProduct - 1;
      }
    }
  },
  computed: {
    checkWishe: {
      get: function() {
        this.index;
        if (this.$store.state.authUser && this.count.length > 0) {
          this.index = this.count.find(
            count => count.UserId === this.$store.state.authUser.id
          );
          // index = count.length
        }
        console.log(this.index);

        return this.index;
      },
      set: function(newValue) {
        // this.checkWishe = newValue
        console.log(newValue);
        this.index = newValue;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
@media only screen and (min-width: 1200px) {
  .container-detail {
    width: 100%;
    .container {
      width: 1200px;
      margin: auto;
      .content-detail-pr {
        display: flex;
        .content-left {
          width: 40%;
          .img {
            img {
              width: 100%;
            }
          }
          .icon-share {
            margin: 4% 0%;
            i {
              font-size: 21px;
            }
            i:nth-child(1) {
              color: #4267b2;
            }
            i:nth-child(2) {
              color: #f05d40;
            }
            i:nth-child(3) {
              color: #006dbf;
            }
          }
        }
        .content-right {
          width: 60%;
          padding: 0px 20px;
          .rating-total-detail {
            display: flex;
            margin: 4% 0%;
            .total-rating {
              i {
                color: #fd9727;
                font-size: 14px;
              }
            }
            .number-rating {
              margin-left: 14px;
            }
          }
        }
        .price-detail {
          padding: 15px 20px;
          background: #fafafa;
          .payment {
            font-size: 1rem;
            text-decoration: line-through;
            color: #929292;
            margin-right: 10px;
          }
          .discount {
            font-size: 1.875rem;
            font-weight: 500;
            color: #ee4d2d;
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
        .btn-action-detail {
          display: flex;
          margin-top: 4%;
          width: 100%;
          .btn-add-to-cart {
            width: 30%;
            height: 48px;
            button {
              width: 100%;
              height: 100%;
              color: white;
              background-color: #2b3278;
              font-size: 14px;
              border: none;
            }
          }
          .btn-add-to-buy {
            width: 30%;
            height: 48px;
            margin-left: 20px;
            button {
              width: 100%;
              color: white;
              height: 100%;
              background-color: #2b3278;
              font-size: 14px;
              border: none;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .container-detail {
    width: 100%;
    .container {
      width: 90%;
      margin: auto;
      .content-detail-pr {
        display: flex;
        .content-left {
          width: 40%;
          .img {
            img {
              width: 100%;
            }
          }
          .icon-share {
            margin: 4% 0%;
            i {
              font-size: 21px;
            }
            i:nth-child(1) {
              color: #4267b2;
            }
            i:nth-child(2) {
              color: #f05d40;
            }
            i:nth-child(3) {
              color: #006dbf;
            }
          }
        }
        .content-right {
          width: 60%;
          padding: 0px 20px;
          .rating-total-detail {
            display: flex;
            margin: 4% 0%;
            .total-rating {
              i {
                color: #fd9727;
                font-size: 14px;
              }
            }
            .number-rating {
              margin-left: 14px;
            }
          }
        }
        .price-detail {
          padding: 15px 20px;
          background: #fafafa;
          .payment {
            font-size: 1rem;
            text-decoration: line-through;
            color: #929292;
            margin-right: 10px;
          }
          .discount {
            font-size: 1.875rem;
            font-weight: 500;
            color: #ee4d2d;
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
        .btn-action-detail {
          display: flex;
          margin-top: 4%;
          width: 100%;
          .btn-add-to-cart {
            width: 30%;
            height: 48px;
            button {
              width: 100%;
              height: 100%;
              color: white;
              background-color: #2b3278;
              font-size: 14px;
              border: none;
            }
          }
          .btn-add-to-buy {
            width: 30%;
            height: 48px;
            margin-left: 20px;
            button {
              width: 100%;
              color: white;
              height: 100%;
              background-color: #2b3278;
              font-size: 14px;
              border: none;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .container-detail {
    width: 100%;
    .container {
      width: 90%;
      margin: auto;
      .content-detail-pr {
        display: flex;
        .content-left {
          width: 45%;
          .img {
            img {
              width: 100%;
            }
          }
          .icon-share {
            margin: 4% 0%;
            i {
              font-size: 21px;
            }
            i:nth-child(1) {
              color: #4267b2;
            }
            i:nth-child(2) {
              color: #f05d40;
            }
            i:nth-child(3) {
              color: #006dbf;
            }
          }
        }
        .content-right {
          width: 60%;
          padding: 0px 20px;
          .rating-total-detail {
            display: flex;
            margin: 4% 0%;
            .total-rating {
              i {
                color: #fd9727;
                font-size: 14px;
              }
            }
            .number-rating {
              margin-left: 14px;
            }
          }
        }
        .price-detail {
          padding: 15px 20px;
          background: #fafafa;
          .payment {
            font-size: 1rem;
            text-decoration: line-through;
            color: #929292;
            margin-right: 10px;
          }
          .discount {
            font-size: 1.875rem;
            font-weight: 500;
            color: #ee4d2d;
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
        .btn-action-detail {
          display: flex;
          margin-top: 4%;
          width: 100%;
          .btn-add-to-cart {
            width: 50%;
            height: 48px;
            button {
              width: 100%;
              height: 100%;
              color: white;
              background-color: #2b3278;
              font-size: 14px;
              border: none;
            }
          }
          .btn-add-to-buy {
            width: 50%;
            height: 48px;
            margin-left: 20px;
            button {
              width: 100%;
              color: white;
              height: 100%;
              background-color: #2b3278;
              font-size: 14px;
              border: none;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 320px) and (max-width: 575px) {
  .container-detail {
    width: 100%;
    .container {
      width: 100%;
      margin: auto;
      .content-detail-pr {
        .content-left {
          width: 100%;
          .img {
            img {
              width: 100%;
            }
          }
          .icon-share {
            margin: 4% 4%;
            i {
              font-size: 21px;
            }
            i:nth-child(1) {
              color: #4267b2;
            }
            i:nth-child(2) {
              color: #f05d40;
            }
            i:nth-child(3) {
              color: #006dbf;
            }
          }
        }
        .content-right {
          width: 100%;
          padding: 0px 20px;
          h2 {
            font-weight: normal;
            font-size: 15px;
          }
          .rating-total-detail {
            display: flex;
            margin: 4% 0%;
            .total-rating {
              i {
                color: #fd9727;
                font-size: 12px;
              }
            }
            .number-rating {
              margin: 3px 10px;
              font-size: 13px;
            }
          }
        }
        .price-detail {
          padding: 15px 20px;
          background: #fafafa;
          .payment {
            font-size: 1rem;
            text-decoration: line-through;
            color: #929292;
            margin-right: 10px;
          }
          .discount {
            font-size: 1.2rem;
            font-weight: 500;
            color: #ee4d2d;
          }
        }
        .qty-action {
          display: flex;
          margin: 4% 0%;
          font-size: 13px;
          .btn-txt {
            margin: 0px 10px;
          }
          button {
            background: white;
            border: none;
            width: 25px;
            height: 25px;
            outline: none;
            border: 1px solid grey;
            cursor: pointer;
          }
          .txt-qty {
            width: 20px;
            padding: 3px 0px;
          }
        }
        .btn-action-detail {
          // display: flex;
          margin-top: 4%;
          width: 100%;
          .btn-add-to-cart {
            width: 100%;
            height: 34px;
            button {
              width: 100%;
              height: 100%;
              color: white;
              background-color: #2b3278;
              font-size: 14px;
              border: none;
            }
          }
          .btn-add-to-buy {
            width: 100%;
            height: 34px;
            margin-top: 10px;
            button {
              width: 100%;
              color: white;
              height: 100%;
              background-color: #2b3278;
              font-size: 14px;
              border: none;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 768px) and (min-width: 576px) {
  .container-detail {
    width: 100%;
    .container {
      width: 98%;
      margin: auto;
      .content-detail-pr {
        display: flex;
        .content-left {
          width: 40%;
          .img {
            img {
              width: 100%;
            }
          }
          .icon-share {
            margin: 4% 0%;
            i {
              font-size: 21px;
            }
            i:nth-child(1) {
              color: #4267b2;
            }
            i:nth-child(2) {
              color: #f05d40;
            }
            i:nth-child(3) {
              color: #006dbf;
            }
          }
        }
        .content-right {
          h2 {
            font-size: 17px;
            font-weight: normal;
          }
          width: 60%;
          padding: 0px 10px;
          .rating-total-detail {
            display: flex;
            margin: 4% 0%;
            .total-rating {
              i {
                color: #fd9727;
                font-size: 14px;
              }
            }
            .number-rating {
              margin-left: 14px;
            }
          }
        }
        .price-detail {
          padding: 15px 20px;
          background: #fafafa;
          .payment {
            font-size: 1rem;
            text-decoration: line-through;
            color: #929292;
            margin-right: 10px;
          }
          .discount {
            font-size: 1.875rem;
            font-weight: 500;
            color: #ee4d2d;
          }
        }
        .qty-action {
          display: flex;
          margin: 4% 0%;
          .btn-txt {
            margin: 0px 5px;
          }
          button {
            background: white;
            border: none;
            height: 30px;
            width: 30px;
            outline: none;
            border: 1px solid grey;
            cursor: pointer;
          }
          .txt-qty {
            width: 30px;
            padding: 3px 0px;
          }
        }
        .btn-action-detail {
          display: flex;
          margin-top: 4%;
          width: 100%;
          .btn-add-to-cart {
            width: 50%;
            height: 48px;
            button {
              width: 100%;
              height: 100%;
              color: white;
              background-color: #2b3278;
              font-size: 14px;
              border: none;
            }
          }
          .btn-add-to-buy {
            width: 50%;
            height: 48px;
            margin-left: 20px;
            button {
              width: 100%;
              color: white;
              height: 100%;
              background-color: #2b3278;
              font-size: 14px;
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>
