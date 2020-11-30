$(function () {
  var form = layui.form;
  var layer = layui.layer;
  var token = localStorage.getItem("token");
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var password = $(".repwd").val();
      if (value !== password) {
        return "两次密码输入有误，请重新输入！";
      }
    },
  });

  //给表单添加一个submit事件
  $("#userPwdReset").on("click", function (e) {
    e.preventDefault();
    $(".form_resetPwd")[0].reset();
  });
  $(".form_resetPwd").on("submit", function (e) {
    e.preventDefault();
    var value = $(".form_resetPwd").serialize();
    $.ajax({
      method: "POST",
      url: "http://ajax.frontend.itheima.net/my/updatepwd",
      data: value,
      headers: {
        Authorization: token,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("修改密码失败！");
        } else {
          layer.msg("修改密码成功，请重新登陆！");
          $(".form_resetPwd")[0].reset();
        }
      },
      complete: function (res) {
        console.log(res.responseJSON);
        if (
          res.responseJSON.status === 1 &&
          res.responseJSON.message === "原密码错误！"
        ) {
          return layer.msg(res.responseJSON.message);
        } else {
          localStorage.removeItem("token");
          window.parent.location.href = "/login.html";
        }
      },
    });
  });
});
