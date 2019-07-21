<template>
  <div>
    <div class="btn-chat" v-if="!toggleChat" @click="showDivChat">
      <button>Chat ngay nhe</button>
    </div>
    <div class="container" v-if="toggleChat">
      <div class="pop-up-Product" v-show="showPopLisrProduct">
        <div class="content-pop">
          <p @click="showPopLisrProduct = false">X</p>
          <div class="form-search">
            <input type="text" class="txt-search" />
          </div>
          <div class="title">
            <div>
              <p :class="{ activeTitLePopup:1 == selected }" @click="productYou">Shop của tôi</p>
            </div>
            <div>
              <p :class="{ activeTitLePopup:2 == selected }" @click="showDivShop">Shop Pham quý</p>
            </div>
          </div>
          <div class="content-product">
            <div
              class="product-pop"
              v-for="item in listProductPopup"
              @click="sendProduct(item)"
              :key="item.id"
            >
              <div class="img">
                <img :src="item.image" alt />
              </div>
              <div class="name">
                <p>{{ item.name }}</p>
              </div>
              <div class="price">{{ item.price }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="pop-up-Product" v-show="showPopListBill">
        <div class="content-pop">
          <p @click="showPopListBill = false">X</p>
          <!-- <div class="form-search">
            <input type="text" class="txt-search" />
          </div>-->
          <div class="title-bill">
            <div class="buy">Mua hàng</div>
            <div class="saler">Bán hàng</div>
          </div>
          <div class="content-product">
            <div class="bill-pop" v-for="item in listBill" :key=" item.id ">
              <div class="user">
                <div class="img">
                  <img src="http://localhost:3000/img/76c6106b64c5228d864432d939224434.jpg" alt />
                </div>
                <div class="name">{{ item.name }}</div>
                <div class="status">Đã hủy</div>
              </div>
              <div class="content-bill">
                <div class="bill" v-for="prod in item.bill_details" :key="prod.id">
                  <div class="img">
                    <img :src="prod.product.image" alt />
                  </div>
                  <div class="content-right">
                    <div
                      class="name"
                    >{{ prod.product.name }}</div>
                    <div class="price">₫{{ prod.product.price }}</div>
                  </div>
                </div>
              </div>
              <div class="sum-bill">
                <div class="qty">3 sản phẩm</div>
                <div class="sum-money"> <p>Tổng thanh toán : <span> 3.000.000</span></p> </div>
              </div>
              <div class="btn-action">
                <div class="btn-send-link">
                  <nuxt-link :to="`http://localhost:8000/${item.id}`">
                    <button>Xem đơn hàng</button>
                  </nuxt-link>
                </div>
                <div class="btn-send-link" @click="sendBill(item)">
                  <button>Gửi link</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-chat-left">
        <div class="title-chat">
          <p>Chat cùng shop</p>
        </div>
        <div class="input-chat">
          <input type="text" class="txt-filter" placeholder="Tìm người chat" />
        </div>
        <div
          class="people-pm"
          v-for="item in rooms "
          :key="item.id"
          @click="chatUser(item)"
          :class="{highlight:item.id == selected}"
        >
          <div class="avatar">
            <img
              v-if="item.user1.name != $store.state.authUser.name && item.user1.avatar != 0"
              :src="item.user1.avatar"
              alt
            />
            <img
              v-if="item.user1.name != $store.state.authUser.name && item.user1.avatar == 0"
              src="/img/images.png"
              alt
            />
            <img
              v-if="item.user2.name != $store.state.authUser.name && item.user2.avatar != 0"
              :src="item.user2.avatar"
              alt
            />
            <img
              v-if="item.user2.name != $store.state.authUser.name && item.user2.avatar == 0"
              src="/img/images.png"
              alt
            />
            <img
              v-if="item.user1.name == item.user2.name && item.user2.avatar != 0"
              :src="item.user1.avatar"
              alt
            />
            <img
              v-if="item.user1.name == item.user2.name && item.user2.avatar == 0"
              src="/img/images.png"
              alt
            />
          </div>
          <div class="name-buyer">
            <p v-if="item.user1.name != $store.state.authUser.name">
              {{ item.user1.name }}
              <span v-if="countMess(item) > 0">{{ countMess(item) }}</span>
            </p>
            <p v-if="item.user1.name == item.user2.name">
              {{ item.user1.name }}
              <span v-if="countMess(item) > 0">{{ countMess(item) }}</span>
            </p>
            <p v-if="item.user2.name != $store.state.authUser.name">
              {{ item.user2.name }}
              <span v-if="countMess(item) > 0">{{ countMess(item) }}</span>
            </p>

            <p v-if="item.user1.name != $store.state.authUser.name">
              <span>{{ messageSend(item) }}</span>
            </p>
            <p v-if="item.user1.name == item.user2.name">
              <span>{{ messageSend(item) }}</span>
            </p>
            <p v-if="item.user2.name != $store.state.authUser.name">
              <span>{{ messageSend(item) }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="container-chat-right">
        <div class="title-chat-right">
          <i class="fas fa-minus" @click="$store.commit('TOGGLE_CHAT')"></i>
        </div>
        <div style="overflow-y: scroll; height : 350px;" ref="messages">
          <div class="content-chat">
            <div class="messager" v-for="item in room.messagers" :key="item.id">
              <div class="saler">
                <div class="div-left" v-if="item.UserId == $store.state.authUser.id">
                  <div class="content">
                    <p v-if="item.status == 0 ">{{ item.content }}</p>
                    <p v-if="item.status == 1">
                      <nuxt-link :to="`/${item.ProductId}`">
                        <img :src="item.image" width="50px" />
                      </nuxt-link>
                    </p>
                    <p v-if="item.status == 3">
                      <img :src="item.image" width="100px" />
                    </p>
                  </div>
                  <div class="img" v-if="item.user.avatar != 0">
                    <img :src="item.user.avatar" alt />
                  </div>
                  <div class="img" v-if="item.user.avatar == 0">
                    <img src="/img/images.png" alt />
                  </div>
                </div>
              </div>
              <div class="buyer" v-if="item.UserId != $store.state.authUser.id">
                <div class="div-right">
                  <div class="img" v-if="item.user.avatar != 0">
                    <img :src="item.user.avatar" alt />
                  </div>
                  <div class="img" v-if="item.user.avatar == 0">
                    <img src="/img/images.png" alt />
                  </div>
                  <div class="content-right">
                    <p v-if="item.status == 0">{{ item.content }}</p>
                    <p v-if="item.status == 1">
                      <nuxt-link :to="`/${item.ProductId}`">
                        <img :src="item.image" width="50px" />
                      </nuxt-link>
                    </p>
                    <p v-if="item.status == 3">
                      <img :src="item.image" width="100px" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- {{ typing }} -->
          </div>
        </div>
        <div class="bubble-chat" v-if="idroom == roomname">
          <div class="container-circle">
            <div class="circle cc1" id="circle1"></div>
            <div class="circle cc2" id="circle2"></div>
            <div class="circle cc3" id="circle3"></div>
          </div>
        </div>

        <div class="bottom-chat-right">
          <input type="text" class="txt-input-chat" v-model="message" @keyup="triggerMessageSend" />
          <div>
            <button @click="sendMessages">Gui</button>
          </div>
        </div>
        <div class="send-file">
          <input type="file" id="send-file" @change="onImageChange" ref="file" />
          <label for="send-file">
            <div class="send-image">
              <div class="icon">
                <i class="fas fa-images"></i>
              </div>
              <div class>hình ảnh</div>
            </div>
          </label>
          <div class="send-product" @click="showDivProduct">
            <div class="icon">
              <i class="fas fa-tshirt"></i>
            </div>
            <div class>quần áo</div>
          </div>
          <div class="send-bill" @click="showPopBill">
            <div class="icon">
              <i class="fas fa-images"></i>
            </div>
            <div class>hình ảnh</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import socket from "~/plugins/socket.io.js";
import Vue from "vue";
export default {
  data() {
    return {
      message: "",
      roomname: "",
      idUserSend: "",
      messages: [],
      typing: "",
      room: {},
      count: {
        idroom: -1,
        countMess: 0
      },
      dem: 0,
      image: "",
      selected: "",
      product: {
        image: "",
        ProductId: ""
      },
      bill: {
        sum: "",
        BillId: "",
        image: ""
      },
      idroom: "",
      roomidnew: 0,
      listMess: [],
      messageLast: "",
      roomok: {},
      selected: 1,
      showPopLisrProduct: false,
      listProductPopup: [],
      showPopListBill: false,
      listBill : []
    };
  },
  computed: {
    toggleChat() {
      return this.$store.state.toggleChat;
    },
    rooms() {
      return this.$store.state.rooms.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
    }
  },
  beforeMount() {
    socket.on("new-message", (room, message) => {
      var idRoom = this.rooms.find(item => item.id === room);
      this.roomok = this.rooms.find(item => item.id === room);
      var audio = new Audio("/Iphone.mp3"); // path to filesssdsaaaaaaaaaaaa
      audio.play();
      this.messageLast = message;
      message["isRead"] = false;
      Vue.set(idRoom, "updated_at", new Date().toISOString());
      console.log(idRoom["updated_at"]);
      if (idRoom.id == this.roomname) {
        console.log("vao dau");
        this.room = this.rooms.find(item => item.id === room);
        console.log(idRoom);
        this.$store.commit("CHANGE_ROOM", idRoom);
        message["isRead"] = true;
        this.room.messagers.push(message);
      } else {
        console.log("else");
        this.countMess(idRoom);
        this.listMess.unshift(message);
        this.dem = this.dem + 1;
        this.roomidnew = room;
        this.countMess(idRoom);
      }
    });
    socket.on("receivedUserTyping", message => {
      this.idroom = message.room;
      this.typing = message;
    });
  },
  methods: {
    sendBill( item ){
      this.bill.sum = item.sum;
      this.bill.BillId = item.id;
      this.bill.image = item.bill_details[0].product.image
      this.sendMessages();
      this.showPopListBill = false;
    },
    showPopBill() {
      this.$axios.get("/api/bill/").then(response => {
        console.log('sadsdaasd')
        console.log(response);
        this.listBill = response.data;
        this.showPopListBill = true;
      }); 
    },
    productYou() {
      this.selected = 1;
      this.showDivProduct();
    },
    sendProduct(item) {
      this.product.image = item.image;
      this.product.ProductId = item.id;
      this.sendMessages();
      this.showPopLisrProduct = false;
    },
    showDivProduct() {
      this.selected = 1;
      this.$axios.get("/api/chat/productUser").then(response => {
        console.log(response.data);
        this.listProductPopup = response.data;
        this.showPopLisrProduct = true;
      });
    },
    showDivShop() {
      this.selected = 2;
      this.$axios
        .post("/api/chat/productShop", {
          id: this.idUserSend.id
        })
        .then(response => {
          console.log(response.data);
          this.listProductPopup = response.data;
          this.showPopLisrProduct = true;
        });
    },
    messageSend(item) {
      // console.log(this.messageLast)
      if (this.messageLast != "") {
        if (this.messageLast.roomid == item.id) {
          return this.messageLast.content;
        }
      }
      var message = item.messagers[item.messagers.length - 1];
      if (message != undefined) {
        return message.content;
      }
    },
    countMess(item) {
      var count = 0;
      for (var i = 0; i < this.listMess.length; i++) {
        if (item.id == this.listMess[i].roomid) {
          count = count + 1;
        }
      }
      return count;
    },
    scrollMessages() {
      var container = this.$refs.messages;
      container.scrollTop = container.scrollHeight;
    },
    onImageChange(e) {
      let file;
      file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", file);
      this.$axios
        .post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          this.image = "/img/" + response.data;
          this.sendMessages();
          console.log(response.data);
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    showDivChat() {
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.$axios
          .post("/api/room/add", {
            user: this.$store.state.authUser
          })
          .then(response => {
            console.log(response);
            // this.rooms = response.data;
            this.$store.commit("ROOMS", response.data);
            this.chatUser(this.rooms[0]);
          });
        this.$store.commit("TOGGLE_CHAT");
      }
    },
    chatUser(item) {
      this.selected = item.id;
      this.roomname = item.id;
      console.log("anhquy");
      console.log(item);
      console.log(this.listMess);
      this.room = this.rooms.find(room => room.id === item.id);
      if (this.listMess.length > 0) {
        // this.room.messagers.push(this.listMess)
        for (var i = this.listMess.length - 1; i >= 0; i--) {
          if (item.id == this.listMess[i].roomid) {
            var index = this.listMess.indexOf(this.listMess[i]);
            this.room.messagers.push(this.listMess[i]);
            console.log(index);
            this.listMess.splice(index, 1);
          }
        }
        // console.log("aaaaaaaaaaaaaa");
      }
      this.count = 0;
      if (item.user1 && item.user2) {
        if (item.user1.name == this.$store.state.authUser.name) {
          this.idUserSend = item.user2;
        } else if (item.user2.name == this.$store.state.authUser.name) {
          this.idUserSend = item.user1;
        }
      }
      console.log("dsasdsadda");
      console.log(this.idUserSend);
    },
    sendUserTyping() {
      socket.emit("userTyping", {
        room: this.roomname
      });
    },
    sendUserNotTyping() {
      socket.emit("removeUserTyping", {
        room: this.roomname
      });
    },
    triggerMessageSend(e) {
      e.preventDefault();
      if (e.keyCode === 13 && !e.shiftKey) {
        this.sendMessages();
      } else {
        if (this.message !== "") {
          console.log("dsaasd");
          this.sendUserTyping();
        } else {
          this.sendUserNotTyping();
        }
      }
    },
    sendMessages() {
      var avatar;
      if (this.$store.state.authUser.avatar != 0) {
        avatar = this.$store.state.authUser.avatar;
      } else {
        avatar = 0;
      }
      var status;
      console.log(this.message);
      if (
        this.message != "" &&
        this.bill.image == "" &&
        this.product.image == "" &&
        this.image == ""
      ) {
        status = 0;
      } else if (
        this.message == "" &&
        this.bill.image == "" &&
        this.product.image != "" &&
        this.image == ""
      ) {
        status = 1;
      } else if (
        this.message == "" &&
        this.product.image == "" &&
        this.bill.image != "" &&
        this.image == ""
      ) {
        status = 2;
      } else if (
        this.message == "" &&
        this.product.image == "" &&
        this.bill.image == "" &&
        this.image != ""
      ) {
        status = 3;
      }
      console.log(this.bill)
      var message = {
        content: this.message,
        nameuser: this.idUserSend.name,
        roomid: this.roomname,
        isRead: true,
        UserId: this.$store.state.authUser.id,
        ProductId: this.product.ProductId,
        image: this.product.image,
        // image: this.bill.image,
        imageUpload: this.image,
        user: {
          avatar: avatar
        },
        sum: this.bill.sum,
        BillId: this.bill.BillId,
        // image: this.bill.image,
        status: status
      };
      Vue.set(this.room, "updated_at", new Date().toISOString());
      this.$store.commit("CHANGE_ROOM", this.room);
      this.messageLast = message;
      this.room.messagers.push(message);
      socket.emit("send-message", message);
      this.message = "";
      this.image = "";
      this.sendUserNotTyping();
      this.scrollMessages();
    }
  },
  mounted() {
    // if (process.client) {
    //   setTimeout(() => {
    //     this.scrollMessages();
    //   }, 1000);
    // }
  },
  updated() {
    if (this.$refs.messages) {
      this.scrollMessages();
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.activeTitLePopup {
  color: red !important;
}
.highlight {
  color: white !important;
  background: grey;
}
#send-file {
  display: none;
}
.messages {
  // height: 200px;
  margin: 0;
  overflow-y: auto;
  padding: 10px 20px 10px 20px;
}
.btn-chat {
  position: fixed;
  background: white;
  bottom: 2%;
  right: 0;
  z-index: 200;
  display: flex;
  button {
    width: 130px;
    height: 40px;
    background: red;
    color: white;
    border: none;
    border-radius: 10px;
  }
}
.container {
  -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
  width: 30%;
  position: fixed;
  height: 500px;
  background: white;
  bottom: 0;
  right: 0;
  z-index: 99;
  display: flex;
  .pop-up-Product {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 99;
    .content-pop {
      width: 80%;
      height: 380px;
      background: white;
      margin: 40px auto;
      .form-search {
        width: 100%;
        padding: 10px;
        .txt-search {
          width: 100%;
          height: 35px;
          border-radius: 10px;
          border: 1px solid grey;
          outline: none;
          padding: 10px;
        }
      }
      .title {
        display: flex;
        padding: 10px;
        div {
          width: 50%;
          font-size: 14px;
          cursor: pointer;
        }
        div:nth-child(1) {
          margin-left: 50px;
        }
      }
      .title-bill{
        width: 100%;
        display: flex;
        .buy{
          width: 50%;
          text-align: center;
        }
        .saler{
          width: 50%;
          text-align: center;
        }
      }
      .content-product {
        overflow-y: auto;
        width: 100%;
        padding: 10px;
        height: 300px;
        background-color: #eaeaea;

        .bill-pop {
          width: 100%;
          background: white;
          padding: 5px;
          margin-top: 5px;
          .user {
            display: flex;
            width: 100%;
            padding: 3px 5px;
            .img {
              width: 8%;
              img {
                width: 100%;
                border-radius: 100%;
              }
            }
            .name {
              width: 30%;
              color: #757575;
              font-size: 14px;
              padding: 4px;
            }
            .status {
              width: 30%;
              float: right;
            }
          }
          .content-bill {
            width: 100%;
            .bill {
              width: 100%;
              display: flex;
              .img {
                width: 15%;
                img {
                  width: 100%;
                }
              }
            }
            .content-right {
              width: 80%;
              padding: 0px 4px 10px 10px;
              .name {
                font-size: 14px;
              }
              .price {
                color: red;
                margin-top: 4px;
                font-size: 14px; 
              }
            }
          }
          .sum-bill {
            width: 100%;
            display: flex;
            .sum-money{
              text-align: right;
              margin-left: 25%; 
              p{
                color: grey;
                font-size: 14px;
                span{
                  color: red;
                } 
              }
            }
          }
          .btn-action{
            width: 100%;
            padding: 10px 10px;
            display: flex;
            .btn-send-link{
              width: 50%;
              button{
                width: 100%;
                height: 40px;
                border: 1px solid grey;
                background: white;
                color: red;
              }
            }
            .btn-send-link{
              width: 50%;
              button{
                width: 100%;
                height: 40px;
                border: 1px solid grey;
                background: white;
                color: red;
              }
            }
          }
        }

        .product-pop {
          width: 30%;
          float: left;
          margin: 10px 10px 10px 2px;
          background: white;
          cursor: pointer;
          .img {
            width: 100%;
            img {
              width: 100%;
            }
          }
          .name {
            width: 100%;
            margin-top: 4px;
            font-size: 13px;
            padding: 5px;
          }
          .price {
            color: red;
            padding: 5px;
          }
        }
      }
    }
  }
  .container-chat-left {
    width: 30%;
    border-right: 1px solid #efefef;
    height: 100%;
    .title-chat {
      background-color: #4a90e2;
      padding: 5px;
      color: white;
      font-weight: bold;
    }
    .input-chat {
      .txt-filter {
        width: 100%;
        margin: 10px 0px;
        padding: 5px;
      }
    }
    .people-pm {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid #efefef;
      .avatar {
        width: 30%;
        img {
          width: 100%;
          border-radius: 100%;
        }
      }
      .name-buyer {
        width: 70%;
        font-size: 14px;
      }
    }
  }
  .container-chat-right {
    width: 70%;
    .title-chat-right {
      width: 100%;
      background-color: #4a90e2;
      padding: 5px;
      color: white;
      font-weight: bold;
      i {
        margin-left: 96%;
        cursor: pointer;
      }
    }
    .content-chat {
      width: 100%;
      height: 350px;
      .messager {
        width: 100%;
        .saler {
          margin-top: 10px;
          display: flex;
          width: 100%;
          .div-left {
            display: flex;
            margin-left: auto;
            width: 80%;
            height: auto;
            .img {
              width: 15%;
              margin-left: auto;
              img {
                width: 100%;
                border-radius: 100%;
              }
            }
            .content {
              width: 80%;
              p {
                margin-left: 20%;
                background: #00bfa5;
                border-radius: 12px;
                padding: 6px 12px;
                color: white;
                margin-right: auto;
                white-space: pre-wrap;
                word-wrap: break-word;
                word-break: break-word;
              }
            }
          }
        }
        .buyer {
          margin-top: 10px;
          display: flex;
          width: 100%;
          .div-right {
            display: flex;
            margin-left: right;
            width: 80%;
            .img {
              width: 15%;
              margin-left: auto;
              img {
                width: 100%;
                border-radius: 100%;
              }
            }
            .content-right {
              width: 80%;
              p {
                float: left;
                border-radius: 12px;
                padding: 6px 12px;
                color: #000;
                background-color: #e8e8e8;
                white-space: pre-wrap;
                word-wrap: break-word;
                word-break: break-word;
              }
            }
          }
        }
      }
    }
    .bottom-chat-right {
      width: 100%;
      display: flex;
      .txt-input-chat {
        width: 80%;
        height: 30px;
      }
      button {
        width: 50px;
        height: 30px;
      }
    }
    .send-file {
      display: flex;
    }
  }
}
@media only screen and (min-width: 1200px) {
}
@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
    width: 50%;
    position: fixed;
    height: 500px;
    background: white;
    bottom: 0;
    right: 0;
    z-index: 99;
    display: flex;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .container {
    -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
    width: 75%;
    position: fixed;
    height: 500px;
    background: white;
    bottom: 0;
    right: 0;
    z-index: 99;
    display: flex;
  }
}
@media (min-width: 320px) and (max-width: 576px) {
  .container {
    width: 100%;
    position: fixed;
    height: 100%;
    background: white;
    bottom: 0;
    right: 0;
    z-index: 99;
    display: flex;
  }
}
@media (max-width: 767px) and (min-width: 576px) {
  .container {
    width: 100%;
    position: fixed;
    height: 100%;
    background: white;
    bottom: 0;
    right: 0;
    z-index: 99;
    display: flex;
  }
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background-color: #0084ff;
}
.bubble-chat {
  background-color: #e6e7ec;
  width: 50px;
  height: 30px;
  border-radius: 30% / 50%;
  margin: 4px;
  position: relative;
}
.container-circle {
  width: 100px;
  position: relative;
  margin: 0 auto;
}
.circle {
  height: 5px;
  padding-left: 3px;
  width: 5px;
  margin: 0 2px 0px 4px;
  background-color: #b6b5ba;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  top: 0px;
  -webkit-animation-duration: 2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
#circle1 {
  -webkit-animation-name: circle1;
}
#circle2 {
  -webkit-animation-name: circle2;
}
#circle3 {
  -webkit-animation-name: circle3;
}
#circle1 {
  animation-name: circle1;
}
#circle2 {
  animation-name: circle2;
}
#circle3 {
  animation-name: circle3;
}
.cc1 {
  background-color: #9e9da2;
}
@-webkit-keyframes circle1 {
  0% {
    top: 10px;
  }
  15% {
    top: 10px;
  }
  25% {
    top: 10px;
  }
}
@-webkit-keyframes circle2 {
  10% {
    top: 30px;
  }
  25% {
    top: 20px;
  }
  35% {
    top: 30px;
  }
}
@-webkit-keyframes circle3 {
  15% {
    top: 30px;
  }
  30% {
    top: 20px;
  }
  40% {
    top: 30px;
  }
}
@keyframes circle1 {
  0% {
    top: 10px;
  }
  15% {
    top: 10px;
  }
  25% {
    top: 10px;
  }
}
@keyframes circle2 {
  10% {
    top: 10px;
  }
  25% {
    top: 5px;
  }
  35% {
    top: 10px;
  }
}
@keyframes circle3 {
  15% {
    top: 10px;
  }
  30% {
    top: 10px;
  }
  40% {
    top: 5px;
  }
}
</style>