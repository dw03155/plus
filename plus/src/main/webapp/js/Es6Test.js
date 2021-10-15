//https://babeljs.io/docs/en/babel-plugin-transform-arrow-functions
const Es6Test = (function() {

	if (Often.isServerModeByHost()) {
		testConstLet();
		testTemplateLiterals();
		testSpreadSyntax();
		testArrowFunctions();
		testDestructuringAssignment();
		testForOf();
		testFilter();
		testMap();
		testReduce();
		testClass();
		testAsyncAwait();
		testFind();
		testIncludes();
		testDefaultParameter();
		testShorthandProperties();
		testOptionalChaining();
		testObjectAssign();
	}

	function tlog(a, b, c, d, e, f) {
		c = c || '';
		d = d || '';
		e = e || '';
		f = f || '';
		console.log('[Es6Test] ' + a, b, c, d, e, f);
	}

	function testConstLet() {
		const a = 'A';
		let b = 'B';
		tlog('testConstLet', a, b);
	}

	function testTemplateLiterals() {
		const a = 'C';
		const b = 'D';
		tlog('testTemplateLiterals', `${a} + ${b}`);
	}

	function testSpreadSyntax() {
		const a = [1, 2, 3];
		const b = [4, 5, 6];
		tlog('testSpreadSyntax', [...a, ...b]);
	}

	function testArrowFunctions() {
		const a = 1;
		const b = 2;
		tlog('testSpreadSyntax', (() => (a + b))());
	}

	function testDestructuringAssignment() {
		let { a1, b1, ...rest1 } = { a1: 10, b1: 20, c1: 30, d1: 40 };
		tlog('testDestructuringAssignmentJson', a1, b1, rest1);
		let [a2, b2, ...rest2] = [11, 21, 31, 41];
		tlog('testDestructuringAssignmentArray', a2, b2, rest2);
	}

	function testForOf() {
		for (const v of [10, 20, 30]) {
			tlog('testForOfArray', v)
			if (v === 10) return
		}
	}

	function testFilter() {
		const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
		tlog('testFilter', words.filter(word => word.length > 6));
	}

	function testMap() {
		tlog('testMap', [1, 4, 9].map(num => (Math.sqrt(num))));
	}

	function testReduce() {
		tlog('testReduce', [9, 2, 8, 5, 7].reduce((pre, val) => pre + val));
	}

	function testClass() {
		class Foo {
			constructor() {
			}

			getA() {
				return this.a
			}

			setA(v) {
				this.a = v
			}
		}

		const foo = new Foo();
		foo.setA(10);
		tlog('testClass', foo.getA())
	}

	function testAsyncAwait() {
		const foo = async () => {
			await new Promise((resolve) => setTimeout(() => {
				console.log("testAsyncAwait 1", "aa1");
				resolve();
			}, 1000));
			await new Promise((resolve) => setTimeout(() => {
				console.log("testAsyncAwait 2", "aa2");
				resolve();
			}, 500));
		}
		tlog('testAsyncAwait 3', foo());
	}

	function testFind() {
		const newArr = [1, 2, 3, 4, 5];
		tlog('testFind', newArr.find(num => num === 3));
	}

	function testIncludes() {
		tlog('testIncludesStr', ['apple', 'banana', 'mango'].includes('apple'));
		tlog('testIncludesArr', 'apple/banana/mango'.includes('apple'));
	}

	function testDefaultParameter() {
		const test = (x = "hello", y = "world") => x + y;
		tlog('testComputedProperty', test());
	}

	function testShorthandProperties() {
		const a = 1, b = 2, c = 3
		const o = { a, b, c };
		tlog('testShorthandProperties json', JSON.stringify(o));
		const cat = {
			getName() {
				return "getName";
			},
		};
		tlog('testShorthandProperties function', cat.getName());
	}

	function testOptionalChaining() {
		const obj = {
			foo: {
				bar: {
					baz: 42,
				},
			},
		};
		tlog('testOptionalChaining', obj?.foo?.bar?.baz, obj?.qux?.baz);
	}

	function testObjectAssign() {
		tlog('testObjectAssign', JSON.stringify(Object.assign({}, { a: 1 }, { b: 2 })));
	}

})