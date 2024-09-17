<template>
  <div class="text-center pa-4">
    <div>
      <v-btn class="primary" @click="dialog = true"> Contate-nos! </v-btn>
    </div>

    <v-dialog v-model="dialog">
      <v-card>
        <v-form fast-fail @submit.prevent>
          <v-text-field
            v-model="firstName"
            :rules="firstNameRules"
            label="First name"
          ></v-text-field>

          <v-text-field
            v-model="lastName"
            :rules="lastNameRules"
            label="Last name"
          ></v-text-field>

          <v-btn class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    firstName: "",
    firstNameRules: [
      (value) => {
        if (value?.length >= 3) return true;

        return "First name must be at least 3 characters.";
      },
    ],
    lastName: "123",
    lastNameRules: [
      (value) => {
        if (/[^0-9]/.test(value)) return true;

        return "Last name can not contain digits.";
      },
    ],
  }),
};
</script>