//接acceptcoins，默认当前为第二个用户，所以通过侧边栏中的用户以及金币数确认是否切换了账号
#import "tuneup/tuneup.js";
#import "ynm3k/robot4ios/importAll.js";

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.windows()[0];

var changeaccount = "delete31";//要切换的用户名

UIALogger.logMessage("切换账号");
var crossbutton = Finder.findElementByName("CrossButton");
crossbutton.tap();
Waiter.wait(2);
var inbox = Finder.findElementByName("Inbox");
inbox.tap();
Waiter.wait(2);
Finder.findElementByName("btn back normal").tap();
Waiter.wait(2);

if(Finder.findElementByName(changeaccount).isValid()){//点击要切换的账号
    Finder.findElementByName(changeaccount).tap();
    Waiter.wait(2);
}
else{//针对ios7做的修改，如果需要切换账号的不是第一个账号，需要在下面的cells()[]进行修改
    window.tableViews()[0].cells()[0].tap();
    Waiter.wait(2);
}
     
crossbutton.tap();
Waiter.wait(2);
inbox.tap();
Waiter.wait(2);
     
test("019_切换用户",
     function(){//查看当前的用户名，并进行判断
        if(target.model() == "iPad"){
            var nowname = window.navigationBars()[1].name();
        }
        else{
            var nowname = window.navigationBars()[0].name();
        }
        UIALogger.logMessage("当前用户名为" + nowname);
        Assert.areEqual(changeaccount,nowname);
     });
Finder.findElementByName("btn back normal").tap();
Waiter.wait(2);
window.flickInsideWithOptions({startOffset:{x:0.8,y:0.5},endOffset:{x:0.2,y:0.5},duration:0.5});