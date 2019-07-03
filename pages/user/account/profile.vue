<template>
  <div class="container-fruid">
    <div class="container">
        <NavBar/>
      <div class="content-right">
        <div class="content-main">
          <h1>Thông báo của tôi</h1>
          <div class="choose-nofi">
            <div class="btn-act">
              <button>Cập nhật đơn hàng</button>
            </div>
            <div class="btn-act">
              <button>Cập nhật đánh giá</button>
            </div>
            <div class="btn-act">
              <button>Hoạt động</button>
            </div>
            <div class="btn-act">
              <button>Cập nhật sản phẩm</button>
            </div>
          </div>
          <div class="content-nofi">
            <div class="img">
              <img src="/img/anhdep.png" alt />
              <p>Bạn chưa có thông báo</p>
              <button>Tiếp tục mua sắm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from './../../../components/navUser/navbar' 
export default {
    components:{
        NavBar
    }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
ul li {
  list-style-type: none;
}
.container-fruid {
  height: 500px;
  margin-top: 20px;
  width: 100%;
}
.container {
  width: 1200px;
  display: flex;
  height: auto;
  margin: auto;
//   .content-left {
//     width: 20%;
//     .title {
//       display: flex;
//       width: 100%;
//       .img {
//         width: 20%;
//         img {
//           width: 100%;
//           border-radius: 100%;
//         }
//       }
//       .name-user {
//         width: 70%;
//         margin-left: 10px;
//         p {
//           font-size: 13px;
//           margin-bottom: 5px;
//           color: #242424;
//           margin-top: 5px;
//           font-family: Roboto;
//           font-weight: 300;
//         }
//         span {
//           margin: 0;
//           font-family: Roboto;
//           font-size: 17px;
//           font-weight: 400;
//           font-style: normal;
//           font-stretch: normal;
//           color: #242424;
//         }
//       }
//     }
//     .nav-tab {
//       width: 100%;
//       ul {
//         width: 100%;
//         padding: 0px;
//         margin-top: 15px;
//         li {
//           margin-top: 15px;
//           i {
//             width: 10%;
//             color: #999;
//           }
//           a {
//             width: 85%;
//             color: #4a4a4a;
//             font-size: 15px;
//             font-weight: 400;
//             font-style: normal;
//             font-stretch: normal;
//             text-align: left;
//           }
//         }
//       }
//     }
//   }
  .content-right {
    width: 80%;
    .content-main {
      h1 {
        margin-bottom: 15px;
        font-family: Roboto;
        font-size: 19px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        color: #242424;
      }
      .choose-nofi {
        display: flex;
        .btn-act {
          width: 20%;
          button {
            padding: 13px 20px;
            width: 85%;
            background-color: #2b3278;
            color: white;
            border: none;
            cursor: pointer;
          }
        }
      }
      .content-nofi {
        width: 100%;
        margin-top: 20px;
        align-items: center;
        .img {
          margin-top: 100px;
          width: 50%;
          margin: auto;
          img {
            margin-left: 20px;
          }
          p {
            font-size: 14px;
            margin-left: 20px;
          }
          button {
            width: 40%;
            margin-top: 15px;
            background: cornflowerblue;
            height: 40px;
            color: black;
            border: none;
          }
        }
      }
    }
  }
}
</style>
