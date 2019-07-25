<template>
  <div class="container">
    <h3>Khách hàng nhận xét</h3>
    <div class="popup-rated" v-show="errorRating">
      <div class="pop">
        <div class="title">
          <p>Bạn đã đánh giá sản phẩm này !</p>
        </div>
        <div class="button">
          <button @click="errorRating = false">Đồng ý</button>
        </div>
      </div>
    </div>
    <div class="rating-box">
      <div class="rating-box-left" v-if="product.ratings.length > 0">
        <p>Đánh giá trung bình</p>
        <p>{{ mediumstar.toFixed(1) }}/5</p>
        <i class="fas fa-star" v-for=" n in Math.floor(mediumstar)" :key="n + 20"></i>
        <i class="far fa-star" v-for=" n in 5-Math.floor(mediumstar)" :key="n + 24"></i>
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
        <p
          style="color:red; margin : 10px 0px;"
          v-if="errorSendRating"
        >Xin vui lòng nhập đủ thông tin khi gửi</p>
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
          <span>Thêm hình sản phẩm nếu có :</span>
          <input type="file" id="upload-file" @change="onImageChange" ref="file" />
          <div class="img-upload">
            <img :src="rating.image" style="width : 15%" />
            <div class="close" @click="rating.image = ''" v-show="rating.image">x</div>
          </div>
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
          <p>{{ product.name }}</p>
        </div>
        <div class="price">Giá: {{ product.price }} ₫</div>
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
              :class="{highlight:8 == selected}"
              @click="filterRating(8)"
            >có hình ảnh({{ isRatingImage.length }})</button>
          </div>
        </div>
      </div>
      <div v-if="productnew.ratings.length">
        <div class="rating-cmt" v-for="item in productnew.ratings" :key="item.id">
          <div class="avatar">
            <div class="inclue-avatar">
              <div class="div-avatar">
                <div class="img">
                  <img
                    :src="item.user.avatar "
                    alt
                    v-if="item.user.avatar != 0"
                    width="100%"
                    style="border-radius : 100%;"
                  />
                </div>
                <div class="img">
                  <img
                    src="/img/images.png "
                    alt
                    v-if="item.user.avatar == 0"
                    width="100%"
                    style="border-radius : 100%;"
                  />
                </div>
              </div>
              <div class="name-customer">{{ item.user.name }}</div>
              <div class="time">{{ moment(item.created_at).fromNow()}}</div>
            </div>
          </div>
          <div class="content-cmt">
            <div>
              <p>
                <i class="fas fa-star" v-for="n in item.star" :key=" n + 4"></i>
                <i class="far fa-star" v-for="n in 5-item.star" :key=" n + 5"></i>
                <span v-if="item.star == 5 ">Cực Kì Hài Lòng</span>
                <span v-if="item.star == 4 ">Hài Lòng</span>
                <span v-if="item.star == 3 ">Tạm Ổn</span>
                <span v-if="item.star == 2 ">Không Hài Lòng</span>
                <span v-if="item.star == 1 ">Rất Không Hài Lòng</span>
              </p>
              <p class="buy-alredy" v-if="item.checkBuy == 1">Đã mua sản phẩm này tại Pham Qúy</p>
              <p style="margin-top : 5px;">{{ item.content }}</p>
            </div>
            <div class>
              <a @click=" item.is_rating = !item.is_rating" style="margin-top : 5px;">Gui trả lời</a>
            </div>

            <div class="img-cmt">
              <img :src="item.image" alt />
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
              <div class="avatar-rep" v-if="product.user.avatar != 0">
                <img
                  :src="product.user.avatar"
                  alt
                  style="width:50px;margin:5px;border-radius:100%;"
                />
              </div>
              <div class="avatar-rep" v-if="product.user.avatar == 0">
                <img
                  src="/img/images.png"
                  alt
                  style="width:50px;margin:5px;border-radius:100%;"
                />
              </div>
              <div class="content-rep">
                <p v-if="product.user.id == prod.UserId">
                  <span>Phản Hồi Của Người Bán</span>
                </p>
                <p v-if="product.user.id != prod.UserId">
                  <span>{{ prod.user.name }}</span>
                </p>
                <p>{{ prod.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class style="padding : 10px;" v-else>
        <h4>Chưa có đánh giá</h4>
      </div>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from "lodash";
import StarRating from "vue-star-rating";
import Vue from "vue";
import moment from "moment";
moment.locale("vi");
import socket from "~/plugins/socket.io.js";
export default {
  components: {
    StarRating
  },
  props: ["product", "productnew"],
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
      showDiv: false,
      anhquy: [],
      moment: moment,
      errorSendRating: false,
      errorRating: false
    };
  },
  beforeMount() {
    socket.on("nhannhe", (room, message) => {
      // alert(message);
      console.log(message);
      console.log(room);
      var audio = new Audio("/Iphone.mp3"); // path to filesssdsaaaaaaaaaaaa
      audio.play();
      console.log();
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
    isRatingImage() {
      return this.product.ratings.filter(star => star.image !== "");
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
  created() {
    if (this.mediumstar) {
      this.$emit("mediumstar", this.mediumstar);
    }
  },
  methods: {
    onImageChange(e) {
      console.log("1");
      let file;
      file = this.$refs.file.files[0];
      let formData = new FormData();
      console.log(file);
      formData.append("file", file);
      this.$axios
        .post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          this.rating.image = "/img/" + response.data;
          console.log(response.data);
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    filterRating(item) {
      this.selected = item;
      this.showDiv = true;
      this.$axios
        .post("/api/rating/filterRating", {
          // UserId : this.$store.state.authUser.id,
          ProductId: this.product.id,
          value: item
        })
        .then(response => {
          console.log(response.data);
          this.productnew.ratings = response.data;
          this.productnew.ratings.forEach(item => {
            Vue.set(item, "is_rating", false);
            Vue.set(item, "contentcmt", "");
          });
          console.log(this.product.ratings);
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
      var rating = this.productnew.ratings.find(star => star.id === item.id);
      console.log(rating);
      rating.rep_ratings.push({
        content: item.contentcmt,
        user: {
          name: this.$store.state.authUser.name,
          UserId: this.$store.state.authUser.id
        }
      });
      this.$axios
        .post("/api/rating/add_reprating", {
          image: "",
          UserId: this.$store.state.authUser.id,
          content: item.contentcmt,
          RatingId: item.id
        })
        .then(response => {
          item.is_rating = false;
          item.contentcmt = "";
          if (this.mediumstar) {
            this.$emit("mediumstar", this.mediumstar);
          }
        });
    },
    sendRating() {
      var findUser;
      for (var i = 0; i < this.product.ratings.length; i++) {
        if (
          this.product.ratings[i].user.name == this.$store.state.authUser.name
        ) {
          findUser = 1;
        }
      }
      if (findUser == 1) {
        this.errorRating = true;
      } else {
        if (
          this.rating.star == "" &&
          this.rating.title == "" &&
          this.rating.content == ""
        ) {
          // console.log("dsadsa");
          this.errorSendRating = true;
        } else {
          this.$axios
            .post("/api/rating/add", {
              title: this.rating.title,
              star: this.rating.star,
              image: this.rating.image,
              content: this.rating.content,
              ProductId: this.product.id,
              UserIdSaler: this.product.user.id
            })
            .then(response => {
              var avatar;
              if (this.$store.state.authUser.avatar == 0) {
                avatar = 0;
              } else {
                avatar = this.$store.state.authUser.avatar;
              }
              this.product.ratings.unshift({
                id: response.data.id,
                user: {
                  name: this.$store.state.authUser.name,
                  avatar: avatar
                },
                title: response.data.title,
                star: response.data.star,
                image: response.data.image,
                content: response.data.content,
                rep_ratings: [],
                checkBuy: response.data.checkBuy
              });
              this.product.ratings.forEach(item => {
                Vue.set(item, "is_rating", false);
                Vue.set(item, "contentcmt", "");
              });

              this.productnew.ratings.unshift({
                id: response.data.id,
                user: {
                  name: this.$store.state.authUser.name,
                  avatar: avatar
                },
                title: response.data.title,
                star: response.data.star,
                image: response.data.image,
                content: response.data.content,
                rep_ratings: [],
                checkBuy: response.data.checkBuy
              });

              this.productnew.ratings.forEach(item => {
                Vue.set(item, "is_rating", false);
                Vue.set(item, "contentcmt", "");
              });
              var message = {
                content: "ádasdasd",
                nameuser: this.product.user.name,
                roomid: this.product.user.name
              };
              socket.emit("send-nofi-cmt", message);
              this.toggleCmt = false;
              this.rating.star = 0;
              this.rating.name = "";
              this.rating.title = "";
              this.rating.content = "";
              this.errorSendRating = false;
              this.rating.image = "";
            });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.img-upload {
  position: relative;
  margin-top: 20px;
  .close {
    position: absolute;
    top: 0;
    left: 14%;
    background: #dfdfdf;
    width: 14px;
    height: 16px;
    text-align: center;
    cursor: pointer;
    font-size: 13px;
  }
  img {
    border: 1px solid#eee;
    padding: 4px;
  }
}
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
.popup-rated {
  position: fixed;
  z-index: 99;

  border-radius: 10px;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  background-color: rgba(0, 0, 0, 0.14);
  padding: 20px;
  text-align: center;
  .pop {
    width: 300px;
    margin: auto;
    background: white;
    padding: 20px;
    height: 140px;
    border-radius: 20px;
    .button {
      margin: auto;
      width: 50%;
      button {
        background: red;
        width: 100px;
        height: 30px;
        margin: 30px 20px;
        color: white;
        border: none;
      }
    }
  }
}
@media only screen and (min-width: 1200px) {
  .container {
    width: 100%;
    position: relative;
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
