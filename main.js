const form = document.getElementById('form-contato');
let linhas = '';
const contatos = new Map();
const telefones = new Set();

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaAgenda();
});

function adicionaLinha() {
    const inputNomeContato = document.getElementById('nome-contato');
    const inputTelContato = document.getElementById('tel-contato');

    if (!inputNomeContato.value.trim() || inputNomeContato.value.split(' ').length < 2) {
        alert('Por favor, preencha o nome e sobrenome do contato');
        return;
    }

    if (!inputTelContato.value || inputTelContato.value.length !== 11) {
        alert('Por favor, preencha o número de telefone com 11 dígitos');
        return;
    }

    const [nome, sobrenome] = inputNomeContato.value.trim().split(' ');

    if (contatos.has(nome + ' ' + sobrenome)) {
        alert(`O contato ${nome} ${sobrenome} já consta na sua agenda de contatos`);
        return;
    }

    if (telefones.has(inputTelContato.value)) {
        alert(`O telefone ${inputTelContato.value} já consta na sua agenda de contatos`);
        return;
    }

    contatos.set(nome + ' ' + sobrenome, inputTelContato.value);
    telefones.add(inputTelContato.value);

    const telefoneFormatado = formatarTelefone(inputTelContato.value);
        
    let linha = '<tr>';
    linha += `<td>${nome} ${sobrenome}</td>`;
    linha += `<td>${telefoneFormatado}</td>`;
    linha += '</tr>';
    
    linhas += linha;

    inputNomeContato.value = '';
    inputTelContato.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaAgenda() {
    console.log(contatos);
    console.log(telefones);
}

function formatarTelefone(numero) { 
    const regex = /^(\d{2})(\d{5})(\d{4})$/;
    const telefoneFormatado = numero.replace(regex, "($1) $2-$3");
    return telefoneFormatado;
}
