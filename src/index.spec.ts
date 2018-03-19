import * as test from 'tape';
import bind from './';

test("bind by name", (t) => {
	class Tested {
		args(...args) {
			return args;
		}
	}

	const obj = new Tested();
	const args5 = bind(obj, 'args', 5);
	t.deepEqual(args5(), [5], 'Key is passed as first agrument');

	t.deepEqual(args5(2), [5, 2], 'Other params as passed too');

	t.deepEqual(args5(10, 100), [5, 10, 100], 'Multiple params support');

	const args = bind(obj, 'args', 7);
	t.deepEqual(args(true, 'param'), [7, true, 'param'], 'Params order');

	let argsWithAddParams = bind(obj, 'args', 9, 100, 'Second value');
	t.deepEqual(argsWithAddParams(true, 'param'), [100, 'Second value', true, 'param'], 'Params order with add params');
	t.deepEqual(
		argsWithAddParams(false, 'last param'),
		[100, 'Second value', false, 'last param'],
		'Params are changed after call binded function'
	);

	argsWithAddParams = bind(obj, 'args', 9, 101, 'Second value after new bind');
	t.deepEqual(
		argsWithAddParams(true, 'param'), 
		[101, 'Second value after new bind', true, 'param'], 
		'Params order with add params after new bind'
	);
	t.deepEqual(
		argsWithAddParams(false, 'last param'),
		[101, 'Second value after new bind', false, 'last param'],
		'Params are changed after call binded function after new bind'
	);

	const sameId1 = bind(obj, 'args', 'same');
	const sameId2 = bind(obj, 'args', 'same');
	t.ok(sameId1 === sameId2, 'Bound functions with the same key are equals.');

	const diffId1 = bind(obj, 'args', 'dif');
	const diffId2 = bind(obj, 'args', 'dif1');
	t.ok(diffId1 !== diffId2, 'Bound functions with the different key are not equals.');


	const diffObj1 = new Tested();
	const diffObj2 = new Tested();
	const f1 = bind(diffObj1, 'args', 1);
	const f2 = bind(diffObj2, 'args', 1);

	t.ok(f1 !== f2, 'Bound functions for different object are not equals.')

	t.end();
});

test("bind by function", (t) => {
	const thisTest = function thisTest() {
		return this;
	}

	const obj = {};
	const binded = bind(obj, thisTest, 1);
	t.equals(obj, binded(), 'Should bind function to object');

	const args = function args(...args) {
		return args;
	}

	const args5 = bind(obj, args, 5);
	t.deepEqual(args5(), [5], 'Key is passed as first agrument');

	t.deepEqual(args5(2), [5, 2], 'Other params as passed too');

	t.deepEqual(args5(10, 100), [5, 10, 100], 'Multiple params support');

	const args7 = bind(obj, args, 7);
	t.deepEqual(args7(true, 'param'), [7, true, 'param'], 'Params order');

	let argsWithAddParams = bind(obj, args, 9, 100, 'Second value');
	t.deepEqual(argsWithAddParams(true, 'param'), [100, 'Second value', true, 'param'], 'Params order with add params');
	t.deepEqual(
		argsWithAddParams(false, 'last param'),
		[100, 'Second value', false, 'last param'],
		'Params are changed after call binded function'
	);

	argsWithAddParams = bind(obj, args, 9, 101, 'Second value after new bind');
	t.deepEqual(
		argsWithAddParams(true, 'param'), 
		[101, 'Second value after new bind', true, 'param'], 
		'Params order with add params after new bind'
	);
	t.deepEqual(
		argsWithAddParams(false, 'last param'),
		[101, 'Second value after new bind', false, 'last param'],
		'Params are changed after call binded function after new bind'
	);

	const sameId1 = bind(obj, args, 'same');
	const sameId2 = bind(obj, args, 'same');
	t.ok(sameId1 === sameId2, 'Bound functions with the same key are equals.');

	const diffId1 = bind(obj, args, 'dif');
	const diffId2 = bind(obj, args, 'dif1');
	t.ok(diffId1 !== diffId2, 'Bound functions with the different key are not equals.');


	const diffObj1 = {};
	const diffObj2 = {};
	const f1 = bind(diffObj1, args, 1);
	const f2 = bind(diffObj2, args, 1);

	t.ok(f1 !== f2, 'Bound functions for different object are not equals.')

	t.end();
});