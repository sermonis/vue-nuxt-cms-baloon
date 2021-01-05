<template>
  <v-col cols="12" sm="8" md="8" class="">
        <v-card class="evelation-12 card">
          <v-window v-model="step">
            <!--SignIn-->
            <v-window-item :value="1">
              <v-row class="">
                <v-col cols="12" md="8" class="pt-6 pb-6">
                  <v-card-text>
                    <v-form
                      class="signup-form-form"
                      @submit.prevent="signin"
                      autocomplete="off"
                    >
                      <h1
                        class="text-center display-1 mb-10"
                        :class="`${bgColor}--text`"
                      >
                        Sign in
                      </h1>
                      <v-text-field
                        id="username"
                        v-model="login"
                        label="Username"
                        name="Username"
                        append-icon="mdi-account"
                        type="text"
                        :color="bgColor"
                      />
                      <v-text-field
                        id="password"
                        v-model="password"
                        label="Password"
                        name="Password"
                        :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="() => (value = !value)"
                        :type="value ? 'password' : 'text'"
                        :color="bgColor"
                      />
                      <div class="text-center">
                        <a
                          
                          class="mt-3 overline no-text-decoration"
                          :class="`${bgColor}--text`"
                          @click="step = 3"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <div class="text-center mt-6">
                        <v-btn type="submit" large :color="bgColor" dark
                          >Sign In</v-btn
                        >
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  class="darken-2 vcenter"
                  :class="`${bgColor}`"
                >
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">No User?</h1>
                      <h5 class="text-center overline mb-3">
                        Please Sign Up to continue
                      </h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 2">Sign Up</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <!--SignUp-->
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col
                  cols="12"
                  md="4"
                  class="darken-2 vcenter"
                  :class="`${bgColor}`"
                >
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">Already a user?</h1>
                      <h5 class="text-center overline mb-3">Please Sign In</h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 1">Sign In</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="pt-6 pb-6">
                  <v-card-text>
                    <h1
                      class="text-center display-1 mb-10"
                      :class="`${bgColor}--text`"
                    >
                      Sign Up
                    </h1>
                    <v-form class="signup-form-form" @submit.prevent="signup">
                      <v-text-field
                        id="username"
                        v-model="username"
                        label="Username"
                        name="username"
                        append-icon="mdi-account"
                        type="text"
                      />
                      <v-text-field
                        id="email"
                        v-model="email"
                        label="eMail"
                        name="email"
                        append-icon="mdi-email"
                        type="email"
                      />
                      <v-text-field
                        id="password"
                        v-model="password"
                        label="Password"
                        name="password"
                        :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="() => (value = !value)"
                        :type="value ? 'password' : 'text'"
                      />
                      <div class="text-center mt-6">
                        <v-btn type="submit" large :color="bgColor" dark>
                          Sign Up</v-btn
                        >
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
            <!--PW Rest-->
            <v-window-item :value="3">
              <v-row class="fill-height">
                <v-col
                  cols="12"
                  md="4"
                  class="darken-2 vcenter"
                  :class="`${bgColor}`"
                >
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">Already a user?</h1>
                      <h5 class="text-center overline mb-3">Please Sign In</h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 1">Sign In</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="pt-6 pb-6">
                  <v-card-text>
                    <v-form class="signup-form-form">
                      <h1
                        class="text-center display-1 mb-10"
                        :class="`${bgColor}--text`"
                      >
                        Reset Password
                      </h1>
                      <v-text-field
                        id="login"
                        v-model="login"
                        label="Username / eMail"
                        name="login"
                        append-icon="mdi-email"
                        type="text"
                        :color="bgColor"
                        class="v-input__icon--double"
                      />
                      <div class="text-center mt-6">
                        <v-btn large :color="bgColor" dark
                          >Reset Password</v-btn
                        >
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Login",
  created() {},
  data() {
    return {
      step: 1,
      username: "",
      email: "",
      password: "",
      login: "",
      snackbarType: "success",
      snackbarMessage: "",
      snackbar: false,
      value: String
    }
  },
  props: {
    source: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: "indigo"
    },
    fgColor: {
      type: String,
      default: "white"
    }
  }
};
</script>

<style lang="scss" scoped></style>