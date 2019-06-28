<template>
  <div class="container-fruid">
    <div class="container-cart">
      <div class="title-cart">
        <div class="check">
          <label class="container">
            sản phẩm
            <input type="checkbox" checked="checked">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="bill">Đơn Giá</div>
        <div class="qty">Số Lượng</div>
        <div class="money">Số Tiền</div>
        <div class="action">Thao Tác</div>
      </div>
      <div class="cart-product" v-for="item in carts " :key="item.id">
        <div class="saler-cart">
          <label class="container">
            <i class="fas fa-close"></i>Phamquy
            <input type="checkbox" checked="checked">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="cart-main" >
          <div class="pr-cart">
            <label class="container">
              <i class="fas fa-close"></i>
              <input type="checkbox" checked="checked">
              <span class="checkmark"></span>
            </label>
            <div class="img">
              <img width="42%"
                :src="item.image"
                alt
              >
            </div>
            <div class="name">
              <p>{{ item.name }}</p>
            </div>
          </div>
          <div class="price">
            <p>₫190.000 ₫ {{ item.price }}</p>
          </div>
          <div class="price">
            <p>{{ item.qty }}</p>
          </div>
          <div class="price-sum">
            <p>₫396.000</p>
          </div>
          <div class="action">
            <p>Xóa</p>
          </div>
        </div>
      </div>
      <div class="popup-total-cart">
        <div class="total-cart">
          <label class="container">
            Chọn tất cả (8)
            <input type="checkbox" checked="checked">
            <span class="checkmark"></span>
          </label>
          <div>
            <p>Tổng tiền hàng (8 sản phẩm): ₫2.333.000</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    var data = await $axios.get('/api/cart/')
    console.log(data.data)
    return { carts : data.data }
  },
};
</script>
<style lang="scss" scoped>
.container-fruid {
  width: 100%;
  background: #f5f5f5;
  position: relative;
  .container-cart {
    width: 1200px;
    margin: auto;
    .popup-total-cart {
      position: fixed;
      align-items: center;
      -webkit-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
      box-shadow: 3px 4px 29px -10px rgba(0, 0, 0, 0.75);
      z-index: 999;
      bottom: 0;
      width: 1200px;
      margin: auto;
      height: 120px;
      background: white;
      .total-cart {
        display: flex;
      }
    }
    .cart-product {
      margin-top: 20px;
      width: 100%;
      background: white;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
      border-radius: 0.125rem;
      overflow: hidden;
      border-radius: 3px;
      height: auto;
      font-size: 0.875rem;
      background: #fff;
      text-transform: capitalize;
      color: #888;
      align-items: center;
      padding: 7px 20px;
      .cart-main {
        display: flex;
        width: 100%;
        align-items: center;
        color: black;
        border-top: 1px solid #e8e8e8;
        padding-top: 20px;
        .pr-cart {
          width: 45%;
          display: flex;
          .img {
          }
        }
        .price-sum {
          width: 13.65%;
          color: red;
        }
        .price {
          width: 13.65%;
        }
        .action {
          width: 13.65%;
        }
      }
    }
    .title-cart {
      display: flex;
      width: 100%;
      background: white;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
      border-radius: 0.125rem;
      overflow: hidden;
      border-radius: 3px;
      height: 3.4375rem;
      font-size: 0.875rem;
      background: #fff;
      text-transform: capitalize;
      color: #888;
      align-items: center;
      padding: 0 20px;
      .check {
        width: 45%;
      }
      .bill {
        width: 13.75%;
      }
      .qty {
        width: 13.75%;
      }
      .money {
        width: 13.75%;
      }
      .action {
        width: 13.75%;
      }
    }
  }
}
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>

