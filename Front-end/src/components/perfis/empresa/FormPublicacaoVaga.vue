<template>
    <v-form class="my-4 form-container">
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="titulo" :rules="tituloRules" label="Título" bg-color="#F7F7F7"
                density="compact"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="8" md="8" lg="8">
                <v-text-field v-model="localizacao" :rules="localizacaoRules" label="Localização" bg-color="#F7F7F7"
                density="compact"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
                <v-select
                    v-model="estado"
                    :rules="estadoRules"
                    :items="listEstados"
                    label="Estado"
                    bg-color="#F7F7F7"
                    density="compact"
                ></v-select>
            </v-col>
        </v-row>
        <v-col cols="12">
            <v-select
                v-model="tipoContrato"
                :rules="tipoContratoRules"
                :items="listContratos"
                label="Tipo de contrato"
                bg-color="#F7F7F7"
                density="compact"
            ></v-select>
        </v-col>
        <v-col cols="12">
            <v-select
                v-model="modalidade"
                :rules="modalidadeRules"
                :items="listModalidades"
                label="Modalidade"
                bg-color="#F7F7F7"
                density="compact"
            ></v-select>
        </v-col>
        <v-col cols=12>
            <v-text-field
                v-model="quantia"
                label="Remuneração"
                :rules="quantiaRules"
                @input="formatarQuantia"
                prepend-icon="mdi-currency-usd"
                type="number"
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-textarea
                :model-value="descricao" 
                label="Descrição"
                :rules="descricaoRules"
                counter
                maxlength="1500"
                auto-grow
            ></v-textarea>
        </v-col>
        <v-col cols="12">
            <v-select
                v-model="niveisCargo"
                :rules="niveisCargoRules"
                :items="listNiveisCargo"
                label="Nível de cargo"
                bg-color="#F7F7F7"
                density="compact"
            ></v-select>
        </v-col>
        <v-col cols="12">
            <v-text-field
                v-model="etapa"
                label="Etapas"
                :rules="etapaRules"
                type="number"
            ></v-text-field>
        </v-col>
    </v-form>
</template>

<script>
export default {
    data() 
    {
        return {
            estado: 'Selecionar',
            estadoRules: [(v) => v !== 'Selecionar' || 'Estado requerido'],
            listEstados: ['Selecionar','Acre - AC','Alagoas - AL','Amapá - AP','Amazonas - AM','Bahia - BA',
                'Ceará - CE','Distrito Federal - DF','Espírito Santo - ES','Goiás - GO','Maranhão - MA',
                'Mato Grosso - MT','Mato Grosso do Sul - MS','Minas Gerais - MG','Pará - PA','Paraíba - PB',
                'Paraná - PR','Pernambuco - PE','Piauí - PI','Rio de Janeiro - RJ','Rio Grande do Norte - RN',
                'Rio Grande do Sul - RS','Rondônia - RO','Roraima - RR','Santa Catarina - SC','São Paulo - SP',
                'Sergipe - SE','Tocantins - TO'],
            tipoContrato: 'Selecionar',
            tipoContratoRules: [(v) => v !== 'Selecionar' || 'Tipo de contrato requerido'],
            listContratos: ['Selecionar','Contrato por prazo determinado','Contrato por prazo indeterminado',
                'Contrato de trabalho eventual','Contrato de trabalho temporário','Contrato de trabalho parcial',
                'Contrato de trabalho autônomo','Contrato de experiência','Contrato de estágio',
                'Contrato de jovem aprendiz','Contrato para trainee','Contrato de teletrabalho',
                'Contrato intermitente','Contrato de trabalho terceirizado'],
            modalidade: 'Selecionar',
            modalidadeRules: [(v) => v !== 'Selecionar' || 'Modalidade requerida'],
            listModalidades: ['Selecionar', 'Presencial','Híbrido',
                'Home office','Trabalho externo','Freelance'],
            quantia: '',
            quantiaRules: [
                v => !!v || 'Remuneração requerida',
                v => !isNaN(v) || 'Valor inválido',
            ],
            descricao: '',
            descricaoRules: [v => v.length <= 1500 || 'Máximo de 1.500 caracteres'],
            niveisCargo: 'Selecionar',
            niveisCargoRules: ((v) => v !== "Selecionar" || 'Nível de cargo requerido'),
            listNiveisCargo: ["Selecionar","Estagiário/Intern","Assistente","Júnior",
            "Pleno","Sênior","Supervisor","Coordenador","Gerente",
            "Diretor","Vice-Presidente","Presidente","CEO (Chief Executive Officer)",
            "CFO (Chief Financial Officer)","COO (Chief Operating Officer)","CTO (Chief Technology Officer)",
            "CMO (Chief Marketing Officer)","Conselho de Administração (Board of Directors)"],
            etapa: '0',
            etapaRules: [((v) => !!v || 'Etapa requerida'),
                v => v > -1 || 'Número de etapas inválido'
            ]
        }
    },
    methods: {
        formatarQuantia() {
            const valorFormatado = this.quantia.replace(/\D/g, "");
            const valorCasasDecimais = valorFormatado.replace(/(\d{1,})(\d{2})$/, "$1.$2")
            this.quantia = valorCasasDecimais;
        }
    }
}
</script>

<style lang="scss" scoped>
.form-container {
    padding: 0 20px;
}
</style>