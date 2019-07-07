<template>
  <div class="contaier-fruid">
    <div class="container-rating">
      <!-- <h1 v-for="i in items" :class="{highlight:i == selected}" @click="selected = i" >sadsdadsa</h1> -->
      <div class="rating-box">
        <div class="rating-box-left" v-if="ratings.length > 0">
          <p>Đánh giá trung bình</p>
          <p>{{ mediumstar.toFixed(1) }}/5</p>
          <i class="fas fa-star" v-for=" n in Math.floor(mediumstar)" :key="n"></i>
          <i class="far fa-star" v-for=" n in 5-Math.floor(mediumstar)" :key="n + 1"></i>
          <p class="total-rating">( {{ ratings.length }} nhận xét )</p>
        </div>
        <div class="rating-box-center" v-if="ratings.length > 0">
          <div class="pr-rating">
            <div class="number-rating">
              <p>
                5
                <i class="fas fa-star"></i>
              </p>
            </div>
            <div class="tool-bar">
              <div
                class="tool-bar-float"
                v-bind:style="{ width : (totalStarFive.length / ratings.length) *100  + '%' }"
              ></div>
            </div>
            <div class="rating-total">{{ totalStarFive.length }}</div>
          </div>
          <div class="pr-rating">
            <div class="number-rating">
              <p>
                4
                <i class="fas fa-star"></i>
              </p>
            </div>
            <div class="tool-bar">
              <div
                class="tool-bar-float"
                v-bind:style="{ width : (totalStarFour.length / ratings.length) *100  + '%' }"
              ></div>
            </div>
            <div class="rating-total">{{ totalStarFour.length }}</div>
          </div>
          <div class="pr-rating">
            <div class="number-rating">
              <p>
                3
                <i class="fas fa-star"></i>
              </p>
            </div>
            <div class="tool-bar">
              <div
                class="tool-bar-float"
                v-bind:style="{ width : (totalStarThree.length / ratings.length) *100  + '%' }"
              ></div>
            </div>
            <div class="rating-total">{{ totalStarThree.length }}</div>
          </div>
          <div class="pr-rating">
            <div class="number-rating">
              <p>
                2
                <i class="fas fa-star"></i>
              </p>
            </div>
            <div class="tool-bar">
              <div
                class="tool-bar-float"
                v-bind:style="{ width : (totalStarTwo.length / ratings.length) *100  + '%' }"
              ></div>
            </div>
            <div class="rating-total">{{ totalStarTwo.length }}</div>
          </div>
          <div class="pr-rating">
            <div class="number-rating">
              <p>
                1
                <i class="fas fa-star"></i>
              </p>
            </div>
            <div class="tool-bar">
              <div
                class="tool-bar-float"
                v-bind:style="{ width : (totalStarOne.length / ratings.length) *100  + '%' }"
              ></div>
            </div>
            <div class="rating-total">{{ totalStarOne.length }}</div>
          </div>
        </div>
        <div class="rating-box-right">
          <p>Chia sẻ nhận xét về sản phẩm</p>
          <button @click="toggleCmtAc">{{ titleToggle }}</button>
        </div>
      </div>
      <div class="btn-choose-rating">
        <div class="button">
          <button :class="{highlight:1 == selected}" @click="selected = 1">Tất cả</button>
          <button
            :class="{highlight:2 == selected}"
            @click="selected = 2"
          >5 sao({{ totalStarFive.length }})</button>
          <button
            :class="{highlight:3 == selected}"
            @click="selected = 3"
          >4 sao({{ totalStarFour.length }})</button>
          <button
            :class="{highlight:4 == selected}"
            @click="selected = 4"
          >3 sao({{ totalStarThree.length }})</button>
          <button
            :class="{highlight:5 == selected}"
            @click="selected = 5"
          >2 sao({{ totalStarTwo.length }})</button>
          <button
            :class="{highlight:6 == selected}"
            @click="selected = 6"
          >1 sao({{ totalStarOne.length }})</button>
        </div>
      </div>
      <div class="box-rating" v-for=" item in ratings" :key="item.id">
        <div class="div">
          <div class="img">
            <img src="https://cf.shopee.vn/file/e9534ab02c7d1eceae35917a633d533e_tn" alt />
          </div>
          <div class="content">
            <p>{{ item.user.name}}</p>
            <p>
              <i class="fas fa-star" v-for="n in item.star" :key="n"></i><i class="far fa-star" v-for="n in 5 - item.star" :key="n"></i>
            </p>
            <div class="product-rating">
              <div class="img-product">
                <img :src="item.product.image" alt />
              </div>
              <div class="name">
                <p>{{ item.product.name }}</p>
                <p>₫{{ item.product.price }}</p>
              </div>
            </div>
            <div class="date-rating">{{ moment(item.created_at).fromNow()}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import Vue from "vue";
import moment from "moment";
moment.locale("vi");
import socket from "~/plugins/socket.io.js";
export default {
  async asyncData({ $axios, params }) {
    const data = await $axios.get("/api/rating/buyer/" + params.id);
    console.log(data);
    return { ratings: data.data };
  },
  components: {
    StarRating
  },
  props: ["product"],
  data() {
    return {
      moment: moment,
      toggleCmt: false,
      rating: {
        star: 0,
        id: 1,
        name: "",
        title: "",
        content: "",
        image: ""
      },
      selected: 1,
      items: [],
      idRating: "",
      contentRepRating: ""
    };
  },
  beforeMount() {
    socket.on("nhannhe", (room, message) => {
      var audio = new Audio("/Iphone.mp3");
      audio.play();
      console.log(this.room);
      if (this.room.id == room) {
        this.room.messagers.push(message);
      } else {
        console.log(this.$store.state.rooms);
        console.log(room);
        this.room = this.$store.state.rooms.find(room => room.id === room);
        console.log(this.room);
        this.count = this.count + 1;
        this.room.messagers.push(message);
      }

      // this.$store.commit("ADD_MESS", message);
    });
  },
  computed: {
    totalStarFive() {
      return this.ratings.filter(star => star.star === 5);
    },
    totalStarFour() {
      return this.ratings.filter(star => star.star === 4);
    },
    totalStarThree() {
      return this.ratings.filter(star => star.star === 3);
    },
    totalStarTwo() {
      return this.ratings.filter(star => star.star === 2);
    },
    totalStarOne() {
      return this.ratings.filter(star => star.star === 1);
    },
    titleToggle() {
      return this.toggleCmt === true ? "Đóng" : "Viết nhận xét của bạn";
    },
    mediumstar() {
      return (
        (this.totalStarOne.length * 1 +
          this.totalStarTwo.length * 2 +
          this.totalStarThree.length * 3 +
          this.totalStarFour.length * 4 +
          this.totalStarFive.length * 5) /
        this.ratings.length
      );
    }
  },
  methods: {
    toggleCmtAc() {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.toggleCmt = !this.toggleCmt;
      }
    },
    send_reprating(item) {
      console.log(item);
      var rating = this.product.ratings.find(star => star.id === item.id);
      console.log(rating);
      rating.rep_ratings.push({ content: item.contentcmt });
      this.$axios
        .post("/api/rating/add_reprating", {
          image: "",
          content: item.contentcmt,
          RatingId: item.id
        })
        .then(response => {
          console.log("ok");
        });
    },
    sendRating() {
      // this.rating.id = this.rating.id + 1;

      // this.$emit("totalRating", {
      //   total: this.product.ratings.length,
      //   mediumstar: this.mediumstar
      // });
      this.$axios
        .post("/api/rating/add", {
          title: this.rating.title,
          star: this.rating.star,
          image: this.rating.image,
          content: this.rating.content,
          ProductId: this.product.id
        })
        .then(response => {
          this.product.ratings.unshift({
            id: response.data.id,
            user: {
              name: this.$store.state.authUser.name
            },
            title: response.data.title,
            star: response.data.star,
            image: response.data.image,
            content: response.data.content,
            rep_ratings: []
          });
          this.product.ratings.forEach(item => {
            Vue.set(item, "is_rating", false);
            Vue.set(item, "contentcmt", "");
          });
          var message = {
            content: "ádasdasd",
            nameuser: this.product.user.name,
            roomid: this.product.user.name
          };
          socket.emit("send-nofi-cmt", message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.highlight {
  border: 1px solid red !important;
  color: red !important;
  outline: none;
}
.contaier-fruid {
  width: 100%;
  background: #f0f0f0;
  .container-rating {
    width: 1200px;
    margin: auto;
    background: white;
  }
  .box-rating {
    width: 100%;
    padding: 10px;
    .div {
      width: 100%;
      display: flex;
      .img {
        width: 4%;
        img {
          width: 100%;
          border-radius: 100%;
        }
      }
      .content {
        width: 88%;
        p {
          margin-left: 20px;
          color: rgba(0, 0, 0, 0.87);
          font-size: 0.75rem;
          text-decoration: none;
          i {
            color: #fd9727;
            font-size: 12px;
          }
        }
        .product-rating {
          margin: 15px;
          width: 100%;
          display: flex;
          p:nth-child(1) {
            font-size: 16px;
          }
          p:nth-child(2) {
            font-size: 13px;
            color: red;
            margin-top: 4px;
          }
          .img-product {
            width: 5%;
            img {
              width: 100%;
            }
          }
        }
      }
      .date-rating {
        margin-top: 0.75rem;
        margin-left: 10px;
        font-size: 0.75rem;
        color: rgba(0, 0, 0, 0.54);
      }
    }
  }
  .btn-choose-rating {
    width: 100%;
    .button {
      button {
        cursor: pointer;
        user-select: none;
        height: 2rem;
        line-height: 2rem;
        min-width: 6.25rem;
        text-align: center;
        background-color: rgb(255, 255, 255);
        box-sizing: border-box;
        display: inline-block;
        margin-right: 0.5rem;
        color: rgba(0, 0, 0, 0.8);
        text-transform: capitalize;
        margin-bottom: 0.3125rem;
        margin-top: 0.3125rem;
        padding: 0px 0.625rem;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.09);
        border-image: initial;
        text-decoration: none;
        border-radius: 2px;
      }
    }
  }

  .rating-box {
    border: 1px solid #f7f7f7;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .rating-box-left {
      width: 30%;
      border-right: 1px solid #f7f7f7;
      p:nth-child(2) {
        font-size: 47px;
        color: #fe302e;
        font-weight: 500;
      }
      .total-rating {
        font-size: 14px;
        color: #8f8f8f;
      }
      i {
        color: #fdd22f;
      }
    }
    .rating-box-center {
      width: 40%;
      border-right: 1px solid #f7f7f7;
      .pr-rating {
        width: 70%;
        display: flex;
        margin: 7px auto 3px;
        .number-rating {
          width: 15%;
        }
        .tool-bar {
          width: 70%;
          height: 12px;
          background: #efefef;
          position: relative;
          margin-top: 6px;
          .tool-bar-float {
            position: absolute;
            width: 80%;
            height: 100%;
            background: #1dc425;
          }
        }
        .rating-total {
          width: 15%;
        }
      }
    }
    .rating-box-right {
      width: 30%;
      button {
        width: 70%;
        background: #fdd22f;
        padding: 10px 12px;
        margin-top: 8px;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
