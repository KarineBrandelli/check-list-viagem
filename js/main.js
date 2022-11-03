const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];
// enviamos as informações em formato de string
// agora temos que converter de volta para objeto para conseguir manipular

itens.forEach((elemento) => {
  criaElemento(elemento);
}); // busca os dados do localStore, itera sobre cada um, e toda vez que a página for recarregada, as informações não vão sumir

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  /*
  console.log(evento); // descobrindo o que preciso capturar
  console.log(evento.target[0].value); // pegando o valor de 'Nome'
  console.log(evento.target[1].value); // pegando o valor de 'Quantidade'

  esse método não é muito bom pois se adicionarmos campos no nosso
  formulário, teremos que adicionar manualmente os índices desses campos
  */ 

  //
  // console.log(evento.target.elements['nome'].value);
  // console.log(evento.target.elements['quantidade'].value);
  // assim trabalhamos com objetos e não arrays

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['quantidade'];

  const existe = itens.find(elemento => elemento.nome === nome.value); // procurando se o nome já existe

  // armazenando dados no navegador
  // o local storage só lê strings
  // precisamos transformar o objeto em string com JSON

  // para não sobrescrever o conteúdo, precisamos criar um array de objetos
  // criamos o array fora da função, e damos push nos novos itens adicionados
  const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
  };

  if(existe) { // se o elemento já existe, ele irá atualizar o numero
    itemAtual.id = existe.id
    
    atualizaElemento(itemAtual);

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    // pegando o elemento correto e atualizando ele

  } else { // se não existir, ele vai adicionar a lista
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
    // verificando se o array tem comprimento negativo, ou seja, se não existe (itens[itens.length -1)
    // se o array existir, acha o último elemento e adiciona 1 ao id (itens[itens.length-1]).id + 1)
    // se o array não existir, "cria" o primeiro elemento com id=0;   

    criaElemento(itemAtual);
    itens.push(itemAtual);
  }

  localStorage.setItem('itens', JSON.stringify(itens));
  
  nome.value = ''; // resetando o valor digitado depois de enviar
  quantidade.value = ''; // resetando o valor digitado depois de enviar
});

function criaElemento(item) {
  const novoItem = document.createElement('li') // criando um novo li
  novoItem.classList.add('item') // adicionando a classe 'item' ao li

  const numeroItem = document.createElement('strong') // criando um <strong></strong>
  numeroItem.innerHTML = item.quantidade // o strong vai receber a quantidade
  numeroItem.dataset.id = item.id

  novoItem.appendChild(numeroItem); // adicionando a 'li' o <strong>quantidade</strong>
  novoItem.innerHTML += item.nome; // incrementando ao novoItem o que já tinha + o nome (camiseta)
  
  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem); // adicionando ao final da 'ul' o novoItem(<li><strong>quantidade</strong>nome</li>)
};

function atualizaElemento(item) {
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
};

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X"; // o que está escrito no botão

  elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, id) // achando o botão clicado usando o 'this', pegando o pai do botão e deletando
  });
  return elementoBotao
};

function deletaElemento(tag, id) { // recebe o id do elemento
  tag.remove(); // deletando o pai do botão

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
  // removendo um item do array com splice
  // primeiro parâmetro - o que queremos remover
  // procurando um item no array - itens.findIndex(quero achar o elemento que tem o id igual ao que foi recebido na hora do click do botão)
  // segundo parâmetro - quantos elementos desejamos remover (1)

  localStorage.setItem("itens", JSON.stringify(itens)); // atualizando a localStorage após remover um item
}