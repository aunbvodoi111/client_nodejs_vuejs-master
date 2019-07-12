<template>
  <div class="container">
    <div class="content-left">
      <div class="filter">
        <div class="title-filter">
          <h4>BỘ LỌC TÌM KIẾM</h4>
          <div class="filter-cate">
            <p>Theo danh mục</p>
            <ul>
              <li
                v-for="item in products.subcates"
                @click="filter(item.id)"
                :key="item.id"
              >{{ item.name }}</li>
            </ul>
          </div>
          <!-- <div class="filter-rating">
            <h5>Đánh giá</h5>
            <p>
              <i class="fas fa-star" v-for="n in 5"></i>( ít nhất 5 sao )
            </p>
            <p>
              <i class="fas fa-star" v-for="n in 5"></i>( ít nhất 4 sao )
            </p>
            <p>
              <i class="fas fa-star" v-for="n in 5"></i>( ít nhất 3 sao )
            </p>
            <p>
              <i class="fas fa-star" v-for="n in 5"></i>( ít nhất 2 sao )
            </p>
            <p>
              <i class="fas fa-star" v-for="n in 5"></i>( ít nhất 1 sao )
            </p>
          </div>-->
          <div class="filter-rating">
            <h5>Gía</h5>
            <div class="input">
              <input type="number" class="txt-form" placeholder="Từ" v-model="minprice" />
              <input type="number" class="txt-form" placeholder="Đến" v-model="maxprice" />
            </div>
            <div class="btn">
              <button @click="filterPrice = 1">áp dụng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div class="title-filter-product">
        <div>
          <ul>
            <li>Ưu tiên xem :</li>
            <li>Hàng mới</li>
            <li @click="sort = 1">Gía thâp đến cao</li>
            <li @click="sort = -1">Gía cao đến thấp</li>
          </ul>
        </div>
      </div>
      <div class="btn-filer">
        <span v-for="item in products.subcates" :key="item.id">
          <button v-if="item.id == CateId">
            {{ item.name }}
            <i class="far fa-window-close" @click="CateId = ''"></i>
          </button>
        </span>
        <button v-if="sort == 1">
          Từ thấp đến cao
          <i class="far fa-window-close" @click="sort = ''"></i>
        </button>
        <button v-if="sort == -1">
          Từ cao đến thấp
          <i class="far fa-window-close" @click="sort = ''"></i>
        </button>
        <button v-if="maxprice  && minprice && filterPrice">
          {{ minprice }} - {{ maxprice }}
          <i class="far fa-window-close" @click="filterPrice = '', minprice ='',maxprice =''"></i>
        </button>
      </div>
      <div class="product-content" v-if="listProduct.length > 0 ">
        <div class="product" v-for="item in listProduct" :key="item.id">
          <div class="product-div">
            <nuxt-link :to="`/${item.id}`">
              <div class="img">
                <img :src="item.image" alt />
              </div>
            </nuxt-link>
            <nuxt-link :to="`/${item.id}`">
              <div class="name">
                <a href>{{ item.name }}</a>
              </div>
            </nuxt-link>
            <div class="price">
              <p>₫{{ formatPrice(item.discount) }}</p>
            </div>
          </div>
        </div>
        <div style=" clear:both;"></div>
      </div>
      <div v-else>
        <h4 style="text-align:center;">Không tìm thấy sản phẩm nào phù hợp</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, params }) {
    var data = await $axios.get("/api/product/danhmuc/" + params.id);
    console.log(data.data.cates);
    return { products: data.data.cates };
  },
  computed: {
    listProduct() {
      console.log("sad");
      if (this.CateId) {
        return this.products.products.filter(
          product => product.SubcateId === this.CateId
        );
      } else if (this.sort == 1) {
        return this.products.products.sort((a, b) => a.discount - b.discount);
      } else if (this.sort == -1) {
        return this.products.products.sort((a, b) => b.discount - a.discount);
      } else if (this.maxprice && this.minprice && this.filterPrice) {
        return this.products.products.filter(
          product =>
            product.discount >= this.minprice &&
            product.discount <= this.maxprice
        );
      } else {
        return this.products.products;
      }
    }
  },
  data() {
    return {
      CateId: "",
      sort: "",
      minprice: "",
      maxprice: "",
      filterPrice: ""
    };
  },
  methods: {
    filter(value) {
      this.CateId = value;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>
<style lang="scss" scoped>
ul li {
  list-style-type: none;
}
a {
  color: black;
  font-size: 14px;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
.btn-filer{
  button {
    height: 100px;
    height: 30px;
    border : none;
    background-color: #2b3278;
    color: white;
  }
}
@media only screen and (min-width: 1200px) {
  .container {
    width: 1200px;
    margin: 40px auto;
    display: flex;
    .content-left {
      width: 22%;
      height: auto;

      .filter {
        .title-filter {
          padding: 10px;
          .filter-cate {
            margin-top: 10px;
            ul {
              padding: 0px;
              li {
                margin-top: 10px;
                cursor: pointer;
                font-size: 14px;
                color: gray; 
              }
            }
          }
          .filter-rating {
            margin-top: 20px;
            p {
              margin-top: 14px;
              color: #787878;
              font-size: 13px;
              font-weight: 400;
              i {
                font-size: 13px;
                margin-right: 4px;
                color: #fd9727;
              }
            }
            .input {
              display: flex;
              margin-top: 20px;
              .txt-form {
                width: 42%;
                margin-right: 20px;
                padding: 5px 10px;
              }
            }
            .btn {
              button {
                width: 100%;
                background: #ee4d2d;
                outline: none;
                cursor: pointer;
                border: none;
                font-size: 0.875rem;
                font-weight: 300;
                line-height: 1;
                letter-spacing: 0;
                padding: 12px 20px;
                color: white;
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
    .content-right {
      width: 78%;

      .title-filter-product {
        width: 100%;
        height: 30px;
        ul {
          width: 100%;
          padding: 0px;
          li {
            list-style-type: none;
            float: left;
            margin-right: 3%;
            text-transform: uppercase;
            font-weight: 400;
            color: #898989;
            display: inline-block;
            font-size: 14px;
            cursor: pointer;
          }
        }
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
            .img {
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
    }
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    width: 90%;
    margin: 40px auto;
    display: flex;
    .content-left {
      width: 22%;
      height: auto;

      .filter {
        .title-filter {
          padding: 10px;
          .filter-cate {
            margin-top: 10px;
            ul {
              padding: 0px;
              li {
                margin-top: 10px;
              }
            }
          }
          .filter-rating {
            margin-top: 20px;
            p {
              margin-top: 14px;
              color: #787878;
              font-size: 11px;
              font-weight: 400;
              i {
                font-size: 13px;
                margin-right: 4px;
                color: #fd9727;
              }
            }
            .input {
              display: flex;
              margin-top: 20px;
              .txt-form {
                width: 42%;
                margin-right: 20px;
                padding: 5px 10px;
              }
            }
            .btn {
              button {
                width: 100%;
                background: #ee4d2d;
                outline: none;
                cursor: pointer;
                border: none;
                font-size: 0.875rem;
                font-weight: 300;
                line-height: 1;
                letter-spacing: 0;
                padding: 12px 20px;
                color: white;
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
    .content-right {
      width: 78%;

      .title-filter-product {
        width: 100%;
        height: 30px;
        ul {
          width: 100%;
          padding: 0px;
          li {
            list-style-type: none;
            float: left;
            margin-right: 3%;
            text-transform: uppercase;
            font-weight: 400;
            color: #898989;
            display: inline-block;
            font-size: 14px;
          }
        }
      }
      .product-content {
        width: 100%;
        .product {
          float: left;
          width: 25%;
          height: 275px;
          padding: 3px;
          .product-div {
            border: 1px solid transparent;
            background: white;
            cursor: pointer;
            .img {
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
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .container {
    width: 1200px;
    margin: 40px auto;
    display: flex;
    .content-left {
      width: 22%;
      height: auto;

      .filter {
        .title-filter {
          padding: 10px;
          .filter-cate {
            margin-top: 10px;
            ul {
              padding: 0px;
              li {
                margin-top: 10px;
              }
            }
          }
          .filter-rating {
            margin-top: 20px;
            p {
              margin-top: 14px;
              color: #787878;
              font-size: 13px;
              font-weight: 400;
              i {
                font-size: 13px;
                margin-right: 4px;
                color: #fd9727;
              }
            }
            .input {
              display: flex;
              margin-top: 20px;
              .txt-form {
                width: 42%;
                margin-right: 20px;
                padding: 5px 10px;
              }
            }
            .btn {
              button {
                width: 100%;
                background: #ee4d2d;
                outline: none;
                cursor: pointer;
                border: none;
                font-size: 0.875rem;
                font-weight: 300;
                line-height: 1;
                letter-spacing: 0;
                padding: 12px 20px;
                color: white;
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
    .content-right {
      width: 78%;

      .title-filter-product {
        width: 100%;
        height: 30px;
        ul {
          width: 100%;
          padding: 0px;
          li {
            list-style-type: none;
            float: left;
            margin-right: 3%;
            text-transform: uppercase;
            font-weight: 400;
            color: #898989;
            display: inline-block;
            font-size: 14px;
          }
        }
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
            .img {
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
    }
  }
}
@media (min-width: 320px) and (max-width: 576px) {
  .container {
    width: 100%;
    margin: 40px auto;
    display: flex;
    .content-left {
      width: 22%;
      height: auto;
      display: none;
      .filter {
        .title-filter {
          padding: 10px;
          .filter-cate {
            margin-top: 10px;
            ul {
              padding: 0px;
              li {
                margin-top: 10px;
              }
            }
          }
          .filter-rating {
            margin-top: 20px;
            p {
              margin-top: 14px;
              color: #787878;
              font-size: 13px;
              font-weight: 400;
              i {
                font-size: 13px;
                margin-right: 4px;
                color: #fd9727;
              }
            }
            .input {
              display: flex;
              margin-top: 20px;
              .txt-form {
                width: 42%;
                margin-right: 20px;
                padding: 5px 10px;
              }
            }
            .btn {
              button {
                width: 100%;
                background: #ee4d2d;
                outline: none;
                cursor: pointer;
                border: none;
                font-size: 0.875rem;
                font-weight: 300;
                line-height: 1;
                letter-spacing: 0;
                padding: 12px 20px;
                color: white;
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
    .content-right {
      width: 100%;

      .title-filter-product {
        width: 100%;
        height: 30px;
        ul {
          width: 100%;
          padding: 0px;
          li {
            list-style-type: none;
            float: left;
            margin-right: 3%;
            text-transform: uppercase;
            font-weight: 400;
            color: #898989;
            padding: 9px 10px 11px;
            display: inline-block;
            font-size: 14px;
          }
        }
      }
      .product-content {
        width: 100%;
        .product {
          float: left;
          width: 50%;
          height: 245px;
          padding: 3px;
          .product-div {
            border: 1px solid transparent;
            background: white;
            cursor: pointer;
            .img {
              img {
                width: 100%;
                height: 150px;
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
    }
  }
}
@media (min-width: 567px) and (max-width: 767.9px) {
  .container {
    width: 100%;
    margin: 40px auto;
    display: flex;
    .content-left {
      width: 26%;
      height: auto;
      .filter {
        .title-filter {
          padding: 10px;
          .filter-cate {
            margin-top: 10px;
            ul {
              padding: 0px;
              li {
                margin-top: 10px;
              }
            }
          }
          .filter-rating {
            margin-top: 20px;
            p {
              margin-top: 14px;
              color: #787878;
              font-size: 11px;
              font-weight: 400;
              i {
                font-size: 13px;
                margin-right: 4px;
                color: #fd9727;
              }
            }
            .input {
              display: flex;
              margin-top: 20px;
              .txt-form {
                width: 42%;
                margin-right: 20px;
                padding: 5px 10px;
              }
            }
            .btn {
              button {
                width: 100%;
                background: #ee4d2d;
                outline: none;
                cursor: pointer;
                border: none;
                font-size: 0.875rem;
                font-weight: 300;
                line-height: 1;
                letter-spacing: 0;
                padding: 12px 20px;
                color: white;
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
    .content-right {
      width: 75%;
      .title-filter-product {
        width: 100%;
        height: 30px;
        ul {
          width: 100%;
          padding: 0px;
          li {
            list-style-type: none;
            float: left;
            margin-right: 0%;
            text-transform: uppercase;
            font-weight: 400;
            color: #898989;
            margin: 5px;
            display: inline-block;
            font-size: 14px;
          }
        }
      }
      .product-content {
        width: 100%;
        .product {
          float: left;
          width: 25%;
          height: 230px;
          padding: 3px;
          .product-div {
            border: 1px solid transparent;
            background: white;
            cursor: pointer;
            .img {
              img {
                width: 100%;
                height: 145px;
              }
            }
            .name a {
              padding: 4px;
              word-wrap: break-word;
              line-height: 1.125rem;
              height: 2.25rem;
              overflow: hidden;
              display: -webkit-box;
              font-size: 13px;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .price p {
              padding: 4px;
              font-size: 13px;
              color: red;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

