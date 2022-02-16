var Centralemessaggi =   {
	listaObserver : [],

	subscribe: function(callback) {
		this.listaObserver.push(callback);
	},
	unsubscribe: function(callback) {
		for (var i = 0; i < this.listaObserver.length; i++) {
			if (this.listaObserver[i] === callback) {
				this.listaObserver.splice(i, 1);
				return;
			}
		}
	},
	nuovomessaggio: function(msg) {
		for (var i = 0; i < this.listaObserver.length; i++) {
			this.listaObserver[i](msg);
		}
	}
};

var o = {

}

var p = Object.create(Centralemessaggi)
var o = {x:3}
p.subscribe(cb)
p.nuovomessaggio()

function cb() {
console.log(o.x)
}