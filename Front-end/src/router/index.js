import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/pages/index.vue'; // Importa o componente Index
import Login from '@/components/login/Login.vue';
import CADempresa from '@/components/cadastro/CADempresa';
import CADcandidato from '@/components/cadastro/CADcandidato';
import EntrarEmpresaOuCandidato from '@/components/menu/EntrarEmpresaOuCandidato.vue';
import EDCcandidato from '@/components/edicao/EDCcandidato.vue';
import PerfilCandidato from '@/pages/perfilCandidato.vue';
import AgendaCandidato from '@/pages/AgendaCandidato.vue';
import AgendaEmpresa from '@/pages/AgendaEmpresa.vue';
import RedefinirSenha from '@/pages/redefinirSenha.vue';
import ModalJustificativa from '@/components/perfis/empresa/vaga/ModalJustificativa.vue';
import ListaEmpresas from '@/components/admin/ListaEmpresas.vue';
import ListaDeUsuarios from '@/components/admin/ListaUsuarios.vue';
import PerfilEmpresa from '@/pages/perfilEmpresa.vue';
import ListaVagas from '@/components/admin/ListaVagas.vue';
import Sobre from '@/pages/Sobre.vue';
import DetalhesVaga from '@/pages/detalhesVaga.vue';
import MinhasVagas from '@/pages/minhasVagas.vue';
import listaCandidatos from '@/pages/listaCandidatos.vue';
import Contato from '@/pages/contato.vue';
import AgendaAlternativa from '@/pages/AgendaAlternativa.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Index }, // Página Index como a rota padrão
    { path: '/login', component: Login },
    { path: '/cadastro-empresa', component: CADempresa },
    { path: '/cadastro-candidato', component: CADcandidato },
    { path: '/empresa-candidato', component: EntrarEmpresaOuCandidato },
    { path: '/editar-candidato', component: EDCcandidato },
    { path: '/perfil-candidato', component: PerfilCandidato },
    { path: '/perfil-empresa', component: PerfilEmpresa },
    { path: '/redefinir-senha', component: RedefinirSenha },
    { path: '/modal-justificativa', component: ModalJustificativa },
    { path: '/login', component: Login },
    { path: '/cadastro-empresa', component: CADempresa },
    { path: '/cadastro-candidato', component: CADcandidato },
    { path: '/empresa-candidato', component: EntrarEmpresaOuCandidato },
    { path: '/editar-candidato', component: EDCcandidato },
    { path: '/perfil-candidato', component: PerfilCandidato },
    { path: '/lista-empresas', component: ListaEmpresas },
    { path: '/lista-usuarios', component: ListaDeUsuarios },
    { path: '/lista-vagas', component: ListaVagas},
    { path: '/sobre', component: Sobre },
    { path: '/detalhes-vaga', component: DetalhesVaga},
    { path: '/minhas-vagas', component: MinhasVagas},
    { path: '/lista-candidatos', component: listaCandidatos},
    { path: '/contato', component: Contato},
    //{ path: '/agenda-candidato', component: AgendaCandidato },
    //{ path: '/agenda-empresa', component: AgendaEmpresa },
    { path: '/agenda-alternativa', component: AgendaAlternativa}
  ],
});

export default router;
