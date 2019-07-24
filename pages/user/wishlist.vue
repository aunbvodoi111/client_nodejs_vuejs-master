<template>
  <div class="container-fruid">
    <div class="container">
      <NavBar :seleted="seleted" />
      <div class="content-right">
        <div class="content-main">
          <h1>Sản phẩm yêu thích</h1>

          <div class="content-nofi">
            <div class="img" v-if="wishs.length == 0">
              <img src="/img/anhdep.png" alt />
              <p>Bạn chưa có sản phẩm</p>
              <button>Tiếp tục mua sắm</button>
            </div>
            <div class="product-content" v-else>
              <div class="product" v-for="item in wishs" :key="item.id">
                <div class="product-div" @click="submit(item)">
                  <nuxt-link :to="`/${item.id}`">
                    <div class="img-product">
                      <img :src=" `${item.image} `" alt />
                    </div>
                  </nuxt-link>
                  <div class="name">
                    <nuxt-link :to="`/${item.name}`">{{ item.name }}</nuxt-link>
                  </div>
                  <div class="price">
                    <p>{{ formatPrice(item.price) }}đ</p>
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
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "./../../components/navUser/navbar";
export default {
  async asyncData({ $axios }) {
    var data = await $axios.get("/api/user/listProductWish");
    console.log(data.data);
    var wishs = data.data.filter(data => data.userlike.length !== 0);

    return {
      wishs: wishs
    };
  },
  components: {
    NavBar
  },
  data() {
    return {
      local: [],
      seleted: 2
    };
  },
  created() {
    this.getLocal();
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
  }
};
</script>
<style lang="scss" scoped>
a {
  color: black;
  font-size: 14px;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
ul li {
  list-style-type: none;
}
.product-content {
  width: 100%;
  .product {
    float: left;
    width: 20%;
    height: 300px;
    padding: 3px;

    .product-div {
      border: 1px solid transparent;
      background: white;
      cursor: pointer;
      .img-product {
        width: 100%;
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
        width: 100%;
        margin-top: 20px;
        align-items: center;
        .img {
          margin-top: 100px;
          width: 50%;
          margin: auto;
          img {
            margin-left: 20px;
          }
          p {
            font-size: 14px;
            margin-left: 20px;
          }
          button {
            width: 40%;
            margin-top: 15px;
            background: cornflowerblue;
            height: 40px;
            color: black;
            border: none;
          }
        }
      }
    }
  }
}
</style>
