## votesite

## __启动__
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

## __Screenshot__
![votesit](./screenshot.png)


## __heroku 部署__

``` bash
## 登录
$ heroku login

## 在网站new一个app，clone到本地
$ heroku git:clone -a votesite
$ cd votesite

## push到heroku仓库
$ git add .
$ git commit -am "make it better"
$ git push heroku master

## 查看错误日志
$ heroku logs

## 打开网页
$ heroku open
```

* [mLab——mongo数据库](https://mlab.com)

### 遇到的问题：
* #### [koa-session-#73](https://github.com/koajs/session/issues/73)

SyntaxError: Unexpected token function

koa-session@5.0.0+ require node@7.6.0+ :)

  [改变heroku的node版本](https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version)
``` json
"engines": {
    "node": "7.7.3"
  },
```

* #### [pm2](http://pm2.keymetrics.io/docs/usage/use-pm2-with-cloud-providers/)

一般用node index／nodemon index／supervisor index启动。heroku上用pm2（开进程），不容易挂掉。
``` json
"start": "node ./node_modules/.bin/pm2 start index.js -i max --attach"
```

* ### __babel-register 找不到__

   heroku只安装dependencies，而我开始是安装在devDependencies

## __外网访问，没有公网ip，本地服务器__
* 代码打包

  dva打包需要将路由换成hashHistory模式

  yarn build -> index.html,index.css,index.js -> 部署到静态服务器（github pages）

* 本地开启服务器（后端代码），内网穿透进行端口映射

  本地电脑作为服务器，没有公网IP？

  [Sunny-Ngrok](https://www.ngrok.cc)

  开启内网穿透
  ./sunny clientid fd8dd60b66373ba3隧道号


## __vscode 配置 eslint__

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
      "configFile": "/Users/hajnal/WorkSpace/votesite/client/.eslintrc"
  },
  "eslint.workingDirectories": [
    "./src" 
  ]
}
```

## __CRLF & LF__
linux 和 windows 的end_of_line 不一致，linux采用LF，windows采用CRLF。