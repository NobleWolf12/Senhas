function AtualizaQuery(limite) {
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var v_teste = JSON.parse( this.responseText);
            
            var texto = "";
            for (let index = 0; index < v_teste.length; index++) {
                
                texto += `<div class='col-sm-4'> 
                <div class='card' style='width: 18rem;margin-bottom: 20px;'>
                <div class='card-body'>
                <h5 class='card-title'>Senha Roteador</h5>
                <p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul class='list-group list-group-flush'>
                <li class='list-group-item'>
                <div id='accordion'>
                <div class='card'>
                <div class='card-header' id='headingOne'>
                <h5 class='mb-0'>
                <button class='btn btn-link' data-toggle='collapse' data-target='#usuario`+index+`' aria-expanded='false' aria-controls='usuario`+index+`'>
                USUARIO
                </button>
                </h5>
                </div>

                <div id='usuario`+index+`' class='collapse' aria-labelledby='headingOne' data-parent='#accordion'>
                <div class='card-body'>
                ` + v_teste[index][0] + `
                </div>
                </div>
                </div>
                </div>
                </li>
                <li class='list-group-item'>
                <div id='accordion'>
                <div class='card'>
                <div class='card-header' id='headingTwo'>
                <h5 class='mb-0'>
                <button class='btn btn-link collapsed' data-toggle='collapse' data-target='#senha`+index+`' aria-expanded='false' aria-controls='senha`+index+`'>
                SENHA
                </button>
                </h5>
                </div>
                <div id='senha`+index+`' class='collapse' aria-labelledby='headingTwo' data-parent='#accordion'>
                <div class='card-body'>
                ` + v_teste[index][1] + ` 
                </div>
                </div>
                </div>
                </div>
                </li>
                </ul>
                </div>           
                </div>`;
            }
            document.getElementById("conteudo").innerHTML = texto;
        }
    };

    xhttp.open("GET", "http://localhost/1_WEB/SENHAS/coletorInformacoes.php?qnt="+ limite, true);
    xhttp.send();
}


window.onload = function () {
    document.getElementById("paginacao").innerHTML = `
    <input type="hidden" id="ant" value="0"></input>
    <li class="page-item disabled">
    <a class="page-link" href="#" tabindex="-1">Anterior</a>
    </li>
    <li class="page-item"><a class="page-link" href="#" onclick="paginador(this)" >1</a></li>
    <li class="page-item"><a class="page-link" href="#" onclick="paginador(this)" >2</a></li>
    <li class="page-item"><a class="page-link" href="#"onclick="paginador(this)" >3</a></li>
    <li class="page-item">
    <input type="hidden" id="prox" value="2"></input>
    <a class="page-link" href="#" onclick="paginador(2)">Próximo</a>
    </li>`;
    
    AtualizaQuery(1);

}

function paginador(limite) {

    var valor;

    if (! isNaN(Number(limite))) {
        valor = limite
    } else {
        valor = limite.innerHTML
    }

    AtualizaQuery(valor); //entrega o valor da paginação
    
    var texto ="";

    if (valor == 1) {
        texto =`
        <input type="hidden" id="ant" value="0"></input>
        <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">Anterior</a>
        </li>
        <li class="page-item"><a class="page-link" href="#" onclick="paginador(this)" >1</a></li>
        <li class="page-item"><a class="page-link" href="#" onclick="paginador(this)" >2</a></li>
        <li class="page-item"><a class="page-link" href="#"onclick="paginador(this)" >3</a></li>
        <li class="page-item">
        <input type="hidden" id="prox" value="2"></input>
        <a class="page-link" href="#" onclick="paginador(2)">Próximo</a>
        </li>`;
        
    }else{
        document.getElementById("prox").value = Number(valor + 1);
        document.getElementById("ant").value = Number(valor - 1);

        texto =`
        <input type="hidden" id="ant" value=`+Number(valor - 1) +`></input>
        <input type="hidden" id="prox" value=`+ Number(valor + 1)+`></input>
        <li class="page-item ">
        <a class="page-link" href="#" onclick="paginador(`+Number( document.getElementById("ant").value) +`)" >Anterior</a>
        </li>

        <li class="page-item">
        <a class="page-link" href="#" onclick="paginador(this)" > ` + valor + `</a>
        </li>
        <li class="page-item">
        <a class="page-link" href="#" onclick="paginador(this)" >` + (Number(valor) + 1) + `</a>
        </li>
        <li class="page-item">
        <a class="page-link" href="#"onclick="paginador(this)" >` + (Number(valor) + 2) + `</a>
        </li>
        
        <li class="page-item">
        <a class="page-link" href="#" onclick="paginador(`+Number( document.getElementById("prox").value) +`)" >Próximo</a>
        </li>`;
    }   

    document.getElementById("paginacao").innerHTML =texto;
}