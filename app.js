// app.js

const listaTarefas = document.getElementById('lista-tarefas');

function adicionarTarefa() {
    const novaTarefa = document.getElementById('nova-tarefa').value;
    if (novaTarefa) {
        criarItemTarefa(novaTarefa);
        salvarTarefas(); // Salva no Local Storage
        document.getElementById('nova-tarefa').value = "";
    }
}

function criarItemTarefa(texto) {
    const tarefa = document.createElement('li');
    tarefa.textContent = texto;

    // Botão de exclusão
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.onclick = () => {
        tarefa.remove();
        salvarTarefas(); // Atualiza o Local Storage após a exclusão
    };

    // Adiciona o botão ao item de tarefa
    tarefa.appendChild(botaoExcluir);
    listaTarefas.appendChild(tarefa);
}

function salvarTarefas() {
    // Converte todas as tarefas para um array de strings e salva no Local Storage
    const tarefas = Array.from(listaTarefas.children).map(t => t.firstChild.textContent);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    // Carrega as tarefas do Local Storage e exibe na lista
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(t => {
        criarItemTarefa(t);
    });
}

// Evento de carregar a página, que chama carregarTarefas
window.addEventListener('load', carregarTarefas);
