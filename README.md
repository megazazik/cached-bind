# cached-bind #
`cached-bind` is a helper to remove arrow-functions and bind from cycles in `react` component's `render` method. Or you can use it in any other cases when you don't want to create new functions.
Example:
```javascript
import * as React from 'react'
import bind from 'cached-bind';

function onClickSecond(index) {
	doSomethingElse(index);
}

class SomeComponent extends React.Component {
	_onClick(index) {
		doSomething(index);
	}

	render() {
		return (
			<div>
				{someArray.map((obj, index) => (
					<span onClick={bind(this, '_onClick', index)} >{obj.name}</span>
				))}
				or
				{someArray.map((obj, index) => (
					<span onClick={bind(this, onClickSecond, index)} >{obj.name}</span>
				))}
			</div>
		);
	}
}
```

## Why?
It is not recomended to create new functions in each `render` function call in `react` and pass them to child components. That is because of performance optimization reasons. Performance decrease can happen when you use arrow-function or bind in `render` function. Usualy you can easy avoid this by creating a component's property with an arrow-function:
```javascript
class SomeComponent extends React.Component {
	_onClickHandler = () => {
		...
	}

	render() {
		return (
			<div >
				<ChildComponent onClick={this._onClickHandler} />
			</div>
		);
	}
}
```
But sometimes you need to pass `onClickHandler` to a number of components in cycle. And `onClickHandler` needs to know an elements's index when it is executed.
`cached-bind` will help you to resolve this issue easy.

## How it works?
When `cached-bind` is called with some key for the first time it creates a wrapper for an original function and return it.
Next call with the same key `cached-bind` returns the same existed wrapper even if args were changed.  
``bind(obj, 'doSomething', 1, true) === bind(obj, 'doSomething', 1, false)``  
It create a new wrapper for every call with a new key.
When args are changed, `cached-bind` saves them and when a wrapper function is called, new args are passed to the original function.

## API
`cached-bind` has the following parameters:  
``bind(object, func, key, ...args)``  
where:
* *object* - object to which a function will be bound
* *func* - a property name of the object which contains a function to bind or a function to bind
* *key* - it is used to determine which cached function should be returned. If `bind` is called with the same key next time, the returned function will be the same as in the first time
* *args* - arguments which will be passed to `object[functionName]` function on call

## Examples

```javascript
class C1 {
	doSomething() {
		...
	}
}
const obj1 = new C1();
const bound1 = bind(obj1, 'doSomething', 1, true, {id: 1});
bound1();

// or

function doSomething() {
	...
}
const bound2 = bind(obj2, doSomething, 1, true, {id: 1});
bound2();
```
In this case the original `doSomething` function will get the following parameters: `[true, {id: 1}]`.

If `args` is missed then `key` will be passed as first argument to `object[functionName]` function.
```javascript
const bound = bind(object, 'doSomething', 1);
bound();
```
In this case the original `doSomething` function will get the only parameter: `1`.

If a bound function is called with some arguments then they will be passed after `args` or `key`.
```javascript
const bound = bind(object, 'doSomething', 1, true, {id: 1});
bound(100, false);
```
In this case the original `doSomething` function will get the following parameters: `[true, {id: 1}, 100, false]`.