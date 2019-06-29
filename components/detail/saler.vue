<template>
  <div class="container">
    <div class="saler">
      <div class="saler-left">
        <div class="img">
          <img src="https://cf.shopee.vn/file/c241a1c7f04749a0b9b55b53b5619425_tn" alt>
        </div>
        <div class="chat-saler">
          <p class="name-saler">{{ product.user.name }}</p>
          <p class="online">Online 5 Giờ Trước</p>
          <button @click="showDivChat">Chat ngay</button>
          <button @click="followSaler">{{ checkFollow === undefined ? 'Follow' : 'Đã Follow' }}</button>
          <nuxt-link :to="`/shop/${product.user.id}`">
            <button>Xem shop</button>
          </nuxt-link>
        </div>
      </div>
      <div class="saler-right">
        <ul>
          <li>
            Đánh giá :
            <span>1138</span>
          </li>
          <li>
            Sản phẩm :
            <span>1138</span>
          </li>
          <li>
            Tham gia :
            <span>1138</span>
          </li>
          <li>
            Người theo dõi :
            <span>1138</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:["product","follows"],
  data(){
    return{

    }
  },
  computed:{
    checkFollow: {
      get: function() {
        var  index;
        if (this.$store.state.authUser && this.follows.length > 0) {
          index = this.follows.find(
            follow => follow.UserId === this.$store.state.authUser.id
          );
          // index = count.length
        }

        return index;
      },
      set: function(newValue) {
        // this.checkWishe = newValue
        console.log(newValue)
        this.index = newValue
      }
    }
  },
  methods:{
    followSaler(product) {
      var find =  this.follows.find( follow => follow.UserId === this.$store.state.authUser.id)
      console.log(find)
      var index = this.follows.indexOf(find)
      console.log(index)
      if( find ){
         this.follows.splice(index,1)
        console.log(this.follows)
      }else{
        var anhquy ={
          UserId : this.$store.state.authUser.id,
          ProductId : product.id
        }
        this.follows.push(anhquy)
        console.log(this.follows)
      }
      if (!this.$store.state.authUser) {
        this.$store.commit("OPEN_REGISTER");
      } else {
        this.$axios
          .post("/api/follow/add", { ProductId: this.product.id })
          .then(response => {
            console.log(response);
          });
      }
    },
    showDivChat(){
      if(!this.$store.state.authUser){
        this.$store.commit('OPEN_REGISTER')
      }else{
        this.$store.commit('TOGGLE_CHAT')
      }
    }
  }
}
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
