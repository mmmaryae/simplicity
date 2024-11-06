/* Selecionando os elementos que serão manipulados */
const formulario = document.querySelector("form");
const campoCep = document.querySelector("#cep");
const campoTelefone = document.querySelector("#telefone");
const campoEndereco = document.querySelector("#endereco");
const campoBairro = document.querySelector("#bairro");
const campoCidade = document.querySelector("#cidade");
const campoEstado = document.querySelector("#estado");
const botaoBuscar = document.querySelector("#buscar");
const mensagemStatus = document.querySelector("#status");

//Ouvinte de evento para o botão Buscar
botaoBuscar.addEventListener("click", async function () {
    //Verificar se ocep digitado pela pessoa não tem 9 dígitos
    //value>valor / length> comprimento/tamanho 
    if (campoCep.value.length !== 9) {
        mensagemStatus.innerHTML = "Digite  um CEP Válido!";
        mensagemStatus.style.color = "purple";
        return;
    }

    //guardando o valor do CEP digitado
    let cepDigitado = campoCep.value;
    console.log(cepDigitado);


    /* AJAX - Asyncronouns JavaScript And XML 
    Técnica de comunição assíncrona(transmissão, recebimento) 
    de dados MUITO USADA entre diferentes tipos de sistemas (site, aplicativo, jogo, software) e tecnologias (PHP, ASP, JAVA etc).*/

    //Etapa 1: preparamos o endereço junto com o cep digitado 

    let endereco = `https://viacep.com.br/ws/${cepDigitado}/json/`;

    //Etapa 2: acessamos o ViaCEP com o endereço ajustado
    //fetch se conecta com serviço web site que dá dados
    //await (esperar) aguardar o processamento
    //funçao síncrona para uma acontecer outra tem q terminar
    // add async para o await funcionar pois ele so funciona com funções assíncronas
    const resposta = await fetch(endereco);


    //Etapa 3: extrair os dados que o ViacEP processou
    const dados = await resposta.json();
    console.log(dados);


    //etapa 4: lidando com os dados(em caso de erro ou sucesso)

    if ("erro" in dados) {
        mensagemStatus.innerHTML = "CEP inexistente!❌";
        mensagemStatus.style.color = "red";
    } else {
        mensagemStatus.innerHTML = "CEP encontrado! ✅";
        mensagemStatus.style.color = "blue";



        //seleção dos campos que estão escondidos 

        const campos = document.querySelectorAll(".campos-restantes");

        //Loop for para acessar cada campo e remover a classe
        for (let i = 0; i < campos.length; i++) {
            campos[i].classList.remove("campos-restantes");
        }

        campoEndereco.value = dados.logradouro;
        campoBairro.value = dados.bairro;
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;



    }








});//final da função/evento do botão