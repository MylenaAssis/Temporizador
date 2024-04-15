const html = document.querySelector('html');
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');

const banner = document.querySelector('.app__image');

focoButton.addEventListener('click', () => {
    alterarContexto ('foco')
})

curtoButton.addEventListener('click', () => {
    alterarContexto('descanso-curto')
})

longoButton.addEventListener('click', () => {
    alterarContexto('descanso-longo')
})

function alterarContexto (contexto) {
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
}
