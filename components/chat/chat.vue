<template>
  <div>
    <div class="btn-chat" v-if="!toggleChat" @click="showDivChat">
      <button>Chat ngay nhe</button>
    </div>
    <div class="container" v-if="toggleChat">
      <div class="container-chat-left">
        <div class="title-chat">
          <p>Chat cùng shop</p>
        </div>
        <div class="input-chat">
          <input type="text" class="txt-filter" placeholder="Tìm người chat" />
        </div>
        <div class="people-pm" v-for="item in rooms " :key="item.id" @click="chatUser(item)" :class="{highlight:item.id == selected}" >
          <div class="avatar">
            <img
              src="https://media3.scdn.vn/img3/2019/5_14/nEZOmN_simg_ab1f47_250x250_maxb.jpg"
              alt
            />
          </div>
          <div class="name-buyer">
            <p v-if="item.UserName1 != $store.state.authUser.name">{{ item.UserName1 }} {{ count }}</p>
            <p v-if="item.UserName2 != $store.state.authUser.name">{{ item.UserName2 }} {{ count }}</p>
          </div>
        </div>
      </div>
      <div class="container-chat-right">
        <div class="title-chat-right">
          <i class="fas fa-minus" @click="$store.commit('TOGGLE_CHAT')"></i>
        </div>
        <div class="content-chat" id="infinite-list" ref="messages">
          <div class="messager" v-for="item in room.messagers" :key="item.id">
            <div class="saler">
              <div class="div-left" v-if="item.UserId == $store.state.authUser.id">
                <div class="content">
                  <p>{{ item.content }}</p>
                </div>
                <div class="img">
                  <img src="https://cf.shopee.vn/file/aaa24a79e7015ab1d6c73392b4b54c93_tn" alt />
                </div>
              </div>
            </div>
            <div class="buyer" v-if="item.UserId != $store.state.authUser.id">
              <div class="div-right">
                <div class="img">
                  <img src="https://cf.shopee.vn/file/aaa24a79e7015ab1d6c73392b4b54c93_tn" alt />
                </div>
                <div class="content-right">
                  <p>{{ item.content }}</p>
                </div>
              </div>
            </div>
          </div>
          {{ typing }}
        </div>
        <div class="bottom-chat-right">
          <input type="text" class="txt-input-chat" v-model="message" @keyup="triggerMessageSend" />
          <div>
            <button @click="sendMessages">Gui</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import socket from "~/plugins/socket.io.js";
export default {
  data() {
    return {
      message: "",
      roomname: "",
      idUserSend: "",
      messages: [],
      typing: "",
      room: {},
      count: "",
      scrollToTop: true,
      scrollHeight : true,
      selected : ''
    };
  },
  computed: {
    toggleChat() {
      return this.$store.state.toggleChat;
    },
    rooms() {
      return this.$store.state.rooms;
    }
  },

  beforeMount() {
    socket.on("new-message", (room, message) => {
      var audio = new Audio("/Iphone.mp3"); // path to filesssdsaaaaaaaaaaaa
      audio.play();
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
    socket.on("receivedUserTyping", message => {
      console.log(message);
      this.typing = message;
    });
  },
  mounted() {
    this.scrollMessages();
  },
  updated() {
    this.scrollMessages();
  },
  methods: {
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
            this.rooms = response.data;
            this.$store.commit("ROOMS", response.data);
          });
        this.$store.commit("TOGGLE_CHAT");
      }
    },
    chatUser(item) {
      this.selected = item.id
      this.roomname = item.id;
      this.room = this.rooms.find(room => room.id === item.id);
      this.count = "";
      if (item.UserName1 == this.$store.state.authUser.name) {
        this.idUserSend = item.UserName2;
      } else if (item.UserName2 == this.$store.state.authUser.name) {
        this.idUserSend = item.UserName1;
      }
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
      var message = {
        content: this.message,
        nameuser: this.idUserSend,
        roomid: this.roomname,
        UserId: this.$store.state.authUser.id
      };
      this.room.messagers.push(message);
      socket.emit("send-message", message);
      this.message = "";
      this.sendUserNotTyping();
    },
    scrollMessages() {
      // var elmnt = document.getElementById("infinite-list");
      // var y = elmnt.scrollHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.highlight{
  color: white !important;
  background: grey;
}
#infinite-list {
  overflow-y: auto;
  height: 360px;
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
      height: 320px;
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
</style>
