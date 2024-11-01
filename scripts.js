let chave = 'cebcd482eda57fa9a6714c1c2ba91885' // CHAVE API do servidor de tempo/clima

function mostrarNaTela(dados) {
    console.log(dados)

    document.querySelector('.cidade').innerHTML = 'Tempo em ' + dados.name
    document.querySelector('.temperatura').innerHTML = Math.round(dados.main.temp) + '°C'
    document.querySelector('.icone').src = 'https://openweathermap.org/img/wn/' + dados.weather[0].icon + '.png'
    document.querySelector('.umidade').innerHTML = 'Umidade: ' + dados.main.humidity + '%'
}



async function buscarCidade(cidade) {
    // ASYNC --> Informar pra função que ela vai acessar um servidor

    let dados = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        cidade +
        '&appid=cebcd482eda57fa9a6714c1c2ba91885&units=metric',
    ).then((resposta) => resposta.json())

    // AWAIT --> Manda o código esperar que o computador realize a ação
    // FETCH --> Ferramenta do JavaScript para acessar servidores
    // .THEN --> Então, (quando acessar o servidor)
    // (resposta do servidor ==> se formata em JSON)
    // .JSON --> formato que o JavaScript entende

    mostrarNaTela(dados)
}

function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value

    buscarCidade(cidade)
}

/*
Clica no BOTÃO
 -> CHAMA A FUNÇÃO cliqueiNoBotao()
 -> Vai no INPUT e pega o que tá lá dentro
 -> PASSAR a cidade para o servidor -> buscarCidade

 Math.round() --> Arredondar Valores JavaScript
*/