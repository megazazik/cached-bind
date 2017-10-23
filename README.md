# cached-bind #

Example:
```
import * as React from 'react'
import bind from 'cached-bind';

class SomeComponent extends React.Component {
	private _onClick(index) {
		doSomething(index);
	}

	render() {
		return (
			<div>
				{someArray.map((obj, index) => (
					<span onClick={bind(this, '_onClick', index)} >{obj.name}</span>
				))}
			</div>
		);
	}
}
```