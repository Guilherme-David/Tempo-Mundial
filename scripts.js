let key = '9c987b4332a644a7b99122752252509'; // API key - keep this private!

function mostrarNaTela(dados) {
    console.log(dados); // For debugging

    // Access WeatherAPI.com structure
    document.querySelector('.cidade').innerHTML = 'Tempo em ' + dados.location.name;
    document.querySelector('.temperatura').innerHTML = Math.round(dados.current.temp_c) + '°C'; // Use temp_c for Celsius
    document.querySelector('.icone').src = dados.current.condition.icon; // Full URL already provided
    document.querySelector('.umidade').innerHTML = 'Umidade: ' + dados.current.humidity + '%';
}

async function buscarCidade(q) {
    try {
        // Fetch current weather from WeatherAPI.com
        let resposta = await fetch(
            'http://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + q + '&aqi=no'
        );
        
        if (!resposta.ok) {
            throw new Error('Erro na API: ' + resposta.status); // e.g., 400 for invalid city
        }
        
        let dados = await resposta.json();
        
        // Check if API returned an error (e.g., invalid key or city)
        if (dados.error) {
            throw new Error(dados.error.message);
        }
        
        mostrarNaTela(dados);
    } catch (erro) {
        console.error('Erro ao buscar cidade:', erro);
        // Optional: Show user-friendly message, e.g., alert('Cidade não encontrada ou erro na API!');
        document.querySelector('.cidade').innerHTML = 'Erro: ' + erro.message;
    }
}

function cliqueiNoBotao() {
    let q = document.querySelector(".input-cidade").value.trim(); // Trim whitespace
    
    if (!q) {
        alert('Digite uma cidade!');
        return;
    }
    
    buscarCidade(q);
}

// Optional: Auto-search on Enter key in input
document.querySelector(".input-cidade").addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        cliqueiNoBotao();
    }
});
/*
Clica no BOTÃO
 -> CHAMA A FUNÇÃO cliqueiNoBotao()
 -> Vai no INPUT e pega o que tá lá dentro
 -> PASSAR a cidade para o servidor -> buscarCidade

 Math.round() --> Arredondar Valores JavaScript
*/
