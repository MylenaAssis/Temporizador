//definindo constantes para acessar o botao e o form
const adicionarTarefaBt = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea')

const tarefas = [] //criando o array da lista de tarefas vazio


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
