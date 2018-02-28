(function() {

	var App = Class.create({
		initialize: function() {
			this.attachEvents();
		},

		uploadFile: function(file, el) {
		  var that = this;
	      var reader = new FileReader();
	      reader.onloadend = function() {
	        const ipfs = window.IpfsApi('ipfs-upload.westus2.cloudapp.azure.com', 5001) // Connect to IPFS
	        const buf = buffer.Buffer(reader.result) // Convert data into buffer
	        ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
	          if(err) {
	            console.error(err);
	            return 0;
	          }
	          let url = `https://ipfs.io/ipfs/${result[0].hash}`;
	          el.html('Uploaded');
	          el.prop('disabled', true);
	          el.parent().siblings().eq(0).prop('disabled', true);
	          el.removeClass('btn-outline-secondary').addClass('btn-success');
	          el.parent().parent().siblings().eq(1).remove();

			  localforage.getItem('myStorage').then(function(value) {
			    if(value === null) {
			    	let temp = [];
			    	temp.push(url);
					localforage.setItem('myStorage', temp).then(function(value) {
					    console.log(value[0]);
					}).catch(function(err) {
					    console.log(err);
					});			    	
			    } else {
			    	let temp = value;
			    	temp.push(url);
					localforage.setItem('myStorage', temp).then(function(value) {
					    console.log(value);
					}).catch(function(err) {
					    console.log(err);
					});
			    }
			  }).catch(function(err) {
			    console.log(err);
			  });

	        });
	      };
	      reader.readAsArrayBuffer(file);
		},

		attchmentField: '<div class="form-group"><label for="attachments">Attachment</label> <a href="javascript:void(0)" class="remove-attachment small">remove</a><div class="input-group mb-3"><input type="file" class="form-control" placeholder="Attachment" name="attachments[]"><div class="input-group-append"><button class="btn btn-outline-secondary upload-attachment" type="button">Upload</button></div></div></div>',
		
		attachEvents: function() {
			var that = this;

			$$(document).on('click', '.upload-attachment', function(e) {
				that.uploadFile($$(this).parent().siblings()[0].files[0], $$(this));
			});

			$$(document).on('click', '.remove-attachment', function(e) {
				$$(this).parent().remove();
			});

			// for add attach field
			$$('#add-new-attachments').on('click', function(e) {
				$$('#attachments').append(that.attchmentField);
			});
		}
	});

	var app = new App;

})();