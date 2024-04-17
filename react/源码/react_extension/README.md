## jsx
### jsx语法规则：
React项目利用babel做了对js的编译，所以我们是可以直接在js里写jsx的

jsx几乎和js—样，不同点就在于，可以更方便的写html在js里，写在 js里的html！最后会被编译成一个js对象，我们也可以用react自带 createElement创建这个对象
```
	1.定义虚拟DOM时，不要写引号。
	2.标签中混入JS表达式时要用{}。
	3.样式的类名指定不要用class，要用className。
	4.内联样式，要用style={{key:value}}的形式去写。（外层{}表示变量，内层表示写的是一个对象）
	5.只有一个根标签
	6.标签必须闭合
	7.标签首字母
		(1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
		(2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
	
jsx渲染不同内容的区别
	1. 字符串，数字 直接渲染
	2. 方法  无法渲染
	3. 对象  只能渲染element对象
	4. 布尔值  不渲染任何内容
	5. 数组    数组的每一项单独渲染
	6. undefined,null  不渲染任何内容
	7. 表达式，运行表达式
```
## 传参数
```
onClick={()=>this.changeWeather(1,2)

onClick={this.changeWeather.bind(this,1,2)}

```
## 解决this指向3种方式
1. 给方法调用bind规定this，
2. 写成一个匿名箭头函数 
3. 方法本身写成箭头函数
```
onClick={this.changeWeather.bind(this,1,2)
onClick={()=>this.changeWeather(1,2)}

changeWeather=()=>{
   console.log(this);
}
```

## react的响应式原理
1. react不能像vue一样直接修改触发更新
2. react修改能改值，但无法触发更新，因为react没有像vue一样监听get和set，而是在调用setState的时候调用react的更新操作

## 1. setState

### setState更新状态的2种写法
修改数据，触发更新

关键点：
1. 通过浅合并来修改数据
2. 调用setState方法会触发更新，修改state并不会触发更新
3. 合并对象是浅合并，对象属性要写全，防止数据丢失


1. 调用setState
2. 给入一个对象
3. 给入得对象和state对象进行浅合并
4. 合并后调用更新方法进行更新

setState特性：
1. setState方法多次修改，会合并为一次，统一更新
2. setState返回会触发更新，不管你是否有修改，这造成了一个问题，重复修改为相同的值也会让组件更新。
3. 一定不要在render里直接setState,会陷入死循环


```
	(1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
					
	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据, 
					要在第二个callback函数中读取
```
```
// 对象式的setState
this.setState({
	a:1,
})

// 函数式的setState
this.setState((state)=>{
	return {
	   a: ++state.a
	}
} 


//合并对象是浅合并，对象属性要写全，防止数据丢失
// 修改c对象里的c1
this.setState({
	a:1,
	c:{
		...this.state.c,
		c1:9
	}
})

// 更新值
this.setState({
	a:1,
},()=>{
	// 才能获取到更新后的a
	console.log(a)
})

```
## 发请求数据没改变
```
//state的修改是异步
this.setState({
	searchParams:{ 
		date:''
		name:''
		status:''
	}
},（)=>{
// 在这里请求接口，state的数据才更新
this.getList(this.state.searchParams')
})
```
## vue template
react中 <>  </>

## render
使用React.Component时，如果setState没做修改，也会执行render函数
```
class Person extends React.Component{
			render(){
				// console.log(this);
				const {name,age,sex} = this.props
				return (
					<ul>
						<li>姓名：{name}</li>
						<li>性别：{sex}</li>
						<li>年龄：{age+1}</li>
					</ul>
				)
			}
		}
```
## PureComponent下对于对象和数组的修改
因为PureComponent会根据state是否改变来决定是否更新，而我们对于对象数组这样的引用类型判断他是否改变的原理是看他的内存地址，而不是内容
所以我们PureComponent下修改对象和数组，一定要赋予一个新对象，所以一般我们不直接操作原对象，而是先拷贝一份，在进行操作

Component没有这个问题
```
this.setState({
	a:1,
	c:{
		...this.state.c,
		c1:9
	}
})
```
## react父子传值
在React中，父子组件之间的传值通常通过props（属性）来实现。父组件可以通过props将数据传递给子组件，子组件通过props接收这些数据。

## react 库

帮助我们操作类名的库-classnames
React使用PropTypes实现类型检查功能

## 严格模式
<StrictMode>

如果包裹app组件，整个项目都使用严格模式
```
<React.StrictMode>
   <App/>
</React.StrictMode>
```

严格模式只在开发模式下生效，生产上线时会去除，作用简要概括有两方面的作用

1， 检测一些危险的操作（比如使用已经废弃api和不推荐的api）
2，会把一些生命周期执行两次，来检测额外副作用（比如render）
## react思想
1. 更少的封装，更高的自由度，能够让使用者更加高度的去自定义实现，不用像vue一样必须遵守规则，你在这里只需要遵守js规则
2. 纯粹的js，不用去背什么特殊指令
## 2. lazyLoad

### 路由组件的lazyLoad

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```



------



## 3. Hooks

#### 1. React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

#### 4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

#### 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```



------



## 4. Fragment

### 使用

	<Fragment><Fragment>
	<></>

### 作用

> 可以不用必须有一个真实的DOM根标签了



<hr/>

## 5. Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

### 使用

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

	在应用开发中一般不用context, 一般都它的封装react插件



<hr/>


## 6. 组件优化

### Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render()
>
> 2. 只当前组件重新render(), 就会自动重新render子组件 ==> 效率低

### 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

### 原因

>  Component中的shouldComponentUpdate()总是返回true

### 解决

	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
	项目中一般使用PureComponent来优化



<hr/>


## 7. render props

### 如何向组件内部动态传入带内容的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <AA><BB/></AA>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构, 一般用render函数属性

### children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

### render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 



<hr/>

## 8. 错误边界

#### 理解：

错误边界：用来捕获后代组件错误，渲染出备用页面

#### 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

##### 使用方式：

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

## 9. 组件通信方式总结

#### 方式：

		props：
			(1).children props
			(2).render props
		消息订阅-发布：
			pubs-sub、event等等
		集中式管理：
			redux、dva等等
		conText:
			生产者-消费者模式

#### 组件间的关系

		父子组件：props
		兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)

