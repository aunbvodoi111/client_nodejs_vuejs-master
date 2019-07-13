<template>
  <div class="container-fruid">
    <div class="container">
      <NavBar />
      <div class="content-right">
        <div class="content-main">
          <h1>Địa chỉ của tôi</h1>
          <div class="choose-nofi">
            <div class="btn-act">
              <button @click="showPopAc ">Thêm địa chỉ mới</button>
            </div>
          </div>
          <div class="content-nofi">
            <div class="content">
              <div class="popup-infor-customer" v-if="showPop">
                <div class="pop">
                  <div class="title">
                    <h3>{{ title }}</h3>
                  </div>
                  <div class="form">
                    <p>Để đặt hàng, vui lòng thêm địa chỉ nhận hàng</p>
                    <div class="from-control">
                      <input type="text" class="form-input" v-model="edit.name" placeholder="Tên" />
                    </div>
                    <!-- <span v-show="errorName">{{ errorName }}</span> -->
                    <div class="from-control">
                      <input
                        type="number"
                        class="form-input"
                        placeholder="Số điện thoại"
                        v-model="edit.phone"
                      />
                    </div>
                    <div class="from-control">
                      <select name id class="form-input" v-model="edit.ProvinceId">
                        <option value>Tỉnh/Thành phố</option>
                        <option
                          v-for="item in provinces"
                          :value="item.id"
                          :key="item.id"
                        >{{ item.name }}</option>
                      </select>
                    </div>
                    <div class="from-control">
                      <select name id class="form-input" v-model="edit.DistrictId">
                        <option value>Quận/huyện</option>
                        <option
                          v-for="item in listDistrict"
                          :key="item.id"
                          :value="item.id"
                        >{{ item.name }}</option>
                      </select>
                    </div>
                    <div class="from-control">
                      <input
                        type="text"
                        class="form-input"
                        placeholder="Tòa nhà , Tên đường"
                        v-model="edit.address"
                      />
                    </div>
                  </div>
                  <div class="btn-action">
                    <button @click="showPop = false">Trở lại</button>
                    <button @click="add">Hoàn thành</button>
                  </div>
                </div>
              </div>
              <div class="address-list" v-for="item in addresss" :key="item.id">
                <div class="div-left">
                  <div class="row-ct">
                    <div class="title">
                      <label for>Tên</label>
                    </div>
                    <div class="content">
                      {{ item.name }}
                      <span v-if=" item.checkAddress == 1">Địa chỉ mặc định</span>
                    </div>
                  </div>
                  <div class="row-ct">
                    <div class="title">
                      <label for>Số Điện Thoại</label>
                    </div>
                    <div class="content">{{ item.phone }}</div>
                  </div>
                  <div class="row-ct">
                    <div class="title">
                      <label for>Địa Chỉ</label>
                    </div>
                    <div class="content">
                      {{ item.address }} -
                      {{ item.district.name }} -
                      {{ item.province.name }}
                    </div>
                  </div>
                </div>
                <div class="div-right">
                  <div class="action">
                    <p @click="editAddress(item)">Sửa</p>
                    <p>Xóa</p>
                  </div>
                  <div class="button">
                    <button
                      :class="{ disable : item.checkAddress == 1}"
                      v-if=" item.checkAddress == 1"
                    >Thiết lập mặc định</button>
                    <button
                      v-if=" item.checkAddress == 0"
                      @click="changeAddressDefault(item)"
                    >Thiết lập mặc định</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "./../../../components/navUser/navbar";
import Vue from 'vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      showPop: false,
      edit: {
        name: "",
        phone: "",
        ProvinceId: "",
        DistrictId: "",
        address: ""
      },
      index: -1
    };
  },
  async asyncData({ $axios, store }) {
    var data = await $axios.get("/api/user/address");
    console.log(data);

    return {
      provinces: data.data.provinces,
      districts: data.data.districts,
      addresss: data.data.addresss
    };
  },
  computed: {
    title() {
      return this.index === -1 ? "Thêm địa chỉ " : "Sửa địa chỉ";
    },
    listDistrict() {
      console.log(this.edit.ProvideId);
      var data = this.districts.filter(
        item => item.ProvinceId === this.edit.ProvinceId
      );
      return data;
    }
  },
  watch: {
    addresss: {
      handler: function(val) {
        console.log("a thing changed");
      }
    }
  },
  methods: {
    changeAddressDefault(item) {
      // this.showPop = true
      this.addresss.forEach(item => {
        Vue.set(item, "checkAddress", 0);
      });
      this.index = this.addresss.indexOf(item);
      this.$axios
        .post("/api/address/changeAddressDefault", {
          id: item.id
        })
        .then(response => {
          console.log(response);
          Object.assign(this.addresss[this.index], response.data);
        });
    },
    showPopAc() {
      this.showPop = true;
      this.index = -1;
      this.edit.name = "";
      this.edit.phone = "";
      this.edit.ProvinceId = "";
      this.edit.DistrictId = "";
      this.edit.address = "";
    },
    editAddress(item) {
      this.showPop = true;
      this.edit = "";
      this.index = this.addresss.indexOf(item);
      console.log(this.index);
      this.$axios
        .post("/api/address/edit", {
          id: item.id
        })
        .then(response => {
          console.log(response);
          this.edit = response.data;
        });
    },
    add() {
      if (this.index == -1) {
        var id = this.provinces.find(item => item.id == this.provide);
        this.$axios
          .post("/api/address/add", {
            name: this.edit.name,
            phone: this.edit.phone,
            ProvinceId: this.edit.ProvinceId,
            DistrictId: this.edit.DistrictId,
            address: this.edit.address
          })
          .then(response => {
            this.showPop = false;
            this.addresss.push(response.data);
          });
      } else {
        this.$axios
          .post("/api/address/editAddress", {
            id: this.edit.id,
            name: this.edit.name,
            phone: this.edit.phone,
            ProvinceId: this.edit.ProvinceId,
            DistrictId: this.edit.DistrictId,
            address: this.edit.address
          })
          .then(response => {
            console.log(response.data);
            // this.addresss[this.index] = response.data
            this.showPop = false;
            // s
            Object.assign(this.addresss[this.index], response.data);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
ul li {
  list-style-type: none;
}
.disable {
  color: grey !important;
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
      .content {
        .address-list {
          display: flex;
          padding: 20px;
          border-bottom: 1px solid #efefef;
          width: 100%;
          .div-left {
            width: 70%;
            .row-ct {
              width: 100%;
              display: flex;
              margin-top: 20px;
              .title {
                width: 20%;
              }
              .content {
                width: 80%;
              }
            }
          }
          .div-right {
            width: 30%;
            padding-left: 20px;
            .action {
              display: flex;
              p {
                margin-right: 15px;
                text-decoration: underline;
                cursor: pointer;
              }
            }
            .button {
              width: 130px;
              height: 35px;
              margin-top: 30px;
              button {
                width: 100%;
                background: white;
                color: black;
                height: 100%;

                border: 1px solid rgba(0, 0, 0, 0.09);
                box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.03);
              }
            }
          }
        }
        .popup-infor-customer {
          position: fixed;
          width: 100vw;
          height: 100vh;
          z-index: 1001;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, 0.14);
          .pop {
            width: 27%;
            background: white;
            height: auto;
            margin: 10% auto;
            padding: 20px 15px;
            .title {
              margin: 10px 0px;
            }
            .form {
              p {
                font-size: 14px;
                margin-top: 30px;
              }
              width: 100%;
              .from-control {
                width: 100%;
                .form-input {
                  border: 1px solid rgba(0, 0, 0, 0.14);
                  width: 100%;
                  height: 40px;
                  margin: 6px 0px;
                  padding: 10px;
                }
              }
            }
            .btn-action {
              display: flex;
              margin-top: 30px;
              button {
                width: 140px;
                text-transform: uppercase;
                padding: 10px;
              }
              button:nth-child(1) {
                background: white;
                border: none;
              }
              button:nth-child(2) {
                background-color: #2b3278;
                color: white;
                border: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
