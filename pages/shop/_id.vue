<template>
  <div class="container">
    <div class="content-left">
      <div class="filter">
        <div class="title-filter">
          <h4>BỘ LỌC TÌM KIẾM</h4>
          <div class="filter-cate">
            <p>Theo danh mục</p>
            <ul>
              <li v-for="item in subcates" :key="item.id">{{item.name }}</li>
            </ul>
          </div>
          <!-- <div class="filter-rating">
            <h5>Đánh giá</h5>
            <p @click="filterStar(5)">
              <i class="fas fa-star" v-for="n in 5" :key="n + 1"></i>( ít nhất 5 sao )
            </p>
            <p @click="filterStar(4)">
              <i class="fas fa-star" v-for="n in 4" :key="n + 1"></i>
              <i class="far fa-star" v-for="n in 1" :key="n + 1"></i>( ít nhất 4 sao )
            </p>
            <p @click="filterStar(3)">
              <i class="fas fa-star" v-for="n in 3" :key="n + 2"></i>
              <i class="far fa-star" v-for="n in 2" :key="n + 1"></i> ít nhất 3 sao )
            </p>
            <p @click="filterStar(2)">
              <i class="fas fa-star" v-for="n in 2" :key="n + 3"></i>
              <i class="far fa-star" v-for="n in 3" :key="n + 1"></i>( ít nhất 2 sao )
            </p>
            <p @click="filterStar(1)">
              <i class="fas fa-star" v-for="n in 1" :key="n + 4"></i>
              <i class="far fa-star" v-for="n in 4" :key="n + 1"></i>( ít nhất 1 sao )
            </p>
          </div>-->
          <div class="filter-rating">
            <h5>Gía</h5>
            <div class="input">
              <input type="text" class="txt-form" placeholder="Từ" />
              <input type="text" class="txt-form" placeholder="Đến" />
            </div>
            <div class="btn">
              <button>áp dụng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div class="container">
        <div class="saler">
          <div class="saler-left">
            <div class="img" v-if="user.avatar != 0">
              <img :src="user.avatar" alt />
            </div>
            <div class="img" v-if="user.avatar == 0">
              <img src="/img/images.png" alt />
            </div>
            <div class="chat-saler">
              <p class="name-saler">{{ user.name }}</p>
              <p class="online" v-if="online == 1">Đang online</p>
              <p
                class="online"
                v-if="online == 0"
              >Offline {{ moment(user.updated_at).fromNow()}}</p>
              <button @click="showDivChat">Chat ngay</button>
              <button @click="followSaler">{{ checkFollow === undefined ? 'Follow' : 'Đã Follow' }}</button>
            </div>
          </div>
          <div class="saler-right">
            <ul>
              <li>
                <nuxt-link :to="`/buyer/rating/${ user.id }`">
                  Đánh giá :
                  <span>{{ totalRating }}</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="`/shop/${ user.id }`">
                  Sản phẩm :
                  <span>{{ totalProduct }}</span>
                </nuxt-link>
              </li>
              <li>
                Tham gia :
                <span>{{ moment(user.created_at).fromNow()}}</span>
              </li>
              <li>
                Người theo dõi :
                <span>{{ totalFollow }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="title-filter-product">
        <div>
          <ul>
            <li>Ưu tiên xem :</li>
            <li>Hàng mới</li>
            <li>Bán chạy</li>
            <li>Gia cao đến thấp</li>
            <li>Gía thấp đến cao</li>
            <!-- <li>Hàng mới</li> -->
          </ul>
        </div>
      </div>
      <div class="product-content">
        <div class="product" v-for="item in products" :key="item.id">
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
    </div>
  </div>
</template>
<script>
import moment from "moment";
moment.locale("vi");
export default {
  async asyncData({ $axios, params }) {
    var data = await $axios.get("/api/product/shop/" + params.id);
    return {
      products: data.data.products,
      totalProduct: data.data.totalProduct,
      totalRating: data.data.totalRating,
      totalFollow: data.data.totalFollow,     
      user : data.data.user,
      follows : data.data.follows
    };
  },
  computed: {
    subcates() {
      var subcates = [];
      for (var i = 0; i < this.products.length; i++) {
        console.log(this.products[i].subcate);
        // subcates = subcates.push(this.products[i].subcate)
        subcates = [...subcates, this.products[i].subcate];
      }

      var uniqueAddresses;
      uniqueAddresses = Array.from(new Set(subcates.map(a => a.name))).map(
        name => {
          return subcates.find(a => a.name === name);
        }
      );
      console.log(uniqueAddresses);
      return uniqueAddresses;
    },
    checkFollow: {
      get: function() {
        if (this.follows) {
          console.log("online" + this.online);
          var index;
          if (this.$store.state.authUser && this.follows.length > 0) {
            index = this.follows.find(
              follow => follow.UserIdFollow === this.user.id
            );
          }
          return index;
        }
      },
      set: function(newValue) {
        this.index = newValue;
      }
    }
  },
  data(){
    return {
      moment: moment,
    }
  },
  methods: {
    followSaler(product) {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        var find = this.follows.find(
          follow => follow.UserIdFollow === this.user.id
        );
        var index = this.follows.indexOf(find);
        if (find) {
          this.follows.splice(index, 1);
        } else {
          var anhquy = {
            UserId: this.$store.state.authUser.id,
            ProductId: 12,
            UserIdFollow: this.user.id
          };
          this.follows.push(anhquy);
        }
        this.$axios
          .post("/api/follow/add", {
            ProductId:12,
            UserIdFollow: this.user.id
          })
          .then(response => {});
      }
    },
    chatUser(item) {
      this.selected = item.id;
      this.roomname = item.id;
      this.room = this.rooms.find(room => room.id === item.id);
      this.count = "";
      if (item.UserName1 == this.$store.state.authUser.name) {
        this.idUserSend = item.UserName2;
      } else if (item.UserName2 == this.$store.state.authUser.name) {
        this.idUserSend = item.UserName1;
      }
    },
    showDivChat() {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.$axios
          .post("/api/room/add", {
            user: this.user
          })
          .then(response => {
            console.log(response);
            this.rooms = response.data;
            this.$store.commit("ROOMS", response.data);
            this.chatUser(this.rooms[0])
          });
        this.$store.commit("TOGGLE_CHAT");
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    filterStar(item) {
      this.$axios
        .post("/api/product/filterProduct", {
          value: item,
          UserId: this.products.user.id
        })
        .then(response => {
          this.products = response.data;
        });
    }
  },
  formatPrice(value) {
    let val = (value / 1).toFixed(0).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
ul li {
  list-style-type: none;
}
.container {
  margin-top: 25px !important;
  .saler {
    display: flex;
    padding: 10px 0px;
    .chat-saler {
      width: 70%;
      .name-saler {
        font-weight: 400;
        font-size: 1rem;
        color: rgba(0, 0, 0, 0.87);
        margin: 0;
      }
      .online {
        font-size: 0.875rem;
        color: rgba(0, 0, 0, 0.54);
        text-transform: capitalize;
      }
      button {
        margin-top: 15px;
        color: #00bfa5;
        border: 1px solid #00bfa5;
        background: white;
        padding: 8px 15px;
      }
    }
    .saler-left {
      display: flex;
      width: 35%;
      .img {
        width: 25%;
        padding-left: 10px;
        img {
          width: 75%;
        }
      }
      .chat-saler {
        width: 80%;
      }
    }
    .saler-right {
      width: 65%;
      display: flex;
      ul {
        width: 100%;
        li {
          a {
            color: rgba(0, 0, 0, 0.4);
            text-decoration: none;
          }
          text-transform: capitalize;
          color: rgba(0, 0, 0, 0.4);
          float: left;
          font-size: 14px;
          margin-right: 40px;
          span {
            color: red;
          }
        }
      }
    }
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

