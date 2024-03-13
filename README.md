- PÁGINAS EM MENUS
  • Login [index.html] – Login efetua busca por médico com base no e-mail, caso não haja retorno busca em paciente. Conforme o retorno de e-mail compara a senha digitada com a api e valida o login, usando session location para armazena o e-mail, id e tipo de usuário para as novas buscas;
  • Relatório Individual (paciente) [usuario-relatorio-individual.html] – carrega o relatório de status e gráficos dos exames e qualidade de vida diretamente com base no último item do histórico. Quando o paciente ainda não possui registro de exames cadastrado, ele é redirecionado para uma página genérica [usuario.html];
  • Qualidade de Vida e Exames Clínicos [form-qualidade-de-vida.html][form-exames-clinicos.html] – compartilham envio e possui distinção no data do header dependendo se é um novo cadastro ou alteração de campos para recalcular;
  • Relatório Gerencial (med) [medico-relatorio-gerencial.html] – ainda não foi passado os dados para serem utilizados nesta parte;
  • Relatório individual (med) [medico-relatorio-individual.html] – listagem com cadastros disponíveis antes e seleção para abrir o detalhamento igual ao de paciente [medico-relatorio-individual-det.html], além das opções de editar exames [form-exames-clinicos.html] e editar qualidade de vida [form-qualidade-de-vida.html];
  • Educacional (med) [medico-educacional.html] – não disponibilizado;
  • Cadastro Paciente (med) [cadastro-paciente.html] – Feito a partir de usuário de médico já vinculando o paciente a um médico pelo envio de relação médico x paciente;

- PÁGINAS SEM MENU
  • Cadastro Médico (admin) [cadastro-medico.php] – Está em uma área separada dos tipos de usuários, por ora. Funcionando em php por causa do envio de imagens a para o ftp. Em teste local o WebCrypto não funciona para esta página;
  • Lista Pacientes (admin) [lista-pacientes.html] – Listagem com todos os pacientes cadastrados;
