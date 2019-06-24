<template>
  <div class="container">
    <h3>Khách hàng nhận xét</h3>
    <div class="rating-box">
      <div class="rating-box-left">
        <p>Đánh giá trung bình</p>
        <p>4/5</p>
        <i class="fas fa-star" v-for=" n in 5"></i>
        <p class="total-rating">( 25 nhận xét )</p>
      </div>
      <div class="rating-box-center">
        <div class="pr-rating" v-for="n in 5">
          <div class="number-rating">
            <p>
              5
              <i class="fas fa-star"></i>
            </p>
          </div>
          <div class="tool-bar">
            <div class="tool-bar-float"></div>
          </div>
          <div class="rating-total">60%</div>
        </div>
      </div>
      <div class="rating-box-right">
        <p>Chia sẻ nhận xét về sản phẩm</p>
        <button @click="toggleCmt = !toggleCmt">{{ titleToggle }}</button>
      </div>
    </div>
    <div class="box-comment" v-if="toggleCmt">
      <div class="action-comment">
        <p class="title">GỬI NHẬN XÉT CỦA BẠN</p>
        <p>1. Đánh giá của bạn về sản phẩm này:</p>
        <p>2. Tiêu đề của nhận xét:</p>
        <div>
          <input type="text" class="txt-content">
        </div>
        <p>3. Viết nhận xét của bạn vào bên dưới:</p>
        <div>
          <textarea name id cols="30" rows="8" class="txt-content-main"></textarea>
        </div>
        <div>
          <span>Thêm hình sản phẩm nếu có (tối đa 5 hình):</span>
          <input type="file" id="upload-image">
          <label for="upload-image">
            <button>Chọn hình ảnh</button>
          </label>
        </div>
        <div class="btn-send-rating">
          <button>Gửi nhận xét</button>
        </div>
      </div>
      <div class="product-comment">
        <div class="img">
          <img
            src="https://salt.tikicdn.com/cache/215x215/ts/product/ee/51/79/c662f779260f301a4c709d378208c6f0.jpg"
            alt
          >
        </div>
        <div class="name">
          <p>Máy Lạnh Inverter Daikin FTKQ35SAVMV/RKQ35SAVMV (1.5HP)</p>
        </div>
        <div class="price">Giá: 10.790.000 ₫</div>
      </div>
    </div>
    <div class="box-customer-comment">
      <div class="filer-comment">
        <span>Chọn xem nhận xét</span>
        <select name id>
          <option value>Hữu ích</option>
        </select>
        <select name id>
          <option value>Tất cả khách hàng</option>
        </select>
        <select name id>
          <option value>Tất cả sao</option>
        </select>
      </div>
      <div class="rating-cmt">
        <div class="avatar">
          <div class="inclue-avatar">
            <div class="div-avatar"></div>
            <div class="name-customer">Nguyen Nhung</div>
            <div class="time">2 tháng trước</div>
          </div>
        </div>
        <div class="content-cmt">
          <div>
            <p>
              <i class="fas fa-star" v-for="n in 5"></i> Cực Kì Hài Lòng
            </p>
            <p class="buy-alredy">Đã mua sản phẩm này tại Tiki</p>
            <p>Đóng gói kỹ, giao hàng đúng hẹn, máy hoạt động tốt.</p>
          </div>
          <div class>
            <a href>Gui trả lời</a>
          </div>

          <div class="img-cmt">
            <img
              src="https://salt.tikicdn.com/cache/200x200/ts/product/b7/15/fa/892ce08c86b4bbe637710522f9489aae.jpg"
              alt
            >
          </div>
          <div class="txt-reply">
            <div class>
              <textarea></textarea>
              <div class="btn-send-rep">
                <button>Gửi câu trả lời</button>
                <button>Hủy bỏ</button>
              </div>
            </div>
          </div>
          <div class="rep-rating">
            <div class="avatar-rep"></div>
            <div class="content-rep">
              <p>Chào bạn, Tiki đã nhận được thông tin đánh giá/nhận xét từ bạn. Qua kiểm tra hiện tại đơn hàng của bạn Tiki trước đó đã trễ cam kết lắp đặt so với thời gian dự kiến đưa ra, Tiki đang liên hệ bộ phận lắp đặt tiến hành xử lý gấp. Tiki rất xin lỗi vì sự bất tiện trong lần mua sắm này, Tiki hiểu được điều này gây ảnh hưởng đến nhu cầu sử dụng sản phẩm và thời gian của quý khách, Tiki xin phép ghi nhận góp ý và cố gắng cải thiện rất mong quý khách hàng có thể thông cảm cho Tiki. Hy vọng sẽ phục vụ bạn tốt hơn trong đơn hàng tiếp theo. Tiki rất mong nhận được phản hồi mới, khách quan chi tiết hơn từ bạn về ưu và khuyết điểm của sản phẩm sau khi hỗ trợ xong. Một lần nữa, Tiki rất xin lỗi bạn vì những bất tiện vừa qua. Trường hợp cần hỗ trợ thêm, bạn có thể liên hệ với Tiki qua hòm thư hotro@tiki.vn hoặc hotline 1900-6035. Trân trọng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      toggleCmt:false
    }
  },
  computed:{
    titleToggle(){
      return this.toggleCmt === true ? 'Viết nhận xét của bạn' : 'Đóng'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 25px !important;
}
@media only screen and (min-width: 1200px) {
  .container {
    width: 100%;
    .rating-box {
      border: 1px solid #f7f7f7;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .rating-box-left {
        width: 30%;
        border-right: 1px solid #f7f7f7;
        p:nth-child(2) {
          font-size: 47px;
          color: #fe302e;
          font-weight: 500;
        }
        .total-rating {
          font-size: 14px;
          color: #8f8f8f;
        }
        i {
          color: #fdd22f;
        }
      }
      .rating-box-center {
        width: 40%;
        border-right: 1px solid #f7f7f7;
        .pr-rating {
          width: 70%;
          display: flex;
          margin: 7px auto 3px;
          .number-rating {
            width: 15%;
          }
          .tool-bar {
            width: 70%;
            height: 12px;
            background: #efefef;
            position: relative;
            margin-top: 6px;
            .tool-bar-float {
              position: absolute;
              width: 80%;
              height: 100%;
              background: #1dc425;
            }
          }
          .rating-total {
            width: 15%;
          }
        }
      }
      .rating-box-right {
        width: 30%;
        button {
          width: 70%;
          background: #fdd22f;
          padding: 10px 12px;
          margin-top: 8px;
          border: none;
          cursor: pointer;
        }
      }
    }
    .box-comment {
      width: 100%;
      display: flex;
      padding: 7px;
      .action-comment {
        width: 50%;
        .title {
          font-weight: bold;
          margin: 10px 0px;
        }
        .txt-content {
          width: 80%;
          height: 35px;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        .txt-content-main {
          width: 80%;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        #upload-image {
          display: none;
        }
        .btn-send-rating {
          button {
            margin: 10px 0px;
            width: 140px;
            font-weight: 500;
            font-size: 13px;
            height: 40px;
            background: #fdd22f;
            border: 0;
            color: #333;
          }
        }
      }
      .product-comment {
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        .price {
          color: red;
          margin: 10px 0px;
          font-weight: bold;
        }
      }
    }
    .box-customer-comment {
      width: 100%;
      .filer-comment {
        display: flex;
      }
      .rating-cmt {
        display: flex;
        .avatar {
          width: 16%;
          .inclue-avatar {
            width: 80%;
            padding: 20px 0px;
            text-align: center;
            .div-avatar {
              margin: auto;
              width: 65px;
              height: 65px;
              background: #4f4f4f;
              border-radius: 100%;
            }
            .time {
              font-size: 12px;
              color: grey;
            }
            .name-customer {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
        .content-cmt {
          width: 84%;
          padding: 10px 0px;
          padding-right: 20px;
          text-align: justify;
          font-size: 14px;
          line-height: 20px;
          width: 100%;
          margin: 10px 0 8px;
          color: #4f4f4f;
          a {
            text-decoration: none;
            color: #007ff0;
            margin: 10px 0px;
          }
          .txt-reply {
            textarea {
              display: block;
              width: 100%;
              height: 130px;
              margin-bottom: 10px;
              border-color: #e0e0e0;
              resize: none;
            }
            div {
              .btn-send-rep {
                width: 100%;
                button {
                  font-weight: 400;
                  font-size: 13px;
                  background: #fdd22f;
                  border: 0;
                  color: #4a4a4a;
                  padding: 5px 10px;
                }
                button:nth-child(2) {
                  background: #fff;
                  padding: 5px 12px;
                  text-align: center;
                  white-space: nowrap;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-left: 5px;
                  border: 1px solid #adadad;
                }
              }
            }
          }
          .buy-alredy {
            font-size: 12px;
            padding: 1px 0 1px 0px;

            margin: 6px 0;
            color: #22b345;
            font-weight: 400;
            background-size: contain;
          }
          i {
            color: #fdd22f;
            font-size: 14px;
          }
          .img-cmt {
            img {
              width: 10%;
            }
          }
          .rep-rating {
            width: 100%;
            float: right;
            display: flex;
            margin: 10px 0px;
            .avatar-rep {
              width: 10%;
            }
            .content-rep {
              width: 80%;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    width: 100%;
    .rating-box {
      border: 1px solid #f7f7f7;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .rating-box-left {
        width: 30%;
        border-right: 1px solid #f7f7f7;
        p:nth-child(2) {
          font-size: 47px;
          color: #fe302e;
          font-weight: 500;
        }
        .total-rating {
          font-size: 14px;
          color: #8f8f8f;
        }
        i {
          color: #fdd22f;
        }
      }
      .rating-box-center {
        width: 40%;
        border-right: 1px solid #f7f7f7;
        .pr-rating {
          width: 70%;
          display: flex;
          margin: 7px auto 3px;
          .number-rating {
            width: 15%;
          }
          .tool-bar {
            width: 70%;
            height: 12px;
            background: #efefef;
            position: relative;
            margin-top: 6px;
            .tool-bar-float {
              position: absolute;
              width: 80%;
              height: 100%;
              background: #1dc425;
            }
          }
          .rating-total {
            width: 15%;
          }
        }
      }
      .rating-box-right {
        width: 30%;
        button {
          width: 70%;
          background: #fdd22f;
          padding: 10px 12px;
          margin-top: 8px;
          border: none;
          cursor: pointer;
        }
      }
    }
    .box-comment {
      width: 100%;
      display: flex;
      padding: 7px;
      .action-comment {
        width: 50%;
        .title {
          font-weight: bold;
          margin: 10px 0px;
        }
        .txt-content {
          width: 80%;
          height: 35px;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        .txt-content-main {
          width: 80%;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        #upload-image {
          display: none;
        }
        .btn-send-rating {
          button {
            margin: 10px 0px;
            width: 140px;
            font-weight: 500;
            font-size: 13px;
            height: 40px;
            background: #fdd22f;
            border: 0;
            color: #333;
          }
        }
      }
      .product-comment {
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        .price {
          color: red;
          margin: 10px 0px;
          font-weight: bold;
        }
      }
    }
    .box-customer-comment {
      width: 100%;
      .filer-comment {
        display: flex;
      }
      .rating-cmt {
        display: flex;
        .avatar {
          width: 16%;
          .inclue-avatar {
            width: 80%;
            padding: 20px 0px;
            text-align: center;
            .div-avatar {
              margin: auto;
              width: 65px;
              height: 65px;
              background: #4f4f4f;
              border-radius: 100%;
            }
            .time {
              font-size: 12px;
              color: grey;
            }
            .name-customer {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
        .content-cmt {
          width: 84%;
          padding: 10px 0px;
          padding-right: 20px;
          text-align: justify;
          font-size: 14px;
          line-height: 20px;
          width: 100%;
          margin: 10px 0 8px;
          color: #4f4f4f;
          a {
            text-decoration: none;
            color: #007ff0;
            margin: 10px 0px;
          }
          .txt-reply {
            textarea {
              display: block;
              width: 100%;
              height: 130px;
              margin-bottom: 10px;
              border-color: #e0e0e0;
              resize: none;
            }
            div {
              .btn-send-rep {
                width: 100%;
                button {
                  font-weight: 400;
                  font-size: 13px;
                  background: #fdd22f;
                  border: 0;
                  color: #4a4a4a;
                  padding: 5px 10px;
                }
                button:nth-child(2) {
                  background: #fff;
                  padding: 5px 12px;
                  text-align: center;
                  white-space: nowrap;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-left: 5px;
                  border: 1px solid #adadad;
                }
              }
            }
          }
          .buy-alredy {
            font-size: 12px;
            padding: 1px 0 1px 0px;

            margin: 6px 0;
            color: #22b345;
            font-weight: 400;
            background-size: contain;
          }
          i {
            color: #fdd22f;
            font-size: 14px;
          }
          .img-cmt {
            img {
              width: 10%;
            }
          }
          .rep-rating {
            width: 100%;
            float: right;
            display: flex;
            .avatar-rep {
              width: 10%;
            }
            .content-rep {
              width: 80%;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .container {
    width: 100%;
    .rating-box {
      border: 1px solid #f7f7f7;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .rating-box-left {
        width: 30%;
        border-right: 1px solid #f7f7f7;
        p:nth-child(2) {
          font-size: 47px;
          color: #fe302e;
          font-weight: 500;
        }
        .total-rating {
          font-size: 14px;
          color: #8f8f8f;
        }
        i {
          color: #fdd22f;
        }
      }
      .rating-box-center {
        width: 40%;
        border-right: 1px solid #f7f7f7;
        .pr-rating {
          width: 70%;
          display: flex;
          margin: 7px auto 3px;
          .number-rating {
            width: 15%;
          }
          .tool-bar {
            width: 70%;
            height: 12px;
            background: #efefef;
            position: relative;
            margin-top: 6px;
            .tool-bar-float {
              position: absolute;
              width: 80%;
              height: 100%;
              background: #1dc425;
            }
          }
          .rating-total {
            width: 15%;
          }
        }
      }
      .rating-box-right {
        width: 30%;
        button {
          width: 70%;
          background: #fdd22f;
          padding: 10px 12px;
          margin-top: 8px;
          border: none;
          cursor: pointer;
        }
      }
    }
    .box-comment {
      width: 100%;
      display: flex;
      padding: 7px;
      .action-comment {
        width: 50%;
        .title {
          font-weight: bold;
          margin: 10px 0px;
        }
        .txt-content {
          width: 80%;
          height: 35px;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        .txt-content-main {
          width: 80%;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        #upload-image {
          display: none;
        }
        .btn-send-rating {
          button {
            margin: 10px 0px;
            width: 140px;
            font-weight: 500;
            font-size: 13px;
            height: 40px;
            background: #fdd22f;
            border: 0;
            color: #333;
          }
        }
      }
      .product-comment {
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        .price {
          color: red;
          margin: 10px 0px;
          font-weight: bold;
        }
      }
    }
    .box-customer-comment {
      width: 100%;
      .filer-comment {
        display: flex;
      }
      .rating-cmt {
        display: flex;
        .avatar {
          width: 20%;
          .inclue-avatar {
            width: 80%;
            padding: 20px 0px;
            text-align: center;
            .div-avatar {
              margin: auto;
              width: 65px;
              height: 65px;
              background: #4f4f4f;
              border-radius: 100%;
            }
            .time {
              font-size: 12px;
              color: grey;
            }
            .name-customer {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
        .content-cmt {
          width: 80%;
          padding: 10px 0px;
          padding-right: 20px;
          text-align: justify;
          font-size: 14px;
          line-height: 20px;
          width: 100%;
          margin: 10px 0 8px;
          color: #4f4f4f;
          a {
            text-decoration: none;
            color: #007ff0;
            margin: 10px 0px;
          }
          .txt-reply {
            textarea {
              display: block;
              width: 100%;
              height: 130px;
              margin-bottom: 10px;
              border-color: #e0e0e0;
              resize: none;
            }
            div {
              .btn-send-rep {
                width: 100%;
                button {
                  font-weight: 400;
                  font-size: 13px;
                  background: #fdd22f;
                  border: 0;
                  color: #4a4a4a;
                  padding: 5px 10px;
                }
                button:nth-child(2) {
                  background: #fff;
                  padding: 5px 12px;
                  text-align: center;
                  white-space: nowrap;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-left: 5px;
                  border: 1px solid #adadad;
                }
              }
            }
          }
          .buy-alredy {
            font-size: 12px;
            padding: 1px 0 1px 0px;

            margin: 6px 0;
            color: #22b345;
            font-weight: 400;
            background-size: contain;
          }
          i {
            color: #fdd22f;
            font-size: 14px;
          }
          .img-cmt {
            img {
              width: 10%;
            }
          }
          .rep-rating {
            width: 100%;
            float: right;
            display: flex;
            .avatar-rep {
              width: 10%;
            }
            .content-rep {
              width: 80%;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 320px) and (max-width: 575px) {
  .container {
    width: 100%;
    .rating-box {
      border: 1px solid #f7f7f7;
      height: auto;

      justify-content: center;
      align-items: center;
      text-align: center;
      .rating-box-left {
        width: 100%;
        border-right: 1px solid #f7f7f7;
        p:nth-child(2) {
          font-size: 47px;
          color: #fe302e;
          font-weight: 500;
        }
        .total-rating {
          font-size: 14px;
          color: #8f8f8f;
        }
        i {
          color: #fdd22f;
        }
      }
      .rating-box-center {
        width: 100%;
        border-right: 1px solid #f7f7f7;
        .pr-rating {
          width: 70%;
          display: flex;
          margin: 7px auto 3px;
          .number-rating {
            width: 15%;
          }
          .tool-bar {
            width: 70%;
            height: 12px;
            background: #efefef;
            position: relative;
            margin-top: 6px;
            .tool-bar-float {
              position: absolute;
              width: 80%;
              height: 100%;
              background: #1dc425;
            }
          }
          .rating-total {
            width: 15%;
          }
        }
      }
      .rating-box-right {
        width: 100%;
        button {
          width: 70%;
          background: #fdd22f;
          padding: 10px 12px;
          margin-top: 8px;
          border: none;
          cursor: pointer;
        }
      }
    }
    .box-comment {
      width: 100%;
      display: flex;
      padding: 7px;
      .action-comment {
        width: 100%;
        .title {
          font-weight: bold;
          margin: 10px 0px;
        }
        .txt-content {
          width: 80%;
          height: 35px;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        .txt-content-main {
          width: 80%;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        #upload-image {
          display: none;
        }
        .btn-send-rating {
          button {
            margin: 10px 0px;
            width: 140px;
            font-weight: 500;
            font-size: 13px;
            height: 40px;
            background: #fdd22f;
            border: 0;
            color: #333;
          }
        }
      }
      .product-comment {
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        display: none;
        .price {
          color: red;
          margin: 10px 0px;
          font-weight: bold;
        }
      }
    }
    .box-customer-comment {
      width: 100%;
      .filer-comment {
        display: flex;
      }
      .rating-cmt {
        display: flex;
        .avatar {
          width: 20%;
          .inclue-avatar {
            width: 80%;
            padding: 20px 0px;
            text-align: center;
            .div-avatar {
              margin: auto;
              width: 45px;
              height: 45px;
              background: #4f4f4f;
              border-radius: 100%;
            }
            .time {
              font-size: 12px;
              color: grey;
            }
            .name-customer {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
        .content-cmt {
          width: 100%;
          padding: 10px 5px;
          padding-right: 0px;
          text-align: justify;
          font-size: 14px;
          line-height: 20px;
          width: 100%;
          margin: 10px 0 8px;
          color: #4f4f4f;
          a {
            text-decoration: none;
            color: #007ff0;
            margin: 10px 0px;
          }
          .txt-reply {
            textarea {
              display: block;
              width: 100%;
              height: 130px;
              margin-bottom: 10px;
              border-color: #e0e0e0;
              resize: none;
            }
            div {
              .btn-send-rep {
                width: 100%;
                button {
                  font-weight: 400;
                  font-size: 13px;
                  background: #fdd22f;
                  border: 0;
                  color: #4a4a4a;
                  padding: 5px 10px;
                }
                button:nth-child(2) {
                  background: #fff;
                  padding: 5px 12px;
                  text-align: center;
                  white-space: nowrap;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-left: 5px;
                  border: 1px solid #adadad;
                }
              }
            }
          }
          .buy-alredy {
            font-size: 12px;
            padding: 1px 0 1px 0px;

            margin: 6px 0;
            color: #22b345;
            font-weight: 400;
            background-size: contain;
          }
          i {
            color: #fdd22f;
            font-size: 14px;
          }
          .img-cmt {
            img {
              width: 30%;
            }
          }
          .rep-rating {
            width: 100%;
            float: right;
            display: flex;
            .avatar-rep {
              width: 10%;
            }
            .content-rep {
              width: 80%;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 768px) and (min-width: 576px) {
  .container {
    width: 100%;
    .rating-box {
      border: 1px solid #f7f7f7;
      height: auto;

      justify-content: center;
      align-items: center;
      text-align: center;
      .rating-box-left {
        width: 100%;
        border-right: 1px solid #f7f7f7;
        p:nth-child(2) {
          font-size: 47px;
          color: #fe302e;
          font-weight: 500;
        }
        .total-rating {
          font-size: 14px;
          color: #8f8f8f;
        }
        i {
          color: #fdd22f;
        }
      }
      .rating-box-center {
        width: 100%;
        border-right: 1px solid #f7f7f7;
        .pr-rating {
          width: 70%;
          display: flex;
          margin: 7px auto 3px;
          .number-rating {
            width: 15%;
          }
          .tool-bar {
            width: 70%;
            height: 12px;
            background: #efefef;
            position: relative;
            margin-top: 6px;
            .tool-bar-float {
              position: absolute;
              width: 80%;
              height: 100%;
              background: #1dc425;
            }
          }
          .rating-total {
            width: 15%;
          }
        }
      }
      .rating-box-right {
        width: 100%;
        button {
          width: 70%;
          background: #fdd22f;
          padding: 10px 12px;
          margin-top: 8px;
          border: none;
          cursor: pointer;
        }
      }
    }
    .box-comment {
      width: 100%;
      display: flex;
      padding: 7px;
      .action-comment {
        width: 100%;
        .title {
          font-weight: bold;
          margin: 10px 0px;
        }
        .txt-content {
          width: 80%;
          height: 35px;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        .txt-content-main {
          width: 80%;
          padding: 7px 8px;
          border: 1px solid #dfdfdf;
          font-weight: 400;
          margin: 10px 0px;
        }
        #upload-image {
          display: none;
        }
        .btn-send-rating {
          button {
            margin: 10px 0px;
            width: 140px;
            font-weight: 500;
            font-size: 13px;
            height: 40px;
            background: #fdd22f;
            border: 0;
            color: #333;
          }
        }
      }
      .product-comment {
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        display: none;
        .price {
          color: red;
          margin: 10px 0px;
          font-weight: bold;
        }
      }
    }
    .box-customer-comment {
      width: 100%;
      .filer-comment {
        display: flex;
      }
      .rating-cmt {
        display: flex;
        .avatar {
          width: 20%;
          .inclue-avatar {
            width: 80%;
            padding: 20px 0px;
            text-align: center;
            .div-avatar {
              margin: auto;
              width: 45px;
              height: 45px;
              background: #4f4f4f;
              border-radius: 100%;
            }
            .time {
              font-size: 12px;
              color: grey;
            }
            .name-customer {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
        .content-cmt {
          width: 100%;
          padding: 10px 5px;
          padding-right: 0px;
          text-align: justify;
          font-size: 14px;
          line-height: 20px;
          width: 100%;
          margin: 10px 0 8px;
          color: #4f4f4f;
          a {
            text-decoration: none;
            color: #007ff0;
            margin: 10px 0px;
          }
          .txt-reply {
            textarea {
              display: block;
              width: 100%;
              height: 130px;
              margin-bottom: 10px;
              border-color: #e0e0e0;
              resize: none;
            }
            div {
              .btn-send-rep {
                width: 100%;
                button {
                  font-weight: 400;
                  font-size: 13px;
                  background: #fdd22f;
                  border: 0;
                  color: #4a4a4a;
                  padding: 5px 10px;
                }
                button:nth-child(2) {
                  background: #fff;
                  padding: 5px 12px;
                  text-align: center;
                  white-space: nowrap;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-left: 5px;
                  border: 1px solid #adadad;
                }
              }
            }
          }
          .buy-alredy {
            font-size: 12px;
            padding: 1px 0 1px 0px;

            margin: 6px 0;
            color: #22b345;
            font-weight: 400;
            background-size: contain;
          }
          i {
            color: #fdd22f;
            font-size: 14px;
          }
          .img-cmt {
            img {
              width: 30%;
            }
          }
          .rep-rating {
            width: 100%;
            float: right;
            display: flex;
            .avatar-rep {
              width: 10%;
            }
            .content-rep {
              width: 80%;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>
