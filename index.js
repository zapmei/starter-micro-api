var http = require('http');
var url = require('url');

http.createServer(function (original_request, final_response) {
	var q = url.parse(original_request.url, true).query;
	console.log(`Just got a request at ${original_request.url}!`)
	
	var url_req = "";
	var form = {};
	
	if (q.servico === "das") {
		url_req = 'https://api.infosimples.com/api/v2/consultas/receita-federal/simples-das';
		form = {
		    'token': q.token,
		    'cnpj': q.cnpj,
		    'periodos': q.periodos
		};
	}
	else if (q.servico === "parcelas") {
		url_req = 'https://api.infosimples.com/api/v2/consultas/receita-federal/simples/mei/eg';
		form = {
			'token': q.token,
			'cnpj': q.cnpj,
		   	'cpf': q.cpf,
			'codigo_acesso': q.chave_acesso,		   
		};
	}
	else if (q.servico === "declaracaoanualmei") {
		url_req = 'https://api.infosimples.com/api/v2/consultas/receita-federal/simei-dasn';
		form = {
			'token': q.token,
			'cnpj': q.cnpj,
		   	'tipo_declaracao': q.tipo_declaracao,
			'ano_calendario': q.ano_calendario,	
			'receita_bruta_comercio': q.receita_bruta_comercio,
			'receita_bruta_servicos': q.receita_bruta_servicos,
			'possui_empregado': q.possui_empregado	   
		};
	}
	else if (q.servico === "receitafederalsimplesnacional") {
		url_req = 'https://api.infosimples.com/api/v2/consultas/receita-federal/simples';
		form = {
			'token': q.token,
			'cnpj': q.cnpj
		};
	}
	
	var request = require('request');
	var options = {
	  'method': 'POST',
	  'url': url_req,
	  'headers': {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  'form': form
	};
	request(options, function (error, response) {
	  if (error) throw new Error(error);

	  console.log(response.body);
	  final_response.write(response.body);
	  final_response.end();
	});

    	//response.write('Yo!');

    	//response.end();
}).listen(process.env.PORT || 3000);
