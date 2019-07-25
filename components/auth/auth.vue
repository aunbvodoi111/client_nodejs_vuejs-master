<template>
<transition name="bounce" leave-active-class="animated bounceOutRight">
  <div class="container" v-if="closeAuth">
    
    <div class="pop-up">
      <div class="title-auth">
        <div
          class="login"
          v-bind:class="{ activelogin: login }"
          @click="$store.commit('OPEN_LOGIN')"
        >Đăng kí</div>
        <div
          class="register"
          v-bind:class="{ activeRes : !login }"
          @click="$store.commit('OPEN_REGISTER')"
        >Đăng nhập</div>
      </div>
      <div class="txt" v-if="!login">
        <p style="margin-top:20px; color:red;" v-if='errorLogin'>Sai tài khoản hoặc mật khẩu vui lòng kiểm tra lại !</p>
        <div class="txt-form">
          <input type="text" class="txt-control" v-model="auth.email" placeholder="Email">
          <input type="password" class="txt-control" v-model="auth.password" placeholder="Mật khẩu">
          <button class="btn-login" @click="loginAuth">Đăng nhập</button>
          <div class="forget-pass" >Quên mật khẩu ?</div>
          <div class="option-login">Hoặc đăng nhập bằng</div>
          <button class="btn-login-facebook">Tiếp tục với Facebook</button>
          <button class="btn-login-facebook" @click="close">Đóng</button>
        </div>
      </div>
      <div class="txt" v-if="login">
        <div class="txt-form">
          <input type="text" class="txt-control" placeholder="Tên đăng nhập">
          <input type="text" class="txt-control" placeholder="Email">
          <input type="text" class="txt-control" placeholder="Mật khẩu">
          <input type="text" class="txt-control" placeholder="Xác nhận mật khẩu">
          <button class="btn-login">Đăng nhập</button>
          <div class="forget-pass">Quên mật khẩu ?</div>
          <div class="option-login">Hoặc đăng nhập bằng</div>
          <button class="btn-login-facebook">Tiếp tục với Facebook</button>
          <button class="btn-login-facebook" @click="close">Đóng</button>
        </div>
      </div>
    </div>
    
  </div>
  </transition>
</template>
<script>
import socket from "~/plugins/socket.io.js";
export default {
  data() {
    return {
      auth:{
        email:'',
        password:'',
        
      },
      show: true,
      errorLogin:false
    };
  },
  computed: {
    login() {
      return this.$store.state.login;
    },
    closeAuth() {
      return this.$store.state.closeAuth;
    },
    
  },
  methods: {
    close() {
      this.$store.commit("CLOSE_AUTH"); 
    },
    loginAuth(){
      this.$axios.post('/api/product/login',{
        email : this.auth.email,
        password  : this.auth.password
      }).then(response=>{
        this.$forceUpdate()
        console.log(response.data)
        this.$store.commit('SET_USER',response.data.user)
        this.$store.commit('CLOSE_AUTH')
        if(response){
          socket.emit("joinRoom", response.data.user.name);
          this.$store.commit("ROOMS", response.data.rooms);
          this.$store.commit("LIST_CART", response.data.sumQty);
          // console.log(res.user.username)
          // this.$store.commit('SET_USER' ,res.user )
          // this.$store.commit('CLOSE_MODEL' )
          // socket.emit('userOnline',res)
          // this.$store.commit("ROOM_LIST", res.listroom);
        }
      }).catch(error=>{
        this.errorLogin = true
      })
    }
  }
};
</script>
<style scoped lang="scss">
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(-3000px, 0, 0);
    transform: translate3d(-3000px, 0, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(25px, 0, 0);
    transform: translate3d(25px, 0, 0);
  }

  75% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  90% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@media only screen and (min-width: 1200px) {
  .container {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    .pop-up {
      width: 30%;
      height: auto;
      background: white;
      margin: 5% auto;
      border-radius: 14px;
      padding: 10px;
      button {
        cursor: pointer;
      }
      .title-auth {
        cursor: pointer;
        width: 100%;
        height: 15%;
        display: flex;
        align-items: center;
        .activelogin {
          border-bottom: 2px solid red;
          padding-bottom: 6px;
        }
        .activeRes {
          border-bottom: 2px solid red;
          padding-bottom: 6px;
        }
        .login {
          width: 50%;
          text-align: center;
        }
        .register {
          width: 50%;
          text-align: center;
        }
      }
      .txt {
        width: 100%;
        .txt-form {
          width: 100%;
          .btn-login {
            width: 100%;
            color: white;
            padding: 11px;
            background: red;
            margin-top: 20px;
            outline: none;
            border: none;
          }
          .forget-pass {
            margin-top: 10px;
            width: 100%;
            text-align: center;
            color: #007ff0;
            cursor: pointer;
          }
          .txt-control {
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            border: 1px solid rgba(0, 0, 0, 0.14);
            outline: black;
          }
          .option-login {
            width: 100%;
            text-align: center;
            color: #8d8d8d;
            margin: 10px 5px;
          }
          .btn-login-facebook {
            background: #165c9a;
            color: white;
            padding: 11px;
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            margin-top: 20px;
            outline: none;
            border: none;
          }
        }
      }
    }
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    .pop-up {
      width: 50%;
      height: auto;
      background: white;
      margin: 5% auto;
      border-radius: 14px;
      padding: 10px;
      button {
        cursor: pointer;
      }
      .title-auth {
        cursor: pointer;
        width: 100%;
        height: 15%;
        display: flex;
        align-items: center;
        .activelogin {
          border-bottom: 2px solid red;
          padding-bottom: 6px;
        }
        .activeRes {
          border-bottom: 2px solid red;
          padding-bottom: 6px;
        }
        .login {
          width: 50%;
          text-align: center;
        }
        .register {
          width: 50%;
          text-align: center;
        }
      }
      .txt {
        width: 100%;
        .txt-form {
          width: 100%;
          .btn-login {
            width: 100%;
            color: white;
            padding: 11px;
            background: red;
            margin-top: 20px;
            outline: none;
            border: none;
          }
          .forget-pass {
            margin-top: 10px;
            width: 100%;
            text-align: center;
            color: #007ff0;
            cursor: pointer;
          }
          .txt-control {
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            border: 1px solid rgba(0, 0, 0, 0.14);
            outline: black;
          }
          .option-login {
            width: 100%;
            text-align: center;
            color: #8d8d8d;
            margin: 10px 5px;
          }
          .btn-login-facebook {
            background: #165c9a;
            color: white;
            padding: 11px;
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            margin-top: 20px;
            outline: none;
            border: none;
          }
        }
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .container {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    .pop-up {
      width: 60%;
      height: auto;
      background: white;
      margin: 5% auto;
      border-radius: 14px;
      padding: 10px;
      button {
        cursor: pointer;
      }
      .title-auth {
        cursor: pointer;
        width: 100%;
        height: 15%;
        display: flex;
        align-items: center;
        .activelogin {
          border-bottom: 2px solid red;
          padding-bottom: 6px;
        }
        .activeRes {
          border-bottom: 2px solid red;
          padding-bottom: 6px;
        }
        .login {
          width: 50%;
          text-align: center;
        }
        .register {
          width: 50%;
          text-align: center;
        }
      }
      .txt {
        width: 100%;
        .txt-form {
          width: 100%;
          .btn-login {
            width: 100%;
            color: white;
            padding: 11px;
            background: red;
            margin-top: 20px;
            outline: none;
            border: none;
          }
          .forget-pass {
            margin-top: 10px;
            width: 100%;
            text-align: center;
            color: #007ff0;
            cursor: pointer;
          }
          .txt-control {
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            border: 1px solid rgba(0, 0, 0, 0.14);
            outline: black;
          }
          .option-login {
            width: 100%;
            text-align: center;
            color: #8d8d8d;
            margin: 10px 5px;
          }
          .btn-login-facebook {
            background: #165c9a;
            color: white;
            padding: 11px;
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            margin-top: 20px;
            outline: none;
            border: none;
          }
        }
      }
    }
  }
}
@media (min-width: 320px) and (max-width: 576px) {
  .container {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    .pop-up {
      width: 100%;
      height: auto;
      background: white;
      margin: 5% auto;
      border-radius: 14px;
      padding: 10px;
      button {
        cursor: pointer;
      }
      .title-auth {
        cursor: pointer;
        width: 100%;
        height: 15%;
        display: flex;
        align-items: center;
        .activelogin {
          border-bottom: 2px solid red;
          padding-bottom: 6px;
        }
        .activeRes {
          border-bottom: 2px solid red;
          padding-bottom: 6px;
        }
        .login {
          width: 50%;
          text-align: center;
        }
        .register {
          width: 50%;
          text-align: center;
        }
      }
      .txt {
        width: 100%;
        .txt-form {
          width: 100%;
          .btn-login {
            width: 100%;
            color: white;
            padding: 11px;
            background: red;
            margin-top: 20px;
            outline: none;
            border: none;
          }
          .forget-pass {
            margin-top: 10px;
            width: 100%;
            text-align: center;
            color: #007ff0;
            cursor: pointer;
          }
          .txt-control {
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            border: 1px solid rgba(0, 0, 0, 0.14);
            outline: black;
          }
          .option-login {
            width: 100%;
            text-align: center;
            color: #8d8d8d;
            margin: 10px 5px;
          }
          .btn-login-facebook {
            background: #165c9a;
            color: white;
            padding: 11px;
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            margin-top: 20px;
            outline: none;
            border: none;
          }
        }
      }
    }
  }
}
@media (min-width: 576px) and (max-width: 768px) {
  .container {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    .pop-up {
      width: 85%;
      height: auto;
      background: white;
      margin: 5% auto;
      border-radius: 14px;
      padding: 10px;
      button {
        cursor: pointer;
      }
      .title-auth {
        cursor: pointer;
        width: 100%;
        height: 15%;
        display: flex;
        align-items: center;
        .activelogin {
          border-bottom: 2px solid red;
          padding-bottom: 6px;
        }
        .activeRes {
          border-bottom: 2px solid red;
          padding-bottom: 6px;
        }
        .login {
          width: 50%;
          text-align: center;
        }
        .register {
          width: 50%;
          text-align: center;
        }
      }
      .txt {
        width: 100%;
        .txt-form {
          width: 100%;
          .btn-login {
            width: 100%;
            color: white;
            padding: 11px;
            background: red;
            margin-top: 20px;
            outline: none;
            border: none;
          }
          .forget-pass {
            margin-top: 10px;
            width: 100%;
            text-align: center;
            color: #007ff0;
            cursor: pointer;
          }
          .txt-control {
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            border: 1px solid rgba(0, 0, 0, 0.14);
            outline: black;
          }
          .option-login {
            width: 100%;
            text-align: center;
            color: #8d8d8d;
            margin: 10px 5px;
          }
          .btn-login-facebook {
            background: #165c9a;
            color: white;
            padding: 11px;
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            margin-top: 20px;
            outline: none;
            border: none;
          }
        }
      }
    }
  }
}
</style>