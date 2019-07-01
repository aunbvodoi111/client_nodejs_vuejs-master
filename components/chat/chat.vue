<template>
  <div>
    <div class="btn-chat" v-if="!toggleChat" @click="$store.commit('TOGGLE_CHAT')">
      <button>Chat ngay nhe</button>
    </div>
    <div class="container" v-if="toggleChat">
      <div class="container-chat-left">
        <div class="title-chat">
          <p>Chat cùng shop</p>
        </div>
        <div class="input-chat">
          <input type="text" class="txt-filter" placeholder="Tìm người chat">
        </div>
        <div class="people-pm" v-for="item in rooms " :key="item.id" @click="chatUser(item)">
          <div class="avatar">
            <img
              src="https://media3.scdn.vn/img3/2019/5_14/nEZOmN_simg_ab1f47_250x250_maxb.jpg"
              alt
            >
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
        <div class="content-chat" style="overflow-y: scroll; height : 360px;" ref="messages">
          <div class="messager" v-for="item in room.messagers">
            <div class="saler" >
              <div class="div-left">
                <p>{{ item.content }}</p>
                <img src="https://cf.shopee.vn/file/aaa24a79e7015ab1d6c73392b4b54c93_tn" alt>
              </div>
            </div>
            <!-- <div class="buyer" v-if="item.nameuser == $store.state.authUser.name">
              <div class="div-right">
                <img src="https://cf.shopee.vn/file/aaa24a79e7015ab1d6c73392b4b54c93_tn" alt>
                <p>{{ item.content }}</p>
              </div>
            </div> -->
          </div>
          {{ typing }}
        </div>
        <div class="bottom-chat-right">
          <input type="text" class="txt-input-chat" v-model="message" @keyup="triggerMessageSend">
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
  data(){
    return{
      message:'',
      roomname:'',
      idUserSend : '',
      messages:[],
      typing:'',
      room :{},
      count:''
    }
  },
  computed:{
    toggleChat(){
      return this.$store.state.toggleChat
    },
    // rooms(){
    //    return this.$store.state.rooms;
    // }
    rooms(){
       return this.$store.state.rooms;
    }
  },
  mounted() {
    this.scrollMessages();
  },
  updated() {
    this.scrollMessages();
  },
  beforeMount() {
    socket.on("new-message", (room,message) => {
      // alert(message);
      console.log(message)
      console.log(room)
      var audio = new Audio('/Iphone.mp3') // path to filesssdsaaaaaaaaaaaa
      audio.play()
       
            
      // this.room = this.rooms.find( room => room.id === room)
      console.log()
      // this.room.messagers.push(message)
      // var audio = new Audio('/Iphone.mp3') // path to file
      // audio.play() 
      // var anhquy = this.messages.messages
      console.log(this.room)  
      if(this.room.id == room){
        this.room.messagers.push(message)
      }else{
         console.log(this.$store.state.rooms)  
          console.log(room)  
        this.room = this.$store.state.rooms.find( room => room.id === room)
        console.log(this.room)
        this.count = this.count + 1
        this.room.messagers.push(message)
      }
    
      // this.$store.commit("ADD_MESS", message);
    });
    socket.on("receivedUserTyping", message => {
       console.log(message);
      this.typing = message
    });
  },
  methods:{
    chatUser(item){
      this.roomname = item.id
      this.room = this.rooms.find( room => room.id === item.id)
      this.count = ''
      if(item.UserName1 == this.$store.state.authUser.name){
        this.idUserSend = item.UserName2
      }else if(item.UserName2 == this.$store.state.authUser.name){
        this.idUserSend = item.UserName1
      }
    },
    sendUserTyping() {
      socket.emit("userTyping", {
        room: this.roomname,
      });
    },
    sendUserNotTyping() {
      socket.emit("removeUserTyping", {
        room: this.roomname,
      });
    },
    triggerMessageSend(e) {
      e.preventDefault();
      if (e.keyCode === 13 && !e.shiftKey) {
        this.sendMessage();
        
      } else {
        if (this.message !== "") {
          console.log('dsaasd')
          this.sendUserTyping();
        } else {
          this.sendUserNotTyping();
        }
      }
    },
    sendMessages(){
      var message = {
        content: this.message,
        nameuser: this.idUserSend,
        roomid: this.roomname
      };
      this.room.messagers.push(message)
      socket.emit('send-message',message)
      this.message = ""
      this.sendUserNotTyping();
    },
     scrollMessages() {
      var container = this.$refs.messages;
      // container.scrollTop = container.scrollHeight;
    },
  }
}
</script>

<style lang="scss" scoped>
.btn-chat{
  position: fixed;
  background: white;
  bottom: 2%;
  right: 0;
  z-index: 200;
  display: flex;
  button{
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
            img {
              width: 15%;
              border-radius: 100%;
            }
            p {
              background: #00bfa5;
              display: inline-block;
              border-radius: 12px;
              padding: 6px 12px;
              color: white;
              margin-left: right;
              white-space: pre-wrap;
              word-wrap: break-word;
              word-break: break-word;
            }
          }
        }
        .buyer {
          margin-top: 10px;
          .div-right {
            display: flex;

            img {
              width: 10%;
              border-radius: 100%;
              margin-top: 10px;
            }
            p {
              float: left;
              display: inline-block;
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
    .bottom-chat-right{
      width: 100%;
      display: flex;
      .txt-input-chat{
        width: 80%;
        height: 30px;
      }
      button{
        width:50px;
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
