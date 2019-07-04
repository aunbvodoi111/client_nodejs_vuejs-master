<template>
    <div class="content-left">
        <div class="title">
          <div class="img">
            <img src="https://cf.shopee.vn/file/aaa24a79e7015ab1d6c73392b4b54c93_tn" alt />
          </div>
          <div class="name-user">
            <p>Tài khoản của bạn</p>
            <span>Phạm Đức Qúy</span>
          </div>
        </div>
        <div class="nav-tab">
          <ul>
            <li>
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/account/profile'>Thông báo của bạn</nuxt-link>
            </li>
            <!-- <li>
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/account/profile'>Thông báo của bạn</nuxt-link>
            </li> -->
            <li>
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/wishlist'>Sản phẩm yêu thích</nuxt-link>
            </li>
            <li>
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/followShop'>Shop yêu thích</nuxt-link>
            </li>
            <li>
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/productseen'>Đơn hàng đã xem</nuxt-link>
            </li>
            <li>
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/review'>Nhận xét của tôi</nuxt-link>
            </li>
            <li>
              <i class="fas fa-star"></i>
              <nuxt-link to='/user/order/history'>Quản lí đơn hàng</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
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
