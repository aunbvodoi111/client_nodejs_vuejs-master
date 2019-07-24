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
      <div class="qty-cart" v-if="showPopMaxQtyProduct">
        <p>Sản phẩm này đã hết hàng !</p>
        <button @click=" showPopMaxQtyProduct = false">Đồng ý</button>
      </div>
      <div class="image-detail" v-if="showPopDetailImg">
        <div class="div-pop-img">
          <div class="div-img-main">
            <img :src="ImageHover.image" alt />
            <!-- <img :src="ImageHover.image" alt /> -->
            <button @click="anhquy()" class="btn-left">
              <i class="fas fa-angle-right"></i>
            </button>
            <button @click="anhquyok()" class="btn-right">
              <i class="fas fa-angle-left"></i>
            </button>
          </div>
          <div class="div-img">
            <h4>{{ product.name }}</h4>
            <div class="img-hover" v-for=" item in product.mulimages" :key="item.id">
              <img
                :src="item.image"
                alt
                width="100%"
                :class="{ selectImage:item.id == ImageHover.id}"
                @mouseover="hoverImage(item)"
              />
            </div>
            <button @click="showPopDetailImg = false">Đóng</button>
          </div>
        </div>
        <div class></div>
      </div>
      <div class="title-content">
        <h4>Trang chủ > {{ product.subcate.name}}</h4>
      </div>
      <div class="content-detail-pr">
        <div class="content-left">
          <div class="img">
            <img :src="product.image" alt v-if="idImage == ''" @click=" showPopDetail()" />
            <img :src="ImageHover.image" alt v-if="idImage != ''" @click=" showPopDetail()" />
            <div
              class="nofj-out-of-stock"
              v-if="product.qty == 0 && product.classifies.length == 0"
            >
              <p>Hết hàng</p>
            </div>
            <div class="nofj-out-of-stock" v-if="sumQty == 0 && product.classifies.length">
              <p>Hết hàng</p>
            </div>
          </div>
          <div class="img-small">
            <img
              :src="product.image"
              alt
              width="100px"
              height="100px"
              @mouseover="hoverImage(1)"
              :class="{ selectImage:'' == idImage}"
            />
            <div
              class
              style="width:100px; display : flex;"
              v-for=" item in product.mulimages"
              :key="item.id"
            >
              <img
                :src="item.image"
                alt
                width="100px"
                height="100px"
                @mouseover="hoverImage(item)"
                :class="{ selectImage:item.id == idImage}"
              />
            </div>
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
            <div class="total-rating" v-if='product.ratings.length'>
              {{ mediumstar.toFixed(1) }}
              <i
                class="fas fa-star"
                v-for=" n in Math.floor(mediumstar)"
                :key=" n + 1"
              ></i>
              <i class="far fa-star" v-for=" n in 5-Math.floor(mediumstar)" :key=" n + 200"></i>
            </div>
            <div class="number-rating" v-if='product.ratings.length'>{{ product.ratings.length }} đánh giá</div>
            <div class="number-rating" v-if='product.ratings.length == 0'> Chưa Có Đánh Giá </div>
            <div class="number-rating">{{ product.sold }} đã bán</div>
            
          </div>
          <div class="price-detail" v-if="product.classifies.length == 0 && priceClassify == 0">
            <span class="payment">₫ {{ formatPrice(product.price) }}</span>
            <span class="discount">₫{{ formatPrice(product.discount) }}</span>
          </div>
          <div class="price-detail" v-if="product.classifies.length > 0 && priceClassify == 0">
            <span class="discount">₫{{ formatPrice(minPrice) }} - {{ formatPrice(maxPrice) }}</span>
          </div>
          <div class="price-detail" v-if="product.classifies.length > 0 && priceClassify > 0">
            <span class="discount">₫{{ formatPrice(priceClassify) }}</span>
          </div>
          <div v-if="product.classifies.length" class="classify">
            <button
              v-for=" item in product.classifies"
              @click="qtyClassify(item)"
              :class="{activeButton:item.id == ClassifyId}"
              v-if="item.qty > 0"
              :key="item.id"
            >{{ item.name }}</button>
            <button
              v-for=" item in product.classifies"
              @click="qtyClassify(item)"
              :class="{activeButton:item.id == ClassifyId}"
              v-if="item.qty == 0"
              disabled
              class="button disabled"
              :key="item.id"
            >{{ item.name }}</button>
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
            <span>
              <span v-if="product.classifies.length == 0">{{ product.qty }}</span>
              <span v-if="product.classifies.length > 0">
                <span v-if="sumQty == 0">{{ sumQtynew() }}</span>
                <span v-if="sumQty > 0">{{ sumQty }}</span>
              </span>sản phẩm có sẵn
            </span>
          </div>
          <p
            style="color:red;font-size : 15px;"
            v-show="chooseClassify"
          >Vui lòng chọn Phân loại hàng</p>
          <div
            class="btn-action-detail"
            v-if=" $store.state.authUser && $store.state.authUser.id != product.user.id"
          >
            <div class="btn-add-to-cart">
              <button @click="addCart">
                <i class="fas fa-shopping-cart"></i>
                Thêm Vào Giỏ Hàng
              </button>
            </div>
            <div class="btn-add-to-buy">
              <button @click="buyProduct">Mua ngay</button>
            </div>
          </div>
          <div class="btn-action-detail" v-if=" $store.state.authUser == null ">
            <div class="btn-add-to-cart">
              <button @click="addCart">
                <i class="fas fa-shopping-cart"></i>
                Thêm Vào Giỏ Hàng
              </button>
            </div>
            <div class="btn-add-to-buy">
              <button @click="buyProduct">Mua ngay</button>
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
      :online="online"
    />
    <Quesiton :product="product " :follows="follows" />
    <Rating
      :product=" product "
      @totalRating="totalRating"
      :productnew="productnew"
      @mediumstar="summediumstar"
    />
    <ProductRelate  :productRela ='productRela'/>
  </div>
</template>
<script>
import Rating from "./../components/detail/rating";
import ProductRelate from "./../components/detail/productRelate";
import saler from "./../components/detail/saler";
import Quesiton from "./../components/detail/question";
import socket from "~/plugins/socket.io.js";
import Vue from "vue";
import { cloneDeep } from "lodash";
export default {
  transition: "bounceok",
  async asyncData({ params, $axios, req, store }) {
    const data = await $axios.get("/api/product/detailPr/" + params.id);
    var rating1 = [];
    console.log(data.data);
    data.data.products.ratings.forEach(item => {
      Vue.set(item, "is_rating", false);
      Vue.set(item, "contentcmt", "");
    });

    data.data.products.comments.forEach(item => {
      Vue.set(item, "is_comments", false);
      Vue.set(item, "rep_comment", "");
    });
    var product = data.data.products;
    var online = 0;
    var productnew = cloneDeep(data.data.products);
    productnew.ratings.forEach(item => {
      Vue.set(item, "is_rating", false);
      Vue.set(item, "contentcmt", "");
    });
    if (store.state.authUser) {
      await socket.emit("joinRoom", store.state.authUser.name);
      socket.on("userOnline", async data => {
        var socketId;
        for (socketId in data) {
          if (data[socketId].data === product.user.name) {
            var online = 1;
          }
        }
      });
    }
    var sumQty = data.data.sumQty;
    store.commit("LIST_CART", sumQty);
    return {
      carts: data.data.carts,
      product: data.data.products,
      productnew: productnew,
      count: data.data.count,
      follows: data.data.follows,
      online: online,
      totalProduct: data.data.totalProduct,
      totalFollow: data.data.totalFollow,
      sumRating: data.data.totalRating,
      cart_details: data.data.cart_details,
      productRela : data.data.productRela
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
      showNofication: false,
      idImage: "",
      anhquyhi: -1,
      showPopDetailImg: false,
      showPopMaxQtyProduct: false,
      sumQty: 0,
      ClassifyId: 0,
      priceClassify: 0,
      chooseClassify: false
    };
  },
  created() {},
  methods: {
    showPopDetail() {
      this.showPopDetailImg = true;
      // this.product.mulimages.push(this.product.image)
    },
    sumQtynew() {
      var anhquy = this.product.classifies;
      this.sumQty = 0;
      if (anhquy.length) {
        for (var i = 0; i < anhquy.length; i++) {
          this.sumQty = this.sumQty + anhquy[i].qty;
        }
      }
      return this.sumQty;
      // this.sumQtyProduct = item.qty;
    },
    qtyClassify(item) {
      this.sumQty = item.qty;
      this.qtyProduct = 1;
      this.ClassifyId = item.id;
      this.priceClassify = item.price;
    },
    anhquyok() {
      this.idImage = "";
      if (
        this.product.mulimages[this.anhquyhi] == undefined ||
        this.anhquyhi == -1
      ) {
        this.anhquyhi = this.product.mulimages.length - 1;
      } else {
        this.anhquyhi -= 1;
      }
    },
    anhquy() {
      this.idImage = "";
      this.anhquyhi += 1;
      if (
        this.product.mulimages[this.anhquyhi] == undefined ||
        this.anhquyhi > this.product.mulimages.length
      ) {
        this.anhquyhi = 0;
      } else {
      }
    },
    hoverImage(item) {
      if (item == 1) {
        this.idImage = "";
      } else {
        this.idImage = item.id;
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
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
            UserIdSaler: this.product.user.id
          })
          .then(response => {
            console.log(response);
          });
      }
    },
    addCart() {
      var changeQty;
      if (this.cart_details != null) {
        changeQty = this.cart_details.qty + Number(this.qtyProduct);
      } else {
        changeQty = 0;
      }

      if (this.product.classifies.length > 0) {
        if (this.ClassifyId == 0) {
          this.chooseClassify = true;
        } else {
          this.chooseClassify = false;
        }
      }

      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else if (this.product.qty > 0 && this.product.classifies.length == 0) {
        if (changeQty > this.product.qty) {
          console.log(changeQty);
          this.showPopMaxQtyProduct = true;
        } else {
          this.showNofication = true;
          setTimeout(() => {
            this.showNofication = false;
          }, 3000);
          this.$axios
            .post("/api/cart/add", {
              ProductId: this.product.id,
              qty: this.qtyProduct,
              UserIdSaler: this.product.user.id,
              ClassifyId: this.ClassifyId
            })
            .then(response => {
              console.log(response);
              this.cart_details = response.data;
              this.$store.commit("ADD_TO_CART", this.qtyProduct);
            });
        }
      } else if (
        this.sumQty > 0 &&
        this.product.classifies.length > 0 &&
        this.ClassifyId > 0
      ) {
        console.log('chay vao day ');
        console.log(this.ClassifyId);
        this.chooseClassify = false;
        if (changeQty > this.sumQty) {
          
          this.showPopMaxQtyProduct = true;
        } else {
          this.showNofication = true;
          setTimeout(() => {
            this.showNofication = false;
          }, 3000);
          this.$axios
            .post("/api/cart/add", {
              ProductId: this.product.id,
              qty: this.qtyProduct,
              UserIdSaler: this.product.user.id,
              ClassifyId: this.ClassifyId
            })
            .then(response => {
              console.log(response);
              this.cart_details = response.data;
              this.$store.commit("ADD_TO_CART", this.qtyProduct);
            });
        }
      }
    },
    buyer() {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.$axios
          .post("/api/cart/add", {
            ProductId: this.product.id,
            qty: this.qtyProduct,
            UserIdSaler: this.product.user.id
          })
          .then(response => {
            console.log(response);
            this.$store.commit("ADD_TO_CART", this.qtyProduct);
          });
      }
    },
    buyProduct() {
      if (this.product.classifies.length > 0) {
        if (this.ClassifyId == 0) {
          this.chooseClassify = true;
        } else {
          this.chooseClassify = false;
        }
      }
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else if(this.product.classifies.length == 0) {
        this.$axios
          .post("/api/cart/add", {
            ProductId: this.product.id,
            qty: this.qtyProduct,
            UserIdSaler: this.product.user.id,
            ClassifyId: this.ClassifyId
          })
          .then(response => {
            this.$router.push("/cart");
            console.log(response);
            this.$store.commit("ADD_TO_CART", this.qtyProduct);
          });
      }else if(this.product.classifies.length > 0 && this.ClassifyId > 0) {
        this.$axios
          .post("/api/cart/add", {
            ProductId: this.product.id,
            qty: this.qtyProduct,
            UserIdSaler: this.product.user.id,
            ClassifyId: this.ClassifyId
          })
          .then(response => {
            this.$router.push("/cart");
            console.log(response);
            this.$store.commit("ADD_TO_CART", this.qtyProduct);
          });
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
    summediumstar(e) {
      this.mediumstar = e;
    },
    increment() {
      if (this.product.qty && this.product.classifies.length == 0) {
        if (this.qtyProduct == this.product.qty) {
          this.qtyProduct = this.product.qty;
        } else {
          this.qtyProduct = this.qtyProduct + 1;
        }
      } else if (this.sumQty > 0 && this.product.classifies.length > 0) {
        if (this.qtyProduct == this.sumQty) {
          this.qtyProduct = this.sumQty;
        } else {
          this.qtyProduct = this.qtyProduct + 1;
        }
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
    // sumQtyProduct() {
    //   var sum = 0;
    //   if (this.product.classifies.length) {
    //     for (var i = 0; i < this.product.classifies.length; i++) {
    //       sum = sum + this.product.classifies[i].qty;
    //     }
    //   }
    //   return sum;
    // },
    minPrice() {
      var lowest = Number.POSITIVE_INFINITY;
      var highest = Number.NEGATIVE_INFINITY;
      var tmp;
      for (var i = this.product.classifies.length - 1; i >= 0; i--) {
        tmp = this.product.classifies[i].price;
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
      }
      return lowest;
    },
    maxPrice() {
      var lowest = Number.POSITIVE_INFINITY;
      var highest = Number.NEGATIVE_INFINITY;
      var tmp;
      for (var i = this.product.classifies.length - 1; i >= 0; i--) {
        tmp = this.product.classifies[i].price;
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
      }
      return highest;
    },
    ImageHover() {
      if (this.idImage) {
        return this.product.mulimages.find(item => item.id === this.idImage);
      } else if (this.anhquyhi > -1 && this.idImage == "") {
        return this.product.mulimages[this.anhquyhi];
      } else {
        return this.product;
      }
    },
    imgMain() {
      if (this.anhquyhi > -1) {
        return this.product.mulimages[this.anhquyhi];
      } else {
        return this.product;
      }
    },
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
.activeButton {
  color: red !important;
  border: 1px solid red !important;
}
.classify {
  margin-top: 20px;
  button {
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
.selectImage {
  border: 3px solid red !important;
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
.qty-cart {
  position: absolute;
  width: 350px;
  height: 170px;
  background: white;
  left: 40%;
  -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  button {
    color: white;
    background: red;
    width: 120px;
    height: 30px;
    border: none;
    margin-top: 40px;
    &:hover {
      opacity: 0.5;
    }
  }
}
.container {
  background: white;
  margin-top: 100px;
  .image-detail {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1001;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.14);
    .div-pop-img {
      width: 64%;
      display: flex;
      height: 700px;
      margin: auto;
      position: relative;
      background: white;
      margin-top: 4%;
      .div-img-main {
        width: 60%;
        position: relative;
        .btn-left {
          width: 50px;
          height: 100px;
          color: white;
          position: absolute;
          z-index: 10;
          right: 0;
          top: 50%;
          background: rgba(0, 0, 0, 0.54);
          border: none;
          i {
            font-size: 40px;
          }
        }
        .btn-right {
          width: 50px;
          height: 100px;
          color: white;
          position: absolute;
          z-index: 10;
          left: 0;
          top: 50%;
          background: rgba(0, 0, 0, 0.54);
          i {
            font-size: 40px;
          }
          border: none;
        }
        img {
          width: 100%;
          height: 700px;
        }
      }
      .div-img {
        width: 40%;
        padding: 10px;
        .img-hover {
          margin-top: 15px;
          width: 100px;
          height: 100px;
          display: flex;
          float: left;
        }
      }
    }
  }
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
            .nofj-out-of-stock {
              width: 100px;
              height: 100px;
              background-color: rgba(0, 0, 0, 0.7);
              position: absolute;
              top: 13%;
              left: 28%;
              z-index: 88;
              border-radius: 100%;
              p {
                color: white;
                line-height: 100px;
                text-align: center;
                text-transform: uppercase;
              }
            }
          }
          .img-small {
            display: flex;
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
