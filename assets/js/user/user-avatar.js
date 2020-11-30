$(function () {
  var token = localStorage.getItem("token");
  var layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);
  //点击上传之后模拟点击文件域
  $(".upload").on("click", function () {
    $("#file").click();
  });
  //替换照片，给文本框添加change事件
  //e.target.files获取照片相关信息
  $("#file").on("change", function (e) {
    var filelist = e.target.files;
    console.log(filelist);
    //更换裁剪的图片
    //1.拿到用户选择的文件
    var file = e.target.files[0];
    //2.根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(file);
    // 3.先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  $(".sure").on("click", function () {
    //4.将裁剪后的图片，输出为 base64 格式的字符串
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    //将获取到的图片进行上传
    $.ajax({
      method: "POST",
      url: "http://ajax.frontend.itheima.net/my/update/avatar",
      headers: {
        Authorization: token,
      },
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新图片失败！");
        } else {
          layer.msg("更换头像成功！");
          window.parent.getUserInfo();
        }
      },
    });
  });
});
