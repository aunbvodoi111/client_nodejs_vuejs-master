<template>
  <div class="container-fruid">
    <div class="container">
      <NavBar />
      <div class="content-right">
        <div class="content-main">
          <h1>Thông báo của tôi</h1>
          <div class="choose-nofi">
            <div class="btn-act">
              <button>Cập nhật đơn hàng</button>
            </div>
            <div class="btn-act">
              <button>Cập nhật đánh giá</button>
            </div>
            <div class="btn-act">
              <button>Hoạt động</button>
            </div>
            <div class="btn-act">
              <button>Cập nhật sản phẩm</button>
            </div>
          </div>
          <div class="content-nofi">
            <div class="img" v-if="wishs.length == 0">
              <img src="/img/anhdep.png" alt />
              <p>Bạn chưa có thông báo</p>
              <button>Tiếp tục mua sắm</button>
            </div>
            <div class="product-content" v-else>
              <div class="product" v-for="item in wishs" :key="item.id">
                <div class="product-div" @click="submit(item)">
                  <nuxt-link :to="`/${item.id}`">
                    <div class="img-product">
                      <img :src=" `${item.product.image} `" alt />
                    </div>
                  </nuxt-link>
                  <div class="name">
                    <nuxt-link :to="`/${item.name}`">{{ item.name }}</nuxt-link>
                  </div>
                  <div class="price">
                    <p>3.600.000 đ</p>
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
        var data = await $axios.get('/api/user/listRating')
        console.log(data.data)
       
        
        return {
            wishs : data.data
        }
    },
  components: {
    NavBar
  },
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
    }
  }
};
</script>
<style lang="scss" scoped>
a {
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
    height: 275px;
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
