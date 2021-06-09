
//ACESSANDO VALORES NO HTML
var $ul = document.querySelector('ul') 
//acessando a ul no html, pelo DOM
var $acessar_li = $ul.querySelectorAll('li') //acessar as li dentro da ul
var $input_digitado = document.querySelector('input.txt-input') 
//acessando o input no html pelo DOM
var $button_class = document.querySelector('button.button-class') 
//acessando o button (botao) no html pelo DOM

//estilo o "onclick", ao clicar, faça a função:
$button_class.addEventListener('click',inputTask)
$input_digitado.addEventListener('keyup',verificaEnter)

//cada tecla tem seu próprio codigo.
function verificaEnter(event)
{
    if(event.keyCode === 13) //se a tecla digitada tiver o codigo 13 ou seja se for a tecla enter, faça a função adicionar tarefa
    {
        inputTask()
    }
}

function inputTask()
    {
        var tarefas = $input_digitado.value //valor digitado no input
        if (tarefas == '')
        {
            alert('Tarefa inválida, digite novamente!')
        }
        else{
            
            var new_li = document.createElement('li')
            var new_li_dentro_li = document.createElement('li')
            var new_text2 = document.createTextNode(tarefas)
            var $botao_delete = document.createElement('button')
            var new_botao = document.createTextNode($botao_delete)
            var $botao_edite = document.createElement('button')
            var new_editar = document.createTextNode($botao_edite)

            $ul.appendChild(new_li)
            
            new_li.appendChild(new_li_dentro_li)
            new_li_dentro_li.appendChild(new_text2)
            new_li_dentro_li.classList.add('li-tarefa')

            var a = Math.floor(Math.random()*3000) //fiz para identificar CADA li por uma class (pode ser id tambem, mas preferi class)
            
            new_li.classList.add(`delete${a}`)
            new_li.classList.add("class-li-fixa")

            new_li.appendChild($botao_delete)
            $botao_delete.appendChild(new_botao)
            $botao_delete.innerHTML = `<span class="glyphicon glyphicon-remove-circle"></span> Excluir`
            $botao_delete.classList.add('botao_remover')

            
            new_li.appendChild($botao_edite)
            $botao_edite.appendChild(new_editar)

            $botao_edite.innerHTML = `<span class="glyphicon glyphicon-pencil"></span> Editar`
            $botao_edite.classList.add('botao_editar')
            
            $ul.addEventListener('click', verificaLi)

            $input_digitado.value = '' //para 'limpar' quando a pessoa digitar e clicar no botao
            $input_digitado.focus()// para a pessoa não ter que ficar clicando no input, e "focar direto" para digitar novamente

            $botao_delete.addEventListener('click', removerTask)
            $botao_edite.addEventListener('click', editTask)
            
            function removerTask()
            {
                if(confirm('Deseja excluir essa tarefa?') == true)
                {
                    console.log(`delete${a}`)
                    var $ul2 = document.querySelector('ul') 
                    var $li = $ul2.querySelector(`li.delete${a}`) //seleciona a li com a class específica
                
                    $li.parentNode.removeChild($li)
                }
            }

            function editTask()
            {
                var $ul2 = document.querySelector('ul') 
                var $li = $ul2.querySelector(`li.delete${a}`)
                console.log(`delete${a}`)
                $li.innerHTML = `<input type="text" class="txt-input2"> <button class="button-class2">Editar Tarefa</button> `

                var $button_class2 = document.querySelector('button.button-class2') 
                $button_class2.addEventListener('click',editCreate)

                function editCreate(){
                    var $txt_input2 = document.querySelector('input.txt-input2')
                    var tarefa_editada = $txt_input2.value
                    $txt_input2.focus()
                    console.log(tarefa_editada)
                   
                    
                    $li.innerHTML = 
                    `<li class="li-tarefa">${tarefa_editada}</li><button class = "botao_remover deletar${a}">
                            <span class="glyphicon glyphicon-remove-circle">
                                </span> Excluir
                        </button>
                        <button type="button" class="botao_editar editar${a}"> 
                                <span class="glyphicon glyphicon-pencil">
                                </span> Editar
                        </button>`
            
                    var botao_editar = document.querySelector(`.editar${a}`)
                    botao_editar.addEventListener('click',editTask)

                    
                    var botao_deletar = document.querySelector(`.deletar${a}`)
                    botao_deletar.addEventListener('click',removerTask)

                }
            }   
        }      
    }

function verificaLi(e){
    var propria_li = e.target
    if(e.target.nodeName === 'LI') //se o que 'foi clicado' for uma li, faça a funcao tarefaConcluida no que foi clicado (no target/alvo)
    {
        
        tarefaConcluida(propria_li)

    }
}
function tarefaConcluida(li)
{
    /*adiciona a class se nao tiver,
    exclui a class se existir */
    li.classList.toggle('task-done') //'task-done' nome da class
}

/*
tentei usar o innerHTML mas na hora de adicionar tarefa e clicar nela para 'concluí-las', para de funcionar!! Portanto, innerHTML nao pretendo utilizar para esse caso
$ul.innerHTML += `<li>${tarefas}</li>` //adicionar o input na ul/li  */