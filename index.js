$(function(){
  /*nav*/
  var $nav=$("ul.nav")
  var $page2=$("#page-two")
  window.onscroll=function(){
    var scrollTop=document.documentElement.scrollTop;
    if(scrollTop>=500)
      $nav.addClass("fixed")
    else
      $nav.removeClass("fixed")
    if(scrollTop<=736){
      $nav.children().removeClass("active").first().addClass("active")
    }else if(scrollTop<=1618){
      $nav.children().removeClass("active")
      $nav.children(":nth-child(2)").addClass("active")
    }else if(scrollTop<=2502){
      $nav.children().removeClass("active")
      $nav.children(":nth-child(3)").addClass("active")
    }else if(scrollTop<=4113){
      $nav.children().removeClass("active")
      $nav.children(":nth-child(4)").addClass("active")
    }else if(scrollTop<=5066){
      $nav.children().removeClass("active")
      $nav.children(":nth-child(5)").addClass("active")
    } 
  }
  /*page-two click*/
  var $div=$page2.children().children().last()
  $div.on("click","span",function(e){
    var $span=$(this)
    var $pDiv=$span.parent().prev()
    var $pUl=$pDiv.children()
    if(!$span.is(".active")){
      if($span.is(":first-child")){
        $pUl.css("top","0")
        $span.addClass("active")
        $span.next().removeClass("active")
      }else if($span.is(":last-child")){
        $pUl.css("top","-285px")
        $span.addClass("active")
        $span.prev().removeClass("active")
      }
    }
  })

  /*page-three hover*/
  var $ul=$("#page-three>div>div>ul")
  $ul.on("mouseover","li",function(){
    var $li=$(this)
    $li.children("a.mask").css("top",0)
    .next().css("top",187.5)
  }).on("mouseout","li",function(){
    var $li=$(this)
    $li.children("a.mask").css("top",187.5)
    .next().css("top",256.25)
  })
  /*轮播*/
  var $photos=$("#page-four div.photos")
  /* 右移 */
  function movert(a){
    var parent=a.parent().children().first()
    var img=parent.children(".show")
    if(img.next().length!=0){
      img.removeClass("show").next().addClass("show")
    }else{
      img.removeClass("show").parent().children(":first-child").addClass("show")
    }
  }
  /* 左移 */
  function movelt(a){
    var parent=a.parent().children().first()
    var img=parent.children(".show")
    if(img.prev().length!=0){
      img.removeClass("show").prev().addClass("show")
    }else{
      img.removeClass("show").parent().children(":last-child").addClass("show")
    }
  }
  /* 左右移动 */
  $photos.children(".lt").on("click",function(e){
    e.preventDefault();
    movelt($(e.target));
  })
  .next().on("click",function(e){
    e.preventDefault();
    movert($(e.target));
  })
  /* 轮播定时器 */
  setInterval(function(){
    movert($(".photos").first().children().last())
    movert($(".photos").last().children().last())
  },3000)

  /* 表单提交 */
  $("#page-five form span").on("click",function(){
    var $span=$(this)
    var $name=$span.parent().children(":nth-child(2)")
    var $address=$span.parent().children(":nth-child(3)")
    var $message=$span.prev()
    if(!confirm("submit?yes or no"))
      return;
    else{
      var reg=/^\w+@\w+.\w+$/
      if($name.val()==""){
        alert("name 不能为空！")
      }else if(!reg.test($address.val())){
        alert("输入地址有误！")
      }else{
        var name=$name.val()
        var address=$address.val()
        var message=$message.val();
        (async function(){
          var res=await $.ajax({
            url:"http://localhost:3000/index/submit",
            type:"get",
            data:{name,address,message},
            dataTyep:"json",
          })
          if(res.ok==1){
            $name.val("Name")
            $address.val("Email Address")
            $message.val("Message");
          }
        })()
      }
    }
  })
})
