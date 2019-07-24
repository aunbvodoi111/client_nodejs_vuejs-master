<template>
  <div class="container-content">
    <div class="container">
      <div class="title-content"></div>
      <div class="swiper-container">
        <h4>Sản phẩm nổi bật</h4>
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in products" :key="item.id">
            <div class="product-div">
              <nuxt-link :to="`/${item.id}`">
                <div class="img">
                  <img :src="item.image" alt />
                </div>
              </nuxt-link>
              <div class="name">
                <a href>{{ item.name }}</a>
              </div>
              <div class="price">
                <p>₫{{ formatPrice(item.discount) }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
      <h4 style="margin-top : 30px;">Danh mục</h4>
      <div class="cate-content">
        <div class="cate" v-for="item in cates" :key="item.id">
          <div class="cate-div">
            <nuxt-link :to="`/danhmuc/${item.id}`">
              <div class="img">
                <img :src=" `${item.image} `" alt />
              </div>
              <p>{{ item.name }}</p>
            </nuxt-link>
          </div>
        </div>
        <div style=" clear:both;"></div>
      </div>

      <h4 style="margin-top : 30px;">Gợi ý hôm nay</h4>

      <div class="product-content">
        <div class="product" v-for="item in products" :key="item.id">
          <div class="product-div" @click="submit(item)">
            <nuxt-link :to="`/${item.id}`">
              <div class="img">
                <img :src=" `${item.image} `" alt />
                <div class="percent-discount">
                  <p>{{ (100 - (item.discount / item.price)*100).toFixed(0) }}%</p>
                  <p>giảm</p>
                </div>
              </div>
            </nuxt-link>
            <div class="name">
              <nuxt-link :to="`/${item.name}`">{{ item.name }}</nuxt-link>
            </div>
            <div class="price">
              <p>₫{{ formatPrice(item.discount) }}</p>
            </div>
            <div class="star" v-if="item.ratings.length">
              <i class="fas fa-star" v-for="n in avg(item)" :key="n"></i><i class="far fa-star" v-for="n in 5 - avg(item)" :key="n"></i>
              <span>({{ item.ratings.length }} nhận xét)</span>
            </div>
            <div class="star" v-if="item.ratings.length == 0">
              <i class="far fa-star" v-for="n in 5 " :key="n"></i>
              <span>(chưa có nhận xét)</span>
            </div>
          </div>
        </div>
        <div style=" clear:both;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import NavBar from "./../components/navBar";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import socket from "~/plugins/socket.io.js";
export default {
  components: {
    Logo,
    NavBar
  },
  async asyncData({ $axios, store }) {
    var data = await $axios.get("/api/product");
    if (store.state.authUser) {
      socket.emit("joinRoom", store.state.authUser.name);
    }
    console.log(data);
    store.commit("LIST_CART", data.data.sumQty);
    return { products: data.data.products, cates: data.data.cates };
  },
  data() {
    return {
      local: []
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    avg(value) {
      var sum = 0;
      var avg = 0;
      for (var i = 0; i < value.ratings.length; i++) {
        sum += value.ratings[i]["star"];
      }
      // return avg = parseInt(sum/value.danhgias.length);
      if (sum == 0) {
        return sum;
      }
      if (sum > 0) {
        return Math.ceil(sum / value.ratings.length);
      }
    },
    fetchProduct() {},
    submit(item) {
      var anhquy = [];
      if (localStorage && localStorage.getItem("products")) {
        this.local = JSON.parse(localStorage.getItem("products"));
        anhquy = this.local.filter(product => product.id !== item.id);
        anhquy.unshift(item);
        localStorage.setItem("products", JSON.stringify(anhquy));
      } else {
        this.local.push(item);
        localStorage.setItem("products", JSON.stringify(this.local));
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 6,
      spaceBetween: 2,
      slidesPerGroup: 6,
      loop: true,
      loopFillGroupWithBlank: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 5,
          slidesPerGroup: 3
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 5,
          slidesPerGroup: 3
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 5,
          slidesPerGroup: 2
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 10,
          slidesPerGroup: 2
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
/* .container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
} */
a {
  color: black;
  font-size: 14px;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}

@media only screen and (min-width: 1200px) {
  .swiper-container {
    width: 100%;
    .swiper-slide {
      padding: 3px;
      .product-div {
        position: relative;
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

  .container-content {
    width: 100%;
    background: #f0f0f0;
    .container {
      width: 1200px;
      margin: auto;
      .title-content {
        width: 100%;
        height: 50px;
      }
      .cate-content {
        width: 100%;
        display: flex;
        .cate {
          width: 11%;
          .cate-div {
            width: 100%;
            background: white;
            border-right: 1px solid rgba(0, 0, 0, 0.05);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            padding-bottom: 10px;
            .img {
              img {
                width: 100%;
              }
            }
            p {
              text-align: center;
            }
          }
        }
      }
      .product-content {
        width: 100%;
        // display: flex;

        .product {
          float: left;
          width: 16.6%;
          height: 300px;
          padding: 3px;
          transition: 0.2s ease;
          &:hover {
            transform: translateY(-4px);
          }
          .product-div {
            border: 1px solid transparent;
            background: white;
            position: relative;
            cursor: pointer;
            .img {
              img {
                width: 100%;
                height: 188px;
              }
              .percent-discount {
                width: 38px;
                height: 35px;
                top: 0;
                right: 0;
                position: absolute;
                z-index: 22;
                background: rgba(255, 212, 36, 0.9);
                padding: 3px;
                p:nth-child(1) {
                  text-align: center;
                  color: red;
                  font-size: 12px;
                }
                p:nth-child(2) {
                  color: white;
                  text-transform: uppercase;
                  font-weight: bold;
                  text-align: center;
                  font-size: 11px;
                }
                // background: red;
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
            .star {
              padding: 4px;
              i {
                font-size: 10px;
                color: #fd9727;
              }
              span {
                font-size: 11px;
                color: grey;
              }
            }
          }
        }
      }
    }
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .swiper-container {
    width: 100%;
    .swiper-slide {
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
  .container-content {
    width: 100%;
    background: #f0f0f0;
    .container {
      width: 80%;
      margin: auto;
      .title-content {
        width: 100%;
        height: 50px;
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

@media (min-width: 768px) and (max-width: 991px) {
  .swiper-container {
    width: 100%;
    .swiper-slide {
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
  .container-content {
    width: 100%;
    background: #f0f0f0;
    .container {
      width: 100%;
      margin: auto;
      .title-content {
        width: 100%;
        height: 50px;
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
@media (min-width: 320px) and (max-width: 575.9px) {
  .swiper-container {
    width: 100%;
    .swiper-slide {
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
  .container-content {
    width: 100%;
    background: #f0f0f0;
    .container {
      width: 100%;
      margin: auto;
      .title-content {
        width: 100%;
        height: 50px;
      }
      .product-content {
        width: 100%;
        .product {
          float: left;
          width: 50%;
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
@media (max-width: 768px) and (min-width: 576px) {
  .swiper-container {
    width: 100%;
    .swiper-slide {
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
  .container-content {
    width: 100%;
    background: #f0f0f0;
    .container {
      width: 100%;
      margin: auto;
      .title-content {
        width: 100%;
        height: 50px;
      }
      .product-content {
        width: 100%;
        .product {
          float: left;
          width: 33.33%;
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

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
