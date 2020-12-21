class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}
}



class Bd {

	constructor() {
		let id = localStorage.getItem('id')
		// console.log(isNaN(id))
		if (isNaN(id)) {
			localStorage.setItem('id', 0)
		}
	}

	validarDados(d) {
		console.log(d)
		for (const i in d) {
			console.log(i, d[i])
			if (d[i] === undefined || d[i] === '' || d[i] === null) {
				return false
			}
		}
		return true
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		// console.log(proximoId)
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarDados() {
		let id = localStorage.getItem('id')
		let despesas = Array()

		if (JSON.parse(localStorage.getItem(NaN))) {
			despesas.push(JSON.parse(localStorage.getItem(NaN)))
		}
		for (let i = 1; i <= id; i++) {

			let despesa = JSON.parse(localStorage.getItem(i))
			// console.log(i, despesa)
			if (despesa === null) {
				// console.log('Esse dado foi apagado')
				continue
			}
			despesa.id = i
			despesas.push(despesa)

		}
		// console.log(despesas)
		// this.enviarDadosConsulta(despesas)
		
		return despesas
		
	}

	enviarDadosConsulta(despesas = Array(), filtro = false) {
		if (despesas.length === 0 && filtro ===false){
			despesas = bd.recuperarDados()
		}

		let resposta = document.getElementById('respostaConsulta')

		for (const dado of despesas) {
			switch (dado.tipo) {
				case '1':
					dado.tipo = 'Alimentação'
					break;
				case '2':
					dado.tipo = 'Educação'
					break;
				case '3':
					dado.tipo = 'Lazer'
					break;
				case '4':
					dado.tipo = 'Saúde'
					break;
				case '5':
					dado.tipo = 'transporte'
					break;
				default:
					dado.tipo = 'Não informado'
					break;
			}
		}
		resposta.innerHTML = ''
		for (const dado of despesas) {
			resposta.innerHTML += ` <tr>
			<td>${dado.dia} / ${dado.mes} / ${dado.ano} </td>
			<td>${dado.tipo}</td >
			<td>${dado.descricao}</td>
			<td>R$ ${dado.valor}</td>
			<td><button id="id_depesa${dado.id}" class="btn btn-danger" onClick="removerDespesa(id)"><i class="fas fa-trash"></i></button></td>
		  </tr > `
		  console.log(dado )
		}
	}

	pesquisar(despesa){
		let dadosFiltrados = Array()
		
		dadosFiltrados = this.recuperarDados()
		console.log(despesa)
		console.log(dadosFiltrados)
		

		if(despesa.ano !== ''){
			dadosFiltrados = dadosFiltrados.filter(d => d.ano === despesa.ano)
		} 
		if(despesa.mes !== ''){
			dadosFiltrados = dadosFiltrados.filter(d => d.mes === despesa.mes)
		}
		if(despesa.dia !== ''){
			dadosFiltrados = dadosFiltrados.filter(d => d.dia === despesa.dia)
		}
		if(despesa.tipo !== ''){
			dadosFiltrados = dadosFiltrados.filter(d => d.tipo === despesa.tipo)
		}
		if(despesa.tipo !== ''){
			dadosFiltrados = dadosFiltrados.filter(d => d.tipo === despesa.tipo)
		}
		if(despesa.descricao !== ''){
			dadosFiltrados = dadosFiltrados.filter(d => d.descricao === despesa.descricao)
		}
		if(despesa.valor !== ''){
			dadosFiltrados = dadosFiltrados.filter(d => d.valor === despesa.valor)
		}
		return dadosFiltrados
	}

	removerId(id){
		localStorage.removeItem(id)
	}

}

let bd = new Bd()


function cadastrarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	)

	if (bd.validarDados(despesa)) {
		//dados válidos
		// console.log('dados válidos')
		bd.gravar(despesa)
	} else {
		//dados inválidos
		// console.log('dados inválidos')
		alert(`Preencha todos os campos`)
	}
	limparCampos()

}

function carregaListaDespesas() {
	bd.enviarDadosConsulta()
}

function limparCampos() {
	document.getElementById('ano').value = ''
	document.getElementById('mes').value = ''
	document.getElementById('dia').value = ''
	document.getElementById('tipo').value = ''
	document.getElementById('descricao').value = ''
	document.getElementById('valor').value = ''
} 

function pesquisarDespesa(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)
	bd.enviarDadosConsulta(despesas, true)
}

function removerDespesa(id){
	let idNovo = id.replace('id_depesa',"")
	console.log(idNovo)
	bd.removerId(idNovo)
	window.location.reload()
}