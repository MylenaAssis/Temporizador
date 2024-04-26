//definindo constantes para acessar o botao e o form
const adicionarTarefaBt = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list'); //puxando a ul do html onde nosso li será inserido
const CancelaAdicionarTarefaBt = document.querySelector('.app__form-footer__button--cancel'); //puxando o botão cancelar no form de inserir tarefas
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description'); //puxando o p onde vai aparecer a descrição da tarefa que foi selecionada na lista

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] //pegando as tarefas logo no início do carregamento. Lembrando que ele só le string e precisamos do array, uso o JSON para fazer o caminho oposto do que foi feito no evento submit. Se for o primeiro carregamento, não vai ter o que carregar, por isso adicionamos o ou (||) string vazia, porque nesse caso precisa ocorrer a criação dessa string para fazer o push das tarefas
let tarefaSelecionada = null //variavel criada para possibilitar desselecionar a tarefa selecionada
let liTarefaSelecionada = null //item de lista da tarefa selecionada

//criando uma função pra atualizar tarefas, evitando repetir codigo e facilitando manutençao - sera usada na insercao do valor tarefa no paragrafo e tambem na edicao de tarefas
function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) //armazendo a lista na localstorage para nao perder quando atualizar a página | uso de API JSON para converter a lista em string porque a localstorage so reconhece assim
}

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
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao //o elemento paragrafo do html recebe o conteudo digitado pelo usuario na tarefa

    //criando botão de edit e sua função a partir do click
    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        //debugger
        let novaDescricao = prompt('Informe o nome correto')
        //console.log('Noa descricao da tarefa: ', novaDescricao)
        if (novaDescricao) { //se novaDescricao tem valor, faca..... Isso vai impedir salvar edicao em branco e null dentro do localstorage
            //reatribuindo o valor do paragrado (antes era o valor tarefa) no DOM
            paragrafo.textContent = novaDescricao //atualizando a camada visual
            tarefa.descricao = novaDescricao // atualizando camada de dados
            atualizarTarefas() //atualizando local storage
        }
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')

    botao.append(imagemBotao) //inserindo a imagemBotao no botao

    //inserir todos os elementos dentro do li:
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete') //adiciona a classe css de tarefa finalizada
        botao.setAttribute('disabled', 'disabled') //desabilita botao de edicao da tarefa finalizada
    } else {
        //inserindo a partir do click a descrição da tarefa que foi clicada no paragrafoDescricaoTarefa (destaque)
        li.onclick = () => {
            //remover seleção de todos os itens
            document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            });
            if (tarefaSelecionada == tarefa) { //criando uma condição para desselecionar tarefa caso clique em cima de uma que ja esta selecionada (remover selecao atual)
                paragrafoDescricaoTarefa.textContent = ''
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return //early return porque nao precisa prosseguir c codigo
            }
            tarefaSelecionada = tarefa //guardando o valor da tarefa selecionada atualmente
            liTarefaSelecionada = li //guardar referencia tambem pro li elemento html
            paragrafoDescricaoTarefa.textContent = tarefa.descricao
            //selecionar o li que foi clicado
            li.classList.add('app__section-task-list-item-active') //adicionando a classe css que adiciona a borda de destaque
        }
    }

    return li //apos inserir tudo no li, retornar o elemento criado
}

//pega o evento click no botão para chamar o formulário. Por meio do toggle faz o formulario aparecer ou sumir
adicionarTarefaBt.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

function escondeFormulario() {
    formAdicionarTarefa.classList.add('hidden')
}

//evento de submit ativa comportamento padrão de atualizar página, por meio do evento removemos isso
formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value //puxa o que foi inserido no textarea
    }
    tarefas.push(tarefa) //inserindo os valores da const tarefa no array
    //depois de incluir a tarefa no array, precisamos colocar o novo item na tela:
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas() //insere conteudo na local storage
    textArea.value = '' //limpando a caixa de texto apos armazenar a tarefa
    escondeFormulario() //esconder o formulario apos registrar tarefa
})

//criando funcao que limpa o text area caso clique no botao cancelar e esconde o formulario
const cancelarNovaTarefa = () => {
    textArea.value = '';
    escondeFormulario();
}

//associar a funcao cancelarNovaTarefa ao evento click no botao
CancelaAdicionarTarefaBt.addEventListener('click', cancelarNovaTarefa)

//dentro da string tarefas, para cada elemento tarefa ele chama a funcao criarElementoTarefa recebendo tarefa como paramentro (criacao de elemento html para cada tarefa que o usuario insere na lista)
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa) //atribui o retorno li a essa constante
    ulTarefas.append(elementoTarefa) //insere os elementoTarefa na ul existente no html, que foi puxada para cá pela const ultarefas
});

//ouvindo o evento do broadcast e reagindo:
document.addEventListener('FocoFinalizado', () => {
    //se temos uma tarefa selecionada(objeto da tarefa) && se temos um elemento li dessa tarefa
    if (tarefaSelecionada && liTarefaSelecionada) { 
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active') //remove a classe css de tarefa ativa
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete') //adiciona a classe css de tarefa finalizada
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled') //desabilita botao de edicao da tarefa finalizada
        tarefaSelecionada.completa = true //criando nova propriedade p dizer que esta completa
        atualizarTarefas() //atualizando localstorage

    }
})