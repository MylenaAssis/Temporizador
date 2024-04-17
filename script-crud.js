//definindo constantes para acessar o botao e o form
const adicionarTarefaBt = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list'); //puxando a ul do html onde nosso li será inserido

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] //pegando as tarefas logo no início do carregamento. Lembrando que ele só le string e precisamos do array, uso o JSON para fazer o caminho oposto do que foi feito no evento submit. Se for o primeiro carregamento, não vai ter o que carregar, por isso adicionamos o ou (||) string vazia, porque nesse caso precisa ocorrer a criação dessa string para fazer o push das tarefas

//criando uma função que crie a estrutura do elemento tarefa no html
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li') //criando o elemento li no html
    li.classList.add('app__section-task-list-item') //definindo a classe desse elemento li

    const svg = document.createElement('svg') //criando o elemento svg no html
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao //o elemento paragrafo do html recebe o conteudo digitado pelo usuario na tarefa

    const botao = document.createElement('button')
    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')

    botao.append(imagemBotao) //inserindo a imagemBotao no botao

    //inserir todos os elementos dentro do li:
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    return li //apos inserir tudo no li, retornar o elemento criado
}

//pega o evento click no botão para chamar o formulário. Por meio do toggle faz o formulario aparecer ou sumir
adicionarTarefaBt.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

//evento de submit ativa comportamento padrão de atualizar página, por meio do evento removemos isso
formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value //puxa o que foi inserido no textarea
    }
    tarefas.push(tarefa) //inserindo os valores da const tarefa no array
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) //armazendo a lista na localstorage para nao perder quando atualizar a página | uso de API JSON para converter a lista em string porque a localstorage so reconhece assim
})

//dentro da string tarefas, para cada elemento tarefa ele chama a funcao criarElementoTarefa recebendo tarefa como paramentro (criacao de elemento html para cada tarefa que o usuario insere na lista)
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa) //atribui o retorno li a essa constante
    ulTarefas.append(elementoTarefa) //insere os elementoTarefa na ul existente no html, que foi puxada para cá pela const ultarefas
});


