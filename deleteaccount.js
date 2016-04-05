//删除账号，直到删除最后一个账号后重新登录一个账号
#import "tuneup/tuneup.js";
#import "ynm3k/robot4ios/importAll.js";

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.windows()[0];

var username = "delete31";//定义账号密码，用来在删除最后一个账号后登录
var password = "lihui12345";
UIATarget.onAlert = function onAlert(alert) {//警告框的自动判断，如果警告框的title是“Are you sure”则点击OK。删除账号时弹出
    var title = alert.name();
    UIALogger.logWarning("Alert with title '" + title + "' encountered.");
    if (title == "Are you sure?") {
        alert.buttons()["Ok"].tap();
        return true; //alert handled, so bypass the default handler
    }
    // return false to use the default handle r
    return false;
}

Finder.findElementByName("CrossButton").tap();
Waiter.wait(2);
for(var i = window.tableViews()[0].cells().length;i>1;i--){//通过cells的长度判断是否继续进行删除账号
    Finder.findElementByName("Settings").tap();
    Waiter.wait(2);
    Finder.findElementByName("Sign Out").tap();
    Waiter.wait(2);
    
    UIALogger.logMessage(window.navigationBars()[0].name());
    
    if(window.navigationBars()[0].name() != "TonsLikes" && window.navigationBars()[0].name() != "SLIMLEarnCoinsView"){//ios7奇葩的navigationbar name
        test("021_删除了最后一个账号回到login界面",
             function(){
                Assert.element_is_visible(Finder.findElementByName("login"));
             });
        Finder.findElementByName("login").tap();
        Finder.findElementByValue("Username(NOT email)").setValue(username);
        Finder.findElementByValue("Password").setValue(password);
        Finder.findElementByName("Done").tap();
        while(Finder.findElementByName("CrossButton").isVisible()!="1"){
        Waiter.wait(2);}
    }
    else{
        test("020_删除了非最后一个账号，继续logout",
             function(){
             Assert.element_is_visible(Finder.findElementByName("CrossButton"));
             });
        Finder.findElementByName("CrossButton").tap();
        Waiter.wait(2);
    }
}

