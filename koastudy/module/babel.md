## babel指南
---
（本文章基于babel:6.26.0）
### babel是什么？  
>babel是JavaScript编译器
### 为什么要用babel
es2015+大行其道，带来的编程效率的提升，然而当前的很多特性在目前的环境中支持性并不是令人满意，所以我们需要一个工具，把代码编译成浏览器，或者node可以运行的代码，因此babel诞生了
### babel是怎么工作的？  
> Babel 是一个编译器。 从宏观角度看，它将运行代码分为3个阶段: 解析，转换，及生成(与其他编译器相同).  
编译器的优秀教程，请查看[the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler)，同时它也从宏观角度上解释了 Babel 本身是如何工作的。
### babel-cli
babel的命令行工具,可通过命令行操作来编译文件。
1. babel
+ npx babel script.js -o script-compiled.js   //-o 编译结果到单个文件
+ npx babel script.js -w -o script-compiled.js   //-w 每一次修改文件后编译文件
+ npx babel script.js -w -o script-compiled.js -s  //-s 开启source map
+ npx babel src -w -o dist -s  //-s  //编译目录到目录
+ npx babel src -w -o script-compiled.js -s  //-s  //编译目录到文件
+ npx babel src -o lib --copy-files  //复制不需要编译的文件
+ npx babel -o script-compiled.js < script.js  //通过标准输入传入一个文件并输出到 script-compiled.js
+ npx babel script.js -o script-compiled.js --plugins=transform-runtime,transform-es2015-modules-amd  //使用 --plugins 选项来指定编译中要使用的插件
+ npx babel script.js -o script-compiled.js --presets=es2015,react  //使用 Presets
+ npx babel --no-babelrc script.js -o script-compiled.js --presets=es2015,react  //忽略项目中 .babelrc 文件的配置并使用 cli 选项，例如，为一个自定义的构建
2. babel-node
babel 提供了第二个 CLI，其功能与 Node.js 的 CLI 完全相同，只是它会在运行之前编译 ES6 代码。
### babel-polyfill
它会仿效一个完整的 ES2015+ 环境，并意图运行于一个应用中而不是一个库/工具。`babel-polyfill` 在使用 `babel-node` 时自动加载。
### babel-preset-env
根据你支持的环境自动决定适合你的 Babel 插件的 Babel preset,`babel-preset-env`只能编译语法,而对于新的Api无法编译，例如Promise,实例方法（`Array.prototype.includes()`）  
+ 在我们的应用中如何支持新的Api
    1. 在应用入口引入`babel-polyfill`  
    `import "babel-polyfill"`  
    在webpack中，加入到entry数组中  
    ```
    module.exports = {
      entry: ["babel-polyfill", "./app/js"]
    };
    ```
    缺点：整个引入`babel-polyfill`，太大了，80多k啊
    2. 上一个方法的改进版
    在`.babelrc`配置文件中配置`useBuiltIns:true`
    ```
    {
      "presets": [
        [
          "env", {
            "useBuiltIns": true
          }
        ]
      ]
    }
    ```
    3. `transform-runtime`配合`babel-runtime`,但是实例方法同样不起作用，因为这需要修改现有的内置插件
    
    ```
    npm install babel-plugin-transform-runtime -D
    npm install babel-runtime -S
    ```
    #### **使用**  
    ```
    {
      "plugins": [
          ["transform-runtime", {    //[["插件"，{插件的配置项}],"插件"，{插件的配置项}]
            "helpers": true,  //将内联的 Babel helper（classCallCheck，extends 等）替换为对 `moduleName` 的调用。
            "polyfill": true, //为新的api（Promise，Set，Map等）提供非全局污染的 polyfill，不包括实例的方法
            "regenerator": true, //将generator 函数替换为不污染全局作用域的 regenerator 运行时。
            "moduleName": "babel-runtime" //当引入 helper 时，设置要使用的模块的名称/路径。
          }]
        ]
    }
    ```
    >通常，Babel 会将 helper 放置在文件顶部执行通用任务，以避免在文件中出现重复代码。有时这些 helper 可能会变得笨重，并且在文件中添加不必要的重复代码。该 runtime 转译器将所有 helper 调用替换为一个模块。
    
    `babel-runtime` 帮我们做了三件事情  
     + 当你使用 `generators/async` 函数时，自动引入 `babel-runtime/regenerator`
     + 自动引入 `babel-runtime/core-js` 并映射 ES6 静态方法和内置插件。
     + 移除内联的 Babel helper 并使用模块 `babel-runtime/helpers` 代替
     >这意味着什么？基本上，你可以使用诸如 Promise，Set，Symbol 等内置函数，以及所有需要 polyfill 来完成且不带来全局污染的 Babel 功能，因此非常适合作为库使用。
     ```
     class Person {
     }
     ```
     helper:false,被编译为
     ```
     "use strict";
     
     function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
     
     var Person = function Person() {
       _classCallCheck(this, Person);
     };
     ```
     helper:true,被编译为
     ```
     "use strict";
     
     var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
     
     var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
     
     function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
     
     var Person = function Person() {
       (0, _classCallCheck3.default)(this, Person);
     };
     ```
### .babelrc（推荐）
 1. .babelrc配置
 ```
 {
   "presets": [
     ["env", 
       {
         "targets": { //指定运行环境
           "node": "4",
           "browsers": ["last 2 versions", "safari >= 7", "Android >= 6"]
         },
         "modules": "commonjs", //默认commonjs 
         "include": ["es6.array.from"],   //无论任何环境都编译Array.from
         "exclude": ["es6.array.from", "babel-plugin-transform-es2015-for-of"] //无论任何环境都不编译for-of
       }
     ]
   ] 
 }
 ```
     
    
