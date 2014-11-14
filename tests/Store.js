define([
	'intern!object',
	'intern/chai!assert',
	'dojo/_base/declare',
	'dmodel/Model',
	'dstore/Memory'
], function (registerSuite, assert, declare, Model, Memory) {

	var store;

	registerSuite({
		name: 'dmodel Store Interaction',

		beforeEach: function () {
			store = new Memory({
				data: [
					{ id: 1, name: 'one', prime: false, mappedTo: 'E' },
					{ id: 2, name: 'two', even: true, prime: true, mappedTo: 'D' },
					{ id: 3, name: 'three', prime: true, mappedTo: 'C' },
					{ id: 4, name: 'four', even: true, prime: false, mappedTo: null },
					{ id: 5, name: 'five', prime: true, mappedTo: 'A' }
				],
				Model: Model,
				filterFunction: function (object) {
					return object.name === 'two';
				}
			});

			// add a method to the model prototype
			store.Model.prototype.describe = function () {
				return this.name + ' is ' + (this.prime ? '' : 'not ') + 'a prime';
			};
		},

		'Model': function () {
			assert.strictEqual(store.getSync(1).describe(), 'one is not a prime');
			assert.strictEqual(store.getSync(3).describe(), 'three is a prime');
			assert.strictEqual(store.filter({even: true}).fetchSync()[1].describe(), 'four is not a prime');
		},

		save: function () {
			var four = store.getSync(4);
			four.square = true;
			four.save();
			four = store.getSync(4);
			assert.isTrue(four.square);
		},

		filter: function () {
			return store.filter({even: false}).forEach(function (object) {
				// the intrinsic methods
				assert.equal(typeof object.save, 'function');
				assert.equal(typeof object.remove, 'function');
			});
		},
		'get and save': function () {
			var expectedObject = { id: 1, name: 'one', prime: false, mappedTo: 'E' };

			return store.get(1).then(function (object) {
				expectedObject._scenario = 'update';
				return object.save().then(function (result) {
					assert.deepEqual(JSON.stringify(result), JSON.stringify(expectedObject));
				});
			});
		}

	});
});
