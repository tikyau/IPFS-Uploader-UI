(function() {

	var ViewApp = Class.create({
		initialize: function() {
			this.fetchAllImages();
		},

		fetchAllImages: function() {
			localforage.getItem('myStorage').then(function(value) {
				var html = "";
				for(var i = 0; i < value.length; i++) {
					html += '<li class="list-group-item"><a class="text-secondary" href="' + value[i] + '" download="true"><i class="fas fa-download"></i></a>&nbsp;&nbsp;' + value[i] + ' </li>';
				}
				$$('#view-app-list').html(html);
			}).catch(function(err) {
			    console.log(err);
			});			
		}
	});

	var viewApp = new ViewApp;

})();