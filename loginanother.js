#import "tuneup/tuneup.js";
#import "ynm3k/robot4ios/importAll.js";
var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.windows()[0];

var username = "deletele55";//定义账号密码
var password = "test12345";

UIALogger.logMessage("登录另一个未登录的账号");

Finder.findElementByName("CrossButton").tap();
Waiter.wait(2);
clength = window.tableViews()[0].cells().length;//获取当前的cell长度，通过cell的长度来判断是否增加了新的账号
Finder.findElementByName("Add Account").tap();//点击增加账号
Waiter.wait(1);
Finder.findElementByName("login").tap();
Waiter.wait(2);

Finder.findElementByValue("Username(NOT email)").setValue(username);
Finder.findElementByValue("Password").setValue(password);
Finder.findElementByName("Done").tap();
while(Finder.findElementByName("CrossButton").isVisible()!="1"){//等待进入到get coins界面
Waiter.wait(2);}
Waiter.wait(10);//对评价框进行规避，登录第二个账号后等待几秒后会有评价框弹出
    if(Finder.findElementByName("No, thanks").isVisible()){
        Finder.findElementByName("No, thanks").tap();
     }
Finder.findElementByName("CrossButton").tap();
Waiter.wait(2);
newclength = window.tableViews()[0].cells().length;//定义现在的cells的长度
test("016_登录未登录的账号，登录成功",
    function(){
        Assert.areEqual(1,newclength-clength);//判断cells是不是变长了，长了说明增加了新的账号
     });

UIALogger.logMessage("登录另一个已经登录的账号");

Finder.findElementByName("Add Account").tap();
Finder.findElementByName("login").tap();
Waiter.wait(2);

Finder.findElementByValue("Username(NOT email)").setValue(username);
Finder.findElementByValue("Password").setValue(password);
Finder.findElementByName("Done").tap();
while(Finder.findElementByName("CrossButton").isVisible()!="1"){
Waiter.wait(2);}

Finder.findElementByName("CrossButton").tap();
Waiter.wait(2);
newclength = window.tableViews()[0].cells().length;
test("017_登录已经登录的账号，登录成功，左侧边栏只显示一个该用户",
     function(){
     Assert.areEqual(1,newclength-clength);//这里的clength还是在登录第一个账号之前定义的账号，所以差值应该还是1
     });


//target.frontMostApp().mainWindow().buttons()[4].tap();
window.flickInsideWithOptions({startOffset:{x:0.8,y:0.5},endOffset:{x:0.2,y:0.5},duration:0.5});