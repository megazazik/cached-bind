import * as test from 'tape';
import bind from './';

class Tested {
	constructor (private v: number) {}
	sum(...values: number[]) {
		return values.reduce((prev, current) => prev + current, this.v);
	}

	args(...args) {
		return args;
	}
}

test("My first test", (t) => {

	const obj = new Tested(10);
	const sum = bind(obj, 'sum', 5);
	t.equal(sum(), 15, 'Key is passed as first agrument');

	t.equal(sum(2), 17, 'Other params as passed too');

	t.equal(sum(10, 100), 125, 'Multiple params support');

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


	const diffObj1 = new Tested(1);
	const diffObj2 = new Tested(2);
	const f1 = bind(diffObj1, 'sum', 1);
	const f2 = bind(diffObj2, 'sum', 1);

	t.ok(f1 !== f2, 'Bound functions for different object are not equals.')

	t.end();
});
