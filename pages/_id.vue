<template>
  <div class="container-detail">
    <div class="container">
      <div class="title-content">
        <h4>Trang chủ > Năm sinh</h4>
      </div>
      <div class="content-detail-pr">
        <div class="content-left">
          <div class="img">
            <img :src="product.image" alt>
          </div>
          <div class="icon-share">
            <span>
              Chia sẻ :
              <i class="fab fa-facebook"></i>
              <i class="fab fa-google-plus"></i>
              <i class="fab fa-twitter"></i>
            </span>
            <span>
              <i class="fas fa-heart"></i> Đã thích (12412)
            </span>
          </div>
        </div>
        <div class="content-right">
          <h2>{{ product.name }}</h2>
          <div class="rating-total-detail">
            <div class="total-rating">
              {{ mediumstar }}
              <i class="fas fa-star" v-for=" n in Math.floor(mediumstar)" :key=" n + 1"></i>
              <i class="far fa-star" v-for=" n in 5-Math.floor(mediumstar)" :key=" n + 2"></i>
            </div>
            <div class="number-rating">{{ total }} đánh giá</div>
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
              <input type="text" class="txt-qty" v-model="qtyProduct" @keyup="changeQty">

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
              <button>Mua Ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <saler :product=" product "/>
    <Rating :product=" product " @totalRating="totalRating"/>
    <ProductRelate/>
  </div>
</template>
<script>
import Rating from "./../components/detail/rating";
import ProductRelate from "./../components/detail/productRelate";
import saler from "./../components/detail/saler";
export default {
  async asyncData({ params, $axios, req }) {
    const data = await $axios.get("/api/product/detailPr/" + params.id);
    // var rating1 = [];
    // data.data.rating.forEach(item => {
    //   Vue.set(item, "is_rating", false);
    //   Vue.set(item, "contentcmt", "");
    // });
    console.log(data.data);
    return { product: data.data };
  },
  components: {
    Rating,
    ProductRelate,
    saler
  },
  data() {
    return {
      total: 0,
      mediumstar: 0,
      qtyProduct: 1
    };
  },
  methods: {
    addCart(){
      if(!this.$store.state.authUser){
        this.$store.commit('OPEN_REGISTER')
      }
    },
    buyProduct(){
      if(!this.$store.state.authUser){
        this.$store.commit('OPEN_REGISTER')
      }
    },
    changeQty() {
      if (this.qtyProduct > this.product.qty) {
        this.qtyProduct = this.product.qty;
      } else {
        this.qtyProduct = this.qtyProduct
      }
    },
    totalRating(e) {
      this.total = e.total;
      this.mediumstar = e.mediumstar;
      console.log(e);
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
  }
};
</script>

<style lang="scss" scoped>
.container-detail {
  background: #f0f0f0;
}
.container {
  background: white;
  margin-top: 100px;
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
