<template>
  <div class="container-fruid">
    <NavBar/>
    <Auth/>
    <nuxt />
    <Chat/>
  </div>
</template>

<script>
import NavBar from './../components/navBar'
import Chat from './../components/chat/chat'
import Auth from './../components/auth/auth'
export default {
  components:{
    NavBar,
    Chat,
    Auth
  }
}
</script>

<style>
.container-fruid{
  position: relative;
}
html {
 font-family: Helvetica Neue,Helvetica,Arial,\\6587\6CC9\9A5B\6B63\9ED1,WenQuanYi Zen Hei,Hiragino Sans GB,\\5137\9ED1 Pro,LiHei Pro,Heiti TC,\\5FAE\8EDF\6B63\9ED1\9AD4,Microsoft JhengHei UI,Microsoft JhengHei,sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
