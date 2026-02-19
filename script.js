// ------------- CARREGAR DO LOCALSTORAGE -------------
let despesas = JSON.parse(localStorage.getItem("despesas")) || [];
let receitas  = JSON.parse(localStorage.getItem("receitas")) || [];


// ------------- SALVAR AUTOMÁTICO -------------
function salvar() {
    localStorage.setItem("despesas", JSON.stringify(despesas));
    localStorage.setItem("receitas", JSON.stringify(receitas));
}


// ------------- ADICIONAR DESPESA -------------
function adicionarDespesa() {
    despesas.push({
        venc: "",
        tipo: "",
        desc: "",
        valor: 0,
        pago: false
    });

    salvar();
    atualizarInterface();
}


// ------------- ADICIONAR RECEITA -------------
function adicionarReceita() {
    receitas.push({
        data: "",
        desc: "",
        valor: 0
    });

    salvar();
    atualizarInterface();
}


// ------------- REMOVER LINHA -------------
function removerDespesa(i) {
    despesas.splice(i, 1);
    salvar();
    atualizarInterface();
}

function removerReceita(i) {
    receitas.splice(i, 1);
    salvar();
    atualizarInterface();
}


// ------------- CALCULAR OS TOTAIS -------------
function calcularTotais() {

    let totalPago = 0;
    let totalPagar = 0;
    let totalVencido = 0;

    despesas.forEach(d => {
        if (d.pago) totalPago += Number(d.valor);
        else totalPagar += Number(d.valor);
    });

    // Receitas
    const totalReceitas = receitas.reduce((acc, r) => acc + Number(r.valor), 0);
    const saldo = totalReceitas - (totalPago + totalPagar);

    document.getElementById("totalPago").innerText = "R$ " + totalPago.toFixed(2);
    document.getElementById("totalPagar").innerText = "R$ " + totalPagar.toFixed(2);
    document.getElementById("totalReceitas").innerText = "R$ " + totalReceitas.toFixed(2);
    document.getElementById("saldoMes").innerText = "R$ " + saldo.toFixed(2);
}


// ------------- ATUALIZAR A INTERFACE -------------
function atualizarInterface() {

    // DESPESAS
    const tbodyDespesas = document.querySelector("#tabelaDespesas tbody");
    tbodyDespesas.innerHTML = "";

    despesas.forEach((d, i) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${i + 1}</td>
            <td><input type="date" value="${d.venc}" onchange="editarDespesa(${i}, 'venc', this.value)"></td>
            <td><input type="text" value="${d.tipo}" onchange="editarDespesa(${i}, 'tipo', this.value)"></td>
            <td><input type="text" value="${d.desc}" onchange="editarDespesa(${i}, 'desc', this.value)"></td>
            <td><input type="number" value="${d.valor}" onchange="editarDespesa(${i}, 'valor', this.value)"></td>
            <td><input type="checkbox" ${d.pago ? "checked" : ""} onchange="editarDespesa(${i}, 'pago', this.checked)"></td>
            <td><button class="btn-delete" onclick="removerDespesa(${i})">Excluir</button></td>
        `;

        tbodyDespesas.appendChild(tr);
    });


    // RECEITAS
    const tbodyReceitas = document.querySelector("#tabelaReceitas tbody");
    tbodyReceitas.innerHTML = "";

    receitas.forEach((r, i) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${i + 1}</td>
            <td><input type="date" value="${r.data}" onchange="editarReceita(${i}, 'data', this.value)"></td>
            <td><input type="text" value="${r.desc}" onchange="editarReceita(${i}, 'desc', this.value)"></td>
            <td><input type="number" value="${r.valor}" onchange="editarReceita(${i}, 'valor', this.value)"></td>
            <td><button class="btn-delete" onclick="removerReceita(${i})">Excluir</button></td>
        `;

        tbodyReceitas.appendChild(tr);
    });

    calcularTotais();
}


// ------------- EDITAR DADO -------------
function editarDespesa(i, campo, valor) {
    despesas[i][campo] = valor;
    salvar();
    calcularTotais();
}

function editarReceita(i, campo, valor) {
    receitas[i][campo] = valor;
    salvar();
    calcularTotais();
}


// ------------- INICIAR INTERFACE -------------
atualizarInterface();