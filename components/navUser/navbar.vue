<template>
    <div class="content-left">
        <div class="title">
          <div class="img">
            <img src="/img/images.png" alt  v-if="$store.state.authUser.avatar == 0"/>
            <img :src="$store.state.authUser.avatar" alt  v-if="$store.state.authUser.avatar != 0" />
          </div>
         
          <div class="name-user">
            <p>Tài khoản của bạn</p>
            <span>{{ $store.state.authUser.name }}</span>
          </div>
        </div>
        <div class="nav-tab">
          <ul>
            <li :class="{ active:1 == seleted }" >
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/account/profile'>Hồ sơ của bạn</nuxt-link>
            </li>
            <!-- <li>
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/account/profile'>Thông báo của bạn</nuxt-link>
            </li> -->
            <li :class="{ active:2 == seleted }" >
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/wishlist'>Sản phẩm yêu thích</nuxt-link>
            </li>
            <li :class="{ active:3 == seleted }" >
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/followShop'>Shop yêu thích</nuxt-link>
            </li>
            <li :class="{ active:4 == seleted }" >
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/notifications/orders'>Thông báo của bạn</nuxt-link>
            </li>
            <li :class="{ active:5 == seleted }" >
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/account/address'>Địa chỉ của tôi</nuxt-link>
            </li>
            <li :class="{ active:6 == seleted }">
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/productseen'>Sản phẩm đã xem</nuxt-link>
            </li>
            <li :class="{ active:7 == seleted }" >
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/review'>Nhận xét của tôi</nuxt-link>
            </li>
            <li :class="{ active:8 == seleted }" >
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/order/history'>Quản lí đơn hàng</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
</template>
<script>
export default {
    middleware: 'authenticated',
    props:['seleted'],
    data(){
      return{
        
      }
    }
}
</script>
<style lang="scss" scoped>
.active{
  a{
    color: red !important;
  }
}
a {
  text-decoration: none;
}
ul li {
  list-style-type: none;
}
.content-left {
    width: 20%;
    .title {
      display: flex;
      width: 100%;
      .img {
        width: 20%;
        img {
          width: 100%;
          border-radius: 100%;
        }
      }
      .name-user {
        width: 70%;
        margin-left: 10px;
        p {
          font-size: 13px;
          margin-bottom: 5px;
          color: #242424;
          margin-top: 5px;
          font-family: Roboto;
          font-weight: 300;
        }
        span {
          margin: 0;
          font-family: Roboto;
          font-size: 17px;
          font-weight: 400;
          font-style: normal;
          font-stretch: normal;
          color: #242424;
        }
      }
    }
    .nav-tab {
      width: 100%;
      ul {
        width: 100%;
        padding: 0px;
        margin-top: 15px;
        li {
          margin-top: 15px;
          i {
            width: 10%;
            color: #999;
          }
          a {
            width: 85%;
            color: #4a4a4a;
            font-size: 15px;
            font-weight: 400;
            font-style: normal;
            font-stretch: normal;
            text-align: left;
          }
        }
      }
    }
  }
</style>
