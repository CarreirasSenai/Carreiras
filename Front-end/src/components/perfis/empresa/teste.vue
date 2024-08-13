<template>
    <v-card class="mx-auto" style="max-width: 500px;">
        <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
            <v-text-field v-model="password" :rules="[rules.password, rules.length(6)]" color="deep-purple" counter="6"
                label="Password" style="min-height: 96px" type="password" variant="filled"></v-text-field>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn variant="text" @click="form.reset()">
                Clear
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="!isValid" :loading="isLoading" color="deep-purple-accent-4">
                Submit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        agreement: false,
        dialog: false,
        isValid: false,
        isLoading: false,
        password: undefined,
        rules: {
            length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`
        },
    }),
}
</script>