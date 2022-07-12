// 引入express
express = require("express");
// 创建服务器
app = express();

// 设置允许接收json格式的数据
app.use(express.json());
// 设置允许接收urlencoded格式的数据
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // 设置响应头 设置允许跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 响应头 *表示所有类型的头信息都可以接受
  res.setHeader("Access-Control-Allow-Headers", "*");
  // 设置响应头 允许出post/get以外的请求访问
  res.setHeader("Access-Control-Allow-Methods", "*");
  // 放行
  next();
});

// 启动服务器
app.listen(8800, () => {
  console.log("listening on 8800");
});

// 导出app
exports.app = app;
