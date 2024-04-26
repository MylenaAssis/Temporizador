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
//inserindo sons referentes ao contador de tempo
const somPlay = new Audio ('/sons/play.wav');
const somPause = new Audio ('/sons/pause.mp3');
const somBeep = new Audio ('/sons/beep.mp3');
//botao que inicia ou pausa o temporizador
const startPauseBt = document.querySelector('#start-pause');
//referenciando o span do botao iniciar ou pausar para fazer ateração de texto
const iniciarOuPausarBt = document.querySelector('#start-pause span');
//referencias a div do temporizador no html
const tempoNaTela = document.querySelector('#timer')
//troca de icone do botao
const iconeBt = document.querySelector('.app__card-primary-butto-icon')

//criando variável do temporizador
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

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
    tempoDecorridoEmSegundos = 1500
    alterarContexto ('foco')
    //manipulando classes com class list: adicionar "active" a classe do botão clicado para alterar cores indicando o contexto ativo
    focoButton.classList.add("active")
})

curtoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoButton.classList.add('active')
})

longoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoButton.classList.add("active")
}) 


//funcao para automatizar a troca de contexto sem precisar repetir código. Importante garantir que o nome dos atributos seja igual para cada contexto
function alterarContexto (contexto) {
    //alterando o tempo exibido de acordo com o contexto
    mostrarTempo()
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


//funcao para decrementar o tempo
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        //som que indica fim do contador
        //somBeep.play()
        //fazer broadcast de evento: comunicar que o evento aconteceu para todos os arquivos do projeto poderem ouvir
        //arquivos diferentes se comunicam via evento
        const focoAtivo = html.getAttribute('data-contexto') == 'foco' //pegar no html se o estado global é foco
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento) //assim outras partes da aplicação podem ouvir o evento
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

//funcao que adiciona o evento de click para começar o temporizador
startPauseBt.addEventListener('click', iniciarOuPausar) 

//fazer a contagem regressiva automaticamente com o setInterval. Passar o valor maximo e o minimo em milissegundos. Chamar essa funcao dentro da contagem regressiva 
function iniciarOuPausar() {
    //condicional para permitir pausar a contagem
    if(intervaloId) { //se intervaloId tiver valor, pode chamar a funcao zerar
        zerar()
        //troca para icone de play no botao
        iconeBt.setAttribute('src', '/imagens/play_arrow.png')
        somPause.play()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000) 
    //alterando texto do botão
    iniciarOuPausarBt.textContent = "Pausar"
    //troca para ícone de pausa no botao
    iconeBt.setAttribute('src', '/imagens/pause.png')
    //emite som de play ao clicar
    somPlay.play()
}

//funcao para zerar o intervaloId e parar looping de alert do tempo esgotado
function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo () {
    //uso do objeto date para exibir o tempo formatado em minutos
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    //uso de metodo para definir quantas casas serao exibidas
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

//chamada em escopo global para garantir que o tempo apareça sempre
mostrarTempo()

contagemRegressiva