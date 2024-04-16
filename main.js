const html = document.querySelector('html');
//criando constantes que se comunicam com estrutura do html, nesse caso os botões de foco e pausas:
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');
//constantes que se comunicam com a imagem exibida e titulo
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
//const para criar array que vai remover active na classe ao clicar em outro botao de contexto
const botoes = document.querySelectorAll('.app__card-button');
//constante para incluir objeto som
const musicaFocoInput = document.querySelector('#alternar-musica');
//colocando o arquivo de audio em uma constante para garantir carregamento do arquivo no inicio, melhorando experiencia de usuario. Uso de objeto Audio. O metodo readfile poderia ser usado, mas o arquivo so seria carregado quando fosse utilizado
const musica = new Audio ('/sons/luna-rise-part-one.mp3');
musica.loop = true; //para que o audio continue no tempo que dura o modo foco

//para inputs do tipo checkbox, se utiliza o evento change em vez de click
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

//criando eventos para o click do usuário (evendo, funcao a partir do evento)
focoButton.addEventListener('click', () => {
    alterarContexto ('foco')
    //manipulando classes com class list: adicionar "active" a classe do botão clicado para alterar cores indicando o contexto ativo
    focoButton.classList.add("active")
})

curtoButton.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoButton.classList.add('active')
})

longoButton.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoButton.classList.add("active")
}) 

//funcao para automatizar a troca de contexto sem precisar repetir código. Importante garantir que o nome dos atributos seja igual para cada contexto
function alterarContexto (contexto) {
    //funcao que remove o active do botão ao trocar de contexto
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active")
    })
    //troca da cor de fundo por meio do data-contexto do css
    html.setAttribute('data-contexto', contexto)
    //troca da imagem de acordo com o contexto
    banner.setAttribute('src', `imagens/${contexto}.png`)
    //troca do texto exibido de acordo com o contexto
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
    }

