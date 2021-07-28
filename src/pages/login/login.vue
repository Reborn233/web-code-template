<template>
  <div class="login-content full-container">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-form :model="loginForm" label-width="120px">
          <el-form-item label="手机号：">
            <el-input type="text" v-model="loginForm.phoneNumber" autocomplete="off" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="full-width" type="primary" :loading="loading" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { sha256 } from 'js-sha256';
import { Cookie } from '@/utils/cookie';
import { mapActions } from 'vuex';
import COMM_ROUTER_MAPPER from '@/configs/router-mapper';

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        phoneNumber: '',
        password: ''
      },
      cookieUser: {},
      rememberPassword: false,
      isCookieSource: false,
      loading: false
    };
  },
  methods: {
    ...mapActions(['vx_ac_PwdLogin']),
    async handleLogin () {
      if (this.isEqualCookieUser()) {
        this.isCookieSource = true;
      }
      else {
        this.isCookieSource = false;
      }
      let _loginUser = {
        phoneNumber: this.loginForm.phoneNumber,
        password: this.isCookieSource ? this.cookieUser.password : sha256(this.loginForm.password)
      };
      this.loading = true;
      try {
        await this.vx_ac_PwdLogin(_loginUser);
        if (this.rememberPassword) {
          this.setCookiePassword();
        }
        else {
          this.clearCookiePassword();
        }
        // 跳转到系统首页
        this.$router.replace({ name: COMM_ROUTER_MAPPER.INDEX_ROUTER });
      }
      catch (error) { }
      this.loading = false;
    },
    getLoginInfoFromCookie () {
      let _ua = Cookie.getCookie('_a'),
        _up = Cookie.getCookie('_p');
      if (!_ua || !_up) {
        return;
      }
      let _loginForm = {
        phoneNumber: _ua,
        password: _up
      };
      this.loginForm = Object.assign({}, _loginForm);
      this.cookieUser = this.cookieUser = {
        phoneNumber: _ua,
        password: _up
      };
      this.rememberPassword = true;
      this.isCookieSource = true;
    },
    // 判断输入框的值是否跟cookie中存在的值一样
    isEqualCookieUser () {
      if (this.cookieUser.phoneNumber === this.loginForm.phoneNumber && this.cookieUser.password === this.loginForm.password) {
        return true;
      }
      return false;
    },
    setCookiePassword () {
      if (this.isCookieSource) return;
      Cookie.setCookie('_a', this.loginForm.phoneNumber, 15);
      Cookie.setCookie('_p', sha256(this.loginForm.password), 15);
    },
    clearCookiePassword () {
      Cookie.clearCookie('_a');
      Cookie.clearCookie('_p');
    }
  },
  created () {
    this.getLoginInfoFromCookie();
  }
};
</script>

<style lang="scss" scoped>
.login-content {
  padding-top: 150px;
}
</style>
