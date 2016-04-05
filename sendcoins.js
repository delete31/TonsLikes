//ipad的层次有iphone版有些区别，比如弹出的inbox，所以在需要区分的地方加上了设备的判断
#import "tuneup/tuneup.js";
#import "ynm3k/robot4ios/importAll.js";

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.windows()[0];

var friend = "deletele55";//定义要成功发送的好友账号
var failfriend = "deletele";//定义还不是我们用户的账号（该账号一直不是我们的用户，如果有问题要改个用户）

UIALogger.logMessage("发送金币");


Finder.findElementByName("coinsButton").tap();//进入到金币界面
Waiter.wait(2);

Finder.findElementByName("send").tap();//进入到发送界面
Waiter.wait(2);

Finder.findElementByName("friendid").setValue(friend);//搜索框中赋值
Finder.findElementByName("Return").tap();

Waiter.wait(2);

while(Finder.findElementByName(friend).isVisible()!="1"){//等待直到能看到friend的ID，如果这个脚本使用中一直在运行，但是一直不动，那么估计就是这个出问题了
    Waiter.wait(2);}

Finder.findElementByName(friend).tap();


while(Finder.findElementByName("totalcoins").isVisible()!="1"){
    Waiter.wait(2);}

var coinsvalue = Finder.findElementByName("totalcoins").value();

var strs= new Array();
strs=coinsvalue.split(" ");//totalcoins格式是空格将金币数和coins分开
coins = strs[0];

var sendcoins = coins-1;//定义能最后发送成功的金币数
var failcoins = coins+100;//定义不能发送，即输入的金币数大于自己的金币数，send按钮不可点的情况

var moneytext = Finder.findElementByName("moneytext");//定义金币输入框

if(target.model() == "iPad"){
    var sendbutton = window.navigationBars()[1].buttons()["Send"];//用的是navigationbar上右边的按钮，不是标准的rightbutton
}
else{
    var sendbutton = window.navigationBars()[0].buttons()["Send"];
}

test("010_输入小于100的金币数，send按钮不可点",
     function(){
     moneytext.setValue("99");
     Assert.element_is_not_enabled(sendbutton,"小于100，发送按钮可点");
     });

test("011_输入大于自身的金币数，send按钮不可点",
     function(){
     moneytext.setValue(failcoins);
     Assert.element_is_not_enabled(sendbutton,"大于自身金币数，发送按钮可点");
     });

test("012_输入比自身金币数小1的金币数,send按钮可点",
     function(){
     moneytext.setValue(sendcoins);
     Assert.element_is_enabled(sendbutton,"比自身金币数小1的金币数，金币数不可点（大于100）");
     });

sendbutton.tap();

Waiter.wait(5);

test("013_发送成功后回到Find your friends界面",
     function(){
        if(target.model() == "iPad"){
            Assert.areEqual("Find your Friend",window.navigationBars()[1].name());
        }
        else{
            Assert.areEqual("Find your Friend",window.navigationBars()[0].name());
        }
     });


Finder.findElementByName("btn back normal").tap();

Waiter.wait(2);

test("014_发送完毕，剩余金币数为1",
     function(){
     Assert.areEqual(1,Finder.findElementByName("coins").value());
     });


Finder.findElementByName("send").tap();//再次进入到发送金币界面
Waiter.wait(2);

Finder.findElementByName("friendid").setValue(failfriend);
Finder.findElementByName("Return").tap();

Waiter.wait(2);

while(Finder.findElementByName(failfriend).isVisible()!="1"){
    Waiter.wait(2);}

Finder.findElementByName(failfriend).tap();

if(target.model() == "iPad"){//等待进入到邀请界面
    while(window.navigationBars()[1].name()!="Invite"){
        Waiter.wait(2);}
}
else{
    while(window.navigationBars()[0].name()!="Invite"){
        Waiter.wait(2);}
}


test("015_发送金币，选择的用户不是instalike用户，出现invitefriends按钮",
     function(){
     Assert.element_is_visible(Finder.findElementByName("Send An Invitation"));
     });

Finder.findElementByName("btn back normal").tap();

Waiter.wait(2);

Finder.findElementByName("btn back normal").tap();

Waiter.wait(2);


Finder.findElementByName("back").tap();

Finder.findElementByName("Get Coins").tap();//最后回到get coins界面

