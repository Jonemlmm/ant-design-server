let { app } = require("./app");
let { users } = require("./data/users"); // TODO: 更换为数据库真实数据
let { cars } = require("./data/cars"); // TODO: 更换为数据库真实数据

// 登录接口
app.post("/login", (req, res) => {
  // 获取前端登录数据
  let { username, password } = req.body;
  let user = users.find(
    (r) => r.username == username && r.password == password
  );
  if (user) {
    res.send({
      success: true,
      message: "登录成功",
      data: user,
    });
    console.log(`登录:${user.role.name}`);
  } else {
    res.send({
      success: false,
      message: "账户或密码错误",
      data: {},
    });
    console.log("User not found");
  }
});

// 查询车辆信息接口(筛选,分页)
app.get("/carsList", (req, res) => {
  // 获取前端发来的数据
  let { pageIndex, pageSize, name } = req.query;
  // 根据名称筛选数据
  let ret = cars.filter((c) => c.name.includes(name));
  // 获取指定页的数据
  let data = ret.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
  res.send({
    count: ret.length,
    data,
  });
});

// 添加车辆信息接口
app.post("/carAdd", (req, res) => {
  if (cars.some((c) => c.no == req.body.no)) {
    res.send({
      success: false,
      msg: "添加的车牌号已存在",
    });
  } else {
    res.send({
      success: true,
      msg: "添加成功",
    });
    cars.push(req.body);
  }
});

// 删除车辆信息接口
app.delete("/delCar", (req, res) => {
  let { no } = req.query;
  let index = cars.findIndex((c) => c.no == no);
  cars.splice(index, 1);
  res.send({
    success: true,
    msg: "删除成功",
  });
});

// 获取车辆信息接口
app.get("/getCar", (req, res) => {
  let { no } = req.query;
  let car = cars.find((c) => c.no == no);
  res.send({
    success: true,
    msg: "获取成功",
    data: car,
  });
});

// 修改车辆信息接口
app.put("/updateCar", (req, res) => {
  let car = req.body;
  let index = cars.findIndex((c) => c.no == car.no);
  cars[index] = req.body;
  res.send({
    success: true,
    msg: "修改成功",
  });
});
