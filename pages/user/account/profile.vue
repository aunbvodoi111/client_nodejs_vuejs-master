<template>
  <div class="container-fruid">
    <div class="container">
      <NavBar />
      <div class="content-right">
        <div class="content-main">
          <h1>Hồ Sơ Của Tôi</h1>
          <!-- <div class="content-nofi">
            <div class="img">
              <img src="/img/anhdep.png" alt />
              <p>Bạn chưa có thông báo</p>
              <button>Tiếp tục mua sắm</button>
            </div>
          </div>-->
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
                  <input type="radio" name="gender" class="radio" />Nam
                  <input type="radio" name="gender" class="radio" /> Nữ
                </div>
              </div>
              <div class="email">
                <div class="title-email">
                  <label>Ngày sinh</label>
                </div>
                <div class="name-email">
                  <div class="from-control">
                    <select name id class="form-input" v-model="provide">
                      <option value v-for="(index,n)  in 30">{{ index }}</option>
                    </select>
                  </div>
                  <div class="from-control">
                    <select name id class="form-input" v-model="provide">
                      <option value v-for="(index,n)  in 12">{{ index }}</option>
                    </select>
                  </div>
                  <div class="from-control">
                    <select name id class="form-input" v-model="provide">
                      <option value v-for="(index,n)  in 30">{{ index }}</option>
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
                <img
                  :src="$store.state.authUser.avatar"
                  alt
                  v-if="$store.state.authUser.avatar"
                />
                <img
                  :src="image"
                  alt
                  v-if="!image || $store.state.authUser.avatar == ''"
                />
                <!-- <img
                  :src="image"
                  alt
                  v-if="image || $store.state.authUser.avatar"
                /> -->
                <div class="no-avatar" v-else>

                </div>
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
  data(){
    return{
      image:'',
      provide:''
    }
  },  
  methods: {
    onImageChange(e) {
      this.$store.state.authUser.avatar = ''
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
    save(){
      this.$axios
        .post("/api/user/edit",{
          avatar : this.image
        })
        .then(response => {
          console.log('ok')
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#file-input{
  display: none;
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
    .no-avatar{
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
