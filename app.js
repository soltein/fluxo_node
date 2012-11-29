// -------------------------
// Includes and Requires
// -------------------------
var express = require('express');
var app = express();	
var mongoose = require('mongoose');

// Configuration
app.configure(function () {
//    app.set('views', __dirname + '/views');
//    app.set('view engine', 'jade');
    app.use(express.bodyParser());//parse JSON into objects
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// -------------------------
// Configuração de Banco
// -------------------------
mongoose.connect('mongodb://localhost/fluxo');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var teContasSchema = new Schema({
  id     	: ObjectId,
  nmconta  	: String,
  fgtipo        : String
});

var teContas = mongoose.model('teContas', teContasSchema);

var teUsuarioSchema = new Schema({
  id     	: ObjectId,
  nmusuario	: String,
  dslogin	: String,
  dssenha	: String
});

var teUsuario = mongoose.model('teUsuario', teUsuarioSchema);


var teFluxoSchema = new Schema({
  id     		: ObjectId,
  dsdescricao		: String,
  tecontas_idcontas	: String,
  dtfluxo		: String,
  nuvalor               : Number
});

var teFluxo = mongoose.model('teFluxo', teFluxoSchema);


/*var newUsuario = new teUsuario();
newUsuario.set({nmusuario:'julio cezar', dslogin:'soltein', dssenha:'123456'});
newUsuario.save();*/

//teUsuario.remove({_id:'50b3fab8ff7543f016000001'}).exec();
//teUsuario.find({}, function(err, usuarios){ console.log(usuarios);});
/*
var newConta = new teContas();
newConta.set({nmconta:'Teste', fgtipo:1});
newConta.save();
*/

// -------------------------
// Application Routes
// -------------------------
// Routes

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.post('/contas_list', function(req, res){
        //TODO: Falta fazer ordenamento e limit
	teContas.find({}, function(err, contas){
		res.contentType('json');
		res.json({
			success:true,
			data: contas
		});
		
	});
});

app.post('/contas_insert', function(req, res){
    var conta = new teContas();
    var dados = req.param('data');
    //console.log(dados.nmconta);
    //console.log(req.body.data.nmconta);
   conta.nmconta = dados.nmconta; 
   conta.fgtipo = dados.fgtipo;   

    conta.save(function(err, dados){
        res.contentType('json');
        res.json({
            success: !err,
            message: 'Registro Salvo com sucesso!',
            data: dados
        });
    });
    console.log(conta);
});

app.post('/contas_update', function(req, res){
    console.log(req.body);
    
    var dados = req.body;
    teContas.find({_id: dados._id}, function(err, result){
        result[0].nmconta = dados.nmconta;
        result[0].fgtipo = dados.fgtipo;
        result[0].save(function(err){
            if(err != null){
                res.contentType('json');
                res.json({
                    success: true,
                    message: 'Registro Salvo com sucesso!'
                });                
            }
            console.log('Atualizado com sucesso\n');
        });
    });
});

app.post('/contas_delete', function(req, res){
    var dados = req.param('_id');
    for(var i in dados){
        teContas.find({_id: dados[i]}, function(err, result){
            result[0].remove(function(err){                
                console.log(err);
                console.log('Deletado com sucesso\n');
            });
        });
    }
    
    res.contentType('json');
    res.json({
        success: true,
        message: 'Registro apagado com sucesso!'
    });      
});


//FLUXO
app.post('/fluxos_list', function(req, res){
        //TODO: Falta fazer ordenamento e limit
	teFluxo.find({}, function(err, fluxos){
		res.contentType('json');
		res.json({
			success:true,
			data: fluxos
		});
		
	});
});

app.post('/fluxos_insert', function(req, res){
    var fluxo = new teFluxo();
    var dados = req.param('data');
    //console.log(dados);
    //console.log(req.body.data.nmconta);
   fluxo.dsdescricao = dados.dsdescricao; 
   fluxo.tecontas_idcontas = dados.tecontas_idcontas;   
   fluxo.dtfluxo = dados.dtfluxo;   
   fluxo.nuvalor = dados.nuvalor;   

    fluxo.save(function(err, dados){
        res.contentType('json');
        res.json({
            success: !err,
            message: 'Registro Salvo com sucesso!',
            data: dados
        });
    });
    //console.log(fluxo);
});

app.post('/fluxos_update', function(req, res){
    console.log(req.body);
    
    var dados = req.body;
    teFluxo.find({_id: dados._id}, function(err, result){
        result[0].dsdescricao = dados.dsdescricao;
        result[0].tecontas_idcontas = dados.tecontas_idcontas;   
        result[0].dtfluxo = dados.dtfluxo;   
        result[0].nuvalor = dados.nuvalor;   
        result[0].save(function(err){
            if(err != null){
                res.contentType('json');
                res.json({
                    success: true,
                    message: 'Registro Salvo com sucesso!'
                });                
            }
            console.log('Atualizado com sucesso\n');
        });
    });
});

app.post('/fluxos_delete', function(req, res){
    var dados = req.param('_id');
    //console.log(dados);
    for(var i in dados){
        teFluxo.find({_id: dados[i]}, function(err, result){
            result[0].remove(function(err){                
                console.log(err);
                console.log('Deletado com sucesso\n');
            });
        });
    }
    
    res.contentType('json');
    res.json({
        success: true,
        message: 'Registro apagado com sucesso!'
    });      
});

//USUARIOS
app.post('/usuarios_list', function(req, res){
        //TODO: Falta fazer ordenamento e limit
	teUsuario.find({}, function(err, usuarios){
		res.contentType('json');
		res.json({
			success:true,
			data: usuarios
		});
		
	});
});

app.post('/usuarios_insert', function(req, res){
    var usuario = new teUsuario();
    var dados = req.param('data');
    //console.log(dados);
    //console.log(req.body.data.nmconta);
   usuario.nmusuario = dados.nmusuario; 
   usuario.dslogin = dados.dslogin;   
   usuario.dssenha = dados.dssenha;   

   usuario.save(function(err, dados){
        res.contentType('json');
        res.json({
            success: !err,
            message: 'Registro Salvo com sucesso!',
            data: dados
        });
    });
    //console.log(fluxo);
});

app.post('/usuarios_update', function(req, res){
    console.log(req.body);
    
    var dados = req.body;
    teUsuario.find({_id: dados._id}, function(err, result){
        result[0].nmusuario = dados.nmusuario;
        result[0].dslogin = dados.dslogin;   
        result[0].dssenha = dados.dssenha;   
        result[0].save(function(err){
            if(err != null){
                res.contentType('json');
                res.json({
                    success: true,
                    message: 'Registro Salvo com sucesso!'
                });                
            }
            console.log('Atualizado com sucesso\n');
        });
    });
});

app.post('/usuarios_delete', function(req, res){
    var dados = req.param('_id');
    //console.log(dados);
    for(var i in dados){
        teUsuario.find({_id: dados[i]}, function(err, result){
            result[0].remove(function(err){                
                console.log(err);
                console.log('Deletado com sucesso\n');
            });
        });
    }
    
    res.contentType('json');
    res.json({
        success: true,
        message: 'Registro apagado com sucesso!'
    });      
});

//LOGIN
app.post('/login', function (req, res) {
	//console.log(req.body);
	
	teUsuario.count({dslogin:req.body.dslogin, dssenha:req.body.dssenha}, function(err, count){
		res.contentType('json');
		
		console.log(count);
		if(count > 0){
			teUsuario.find({dslogin:req.body.dslogin, dssenha:req.body.dssenha}, function (err, usuarios) {
				console.log(usuarios);
				res.json({
					success: true,
					data: usuarios
				});
			});
		}else{
			res.json({
				success: false,
				erro: {motivo: 'Usuário Não encontrado'}
			});
		}	
	});
});

//GRAFICO TOTAL
app.get('/grafico_total', function(req, res){
    console.log('aqui');
//
//    var resultado;
//    
//    teFluxo.find({}, ['dsdescricao', 'nuvalor', 'tecontas_idcontas'], {'group':'tecontas_idcontas'}, function(err, result){
//        for(var i in result){
//            console.log(result[i].tecontas_idcontas);
//        }
//    });

    var setupDoc = {total: 0, conta:''};
    var soma = function(doc, prev){
        prev.total += doc.nuvalor;
        prev.conta = doc.tecontas_idcontas;
    }
    
    var group = {
                    key: {tecontas_idcontas:true},
                    cond: {},
                    initial: setupDoc,
                    reduce: soma,
                    finalize: ''
                 }
    var result = [{}];
    
    teFluxo.collection.group(group.key,group.cond,group.initial, group.reduce, group.finalize, true, function(err, resultado){
//        for(i in resultado){
//            //console.log(resultado[i].tecontas_idcontas); 
//            teContas.find({_id:resultado[i].tecontas_idcontas}, function(err, ret){
//                //result[i] = {'total':resultado[i].nuvalor_total, 'conta': ret[0].nmconta};
//                result.conta = ret[0].nmconta;
//                result.total = resultado[i].total;
//                //console.log(resultado[i]);
//                //console.log(ret[0].nmconta);
//                //console.log(resultado);
//                console.log(result);
//            });
//        }
        
        console.log(resultado);
        res.contentType('json');
        res.json({
            success:true,
            data: resultado
        });                    
    });

   
//    teFluxo.find({}, [], {'group' : 'tecontas_idcontas'}, function(err, logs){
//        console.log(err);
//        console.log(logs);
//    });

});

app.listen(3000);
console.log("Server running at 127.0.0.1:85");