$(function () {
  //点击去注册链接
  $("#login").on("click", function () {
    $(".login_box").hide();
    $(".reg_box").show();
  });

  //登录界面点击去登陆链接后
  $("#reg").on("click", function () {
    $(".login_box").show();
    $(".reg_box").hide();
  });
  //给密码框添加一个自定义正则
  var form = layui.form;
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //value拿的是确认密码框中的值
    repass: function (value) {
      //要拿到输入框中的值
      var pass = $(".reg_box .password").val();
      //对两次结果进行判断
      if (pass !== value) {
        return "两次输入的密码不一致";
      }
    },
  });
  //所有的校验做好之后监听表单的提交事件
  var layer = layui.layer; //创建一个layer对象
  $("#reg_form").on("submit", function (e) {
    e.preventDefault();
    var user = $(".reg_box .username").val();
    var pwd = $(".reg_box .password").val();
    $.ajax({
      type: "POST",
      url: "http://ajax.frontend.itheima.net/api/reguser",
      data: {
        username: user,
        password: pwd,
      },
      success: function (res) {
        if (res.status !== 0) {
          return console.log(res.message);
        } else {
          layer.msg("注册成功，请登录！");
          console.log(res);
          $("#reg_form")[0].reset();
          $("#reg").click();
        }
      },
    });
  });
  //登录的验证
  $("#login_form").on("submit", function (e) {
    e.preventDefault();
    //获取表单里面的所有内容
    var value = $("#login_form").serialize();
    $.ajax({
      url: "http://ajax.frontend.itheima.net/api/login",
      method: "POST",
      data: value,
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message);
        } else {
          localStorage.setItem("token", res.token);
          layer.msg("登陆成功！");
          $("#login_form")[0].reset();
          location.href = "index.html";
        }
      },
    });
  });
});
