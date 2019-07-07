<template>
  <div class="container">
    <h3>Khách hàng nhận xét</h3>
    <div class="rating-box">
      <div class="rating-box-left" v-if="product.ratings.length > 0">
        <p>Đánh giá trung bình</p>
        <p>{{ mediumstar.toFixed(1) }}/5</p>
        <i class="fas fa-star" v-for=" n in Math.floor(mediumstar)" :key="n"></i>
        <i class="far fa-star" v-for=" n in 5-Math.floor(mediumstar)" :key="n + 1"></i>
        <p class="total-rating">( {{ this.product.ratings.length }} nhận xét )</p>
      </div>
      <div class="rating-box-center" v-if="product.ratings.length > 0">
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
              v-bind:style="{ width : (totalStarFive.length / product.ratings.length) *100  + '%' }"
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
              v-bind:style="{ width : (totalStarFour.length / product.ratings.length) *100  + '%' }"
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
              v-bind:style="{ width : (totalStarThree.length / product.ratings.length) *100  + '%' }"
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
              v-bind:style="{ width : (totalStarTwo.length / product.ratings.length) *100  + '%' }"
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
              v-bind:style="{ width : (totalStarOne.length / product.ratings.length) *100  + '%' }"
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
    <div class="box-comment" v-if="toggleCmt">
      <div class="action-comment">
        <p class="title">GỬI NHẬN XÉT CỦA BẠN</p>

        <p>
          1. Đánh giá của bạn về sản phẩm này:
          <star-rating v-model="rating.star" v-bind:star-size="20"></star-rating>
        </p>
        <p>2. Tiêu đề của nhận xét:</p>
        <div>
          <input type="text" class="txt-content" v-model="rating.title" />
        </div>
        <p>3. Viết nhận xét của bạn vào bên dưới:</p>
        <div>
          <textarea name id cols="30" rows="8" class="txt-content-main" v-model="rating.content"></textarea>
        </div>
        <div>
          <span>Thêm hình sản phẩm nếu có (tối đa 5 hình):</span>
          <input type="file" id="upload-image" />
          <label for="upload-image">
            <button>Chọn hình ảnh</button>
          </label>
        </div>
        <div class="btn-send-rating">
          <button @click="sendRating">Gửi nhận xét</button>
        </div>
      </div>
      <div class="product-comment">
        <div class="img">
          <img :src="product.image" alt />
        </div>
        <div class="name">
          <p>Máy Lạnh Inverter Daikin FTKQ35SAVMV/RKQ35SAVMV (1.5HP)</p>
        </div>
        <div class="price">Giá: 10.790.000 ₫</div>
      </div>
    </div>
    <div class="box-customer-comment" v-if="product.ratings.length > 0">
      <div class="filer-comment">
        <div class="btn-choose-rating">
          <div class="button">
            <button :class="{highlight:7 == selected}" @click="filterRating(7)">Tất cả</button>
            <button
              :class="{highlight:5 == selected}"
              @click="filterRating(5)"
            >5 sao({{ totalStarFive.length }})</button>
            <button
              :class="{highlight:4 == selected}"
              @click="filterRating(4)"
            >4 sao({{ totalStarFour.length }})</button>
            <button
              :class="{highlight:3 == selected}"
              @click="filterRating(3)"
            >3 sao({{ totalStarThree.length }})</button>
            <button
              :class="{highlight:2 == selected}"
              @click="filterRating(2)"
            >2 sao({{ totalStarTwo.length }})</button>
            <button
              :class="{highlight:1 == selected}"
              @click="filterRating(1)"
            >1 sao({{ totalStarOne.length }})</button>
            <button
              :class="{highlight:7 == selected}"
              @click="filterRating(7)"
            >có bình luận({{ totalStarOne.length }})</button>
            <button
              :class="{highlight:8 == selected}"
              @click="filterRating(8)"
            >có hình ảnh({{ totalStarOne.length }})</button>
          </div>
        </div>
      </div>
      <div class="rating-cmt" v-for="item in anhquy" :key="item.id">
        <div class="avatar">
          <div class="inclue-avatar">
            <div class="div-avatar"></div>
            <div class="name-customer">{{ item.user.name }}</div>
            <div class="time">2 tháng trước</div>
          </div>
        </div>
        <div class="content-cmt">
          <div>
            <p>
              <i class="fas fa-star" v-for="n in item.star" :key=" n + 2"></i>
              <i class="far fa-star" v-for="n in 5-item.star" :key=" n + 5"></i> Cực Kì Hài Lòng
            </p>
            <p class="buy-alredy">Đã mua sản phẩm này tại Tiki</p>
            <p>{{ item.content }}</p>
          </div>
          <div class>
            <a @click=" item.is_rating = !item.is_rating">Gui trả lời</a>
          </div>

          <div class="img-cmt">
            <!-- <img
              :src="product.image"
              alt
            >-->
          </div>
          <div class="txt-reply" v-if="item.is_rating">
            <div class>
              <textarea v-model="item.contentcmt"></textarea>
              <div class="btn-send-rep">
                <button @click="send_reprating(item)">Gửi câu trả lời</button>
                <button>Hủy bỏ</button>
              </div>
            </div>
          </div>
          <div class="rep-rating" v-for="prod in item.rep_ratings" :key="prod.id">
            <div class="avatar-rep"></div>
            <div class="content-rep">
              <p>Phản Hồi Của Người Bán</p>
              <p>{{ prod.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import StarRating from "vue-star-rating";
import Vue from "vue";
import socket from "~/plugins/socket.io.js";
export default {
  components: {
    StarRating
  },
  props: ["product"],
  data() {
    return {
      toggleCmt: false,
      rating: {
        star: 0,
        id: 1,
        name: "",
        title: "",
        content: "",
        image: ""
      },
      idRating: "",
      contentRepRating: "",
      selected: 7,
      showDiv:false,
      anhquy : []
    };
  },
  beforeMount() {
    socket.on("nhannhe", (room, message) => {
      // alert(message);
      console.log(message);
      console.log(room);
      var audio = new Audio("/Iphone.mp3"); // path to filesssdsaaaaaaaaaaaa
      audio.play();

      // this.room = this.rooms.find( room => room.id === room)
      console.log();
      // this.room.messagers.push(message)
      // var audio = new Audio('/Iphone.mp3') // path to file
      // audio.play()
      // var anhquy = this.messages.messages
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
      return this.product.ratings.filter(star => star.star === 5);
    },
    totalStarFour() {
      return this.product.ratings.filter(star => star.star === 4);
    },
    totalStarThree() {
      return this.product.ratings.filter(star => star.star === 3);
    },
    totalStarTwo() {
      return this.product.ratings.filter(star => star.star === 2);
    },
    totalStarOne() {
      return this.product.ratings.filter(star => star.star === 1);
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
        this.product.ratings.length
      );
    }
  },
  methods: {
    filterRating(item) {
      this.selected = item;
      this.showDiv = true
      this.$axios
        .post("/api/rating/filterRating", {
          ProductId: this.product.id,
          value: item,
        })
        .then(response => {
          console.log(response.data)
          // this.product = _.cloneDeep(response.data)
          // this.product.ratings =  response.data

          this.anhquy = response.data
          console.log(this.product.ratings)
        });
    },
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
          
        });
    },
    sendRating() {
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
.container {
  margin-top: 25px !important;
}
button {
  cursor: pointer;
}
a {
  cursor: pointer;
}
@media only screen and (min-width: 1200px) {
  .container {
    width: 100%;
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
    .box-comment {
      width: 100%;
      display: flex;
      padding: 7px;
      .action-comment {
        width: 50%;
        .title {
          font-weight: bold;
          margin: 10px 0px;
        }
        .txt-content {
          width: 80%;
          height: 35px;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        .txt-content-main {
          width: 80%;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        #upload-image {
          display: none;
        }
        .btn-send-rating {
          button {
            margin: 10px 0px;
            width: 140px;
            font-weight: 500;
            font-size: 13px;
            height: 40px;
            background: #fdd22f;
            border: 0;
            color: #333;
          }
        }
      }
      .product-comment {
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        .price {
          color: red;
          margin: 10px 0px;
          font-weight: bold;
        }
      }
    }
    .box-customer-comment {
      width: 100%;
      .filer-comment {
        display: flex;
        .btn-choose-rating {
          width: 100%;
          padding: 20px;
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
      }
      .rating-cmt {
        display: flex;
        .avatar {
          width: 16%;
          .inclue-avatar {
            width: 80%;
            padding: 20px 0px;
            text-align: center;
            .div-avatar {
              margin: auto;
              width: 65px;
              height: 65px;
              background: #4f4f4f;
              border-radius: 100%;
            }
            .time {
              font-size: 12px;
              color: grey;
            }
            .name-customer {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
        .content-cmt {
          width: 84%;
          padding: 10px 0px;
          padding-right: 20px;
          text-align: justify;
          font-size: 14px;
          line-height: 20px;
          width: 100%;
          margin: 10px 0 8px;
          color: #4f4f4f;
          a {
            text-decoration: none;
            color: #007ff0;
            margin: 10px 0px;
          }
          .txt-reply {
            textarea {
              display: block;
              width: 100%;
              height: 130px;
              margin-bottom: 10px;
              border-color: #e0e0e0;
              resize: none;
            }
            div {
              .btn-send-rep {
                width: 100%;
                button {
                  font-weight: 400;
                  font-size: 13px;
                  background: #fdd22f;
                  border: 0;
                  color: #4a4a4a;
                  padding: 5px 10px;
                }
                button:nth-child(2) {
                  background: #fff;
                  padding: 5px 12px;
                  text-align: center;
                  white-space: nowrap;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-left: 5px;
                  border: 1px solid #adadad;
                }
              }
            }
          }
          .buy-alredy {
            font-size: 12px;
            padding: 1px 0 1px 0px;

            margin: 6px 0;
            color: #22b345;
            font-weight: 400;
            background-size: contain;
          }
          i {
            color: #fdd22f;
            font-size: 14px;
          }
          .img-cmt {
            img {
              width: 10%;
            }
          }
          .rep-rating {
            width: 100%;
            float: right;
            display: flex;
            margin: 10px 0px;
            .avatar-rep {
              width: 10%;
            }
            .content-rep {
              width: 80%;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    width: 100%;
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
    .box-comment {
      width: 100%;
      display: flex;
      padding: 7px;
      .action-comment {
        width: 50%;
        .title {
          font-weight: bold;
          margin: 10px 0px;
        }
        .txt-content {
          width: 80%;
          height: 35px;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        .txt-content-main {
          width: 80%;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        #upload-image {
          display: none;
        }
        .btn-send-rating {
          button {
            margin: 10px 0px;
            width: 140px;
            font-weight: 500;
            font-size: 13px;
            height: 40px;
            background: #fdd22f;
            border: 0;
            color: #333;
          }
        }
      }
      .product-comment {
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        .price {
          color: red;
          margin: 10px 0px;
          font-weight: bold;
        }
      }
    }
    .box-customer-comment {
      width: 100%;
      .filer-comment {
        display: flex;
      }
      .rating-cmt {
        display: flex;
        .avatar {
          width: 16%;
          .inclue-avatar {
            width: 80%;
            padding: 20px 0px;
            text-align: center;
            .div-avatar {
              margin: auto;
              width: 65px;
              height: 65px;
              background: #4f4f4f;
              border-radius: 100%;
            }
            .time {
              font-size: 12px;
              color: grey;
            }
            .name-customer {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
        .content-cmt {
          width: 84%;
          padding: 10px 0px;
          padding-right: 20px;
          text-align: justify;
          font-size: 14px;
          line-height: 20px;
          width: 100%;
          margin: 10px 0 8px;
          color: #4f4f4f;
          a {
            text-decoration: none;
            color: #007ff0;
            margin: 10px 0px;
          }
          .txt-reply {
            textarea {
              display: block;
              width: 100%;
              height: 130px;
              margin-bottom: 10px;
              border-color: #e0e0e0;
              resize: none;
            }
            div {
              .btn-send-rep {
                width: 100%;
                button {
                  font-weight: 400;
                  font-size: 13px;
                  background: #fdd22f;
                  border: 0;
                  color: #4a4a4a;
                  padding: 5px 10px;
                }
                button:nth-child(2) {
                  background: #fff;
                  padding: 5px 12px;
                  text-align: center;
                  white-space: nowrap;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-left: 5px;
                  border: 1px solid #adadad;
                }
              }
            }
          }
          .buy-alredy {
            font-size: 12px;
            padding: 1px 0 1px 0px;

            margin: 6px 0;
            color: #22b345;
            font-weight: 400;
            background-size: contain;
          }
          i {
            color: #fdd22f;
            font-size: 14px;
          }
          .img-cmt {
            img {
              width: 10%;
            }
          }
          .rep-rating {
            width: 100%;
            float: right;
            display: flex;
            .avatar-rep {
              width: 10%;
            }
            .content-rep {
              width: 80%;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .container {
    width: 100%;
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
    .box-comment {
      width: 100%;
      display: flex;
      padding: 7px;
      .action-comment {
        width: 50%;
        .title {
          font-weight: bold;
          margin: 10px 0px;
        }
        .txt-content {
          width: 80%;
          height: 35px;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        .txt-content-main {
          width: 80%;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        #upload-image {
          display: none;
        }
        .btn-send-rating {
          button {
            margin: 10px 0px;
            width: 140px;
            font-weight: 500;
            font-size: 13px;
            height: 40px;
            background: #fdd22f;
            border: 0;
            color: #333;
          }
        }
      }
      .product-comment {
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        .price {
          color: red;
          margin: 10px 0px;
          font-weight: bold;
        }
      }
    }
    .box-customer-comment {
      width: 100%;
      .filer-comment {
        display: flex;
      }
      .rating-cmt {
        display: flex;
        .avatar {
          width: 20%;
          .inclue-avatar {
            width: 80%;
            padding: 20px 0px;
            text-align: center;
            .div-avatar {
              margin: auto;
              width: 65px;
              height: 65px;
              background: #4f4f4f;
              border-radius: 100%;
            }
            .time {
              font-size: 12px;
              color: grey;
            }
            .name-customer {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
        .content-cmt {
          width: 80%;
          padding: 10px 0px;
          padding-right: 20px;
          text-align: justify;
          font-size: 14px;
          line-height: 20px;
          width: 100%;
          margin: 10px 0 8px;
          color: #4f4f4f;
          a {
            text-decoration: none;
            color: #007ff0;
            margin: 10px 0px;
          }
          .txt-reply {
            textarea {
              display: block;
              width: 100%;
              height: 130px;
              margin-bottom: 10px;
              border-color: #e0e0e0;
              resize: none;
            }
            div {
              .btn-send-rep {
                width: 100%;
                button {
                  font-weight: 400;
                  font-size: 13px;
                  background: #fdd22f;
                  border: 0;
                  color: #4a4a4a;
                  padding: 5px 10px;
                }
                button:nth-child(2) {
                  background: #fff;
                  padding: 5px 12px;
                  text-align: center;
                  white-space: nowrap;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-left: 5px;
                  border: 1px solid #adadad;
                }
              }
            }
          }
          .buy-alredy {
            font-size: 12px;
            padding: 1px 0 1px 0px;

            margin: 6px 0;
            color: #22b345;
            font-weight: 400;
            background-size: contain;
          }
          i {
            color: #fdd22f;
            font-size: 14px;
          }
          .img-cmt {
            img {
              width: 10%;
            }
          }
          .rep-rating {
            width: 100%;
            float: right;
            display: flex;
            .avatar-rep {
              width: 10%;
            }
            .content-rep {
              width: 80%;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 320px) and (max-width: 575px) {
  .container {
    width: 100%;
    .rating-box {
      border: 1px solid #f7f7f7;
      height: auto;

      justify-content: center;
      align-items: center;
      text-align: center;
      .rating-box-left {
        width: 100%;
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
        width: 100%;
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
        width: 100%;
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
    .box-comment {
      width: 100%;
      display: flex;
      padding: 7px;
      .action-comment {
        width: 100%;
        .title {
          font-weight: bold;
          margin: 10px 0px;
        }
        .txt-content {
          width: 80%;
          height: 35px;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        .txt-content-main {
          width: 80%;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        #upload-image {
          display: none;
        }
        .btn-send-rating {
          button {
            margin: 10px 0px;
            width: 140px;
            font-weight: 500;
            font-size: 13px;
            height: 40px;
            background: #fdd22f;
            border: 0;
            color: #333;
          }
        }
      }
      .product-comment {
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        display: none;
        .price {
          color: red;
          margin: 10px 0px;
          font-weight: bold;
        }
      }
    }
    .box-customer-comment {
      width: 100%;
      .filer-comment {
        display: flex;
      }
      .rating-cmt {
        display: flex;
        .avatar {
          width: 20%;
          .inclue-avatar {
            width: 80%;
            padding: 20px 0px;
            text-align: center;
            .div-avatar {
              margin: auto;
              width: 45px;
              height: 45px;
              background: #4f4f4f;
              border-radius: 100%;
            }
            .time {
              font-size: 12px;
              color: grey;
            }
            .name-customer {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
        .content-cmt {
          width: 100%;
          padding: 10px 5px;
          padding-right: 0px;
          text-align: justify;
          font-size: 14px;
          line-height: 20px;
          width: 100%;
          margin: 10px 0 8px;
          color: #4f4f4f;
          a {
            text-decoration: none;
            color: #007ff0;
            margin: 10px 0px;
          }
          .txt-reply {
            textarea {
              display: block;
              width: 100%;
              height: 130px;
              margin-bottom: 10px;
              border-color: #e0e0e0;
              resize: none;
            }
            div {
              .btn-send-rep {
                width: 100%;
                button {
                  font-weight: 400;
                  font-size: 13px;
                  background: #fdd22f;
                  border: 0;
                  color: #4a4a4a;
                  padding: 5px 10px;
                }
                button:nth-child(2) {
                  background: #fff;
                  padding: 5px 12px;
                  text-align: center;
                  white-space: nowrap;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-left: 5px;
                  border: 1px solid #adadad;
                }
              }
            }
          }
          .buy-alredy {
            font-size: 12px;
            padding: 1px 0 1px 0px;

            margin: 6px 0;
            color: #22b345;
            font-weight: 400;
            background-size: contain;
          }
          i {
            color: #fdd22f;
            font-size: 14px;
          }
          .img-cmt {
            img {
              width: 30%;
            }
          }
          .rep-rating {
            width: 100%;
            float: right;
            display: flex;
            .avatar-rep {
              width: 10%;
            }
            .content-rep {
              width: 80%;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 768px) and (min-width: 576px) {
  .container {
    width: 100%;
    .rating-box {
      border: 1px solid #f7f7f7;
      height: auto;

      justify-content: center;
      align-items: center;
      text-align: center;
      .rating-box-left {
        width: 100%;
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
        width: 100%;
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
        width: 100%;
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
    .box-comment {
      width: 100%;
      display: flex;
      padding: 7px;
      .action-comment {
        width: 100%;
        .title {
          font-weight: bold;
          margin: 10px 0px;
        }
        .txt-content {
          width: 80%;
          height: 35px;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        .txt-content-main {
          width: 80%;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        #upload-image {
          display: none;
        }
        .btn-send-rating {
          button {
            margin: 10px 0px;
            width: 140px;
            font-weight: 500;
            font-size: 13px;
            height: 40px;
            background: #fdd22f;
            border: 0;
            color: #333;
          }
        }
      }
      .product-comment {
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        display: none;
        .price {
          color: red;
          margin: 10px 0px;
          font-weight: bold;
        }
      }
    }
    .box-customer-comment {
      width: 100%;
      .filer-comment {
        display: flex;
      }
      .rating-cmt {
        display: flex;
        .avatar {
          width: 20%;
          .inclue-avatar {
            width: 80%;
            padding: 20px 0px;
            text-align: center;
            .div-avatar {
              margin: auto;
              width: 45px;
              height: 45px;
              background: #4f4f4f;
              border-radius: 100%;
            }
            .time {
              font-size: 12px;
              color: grey;
            }
            .name-customer {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
        .content-cmt {
          width: 100%;
          padding: 10px 5px;
          padding-right: 0px;
          text-align: justify;
          font-size: 14px;
          line-height: 20px;
          width: 100%;
          margin: 10px 0 8px;
          color: #4f4f4f;
          a {
            text-decoration: none;
            color: #007ff0;
            margin: 10px 0px;
          }
          .txt-reply {
            textarea {
              display: block;
              width: 100%;
              height: 130px;
              margin-bottom: 10px;
              border-color: #e0e0e0;
              resize: none;
            }
            div {
              .btn-send-rep {
                width: 100%;
                button {
                  font-weight: 400;
                  font-size: 13px;
                  background: #fdd22f;
                  border: 0;
                  color: #4a4a4a;
                  padding: 5px 10px;
                }
                button:nth-child(2) {
                  background: #fff;
                  padding: 5px 12px;
                  text-align: center;
                  white-space: nowrap;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-left: 5px;
                  border: 1px solid #adadad;
                }
              }
            }
          }
          .buy-alredy {
            font-size: 12px;
            padding: 1px 0 1px 0px;

            margin: 6px 0;
            color: #22b345;
            font-weight: 400;
            background-size: contain;
          }
          i {
            color: #fdd22f;
            font-size: 14px;
          }
          .img-cmt {
            img {
              width: 30%;
            }
          }
          .rep-rating {
            width: 100%;
            float: right;
            display: flex;
            .avatar-rep {
              width: 10%;
            }
            .content-rep {
              width: 80%;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>
