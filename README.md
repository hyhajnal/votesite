## votesite

### 启动
* client dva+antd
* server koa2+mongodb

``` bash
git clone git@github.com:hyhajnal/votesite.git
```

``` bash
cd votesite/server
yarn start
```

``` bash
cd votesite/client
yarn start
```

### vscode 配置 eslint

* 安装 Eslint 插件

* 全局安装 eslint
``` bash
  npm install eslint -g
```
* 项目目录下生成 .eslintrc / .eslint.json / .eslint.js
* 配置 vscode 首选项
``` json
// 将设置放入此文件中以覆盖默认值和用户设置。
{
  "eslint.options": {
      "configFile": "/Users/hajnal/WorkSpace/votesite/client/.eslintrc" //.eslintrc所在目录
  },
  "eslint.workingDirectories": [
    "./src" // 需要eslint检查的目录
  ]
}
```

### CRLF & LF
linux 和 windows 的end_of_line 不一致，linux采用LF，windows采用CRLF。
以下 git 命令可以将crlf转成lf
``` bash
git config --global core.autocrlf true
```