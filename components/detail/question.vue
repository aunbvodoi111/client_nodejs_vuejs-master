<template>
  <div class="container">
    <div class="content-question">
      <div class="div" v-for="n in product.comments" :key="n.id">
        <div class="user-question">
          <div class>
            <p>{{ n.content }}</p>
          </div>
        </div>
        <div class="user-question" v-for="prod in n.req_comments" :key="prod.id">
          <div class="content-buyer">
            <p>{{ prod.content }}</p>
          </div>
          <p
            style="color : grey ;font-size : 14px;font-weight : normal;"
          >Tiki trả lời vào 26/06/2019</p>
        </div>
        <div class="user-question">
          <p @click="n.is_comments = !n.is_comments">Trả lời</p>
        </div>
        <div class="textarea" v-show="n.is_comments">
          <textarea name id cols="30" rows="7" class="txt-textarea" v-model="n.comment"></textarea>
          <div class="btn">
            <button @click="sendRepQuestion(n)">Gửi</button>
          </div>
        </div>
      </div>
      <div class="div-center">
        <a>Xem tất cả các câu hỏi đã được trả lời</a>
      </div>
      <div class="div-bottom">
        <div class="form-question">
          <input type="text" class="txt-input" v-model="content" />
          <button class="btn-button" @click="sendQuestion">Gửi câu hỏi</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["product", "follows"],
  data() {
    return {
      content: "",
      image: ""
    };
  },

  computed: {},
  methods: {
    sendRepQuestion(item) {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        var comment = this.product.comments.find( comment => comment.id  === item.id)
        comment.req_comments.push({
            content : item.comment
        })
        this.$axios
          .post("/api/comment/add_repcomment", {
            content : item.comment,
            image: '',
            CommentId: item.id
          })
          .then(response => {
           
          });
      }
    },
    sendQuestion() {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.$axios
          .post("/api/comment/add", {
            content: this.content,
            image: this.image,
            ProductId: this.product.id
          })
          .then(response => {
            this.product.comments.unshift({
              id: response.data.id,
              content: response.data.content,
              req_comments: []
            });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
ul li {
  list-style-type: none;
}
.container {
  margin-top: 25px !important;
  padding: 10px 14px;
  .div-center {
    padding: 15px 20px;
    border-bottom: 1px solid #f7f7f7;
    a {
      color: #007ff0;
      font-size: 13px;
      font-weight: 400;
    }
  }
  .div-bottom {
    margin-top: 30px;
    .form-question {
      display: flex;
      .txt-input {
        width: 85%;
        height: 40px;
        padding: 5px;
      }
      .btn-button {
        width: 15%;
        margin-left: 24px;
        background: #fdd22f;
        border: none;
        cursor: pointer;
      }
    }
  }
  .div {
    border-bottom: 1px solid #f7f7f7;
    .textarea {
      .txt-textarea {
        width: 100%;
      }
      .btn {
        padding: 5px 0px;
        button {
          width: 120px;
          height: 30px;
          background: #fdd22f;
          border: none;
          cursor: pointer;
        }
      }
    }
    .user-question {
      p {
        font-size: 15px;
        font-weight: bold;
        margin: 10px 0 12px;
      }
      .content-buyer {
        p {
          font-size: 15px;
          margin-top: 5px;
          line-height: 18px;
          color: #787878;
          font-weight: 400;
        }
      }
    }
  }
}
@media only screen and (min-width: 1200px) {
}

@media (min-width: 992px) and (max-width: 1199px) {
}

@media (min-width: 768px) and (max-width: 991px) {
}
@media (min-width: 320px) and (max-width: 576px) {
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
        width: 100%;
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
        display: none;

        ul {
          width: 100%;
          li {
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
}
@media (max-width: 768px) and (min-width: 576px) {
}
</style>
