<template>
  <div class="container">
    <div class="saler">
      <div class="saler-left">
        <div class="img">
          <img src="https://cf.shopee.vn/file/c241a1c7f04749a0b9b55b53b5619425_tn" alt />
        </div>
        <div class="chat-saler">
          <p class="name-saler">{{ product.user.name }}</p>
          <p class="online" v-if="online == 1">Đang online</p>
          <p class="online" v-if="online == 0">Online 5 Giờ Trước</p>
          <button @click="showDivChat">Chat ngay</button>
          <button @click="followSaler" >{{ checkFollow === undefined ? 'Follow' : 'Đã Follow' }}</button>
          <nuxt-link :to="`/shop/${product.user.id}`">
            <button>Xem shop</button>
          </nuxt-link>
        </div>
      </div>
      <div class="saler-right">
        <ul>
          <li>
            <nuxt-link :to="`/buyer/rating/${product.user.id}`">
              Đánh giá :
              <span>{{ sumRating }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/shop/${product.user.id}`">
            Sản phẩm :
            <span>{{ totalProduct }}</span>
            </nuxt-link>
          </li>
          <li>
            Tham gia :
            <span>{{ moment(product.created_at).fromNow()}}</span>
          </li>
          <li>
            Người theo dõi :
            <span>{{ totalFollow }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
moment.locale("vi");
import socket from "~/plugins/socket.io.js";

export default {
  props: ["product", "follows", "totalProduct", "totalFollow", "sumRating" ,],
  data() {
    return {
      rooms: [],
      moment: moment,
      online:0
    };
  },
  async asyncData({ $axios }) {
    alert("dsadasdas");
    var data = await $axios.get("/api/room/");
    console.log(data);
  },
  computed: {
    checkFollow: {
      get: function() {
        console.log('online' + this.online);
        var index;
        if (this.$store.state.authUser && this.follows.length > 0) {
          index = this.follows.find(
            follow => follow.UserIdFollow === this.product.user.id
          );
        }
        
        return index;
      },
      set: function(newValue) {
        this.index = newValue;
      }
    },
  },
  created(){
    this.anhquy()
  },
  methods: {
    anhquy(){
      // console.log('vao nhge');
      // var data = this.product.user.name
      // socket.on("userOnline", function (data){
      //  var socketId
      //     for (socketId in data) {
      //       if (data[socketId].data === data) {
      //          this.online = 1;
      //          console.log('vao nhge');
      //       }
      //     }
      // });
    },
    followSaler(product) {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        var find = this.follows.find(
          follow => follow.UserIdFollow === this.product.user.id
        );
        var index = this.follows.indexOf(find);
        if (find) {
          this.follows.splice(index, 1);
        } else {
          var anhquy = {
            UserId: this.$store.state.authUser.id,
            ProductId: this.product.id,
            UserIdFollow: this.product.user.id
          };
          this.follows.push(anhquy);
        }
        this.$axios
          .post("/api/follow/add", {
            ProductId: this.product.id,
            UserIdFollow: this.product.user.id
          })
          .then(response => {});
      }
    },
    showDivChat() {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.$axios
          .post("/api/room/add", {
            user: this.product.user
          })
          .then(response => {
            console.log(response);
            this.rooms = response.data;
            this.$store.commit("ROOMS", response.data);
          });
        // this.$axios.$get("/api/room/").then(response => {
        //   console.log(response);
        // });
        this.$store.commit("TOGGLE_CHAT");
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
          a{
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
