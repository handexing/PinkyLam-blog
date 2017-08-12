# PinkyLam-blog 使用教程

## 数据库

1、首先在服务器安装数据库。
2、下载表结构。[表结构](https://github.com/handexing/pinkyLam-Blog-Server/tree/master/doc)，导入sql文件即可。

## 服务端

- 服务端使用spring boot。[pinkyLam-Blog-Server](https://github.com/handexing/pinkyLam-Blog-Server)。
- Spring Boot直接执行public static void main()函数并启动一个内嵌的应用服务器来处理应用请求。同时Spring Boot也支持传统的部署方式(war方式)。

### 项目部署步骤

1、将[pinkyLam-Blog-Server](https://github.com/handexing/pinkyLam-Blog-Server)服务端代码clone到本地。
2、修改项目配置，在pinkyLam-common里面application.properties文件。
```
# 开发环境
spring.profiles.active=dev
```
3、用maven将项目打成可执行的jar包。
4、上传到服务器。然后只需要**java -jar your.jar**就可以启动项目了。访问*http:xx.xx.xx.xx:8888*测试服务是否已启动。

## PC端

1、将[PC端](https://github.com/handexing/PinkyLam-blog)代码clone到本地。
2、修改view/config.json 项目配置文件，修改成你的服务器请求地址。（redis不需要修改！！！）
3、需要下载[nwjs](https://nwjs.io/),下载完成解压即可。
4、打包成exe文件[打包教程](http://www.cnblogs.com/soaringEveryday/p/4950088.html),mac的可以自己查下怎么打包。



