# ES6 Template Literals in Depth

**Nicolás Bevacqua  Aug 28th, 2015 11m 27**

*Please consider disabling your ad blocker on Pony Foo. These ads help pay for my hosting. You can support Pony Foo directly through Patreon or via PayPal.*

> *昨天我们深入介绍了ES6解构，以及一些最常见的用例。今天我们将转向模板文字。它们是什么，我们如何使用它们以及它们的优点。*

模板文字是ES6中的一项新功能，可以更轻松地处理字符串和字符串模板。您将文本包装起来 `backticks` ，您将获得下面描述的功能。

- 你可以在其中插入变量
- 你实际上可以使用任何类型的表达式进行插值，而不仅仅是变量
- 最后！它们可以是多线的
- 您可以构造不解释反斜杠的原始模板

此外，您还可以定义一个方法来决定模板的内容，而不是使用默认的模板行为。这有一些有趣的用例。

###### 让我们深入了解模板文字，看看我们能想出什么。


## 使用模板文字

我们已经涵盖了基础知识 `I'm just a string`。可能值得一提的模板文字的一个方面是，您现在能够在其中声明带有引号'和"引号的字符串，而不必转义任何内容。

```javascript
var text = `I'm "amazed" that we have so many quotation marks to choose from!`
```

这很整洁，但肯定有更多有用的东西我们可以应用模板文字。一些实际插值怎么样？您可以使用该${expression}表示法。

```javascript
var host = 'ponyfoo.com'
var text = `this blog lives at ${host}`
console.log(text)
// <- 'this blog lives at ponyfoo.com'
```

我已经提到过你可以拥有任何你想要的表达方式 那里。在模板运行之前定义一个变量，然后将该值与字符串的其余部分连接起来，可以考虑放在那里的任何表达式。这意味着您使用的变量，调用的方法等等都应该可用于当前范围。

以下表达式也都可以正常工作。由我们来决定我们在插值表达式中加入多少逻辑。

```javascript
var text = `this blog lives at ${'ponyfoo.com'}`
console.log(text)
// <- 'this blog lives at ponyfoo.com'
var today = new Date()
var text = `the time and date is ${today.toLocaleString()}`
console.log(text)
// <- 'the time and date is 8/26/2015, 3:15:20 PM'
import moment from 'moment'
var today = new Date()
var text = `today is the ${moment(today).format('Do [of] MMMM')}`
console.log(text)
// <- 'today is the 26th of August'
var text = `such ${Infinity/0}, very uncertain`
console.log(text)
// <- 'such Infinity, very uncertain'
```

多行字符串意味着您不再需要使用这些方法。

```javascript
var text = (
  'foo\n' +
  'bar\n' +
  'baz'
)
var text = [
  'foo',
  'bar',
  'baz'
].join('\n')
```

相反，你现在可以只使用反引号！请注意，间距很重要，因此您可能仍希望使用括号以使第一行文本远离变量声明。

```javascript
var text = (
`foo
bar
baz`)
```

例如，当您想要插入一些变量的HTML 时，多行字符串确实会闪耀。与JSX非常相似，您完全能够使用表达式迭代集合，并使用return另一个模板文字来声明列表项。这使得在模板中声明子组件变得轻而易举。还要注意我是如何使用解构来避免必须为article.我的每个表达前缀，我喜欢把它想象为“一个with块，但不是疯了”。

```javascript
var article = {
  title: 'Hello Template Literals',
  teaser: 'String interpolation is awesome. Here are some features',
  body: 'Lots and lots of sanitized HTML',
  tags: ['es6', 'template-literals', 'es6-in-depth']
}
var {title,teaser,body,tags} = article
var html = `<article>
  <header>
    <h1>${title}</h1>
  </header>
  <section>
    <div>${teaser}</div>
    <div>${body}</div>
  </section>
  <footer>
    <ul>
      ${tags.map(tag => `<li>${tag}</li>`).join('\n      ')}
    </ul>
  </footer>
</article>`
```

以上将产生如下所示的输出。注意间距技巧如何足以正确缩进`<li>`标签。

```javascript
<article>
  <header>
    <h1>Hello Template Literals</h1>
  </header>
  <section>
    <div>String interpolation is awesome. Here are some features</div>
    <div>Lots and lots of sanitized HTML</div>
  </section>
  <footer>
    <ul>
      <li>es6</li>
      <li>template-literals</li>
      <li>es6-in-depth</li>
    </ul>
  </footer>
</article>
```

原始模板本质上是相同的，您只需要在模板文字前加上String.raw。在某些用例中，这可能非常方便。

```javascript
var text = String.raw`The "\n" newline won't result in a new line.
It'll be escaped.`
console.log(text)
// The "\n" newline won't result in a new line.
// It'll be escaped.
```

你可能已经注意到这String.raw似乎是模板文字语法的一个特殊部分，你是对的！您选择的方法将用于解析模板。模板文字方法 - 称为__“标记模板”__ - 接收一个数组，其中包含模板的静态部分列表，以及它们自己的变量上的每个表达式。

例如，模板文字 `hello ${name}. I am ${emotion}!` 会将参数传递给函数调用中的“标记模板”，如下所示。

```javascript
fn(['hello ', '. I am', '!'], 'nico', 'confused')
```

您可能会对参数布局的看似奇怪感到困惑，但是当您以这种方式考虑它们时它们就会开始变得有意义：对于模板数组中的每个项目，在它之后都有一个表达式结果。

## 揭开标记模板的神秘面纱

我在normal下面编写了一个示例方法，它的工作方式与默认行为完全相同。这可能有助于您更好地了解模板文字的内幕。

如果您不知道是什么.reduce，请参阅MDN或我的“有本机阵列的乐趣”一文。当您尝试将值集合映射到可从集合计算的单个值时，Reduce始终有用。

在这种情况下，我们可以从template [0]开始减少模板，然后通过添加前面的表达式和后续部分来减少所有其他部分。

```javascript
function normal (template, ...expressions) {
  return template.reduce((accumulator, part, i) => {
    return accumulator + expressions[i - 1] + part
  })
}
```

该...expressions语法是ES6新为好。它被称为“休息参数语法”，它基本上将所有传递给正常的参数放在模板后面的单个数组中。 您可以尝试使用标记的模板，如下所示，您会注意到您获得了与省略正常情况相同的输出。

```javascript
var name = 'nico'
var outfit = 'leather jacket'
var text = normal`hello ${name}, you look lovely today in that ${outfit}`
console.log(text)
// <- 'hello nico, you look lovely today in that leather jacket'
```

既然我们已经弄清楚标记模板的工作原理，我们可以用它们做些什么呢？ 好吧，无论我们想要什么。 一个可能的用例可能是让用户输入大写，将我们的问候变成听起来更讽刺的东西 - 我用Gob的声音从Arrested Development中大声读出结果，现在我一个人笑。我犯了一个大错。

```javascript
function upperExpr (template, ...expressions) {
  return template.reduce((accumulator, part, i) => {
    return accumulator + expressions[i - 1].toUpperCase() + part
  })
}
var name = 'nico'
var outfit = 'leather jacket'
var text = upperExpr`hello ${name}, you look lovely today in that ${outfit}`
console.log(text)
// <- 'hello NICO, you look lovely today in that LEATHER JACKET'
```

标记模板显然比嘲笑自己更有用的用例。事实上，你可能会对标记模板感到疯狂。一个非常有用的用例是自动清理模板中的用户输入。给定一个模板，其中所有表达式都被视为用户输入，我们可以使用insane它们从我们不喜欢的HTML标签中清除它们。

```javascript
import insane from 'insane'
function sanitize (template, ...expressions) {
  return template.reduce((accumulator, part, i) => {
    return accumulator + insane(expressions[i - 1]) + part
  })
}
var comment = 'haha xss is so easy <iframe src="http://evil.corp"></iframe>'
var html = sanitize`<div>${comment}</div>`
console.log(html)
// <- '<div>haha xss is so easy </div>'
```
>现在不那么容易了！


>我绝对可以看到一个未来，我在JavaScript中使用的唯一字符串开始并以反引号结束。
>
>**31601342黄依伦**

