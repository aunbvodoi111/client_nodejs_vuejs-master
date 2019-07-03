 <template>
  <div class="container-fruid">
    <div class="container">
      <div class="nav-top">
        <div class="navtop-right">
          <ul>
            <li>
              <a href="http://localhost:8000/" target="_blank">Kênh người bán</a>
            </li>
            <li>
              <a href>Tải ứng dụng</a>
            </li>
          </ul>
        </div>
        <div class="navtop-left">
          <ul>
            <li>
              <a href>Kênh người bán</a>
            </li>
            <li v-if="$store.state.authUser">
              <a href>Chao , {{ $store.state.authUser.email}}</a>
            </li>
            <li @click="loginAuth" v-if="!$store.state.authUser">
              <a>Đăng kí</a>
            </li>
            <li @click="registerAuth" v-if="!$store.state.authUser">
              <a>Đăng nhập</a>
            </li>
            <li @click="registerAuth" v-if="$store.state.authUser">
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="navcenter">
        <div class="logo">
          <nuxt-link to="/">
            <img src="https://phongvu.vn/media/wysiwyg/logo-PV-new_2.png" alt />
          </nuxt-link>
        </div>
        <div class="search">
          <input
            type="text"
            name
            id
            class="txt-search"
            v-model="keyword"
            placeholder="Nhập từ khóa tìm kiếm"
            @keyup="searchProduct"
          />

          <nuxt-link :to="`/search/${keyword}`">
            <button @click="closePopSearch = false">
              <i class="fas fa-search"></i>
            </button>
          </nuxt-link>
          <div class="pop-search" v-if="keyword && closePopSearch">
            <div class="product-search" v-for="item in products" :key="item.id" @click="closePopSearch = false">
              <div class="img-product">
                <nuxt-link :to="`/${item.id}`">
                  <img :src="item.image" alt />
                </nuxt-link>
              </div>
              <div class="detail-product">
                <nuxt-link :to="`/${item.id}`">{{ item.name }}</nuxt-link>
                <p>{{ item.price }}</p>
              </div>
            </div>
            <h4 v-if="products.length == ''" style="text-align:center;">
              Không tìm thấy sản phẩm với từ khóa "
              <span style="color:red;">{{ keyword }}</span>"
            </h4>
          </div>
        </div>
        <div class="cart-icon">
          <nuxt-link to="cart">
            <i
              class="fas fa-shopping-cart"
              @mouseover="hover = true"
              @mouseleave="hover = false"
              @click="checkAuth"
            >
              <!-- <template v-if="carts.length">
                <div class="qty-cart" v-if=" $store.state.authUser">{{ sumQtyCart }}</div>
              </template>-->
              <template>
                <div class="qty-cart" v-if=" $store.state.authUser">{{sumQtyCart }}</div>
              </template>
              <div class="pop-cart" v-if="hover && $store.state.authUser">
                <div class="product-cart" v-for="n in carts" :key="n.id">
                  <div class="image-pop-cart">
                    <img
                      :src="n.image"
                      alt
                    />
                  </div>
                  <div class="name-pop-cart">
                    <a
                      href
                    >{{ n.name }}</a>
                  </div>
                  <div class="action-pop-cart">
                    <p>{{ n.discount }}đ</p>
                    <a @click="deleteCart(n)">Xóa</a>
                  </div>
                </div>
                <button class="btn-to-cart">Vào giỏ hàng</button>
              </div>
            </i>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      hover: false,
      products: [],
      closePopSearch: false,
    };
  },
  created() {
    // this.$axios.$get("/api/cart/").then(response => {
    //   this.carts = response;
    //   console.log(this.carts);
    // });
  },
  computed: {
    carts(){
      var carts =  this.$store.state.carts.filter(data => data.users.length !== 0);
      return carts
    },
    sumQtyCart() {
      var sum = 0;
      if (this.$store.state.carts.length ) {
        for (var i = 0; i < this.$store.state.carts.length; i++) {
          if( this.$store.state.carts[i].users.length ){
             var sum = sum + this.$store.state.carts[i].users[0].carts.qty;
             console.log('da')
          }
        }
        return sum;
      }
      return sum;
    }
  },
  methods: {
    deleteCart(item) {
      // console.log(item);
      // this.cart = {}
      // this.toggleComfirmCart = false
      var index = this.carts.indexOf(item)
      this.carts.splice(index ,1 )
      this.$axios.post("/api/cart/deleteCart", {
        ProductId: item.id,
        qty: item.users[0].carts.qty
      });
    },
    checkAuth() {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.toggleCmt = !this.toggleCmt;
      }
    },
    loginAuth() {
      this.$store.commit("OPEN_LOGIN");
    },
    registerAuth() {
      this.$store.commit("OPEN_REGISTER");
    },
    searchProduct() {
      this.closePopSearch = true;
      this.$axios
        .post("/api/product/search", {
          keyword: this.keyword
        })
        .then(response => {
          this.products = response.data;
          console.log(response.data);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
ul li {
  list-style-type: none;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
@media (min-width: 1200px) {
  .container-fruid {
    background-color: rgb(43, 50, 120);
    height: 120px;
    width: 100%;
  }
  .container {
    width: 1200px;
    height: auto;
    margin: auto;
    .nav-top {
      display: flex;
      width: 100%;
      .navtop-right {
        width: 50%;
        height: auto;
        ul {
          padding-left: 0px;
          display: flex;
          li {
            margin-right: 5%;
            a {
              font-size: 13px;
            }
          }
        }
      }
      .navtop-left {
        display: flex;
        width: 50%;
        ul {
          width: 80%;
          margin-left: auto;
          display: flex;
          li {
            margin-right: 5%;
            a {
              font-size: 13px;
            }
          }
        }
      }
    }
    .navcenter {
      display: flex;
      width: 100%;
      margin-top: 25px;
      .logo {
        width: 20%;
        img {
          height: 50px;
          width: 50px;
          margin-left: 32%;
        }
      }
      .search {
        width: 80%;
        position: relative;
        .pop-search {
          position: absolute;
          width: 80%;
          z-index: 9;
          background: white;
          padding: 5px;
          -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          .product-search {
            width: 100%;
            display: flex;
            padding: 4px;
            .img-product {
              img {
                height: 70px;
                width: 65px;
              }
            }
            .detail-product {
              margin-left: 1%;
              a {
                color: black;
              }
              p {
                color: red;
                font-size: 14px;
                margin-top: 4px;
              }
            }
          }
        }
        .txt-search {
          width: 100%;
          height: 100%;
          position: relative;
          padding: 5px;
          height: 50px;
        }
        button {
          top: 0;
          position: absolute;
          background-color: rgb(43, 50, 120);
          height: 45px;
          right: 0;
          margin: 3px;
          width: 10%;

          cursor: pointer;
          border: none;
          color: white;
        }
      }
      .cart-icon {
        position: relative;
        width: 20%;
        cursor: pointer;
        .fa-shopping-cart {
          color: white;
          margin-left: 20%;
          margin-top: 4%;
          font-size: 30px;
          .qty-cart {
            position: absolute;
            font-size: 12px;
            top: 0;
            z-index: 30;
            right: 55%;
            width: 20px;
            height: 20px;
            background: white;
            color: black;
            border-radius: 100%;
            line-height: 20px;
            text-align: center;
          }
          .pop-cart {
            padding-bottom: 2%;
            position: absolute;
            z-index: 30;
            width: 250%;
            background: white;
            color: black;
            height: auto;
            -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            .product-cart {
              width: 100%;
              display: flex;
              .image-pop-cart {
                width: 20%;
                img {
                  width: 45px;
                  height: 45px;
                  margin: 10%;
                }
              }
              .name-pop-cart {
                width: 60%;
                a {
                  font-size: 14px;
                  color: black;
                  font-weight: normal;
                }
              }
              .action-pop-cart {
                width: 20%;
                margin: 3%;
                a {
                  font-weight: normal;
                  font-size: 14px;
                  color: blue;
                }
                p {
                  font-weight: normal;
                  font-size: 16px;
                  color: red;
                }
              }
            }
            .btn-to-cart {
              padding: 10px 24px;
              margin-left: 64%;
              background-color: rgb(43, 50, 120);
              cursor: pointer;
              border: none;
              color: white;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 320px) and (max-width: 575px) {
  .container-fruid {
    background-color: rgb(43, 50, 120);
    height: auto;
    width: 100%;
  }
  .container {
    width: 100%;
    height: auto;
    margin: auto;
    padding: 5px;
    .nav-top {
      display: none;
      width: 100%;
      .navtop-right {
        width: 50%;
        height: auto;
        ul {
          padding-left: 0px;
          display: flex;
          li {
            margin-right: 5%;
            a {
              font-size: 13px;
            }
          }
        }
      }
      .navtop-left {
        display: flex;
        width: 50%;
        ul {
          width: 80%;
          margin-left: auto;
          display: flex;
          li {
            margin-right: 5%;
            a {
              font-size: 13px;
            }
          }
        }
      }
    }
    .navcenter {
      display: flex;
      width: 100%;
      .logo {
        width: 20%;
        img {
          height: 30px;
          width: 30px;
          margin-left: 32%;
          margin-top: 5px;
        }
      }
      .search {
        width: 80%;
        position: relative;
        .pop-search {
          position: absolute;
          width: 100%;
          right: 0;
          // left: 0;
          background: white;
          padding: 5px;
          -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          .product-search {
            width: 100%;
            display: flex;
            padding: 4px;
            .img-product {
              img {
                height: 70px;
                width: 65px;
              }
            }
            .detail-product {
              margin-left: 1%;
              a {
                color: black;
              }
              p {
                color: red;
                font-size: 14px;
                margin-top: 4px;
              }
            }
          }
        }
        .txt-search {
          width: 100%;
          height: 100%;
          position: relative;
          padding: 5px;
          height: 40px;
        }
        button {
          top: 0;
          position: absolute;
          background-color: rgb(43, 50, 120);
          height: 36px;
          right: 0;
          margin: 3px;
          width: 20%;
          cursor: pointer;
          border: none;
          color: white;
        }
      }
      .cart-icon {
        position: relative;
        width: 20%;
        cursor: pointer;
        .fa-shopping-cart {
          color: white;
          margin-left: 20%;
          margin-top: 4%;
          font-size: 25px;
          .qty-cart {
            position: absolute;
            font-size: 12px;
            top: 0;
            right: 30px;
            width: 20px;
            height: 20px;
            background: white;
            color: black;
            border-radius: 100%;
            line-height: 20px;
            text-align: center;
          }
          .pop-cart {
            padding-bottom: 2%;
            z-index: 9;
            width: 300%;
            background: white;
            color: black;
            height: auto;
            -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            .product-cart {
              width: 100%;
              display: flex;
              .image-pop-cart {
                width: 20%;
                img {
                  width: 45px;
                  height: 45px;
                  margin: 10%;
                }
              }
              .name-pop-cart {
                width: 60%;
                a {
                  font-size: 14px;
                  color: black;
                  font-weight: normal;
                }
              }
              .action-pop-cart {
                width: 20%;
                margin: 3%;
                a {
                  font-weight: normal;
                  font-size: 14px;
                  color: blue;
                }
                p {
                  font-weight: normal;
                  font-size: 16px;
                  color: red;
                }
              }
            }
            .btn-to-cart {
              padding: 10px 24px;
              margin-left: 64%;
              background-color: rgb(43, 50, 120);
              cursor: pointer;
              border: none;
              color: white;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 576px) and (max-width: 767px) {
  .container-fruid {
    background-color: rgb(43, 50, 120);
    height: auto;
    width: 100%;
  }
  .container {
    width: 100%;
    height: auto;
    margin: auto;
    padding: 5px;
    .nav-top {
      display: none;
      width: 100%;
      .navtop-right {
        width: 50%;
        height: auto;
        ul {
          padding-left: 0px;
          display: flex;
          li {
            margin-right: 5%;
            a {
              font-size: 13px;
            }
          }
        }
      }
      .navtop-left {
        display: flex;
        width: 50%;
        ul {
          width: 80%;
          margin-left: auto;
          display: flex;
          li {
            margin-right: 5%;
            a {
              font-size: 13px;
            }
          }
        }
      }
    }
    .navcenter {
      display: flex;
      width: 100%;

      .logo {
        width: 20%;
        img {
          height: 30px;
          width: 30px;
          margin-left: 32%;
          margin-top: 5px;
        }
      }
      .search {
        width: 80%;
        position: relative;
        .pop-search {
          position: absolute;
          width: 100%;
          right: 0;
          // left: 0;
          background: white;
          padding: 5px;
          -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          .product-search {
            width: 100%;
            display: flex;
            padding: 4px;
            .img-product {
              img {
                height: 70px;
                width: 65px;
              }
            }
            .detail-product {
              margin-left: 1%;
              a {
                color: black;
              }
              p {
                color: red;
                font-size: 14px;
                margin-top: 4px;
              }
            }
          }
        }
        .txt-search {
          width: 100%;
          height: 100%;
          position: relative;
          padding: 5px;
          height: 40px;
        }
        button {
          top: 0;
          position: absolute;
          background-color: rgb(43, 50, 120);
          height: 36px;
          right: 0;
          margin: 3px;
          width: 20%;
          cursor: pointer;
          border: none;
          color: white;
        }
      }
      .cart-icon {
        position: relative;
        width: 20%;
        cursor: pointer;
        .fa-shopping-cart {
          color: white;
          margin-left: 20%;
          margin-top: 4%;
          font-size: 25px;
          .qty-cart {
            position: absolute;
            font-size: 12px;
            top: 0;
            right: 30px;
            width: 20px;
            height: 20px;
            background: white;
            color: black;
            border-radius: 100%;
            line-height: 20px;
            text-align: center;
          }
          .pop-cart {
            padding-bottom: 2%;
            z-index: 9;
            width: 300%;
            background: white;
            color: black;
            height: auto;
            -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            .product-cart {
              width: 100%;
              display: flex;
              .image-pop-cart {
                width: 20%;
                img {
                  width: 45px;
                  height: 45px;
                  margin: 10%;
                }
              }
              .name-pop-cart {
                width: 60%;
                a {
                  font-size: 14px;
                  color: black;
                  font-weight: normal;
                }
              }
              .action-pop-cart {
                width: 20%;
                margin: 3%;
                a {
                  font-weight: normal;
                  font-size: 14px;
                  color: blue;
                }
                p {
                  font-weight: normal;
                  font-size: 16px;
                  color: red;
                }
              }
            }
            .btn-to-cart {
              padding: 10px 24px;
              margin-left: 64%;
              background-color: rgb(43, 50, 120);
              cursor: pointer;
              border: none;
              color: white;
            }
          }
        }
      }
    }
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) and (max-width: 991px) {
  .container-fruid {
    background-color: rgb(43, 50, 120);
    height: auto;
    width: 100%;
  }
  .container {
    width: 100%;
    height: auto;
    margin: auto;
    padding: 5px;
    .nav-top {
      display: none;
      width: 100%;
      .navtop-right {
        width: 50%;
        height: auto;
        ul {
          padding-left: 0px;
          display: flex;
          li {
            margin-right: 5%;
            a {
              font-size: 13px;
            }
          }
        }
      }
      .navtop-left {
        display: flex;
        width: 50%;
        ul {
          width: 80%;
          margin-left: auto;
          display: flex;
          li {
            margin-right: 5%;
            a {
              font-size: 13px;
            }
          }
        }
      }
    }
    .navcenter {
      display: flex;
      width: 100%;

      .logo {
        width: 20%;
        img {
          height: 30px;
          width: 30px;
          margin-left: 32%;
          margin-top: 5px;
        }
      }
      .search {
        width: 80%;
        position: relative;
        .pop-search {
          position: absolute;
          width: 100%;
          right: 0;
          // left: 0;
          background: white;
          padding: 5px;
          -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          .product-search {
            width: 100%;
            display: flex;
            padding: 4px;
            .img-product {
              img {
                height: 70px;
                width: 65px;
              }
            }
            .detail-product {
              margin-left: 1%;
              a {
                color: black;
              }
              p {
                color: red;
                font-size: 14px;
                margin-top: 4px;
              }
            }
          }
        }
        .txt-search {
          width: 100%;
          height: 100%;
          position: relative;
          padding: 5px;
          height: 40px;
        }
        button {
          top: 0;
          position: absolute;
          background-color: rgb(43, 50, 120);
          height: 36px;
          right: 0;
          margin: 3px;
          width: 20%;
          cursor: pointer;
          border: none;
          color: white;
        }
      }
      .cart-icon {
        position: relative;
        width: 20%;
        cursor: pointer;
        .fa-shopping-cart {
          color: white;
          margin-left: 20%;
          margin-top: 4%;
          font-size: 25px;
          .qty-cart {
            position: absolute;
            font-size: 12px;
            top: 0;
            right: 30px;
            width: 20px;
            height: 20px;
            background: white;
            color: black;
            border-radius: 100%;
            line-height: 20px;
            text-align: center;
          }
          .pop-cart {
            padding-bottom: 2%;
            z-index: 9;
            width: 300%;
            background: white;
            color: black;
            height: auto;
            -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            .product-cart {
              width: 100%;
              display: flex;
              .image-pop-cart {
                width: 20%;
                img {
                  width: 45px;
                  height: 45px;
                  margin: 10%;
                }
              }
              .name-pop-cart {
                width: 60%;
                a {
                  font-size: 14px;
                  color: black;
                  font-weight: normal;
                }
              }
              .action-pop-cart {
                width: 20%;
                margin: 3%;
                a {
                  font-weight: normal;
                  font-size: 14px;
                  color: blue;
                }
                p {
                  font-weight: normal;
                  font-size: 16px;
                  color: red;
                }
              }
            }
            .btn-to-cart {
              padding: 10px 24px;
              margin-left: 64%;
              background-color: rgb(43, 50, 120);
              cursor: pointer;
              border: none;
              color: white;
            }
          }
        }
      }
    }
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) and (max-width: 1199px) {
  .container-fruid {
    background-color: rgb(43, 50, 120);
    height: 120px;
    width: 100%;
  }
  .container {
    width: 100%;
    height: auto;
    margin: auto;
    .nav-top {
      display: flex;
      width: 100%;
      .navtop-right {
        width: 50%;
        height: auto;
        ul {
          padding-left: 0px;
          display: flex;
          li {
            margin-right: 5%;
            a {
              font-size: 13px;
            }
          }
        }
      }
      .navtop-left {
        display: flex;
        width: 50%;
        ul {
          width: 80%;
          margin-left: auto;
          display: flex;
          li {
            margin-right: 5%;
            a {
              font-size: 13px;
            }
          }
        }
      }
    }
    .navcenter {
      display: flex;
      width: 100%;
      margin-top: 25px;
      .logo {
        width: 20%;
        img {
          height: 50px;
          width: 50px;
          margin-left: 32%;
        }
      }
      .search {
        width: 80%;
        position: relative;
        .pop-search {
          position: absolute;
          width: 80%;
          background: white;
          padding: 5px;
          -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
          .product-search {
            width: 100%;
            display: flex;
            padding: 4px;
            .img-product {
              img {
                height: 70px;
                width: 65px;
              }
            }
            .detail-product {
              margin-left: 1%;
              a {
                color: black;
              }
              p {
                color: red;
                font-size: 14px;
                margin-top: 4px;
              }
            }
          }
        }
        .txt-search {
          width: 100%;
          height: 100%;
          position: relative;
          padding: 5px;
          height: 50px;
        }
        button {
          top: 0;
          position: absolute;
          background-color: rgb(43, 50, 120);
          height: 45px;
          right: 0;
          margin: 3px;
          width: 10%;

          cursor: pointer;
          border: none;
          color: white;
        }
      }
      .cart-icon {
        position: relative;
        width: 20%;
        cursor: pointer;
        .fa-shopping-cart {
          color: white;
          margin-left: 20%;
          margin-top: 4%;
          font-size: 30px;
          .qty-cart {
            position: absolute;
            font-size: 12px;
            top: 0;
            right: 55%;
            width: 20px;
            height: 20px;
            background: white;
            color: black;
            border-radius: 100%;
            line-height: 20px;
            text-align: center;
          }
          .pop-cart {
            padding-bottom: 2%;
            z-index: 9;
            width: 300%;
            background: white;
            color: black;
            height: auto;
            -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
            .product-cart {
              width: 100%;
              display: flex;
              .image-pop-cart {
                width: 20%;
                img {
                  width: 45px;
                  height: 45px;
                  margin: 10%;
                }
              }
              .name-pop-cart {
                width: 60%;
                a {
                  font-size: 14px;
                  color: black;
                  font-weight: normal;
                }
              }
              .action-pop-cart {
                width: 20%;
                margin: 3%;
                a {
                  font-weight: normal;
                  font-size: 14px;
                  color: blue;
                }
                p {
                  font-weight: normal;
                  font-size: 16px;
                  color: red;
                }
              }
            }
            .btn-to-cart {
              padding: 10px 24px;
              margin-left: 64%;
              background-color: rgb(43, 50, 120);
              cursor: pointer;
              border: none;
              color: white;
            }
          }
        }
      }
    }
  }
}

// Extra large devices (large desktops, 1200px and up)
</style>
