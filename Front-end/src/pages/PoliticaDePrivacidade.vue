<template>
  <div style="height: 100% !important">
    <Navbar />
    <v-container class="d-flex flex-column">
      <div class="texto-formatado">
        <h2>
          <span style="color: rgb(77, 0, 116)">Política de Privacidade</span>
        </h2>
        <div class="content-container">
          <p>
            <span style="color: rgb(68, 68, 68)">A sua privacidade é importante para nós. É política do Carreiras
              respeitar a sua privacidade em relação a qualquer informação sua que
              possamos coletar em nosso site.</span>
          </p>
          <p>
            <span style="color: rgb(68, 68, 68)">Solicitamos informações pessoais apenas quando realmente precisamos
              delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
              legais, com o seu conhecimento e consentimento. Também fornecemos os
              meios necessários para alteração ou exclusão desses dados a qualquer
              momento.</span>
          </p>
          <p>
            <span style="color: rgb(68, 68, 68)">Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados, os
              protegemos dentro de meios comercialmente aceitáveis para evitar
              perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados.</span>
          </p>
          <p>
            <span style="color: rgb(68, 68, 68)">Não compartilhamos informações de identificação pessoal
              publicamente ou com terceiros, exceto quando exigido por lei.</span>
          </p>
          <p>
            <span style="color: rgb(68, 68, 68)">O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites e não podemos aceitar
              responsabilidade por suas respectivas</span>
          </p>
          <p>
            <span style="color: rgb(68, 68, 68)">Você é livre para recusar a nossa solicitação de informações
              pessoais, entendendo que talvez não possamos fornecer alguns dos
              serviços desejados.</span>
          </p>
          <p>
            <span style="color: rgb(68, 68, 68)">O uso continuado de nosso site será considerado como aceitação de
              nossas práticas em torno de privacidade e informações pessoais. Se
              você tiver alguma dúvida sobre como lidamos com dados do usuário e
              informações pessoais, entre em contacto conosco através da aba
              "Contate-nos".</span>
          </p>
        </div>
        <div class="list-container">
          <h3>
            <span style="color: rgb(68, 68, 68)">Compromisso do Usuário</span>
          </h3>
          <p>
            <span style="color: rgb(68, 68, 68)">O usuário se compromete a fazer uso adequado dos conteúdos e da
              informação que o Carreiras oferece no site e com caráter
              enunciativo, mas não limitativo:</span>
          </p>
          <ul style="list-style: none; padding-left: 20px;">
            <li>
              <span style="color: rgb(68, 68, 68)">A) Não se envolver em atividades que sejam ilegais ou contrárias
                à boa fé a à ordem pública;</span>
            </li>
            <li>
              <span style="color: rgb(68, 68, 68)">B) Não difundir propaganda ou conteúdo de natureza racista,
                xenofóbica, casas de apostas ou azar, qualquer tipo de pornografia
                ilegal, de apologia ao terrorismo ou contra os direitos
                humanos;</span>
            </li>
            <li>
              <span style="color: rgb(68, 68, 68)">C) Não causar danos aos sistemas físicos (hardwares) e lógicos
                (softwares) do Carreiras, de seus fornecedores ou terceiros, para
                introduzir ou disseminar vírus informáticos ou quaisquer outros
                sistemas de hardware ou software que sejam capazes de causar danos
                anteriormente mencionados.</span>
            </li>
          </ul>
        </div>
        <p>
          <span style="color: rgb(68, 68, 68)">Esta política é efetiva a partir de&nbsp;03 Dezembro 2024.</span>
        </p>
      </div>
      <Footer />
    </v-container>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.texto-formatado {
  margin: 15px auto;
  text-align: justify;
  border: 1px solid #c0c0c0b4;
  border-radius: 5px;
  padding: 20px 50px;
  max-width: 800px;
  line-height: 1.5;
}

.content-container {
  margin: 2.5em auto 3em;
}

p {
  margin: 10px auto;
}

.list-container {
  margin: 1.5em auto 2.5em;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

@media (max-width: 810px) {
  .texto-formatado {
    padding: 20px 15px;
    margin-right: 15px;
    margin-left: 15px;
  }
}
</style>