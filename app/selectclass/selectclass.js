define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		search: require('services/search'),
		list: require('services/listmanager')
	};

	return function() {
		var self = this;
		self.data = null;
		self.initialClassList = _i.ko.observableArray([]);
		self.classList = _i.ko.observableArray([]);

		self.alphaclassList = _i.ko.computed(function(){
			return _i.list.sortAlphabetically(self.classList());
		});
		self.displayName = 'Welcome to the Character Builder!';

		self.activate = function() {
			return _i.$.getJSON("app/ClassList.js", function(data) {
				self.data = data.Classes;
				self.classList(data.Classes);
			});
		};

		self.search = function(searchTerm) {
			if(!searchTerm || searchTerm === ""){
				self.classList(self.data);
			}else{
				var searchResults = _i.search.searchClassname(self.data, searchTerm);
				self.classList(searchResults);
			}
		};

	};

});
