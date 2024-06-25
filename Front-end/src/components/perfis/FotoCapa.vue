<template>
    <div class="div-capa-foto">
        <div class="capa"></div>
        <div class="pos-capa"></div>
        <div class="div-foto-perfil">
            <img src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                class="foto-perfil" alt="Foto de Perfil">
            <h3 class="cor-secundaria">Nome do Elemento</h3>
            <h4 class="cor-primaria">Desenvolvedor Full Stack</h4>
            <EditarFotoCapa />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.div-capa-foto {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // padding: 20px;

    .capa {
        height: 250px;
        background-image: url("https://empresas.infoempleo.com/hrtrends/media/2017/10/Compromiso-empleados.jpg");
        background-position: center;
        background-attachment: fixed;
        background-size: cover;
        width: 100%;
    }

    .pos-capa {
        height: 150px;
        width: 100%;
        display: flex;
        justify-content: end;
    }

    .div-foto-perfil {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 200px;
        position: absolute;
        gap: 5px;
        top: 150px;

        .foto-perfil {
            width: 150px;
            height: 150px;
            border-radius: 100%;
            border: 2px solid #6832D2;
            background-color: #eee;
        }

        h3,
        h4 {
            margin: 0;
        }

        h4 {
            font-size: 13px;
            text-transform: uppercase;
        }
    }
}

@media(max-width:800px){
    .div-capa-foto{
        margin: 0;
    }
}
</style>
