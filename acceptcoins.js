#import "tuneup/tuneup.js";
#import "ynm3k/robot4ios/importAll.js";
var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.windows()[0];

UIALogger.logMessage("接收金币");
Finder.findElementByName("coinsButton").tap();
Waiter.wait(2);
var coins = Finder.findElementByName("coins").value();
UIALogger.logMessage("当前金币数为"+coins.toString());
Finder.findElementByName("back").tap();
Waiter.wait(2);
Finder.findElementByName("CrossButton").tap();
Waiter.wait(2);
Finder.findElementByName("Inbox").tap();
Waiter.wait(2);

if(target.model() == "iPad"){//针对ipad版本做的修改
    var accept = window.tableViews()[1].cells()[0].name();
    var strs= new Array();
    strs=accept.split(",");
    acceptcoin = strs[0];
}
else{
    var accept = window.tableViews()[0].cells()[0].name();//针对ios7做的修改，ios8 accept就是金币数，ios7 是金币数，username，send from，Date
    var strs= new Array();
    strs=accept.split(",");
    acceptcoin = strs[0];
}

UIALogger.logMessage("接收的金币数为"+acceptcoin);
Finder.findElementByName("Accept").tap();//window.tableViews()[0].cells()[0].buttons["Accept"].tap();无效，现在的写法默认是点击第一个的accept，后期再调整
Waiter.wait(2);
app.navigationBar().buttons()["coinsButton"].tap();
Waiter.wait(2);
test("018_接收后金币数是否正确",
    function(){
        Assert.areEqual((Finder.findElementByName("coins").value()-coins),acceptcoin);//通过现在的金币数减去之间的金币数和接受的金币数进行比较来判断金币数增加正确
        });
Finder.findElementByName("back").tap();
Waiter.wait(2);
Finder.findElementByName("btn back normal").tap();
Waiter.wait(2);
window.flickInsideWithOptions({startOffset:{x:0.8,y:0.5},endOffset:{x:0.2,y:0.5},duration:0.5});//左滑回到get coins界面
     