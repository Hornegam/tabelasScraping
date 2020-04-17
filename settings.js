var system = require('system');
var webPage = require('webpage');
 var fs = require('fs');

var page = webPage.create();
//Mude a url para a página qual deseje extrair a tabela
var url = "https://globoesporte.globo.com/futebol/libertadores/";
// ================== Não mexer ========================== //
page.viewportSize = {
  width: 1280,
  height: 720
};
setTimeout(console.log("waiting..."), 2000);
var requestsArray = [];
setTimeout(console.log("waiting..."), 2000);
page.onResourceRequested = function(requestData, networkRequest) {
  requestsArray.push(requestData.id);
};
setTimeout(console.log("waiting..."), 2000);
page.onResourceReceived = function(response) {
  var index = requestsArray.indexOf(response.id);
  requestsArray.splice(index, 1);
};
setTimeout(console.log("waiting..."), 2000);
page.open(url, function(status) {
  setTimeout(console.log("waiting..."), 5000);
  var interval = setInterval(function () {

    if (requestsArray.length === 0) {

      clearInterval(interval);
      var ua = page.evaluate(function() {
        console.log("Pegando pelo id script react")
        //O webscraping ele vai pegar pelo ID do script que contém o array, caso de um F12 na
        //página pode inspecionar e verificar
        return document.getElementById('scriptReact').textContent;
      });
      //var content = page.content;
      
      console.log("wait");
      //Nome o arquivo de acordo com a tabela e sempre em um arquivo js
      fs.write('libertadores.js', ua, 'w');
      phantom.exit();
    }
  }, 5000);
});