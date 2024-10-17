//Cotacao de moedas do dia
const USD = 5.69
const EUR = 6.20
const GBP = 7.41


//Obtendo os elementos do formulario 
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById ("description")
const result = document.getElementById ("result")


//Manipulando o input amount para receber somente numeros!
amount.addEventListener("input", () => {

  const hasCaractersRegex = /\D+/g
  amount.value = amount.value.replace(hasCaractersRegex,"")
})

//Capturando o evento de submit(enviar) do formulario
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case"USD":
      convertCurrency(amount.value, USD,"US$")
      break
    case"EUR":
      convertCurrency(amount.value, EUR,"€")
      break
    case"GBP":
      convertCurrency(amount.value,GBP,"£")
      break
  }
}

//Funcao para converter a moeda.
function convertCurrency(amount,price,symbol){
  try {
    //Exibindo a cotacao da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    //Calcula o total.
    let total = amount * price 

    //Verifica se o resultado nao é um numero.
    if(isNaN(total)){
      return alert("Por favor, digite o valor corretgamente para converter")
    }

    //Formatar o valor total.
    total = formatCurrencyBRL(total)

    //Exibe o resultado total.
    result.textContent = `${total}`

    //Aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result")

  } catch (error) {
    //remove a classe do footer removendo ele da tela
    console.log(error)
    footer.classList.remove("show-result")
    alert("nao foi possivel converter.Tente novamente mais tarde")
  }
}

//Formata a moeda em real Brasileiro.
function formatCurrencyBRL(value){
//Converte para numero para utilizar o toLocaleString para formatar o padrao BRL(R$ 00,00)
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}