<template>
  <div class="container">
    <div class="container">
      <h4 style="padding : 20px 0px;">SẢN PHẨM BẠN VỪA XEM</h4>
      <div class>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in local" :key="item.id">
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
                  <p>{{ formatPrice(item.price) }} đ</p>
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
      </div>
    </div>
    <div class="container" >
      <h4 style="padding : 20px 0px;">SẢN PHẨM TƯƠNG TỰ</h4>
      <div class>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in productRela" :key="item.id">
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
                  <p>{{ formatPrice(item.price) }} đ</p>
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
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  components: {},
  props:[
    "productRela"
  ],
  data() {
    return {
      local: []
    };
  },
  created() {
    this.getLocal();
  },
  methods: {
    getLocal() {
      if (process.browser) {
        this.local = JSON.parse(localStorage.getItem("products"));
        console.log(JSON.parse(localStorage.getItem("products")));
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
        1024: {
          slidesPerView: 4,
          spaceBetween: 5,
          slidesPerGroup: 4
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
.container {
  margin-top: 25px !important;
}
a {
  color: black;
  font-size: 14px;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
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
</style>
