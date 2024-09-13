<template>
  <div class="text-center position-absolute bottom-0 right-0 ma-2 mr-4">
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ props: activatorProps }">
        <button class="text-none font-weight-regular mdi mdi-pencil bt-edit" variant="tonal"
          v-bind="activatorProps"></button>
      </template>

      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-card>
              <v-card-title class="d-flex align-center ga-2 cor-primaria">
                <i class="mdi mdi-account"></i>
                Editar Descrição
              </v-card-title>
              <v-card-text>
                <div class="d-flex justify-space-between pa-4 pt-0 pb-0">
                  <!-- Botões de formatação -->
                  <v-btn-toggle v-model="formatting" variant="outlined" divided multiple>
                    <v-btn @click="applyFormat('formatBlock', 'H1')">
                      <v-icon icon="mdi-format-title"></v-icon>
                    </v-btn>

                    <v-btn @click="applyFormat('italic')">
                      <v-icon icon="mdi-format-italic"></v-icon>
                    </v-btn>

                    <v-btn @click="applyFormat('bold')">
                      <v-icon icon="mdi-format-bold"></v-icon>
                    </v-btn>

                    <v-btn>
                      <div class="d-flex align-center flex-column justify-center">
                        <v-icon icon="mdi-format-color-text"></v-icon>
                        <v-sheet :color="selectedColor" height="4" width="26" tile></v-sheet>
                        <input type="color" id="cor" @input="changeColor" style="position: absolute; width: 100%; height: 100%; opacity: 0;"/>
                      </div>
                    </v-btn>
                  </v-btn-toggle>

                  <!-- Alinhamento -->
                  <v-btn-toggle v-model="alignment" variant="outlined" divided>
                    <v-btn @click="applyFormat('justifyCenter')">
                      <v-icon icon="mdi-format-align-center"></v-icon>
                    </v-btn>

                    <v-btn @click="applyFormat('justifyLeft')">
                      <v-icon icon="mdi-format-align-left"></v-icon>
                    </v-btn>

                    <v-btn @click="applyFormat('justifyRight')">
                      <v-icon icon="mdi-format-align-right"></v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </div>

                <!-- Área editável -->
                <v-sheet class="pa-4 text-center">
                  <div contenteditable="true" ref="editor" class="editor"></div>
                </v-sheet>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Fechar" variant="outlined" @click="dialog = false"></v-btn>
                <v-btn text="Salvar" color="Enviar" variant="tonal" @click="save" class="bg-purple-darken-4"></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      alignment: 1,
      formatting: [],
      selectedColor: '#000000'
    };
  },
  methods: {
    // Aplica formatações no texto selecionado
    applyFormat(command, value = null) {
      document.execCommand(command, false, value);
    },
    // Aplica a cor ao texto
    changeColor(event) {
      this.selectedColor = event.target.value;
      document.execCommand('foreColor', false, this.selectedColor);
    },
    // Salva o conteúdo editado
    save() {
      const content = this.$refs.editor.innerHTML;
      console.log(content); // Aqui você pode manipular ou enviar o conteúdo para o backend
    }
  }
};
</script>

<style lang="scss" scoped>
.mdi {
  color: #6732d2;
}

.mdi:hover {
  color: #6732d2;
}

.editor {
  min-height: 200px;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
  white-space: pre-wrap;
}

.editor:focus {
  outline: none;
}
</style>
