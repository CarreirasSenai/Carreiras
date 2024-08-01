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
        <v-row>
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
        </v-row>
        <v-row>
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
            <v-col>
                <v-text-field
                    v-model="quantia"
                    label="Remuneração"
                    :rules="quantiaRules"
                    :value="quantiaFormatada"
                    @input="updateAmount"
                    prepend-icon="mdi-currency-usd"
                    type="number"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
export default {
    data() 
    {
        return {
            estado: 'Selecionar',
            estadoRules: [(v) => v !== 'Selecionar' || 'Estado requerido'],
            listEstados: [
                'Selecionar',
                'Acre - AC',
                'Alagoas - AL',
                'Amapá - AP',
                'Amazonas - AM',
                'Bahia - BA',
                'Ceará - CE',
                'Distrito Federal - DF',
                'Espírito Santo - ES',
                'Goiás - GO',
                'Maranhão - MA',
                'Mato Grosso - MT',
                'Mato Grosso do Sul - MS',
                'Minas Gerais - MG',
                'Pará - PA',
                'Paraíba - PB',
                'Paraná - PR',
                'Pernambuco - PE',
                'Piauí - PI',
                'Rio de Janeiro - RJ',
                'Rio Grande do Norte - RN',
                'Rio Grande do Sul - RS',
                'Rondônia - RO',
                'Roraima - RR',
                'Santa Catarina - SC',
                'São Paulo - SP',
                'Sergipe - SE',
                'Tocantins - TO'
            ],
            tipoContrato: 'Selecionar',
            tipoContratoRules: [(v) => v !== 'Selecionar' || 'Tipo de contrato requerido'],
            listContratos: [
                'Selecionar',
                'Contrato por prazo determinado',
                'Contrato por prazo indeterminado',
                'Contrato de trabalho eventual',
                'Contrato de trabalho temporário',
                'Contrato de trabalho parcial',
                'Contrato de trabalho autônomo',
                'Contrato de experiência',
                'Contrato de estágio',
                'Contrato de jovem aprendiz',
                'Contrato para trainee',
                'Contrato de teletrabalho',
                'Contrato intermitente',
                'Contrato de trabalho terceirizado'
            ],
            modalidade: 'Selecionar',
            modalidadeRules: [(v) => v !== 'Selecionar' || 'Modalidade requerida'],
            listModalidades: [
                'Selecionar',
                'Presencial',
                'Híbrido',
                'Home office',
                'Trabalho externo',
                'Freelance'
            ],
            quantia: '',
            quantiaRules: [
                v => !!v || 'Campo requerido',
                v => !isNaN(v) || 'Valor inválido',
            ],
        }
    },
    computed: {
        quantiaFormatada() {
            if(!this.quantia) return '';
            return this.quantia.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        }
    },
    methods: {}
}
</script>

<style lang="scss">
.form-container {
    padding: 0 20px;
}
</style>