/* Nutris Pet — dados da prévia (catálogo demonstrativo)
   Edite aqui contatos, cupom, frete e produtos.
   Dica: marque `receita: true` em um medicamento para ativar o aviso de receita na sacola e no checkout. */
window.NP_DATA = {
  loja: {
    nome: 'Nutris Pet',
    instagram: 'https://www.instagram.com/nutrispet/',
    instagramUser: '@nutrispet',
    whatsapp: '5515997892959',
    whatsappLabel: '(15) 99789-2959',
    endereco: 'Rua XI de Agosto, 2661',
    cidade: 'Tatuí (SP)',
    cupom: 'NUTRIS10',
    cupomDesconto: 0.10,
    frete: 9.90,
    prefixoPedido: 'NP'
  },

  categorias: [
    { id: 'racao-caes', nome: 'Rações para cães', img: 'assets/produto-racao-caes.svg', tint: '#E3E9FF' },
    { id: 'racao-gatos', nome: 'Rações para gatos', img: 'assets/produto-racao-gatos.svg', tint: '#ECE6FF' },
    { id: 'petiscos', nome: 'Petiscos', img: 'assets/produto-petisco.svg', tint: '#FFE4E2' },
    { id: 'farmacia', nome: 'Farmácia pet', img: 'assets/produto-receita.svg', tint: '#FFEBD9' },
    { id: 'acessorios', nome: 'Acessórios', img: 'assets/produto-comedouro.svg', tint: '#DDEFFF' }
  ],

  /* opcoes: [rótulo, preço] — o primeiro é o preço exibido no card */
  produtos: [
    {
      id: 'racao-premium-caes',
      nome: 'Ração premium cães adultos',
      cat: 'racao-caes',
      selo: 'Mais pedida',
      frase: 'Para o dia a dia de cães de todos os portes',
      img: 'assets/produto-racao-caes.svg',
      tint: '#E3E9FF',
      tipo: 'Ração seca premium',
      paraQuem: 'Cães adultos',
      receita: false,
      rotuloOpcao: 'Tamanho do pacote',
      opcoes: [['1 kg', 29.9], ['3 kg', 79.9], ['10,1 kg', 189.9], ['15 kg', 249.9]]
    },
    {
      id: 'racao-gatos-castrados',
      nome: 'Ração gatos castrados',
      cat: 'racao-gatos',
      selo: 'Castrados',
      frase: 'Pensada para a rotina do gato castrado',
      img: 'assets/produto-racao-gatos.svg',
      tint: '#ECE6FF',
      tipo: 'Ração seca premium',
      paraQuem: 'Gatos adultos castrados',
      receita: false,
      rotuloOpcao: 'Tamanho do pacote',
      opcoes: [['1 kg', 34.9], ['3 kg', 94.9], ['10,1 kg', 279.9]]
    },
    {
      id: 'racao-filhotes',
      nome: 'Ração super premium filhotes',
      cat: 'racao-caes',
      selo: 'Filhotes',
      frase: 'Grãos menores para quem ainda está crescendo',
      img: 'assets/produto-racao-filhotes.svg',
      tint: '#FFEBD9',
      tipo: 'Ração seca super premium',
      paraQuem: 'Cães filhotes',
      receita: false,
      rotuloOpcao: 'Tamanho do pacote',
      opcoes: [['1 kg', 39.9], ['2,5 kg', 94.9], ['10,1 kg', 299.9]]
    },
    {
      id: 'petisco-bifinho',
      nome: 'Petisco bifinho',
      cat: 'petiscos',
      selo: 'Para treinar',
      frase: 'Recompensa na medida para treinos e mimos',
      img: 'assets/produto-petisco.svg',
      tint: '#FFE4E2',
      tipo: 'Petisco mastigável',
      paraQuem: 'Cães',
      receita: false,
      rotuloOpcao: 'Tamanho do pacote',
      opcoes: [['Pacote de 65 g', 9.9], ['Pacote de 500 g', 44.9]]
    },
    {
      id: 'antipulgas-mastigavel',
      nome: 'Antipulgas mastigável',
      cat: 'farmacia',
      selo: 'Farmácia pet',
      frase: 'Contra pulgas e carrapatos, num sabor que ele aceita',
      img: 'assets/produto-antipulgas.svg',
      tint: '#E3E9FF',
      tipo: 'Comprimido mastigável',
      paraQuem: 'Cães',
      receita: false,
      rotuloOpcao: 'Peso do seu cão',
      opcoes: [['2 a 4,5 kg', 89.9], ['4,5 a 10 kg', 99.9], ['10 a 25 kg', 109.9], ['25 a 50 kg', 124.9]]
    },
    {
      id: 'comedouro-duplo',
      nome: 'Comedouro duplo inox',
      cat: 'acessorios',
      selo: 'Para o dia a dia',
      frase: 'Ração de um lado, água fresca do outro',
      img: 'assets/produto-comedouro.svg',
      tint: '#DDEFFF',
      tipo: 'Inox com base antiderrapante',
      paraQuem: 'Cães e gatos',
      receita: false,
      rotuloOpcao: 'Tamanho',
      opcoes: [['Tamanho P', 49.9], ['Tamanho M', 69.9]]
    }
  ]
};
