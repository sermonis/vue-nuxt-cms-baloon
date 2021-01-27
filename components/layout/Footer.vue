<template>
  <v-footer :absolute="true" app class="text-center">
      <v-flex md2 ></v-flex>
          <v-flex md8  class="text-xs-center text-sm-body-2">
            <span>{{ $t('copyrightMessage', { name: $config.COMPANY_NAME, date: new Date().getFullYear()  }) }}</span>
          </v-flex>
        <v-flex md2></v-flex>
    </v-footer>
</template>