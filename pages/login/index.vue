<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" sm="12" md="8" lg="6" xl="6">
      <v-card class="evelation-12 card" :loading="loading">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-row>
              <v-col cols="12" md="6" class="pt-6 pb-6">
                <v-card-text>
                  <v-form
                    class="signup-form-form"
                    autocomplete="off"
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <h1 class="text-center display-1 mb-10" :class="`${bgColor}--text`">
                      {{ $t("login.userLogin") }}
                    </h1>
                    <v-text-field
                      v-model.trim="form.username"
                      :label="$t('login.username')"
                      append-icon="mdi-account"
                      type="text"
                      :color="bgColor"
                      :rules="rules.username"
                      @focus="readOnly = false"
                      :readonly="readOnly"
                      @keypress.enter="validate"
                      required
                    />
                    <v-text-field
                      v-model.trim="form.password"
                      :label="$t('login.password')"
                      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="showPassword = !showPassword"
                      :type="showPassword ? 'password' : 'text'"
                      :color="bgColor"
                      :rules="rules.password"
                      @focus="readOnly = false"
                      @keypress.enter="validate"
                      :readonly="readOnly"
                      required
                    />
                    <div class="text-center">
                      <a
                        class="mt-3 overline no-text-decoration"
                        :class="`${bgColor}--text`"
                        @click="step = 2"
                      >
                        {{ $t("login.forgotPassword") }}?
                      </a>
                    </div>
                    <div class="text-center mt-6" style="min-height: 50px">
                        
                      <v-scroll-x-transition >
                        <v-icon 
                          v-show="loginOK" 
                          color="success"
                          x-large
                          >mdi-check
                        </v-icon>
                      </v-scroll-x-transition>

                      <v-scroll-x-transition>
                        <v-btn
                          v-if="!hideButton"

                          :disabled="!valid || loading"
                          :loading="loading"
                          color="primary"
                          class="mr-4"
                          @click="validate"
                        >
                          {{ $t('login.logIn') }}
                        </v-btn>
                      </v-scroll-x-transition>
                  
                      
                    </div>
                  </v-form>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="6" class="darken-2 vcenter" :class="`${bgColor}`">
                <div class="align-content-center">
                  <div
                    class="text-center d-flex justify-center align-content-center mt-10"
                  >
                    <v-img
                      class="mx-2 text-center"
                      src="/images/logo.png"
                      max-height="150"
                      max-width="150"
                    />
                  </div>

                  <v-card-text :class="`${fgColor}--text`">
                    <p class="mb-3 text-center">
                      {{ $t("login.welcome") }}
                    </p>
                    <p class="mb-3 text-center">
                      {{ $t("login.enterPanel") }}
                    </p>
                  </v-card-text>
                </div>
              </v-col>
            </v-row>
          </v-window-item>

          <!--PW Rest-->
          <v-window-item :value="2">
            <v-row class="fill-height">
              <v-col cols="12" md="4" class="darken-2 vcenter" :class="`${bgColor}`">
                <div>
                  <v-card-text :class="`${fgColor}--text`">
                    <h1 class="text-center headline mb-3">Hatırladınız mı?</h1>
                    <h5 class="text-center overline mb-3">Giriş yapın</h5>
                  </v-card-text>
                  <div class="text-center mb-6">
                    <v-btn dark outlined @click="step = 1">Devam et</v-btn>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="8" class="pt-6 pb-6">
                <v-card-text>
                  <v-form class="signup-form-form">
                    <h1 class="text-center display-1 mb-10" :class="`${bgColor}--text`">
                      {{ $t("passwordRecovery.resetPassword") }}
                    </h1>
                    <v-text-field
                      id="login"
                      v-model="login"
                      label="Email Adresiniz veya Şifreniz"
                      name="login"
                      append-icon="mdi-email"
                      type="text"
                      :color="bgColor"
                      class="v-input__icon--double"
                    />
                    <div class="text-center mt-6">
                      <v-btn large :color="bgColor" dark>Yeni şifre gönder</v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "login",
  name: "Login",
  data() {
    return {
      step: 1,
      loginOK: false,
      hideButton: false,
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          (v) => !!v || this.$t("error.usernameBlank"),
          (v) => (v && v.length <= 10 && v.length >= 4) || this.$t("error.usernameLength", { min: 4, max: 10 }),
          (v) => /^[a-zA-Z0-9-_]+$/.test(v) || this.$t("error.usernameContains"),
        ],
        password: [
          (v) => !!v || this.$t("error.passwordBlank"),
          (v) =>  (v && v.length <= 10 && v.length >= 4) || this.$t("error.passwordLength", { min: 4, max: 10 }),
          (v) => /^[a-zA-Z0-9-_]+$/.test(v) || this.$t("error.usernameContains"),
        ],
      },
      valid: false,
      loading: false,
      login: "",
      bgColor: "indigo",
      fgColor: "white",
      showPassword: true,
      readOnly: true,
    };
  },
  methods: {
    async validate() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      if (this.$refs.form.validate()) {
        const loggedIn = await this.$store.dispatch("auth/authUser", this.form);
        if (loggedIn) {
          this.hideButton = true;

          setTimeout(() => {
            this.loginOK = true;
          }, 500);

          setTimeout(() => {
            this.$router.push(this.localePath('/'));
          }, 2000);
        }
      }
    },
  },
};
</script>
