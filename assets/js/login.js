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
        console.log(res);
        if (res.status !== 0) {
          return alert("注册失败！");
        } else {
          $("#reg_form")[0].reset();
        }
      },
    });
  });
});
