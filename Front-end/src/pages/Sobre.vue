<template>
  <div>
    <Navbar />
    <div class="sobre-nos">
      <div class="header">
        <h1>Sobre Nós</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          nulla auctor, vestibulum magna sed, convallis ex.
        </p>
      </div>
      <div class="missao-visao-valores">
        <div class="missao">
          <h2>Missão</h2>
          <p>
            Desenvolver soluções inovadoras e eficazes para nossos clientes.
          </p>
        </div>
        <div class="visao">
          <h2>Visão</h2>
          <p>
            Ser líderes no mercado de tecnologia e inovação.
          </p>
        </div>
        <div class="valores">
          <h2>Valores</h2>
          <ul>
            <li>Inovação</li>
            <li>Qualidade</li>
            <li>Respeito</li>
            <li>Compromisso</li>
          </ul>
        </div>
      </div>
      <div class="equipe">
        <h2>Nossa Equipe</h2>
        <div class="membros-equipe">
          <div class="membro-equipe">
            <img src="" alt="Foto do membro da equipe">
            <h3>Nome do membro da equipe</h3>
            <p>Cargo do membro da equipe</p>
          </div>
          <div class="membro-equipe">
            <img src="" alt="Foto do membro da equipe">
            <h3>Nome do membro da equipe</h3>
            <p>Cargo do membro da equipe</p>
          </div>
          <!-- Adicione mais membros da equipe aqui -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
};
</script>

<style scoped>
.sobre-nos {
  max-width: 1200px;
  margin: 40px auto;
  text-align: center;
}

.header {
  background-image: url('imagem-de-fundo.jpg');
  background-size: cover;
  background-position: center;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.header h1 {
  font-size: 48px;
}

.missao-visao-valores {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.missao, .visao, .valores {
  width: 30%;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.missao h2, .visao h2, .valores h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.valores ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.valores li {
  margin-bottom: 10px;
}

.equipe {
  margin-top: 40px;
}

.membros-equipe {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.membro-equipe {
  width: 20%;
  margin: 20px;
  text-align: center;
}

.membro-equipe img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.membro-equipe h3 {
  font-size: 18px;
  margin-bottom: 5px;
}
</style>