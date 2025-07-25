# Awesome Host manager

> 又双叕一个 Chrome host 管理工具 Yet another host manager tools(Chrome plugin).

## Screenshot

![Awesome Host manager](https://user-images.githubusercontent.com/458894/32358417-e557f8ae-c080-11e7-9a62-c3b7d334e741.png)

## Features

* 秒切 host 无延迟 😎
* 基于 chrome 代理 ❤️
* 兼容 socket 代理 🤔
* 简洁好用，无多余功能 👏

## Install

### 最新版本（支持 Chrome 88+）

由于 Chrome 已停止支持 Manifest V2，请使用以下方式安装：

1. **开发者模式安装**（推荐）：
   - 打开 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目中的 `awesome-host-manager` 文件夹

2. **构建安装**：
   ```bash
   npm install
   npm run build
   ```
   然后按照开发者模式安装步骤操作

### 旧版本（Chrome < 88）

- [Chrome 应用商店](https://chrome.google.com/webstore/detail/awesome-host-manager/pikaoeecieigblebdddckmlegonlogha?hl=zh-CN)
- [下载 .crx 文件](https://raw.githubusercontent.com/keelii/awesome-host-manager/master/awesome-host-manager.crx)

详细安装说明请查看 [INSTALL.md](./INSTALL.md)


## Host proxy

和 host 文件规则一致
```
192.168.100.1 your.domain.com your-anther.domain.com
```

## Socket proxy

新建分组加入以下规则（按自己实际情况修改）
```
SOCKS5 127.0.0.1:1080
SOCKS 127.0.0.1:1080
```

## License

[MIT](https://opensource.org/licenses/MIT)

## Thanks

* [bulma](https://bulma.io/)
* [react](https://reactjs.org/)

## Support

![Support this project](https://user-images.githubusercontent.com/458894/32358969-179e7a28-c085-11e7-882a-485164168f74.png)
