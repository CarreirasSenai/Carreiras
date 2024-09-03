<template>
  <div>
    <Navbar />
    <div class="sobre-nos">
      <h1>Sobre Nós</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
        nulla auctor, vestibulum magna sed, convallis ex.
      </p>
      <ul>
        <li>
          <strong>Missão:</strong> Desenvolver soluções inovadoras e eficazes
          para nossos clientes.
        </li>
        <li>
          <strong>Visão:</strong> Ser líderes no mercado de tecnologia e
          inovação.
        </li>
        <li>
          <strong>Valores:</strong> Inovação, qualidade, respeito e compromisso.
        </li>
      </ul>
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
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
}

.sobre-nos h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.sobre-nos p {
  font-size: 18px;
  margin-bottom: 40px;
}

.sobre-nos ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sobre-nos li {
  margin-bottom: 20px;
}

.sobre-nos li strong {
  font-weight: bold;
}
</style>