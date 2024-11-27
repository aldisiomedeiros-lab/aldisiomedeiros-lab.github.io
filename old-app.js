// app.js

const listaTarefas = document.getElementById('lista-tarefas');

function adicionarTarefa() {
    const novaTarefa = document.getElementById('nova-tarefa').value;
    if (novaTarefa) {
        const tarefa = document.createElement('li');
        tarefa.textContent = novaTarefa;
        listaTarefas.appendChild(tarefa);
        document.getElementById('nova-tarefa').value = "";
        salvarTarefas();
    }
}

function salvarTarefas() {
    const tarefas = Array.from(listaTarefas.children).map(t => t.textContent);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(t => {
        const tarefa = document.createElement('li');
        tarefa.textContent = t;
        listaTarefas.appendChild(tarefa);
    });
}

// Carregar tarefas ao iniciar
window.addEventListener('load', carregarTarefas);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log("Service Worker registrado com sucesso!"))
        .catch(error => console.log("Erro ao registrar o Service Worker:", error));
}
