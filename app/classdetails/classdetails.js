define(function(require) {
	var _i = {
		ko: require('knockout'),
		$: require('jquery'),
		search: require('_custom/services/search'),
		list: require('_custom/services/listmanager'),
        charajax: require('_custom/services/WebAPI')
	};

	return function() {
		var self = this;
        self.data = null;
		self.displayName = _i.ko.observable('');
		self.levelDetail = _i.ko.observableArray([]);
		self.primaryAbility = _i.ko.observable('');
		self.hitPoints = _i.ko.observable({});
		self.proficiencies = _i.ko.observableArray([]);
		self.armor = _i.ko.observableArray([]);
		self.weapons = _i.ko.observableArray([]);
		self.tools = _i.ko.observableArray([]);
		self.savingThrows = _i.ko.observableArray([]);
		self.skills = _i.ko.observableArray([]);
		self.features = _i.ko.observableArray([]);

        self.activate = function(classname){
            return _i.charajax.get('classes/' + classname).done(function(response){
                var classDetails = response.Class;
				classDetails.id = classname;
				var data = classDetails;
				self.data = classDetails;
				self.displayName(classname);
				self.primaryAbility(data.primaryability);
				self.hitPoints(data.hitpoints);
				self.proficiencies(data.proficiencies);
				self.armor(self.proficiencies().armor);
				self.weapons(self.proficiencies().weapons);
				self.tools(self.proficiencies().tools);
				self.savingThrows(self.proficiencies().saves);
				self.skills(self.proficiencies().skills);
				self.features(data.features);

				// for(var i = 1; i <= 20; i++){
				// 	var levelDetail = {};
				// 	levelDetail.level = i;
				// 	levelDetail.profbonus = self.proficiencies().bonus[i-1];
				// 	var featureList = [];
				// 	for(var y = 1; y <= self.features().length; y++){
				// 		if(self.features()[y-1].levelgained === i){
				// 			var copy = self.features()[y-1];
				// 			featureList.push(copy);
				// 		}
				// 	}
				// 	levelDetail.features = buildList(featureList);
				// 	self.levelDetail.push(levelDetail);
				// };

				self.armorList = _i.ko.computed(function(){
					return buildList(self.armor());
				});

				self.weaponList = _i.ko.computed(function(){
					return buildList(self.weapons());
				});

				self.toolList = _i.ko.computed(function(){
					return buildList(self.tools());
				});

				self.savingthrowList = _i.ko.computed(function(){
					return buildList(self.savingThrows());
				});

            });
        }


	};

	function buildList(listitem){
		var result = "";
		_i.ko.utils.arrayForEach(listitem,function(item){
			if (!result){
				   result = item.name;
			   }
			   else{
				   result = result + ', ' + item.name;
			   }
		});
		return result;
	};

});
