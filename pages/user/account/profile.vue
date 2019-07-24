<template>
  <div class="container-fruid">
    <div class="container">
      <NavBar :seleted="seleted" />
      <div class="content-right">
        <div class="content-main">
          <h1>Hồ Sơ Của Tôi</h1>
          <div class="pop-up" v-if="showPopUpdateProfile">
            <div class="content">
              <div class="title">Cập nhật hồ sơ thành công !</div>
            </div>
          </div>
          <div class="content">
            <div class="content-left">
              <div class="email">
                <div class="title-email">
                  <label>Email</label>
                </div>
                <div class="name-email">
                  <p>{{ $store.state.authUser.email }}</p>
                </div>
              </div>
              <div class="email">
                <div class="title-email">
                  <label>Tên Shop</label>
                </div>
                <div class="name-email">
                  <input type="text" class="txt-name-shop" :value="$store.state.authUser.name" />
                </div>
              </div>
              <div class="email">
                <div class="title-email">
                  <label>giới tính</label>
                </div>
                <div class="name-email">
                  <input type="radio" name="gender" class="radio" v-model="gender" value="1" />Nam
                  <input type="radio" name="gender" class="radio" v-model="gender" value="2" /> Nữ
                </div>
              </div>
              <div class="email">
                <div class="title-email">
                  <label>Ngày sinh</label>
                </div>
                <div class="name-email">
                  <div class="from-control">
                    <select name id class="form-input" v-model="day">
                      <option :value="index" v-for="(index,n)  in 30" :key="n.id">{{ index }}</option>
                    </select>
                  </div>
                  <div class="from-control">
                    <select name id class="form-input" v-model="month">
                      <option :value="index" v-for="(index,n)  in 12" :key="n.id">{{ index }}</option>
                    </select>
                  </div>
                  <div class="from-control">
                    <select name id class="form-input" v-model="year">
                      <option :value="index" v-for="(index,n)  in years" :key="n.id">{{ index }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="email">
                <div class="title-email">
                  <button class="save" @click="save">Lưu</button>
                </div>
              </div>
            </div>
            <div class="content-right">
              <div class="img">
                <img :src="$store.state.authUser.avatar" alt v-if="$store.state.authUser.avatar" />
                <img :src="image" alt v-if="!image || $store.state.authUser.avatar == ''" />
                <!-- <img
                  :src="image"
                  alt
                  v-if="image || $store.state.authUser.avatar"
                />-->
                <!-- <div class="no-avatar" v-else></div> -->
              </div>
              <label for="file-input">
                <img src="https://goo.gl/pB9rpQ" alt />
              </label>
              <p>Thay đổi ảnh đại diện</p>
              <input type="file" id="file-input" @change="onImageChange" ref="file" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "./../../../components/navUser/navbar";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      image: this.$store.state.authUser.image,
      provide: "",
      seleted: 1,
      nameShop: "",
      gender: "",
      day: this.$store.state.authUser.day,
      month: this.$store.state.authUser.month,
      year: this.$store.state.authUser.year,
      gender: this.$store.state.authUser.gender,
      showPopUpdateProfile : false
    };
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1900 },
        (value, index) => 1901 + index
      );
    }
  },
  methods: {
    onImageChange(e) {
      this.$store.state.authUser.avatar = "";
      console.log("1");
      let file;
      file = this.$refs.file.files[0];
      let formData = new FormData();
      console.log(file);
      formData.append("file", file);
      this.$axios
        .post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          this.image = "/img/" + response.data;
          console.log(response.data);
        })
        .catch(function() {
          console.log("FAILURE!!");
        }); 
    },
    save() {
      // this.$store.state.authUser.day = this.day;
      // this.$store.state.authUser.avatar = this.image;
      // this.$store.state.authUser.month = this.month;
      // this.$store.state.authUser.gender = this.gender;
      // this.$store.state.authUser.year = this.year;
      this.$axios
        .post("/api/user/edit", {
          avatar: this.image,
          gender: this.gender,
          day: this.day,
          month: this.month,
          year: this.year
        })
        .then(response => {
          this.$store.commit("SET_USER", response.data);
          this.showPopUpdateProfile = true
          setTimeout(() => {
            this.showPopUpdateProfile = false;
          }, 2500);
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#file-input {
  display: none;
}

.pop-up {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
  left: 0;
  top: 0;
  left: 0;
  position: fixed;
  border-radius: 15px; 
  .content {
    margin: auto;
    width: 400px;
    padding: 20px;
    height: 200px;
    background: white;
    margin-top: 10%;
    .title{
      font-size: 20px;
      margin: auto; 
    }
    .txt-input {
      width: 100%;
      height: 30px;
      margin-top: 20px;

      input[type="text"] {
        width: 100%;
        height: 100%;
        border: grey 1px solid;
        padding: 4px 5px;
      }
    }
    .button {
      margin-top: 20px;
      .confirm {
        background: #2b3278;
        border: none;
        color: white;
        margin-right: 20px;
        padding: 10px 30px;
      }
      .close {
        border: grey 1px solid;
        background: white;
        color: black;
        padding: 10px 30px;
      }
    }
  }
}

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
  .content-right {
    width: 80%;
    padding: 10px;
    .no-avatar {
      width: 100px;
      height: 100px;
      border: 1px solid gray;
    }
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
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.13);
        display: flex;
        padding: 20px;
        .content-left {
          width: 70%;
          .email {
            display: flex;
            margin-top: 18px;
            .title-email {
              width: 25%;
              label {
                text-align: right;
                color: rgba(85, 85, 85, 0.8);
                font-size: 15px;
              }
              .save {
                width: 100px;
                height: 30px;
                background: red;
                color: white;
                border: 1px solid red;
                cursor: pointer;
              }
            }
            .name-email {
              width: 80%;
              display: flex;
              .form-input {
                width: 80%;
                margin-left: 20px;
                height: 25px;
              }
              .radio {
                margin-left: 13px;
              }
              p {
                font-size: 15px;
                margin-left: 20px;
              }
              .txt-name-shop {
                margin-left: 20px;
                outline: none;
                padding: 10px;
                width: 60%;
                height: 35px;
                border-radius: 5px;
              }
            }
          }
        }
        .content-right {
          width: 30%;
          .img {
            width: 50%;
            img {
              width: 100%;
            }
          }
          .upload {
            display: none;
          }
          label {
            img {
              width: 30%;
              cursor: pointer;
              margin: 30px 30px;
            }
          }
        }
      }
    }
  }
}
</style>
