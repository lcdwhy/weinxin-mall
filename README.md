# weinxin-mall
基于微信小程序-购物商城
# 用户登陆模块	
用户点击进入小程序界面，点击登陆按钮，进行登陆，当点击登陆后会跳出微信授权窗口，选择允许绑定自身微信账号。（图三为登陆成功界面）
1.界面展示

2.代码实现：

使用navigator组件，点击登陆按钮，跳转到/pages/login/index登陆页面上，点击按钮会触发微信提供的API-open-type=“getUserInfo”,已申请获得微信权限，还会触发headleGetUserInfo事件，将登陆用户的数据存储。

5.2  首页模块
进入小程序网上商城后，默认第一个页面是首页页面，首页页面可以分成4个小模块，分别为：搜索框、轮播图、导航条、热门推荐。其界面如下图：


5.2.1搜索框模块
在首页中将搜索框封装成一个组件SearchInput，通过导入组件的方式来使用，使得首页页面更为整洁，而且复用性高。

组件SearchInput

当点击搜索框按钮时，则会跳转到url为/pages/search/inex 的搜索界面

5.2.2轮播图模块
轮播图模块使用了微信小程序自带的swiper原生组件，并且组件中嵌套了navigator组件，点击按钮会跳转到对应商品界面。代码如下

5.2.3导航条模块
导航条模块中，点击其中一个按钮，会跳转到对应界面。


5.2.4热门推荐模块

5.3  分类模块
分类模块可以分成两个小模块，即搜索框模块和分类详情模块。

同首页模块中一样，我们也是用到了我们自己封装的搜索组件SearchInput，在多个页面中多次出现的我们可以封装起来使用，优点是使界面简洁，复用性高。

在头部搜索框往下，则是分类界面中的主要模块-商品分类模块，商品分类模块在设计中将其分成了左侧菜单和右侧菜单，左侧菜单是一个个搜索条，当点击左侧菜单中的其中一个分类选择条，右侧菜单则会显示出对应分类搜索条详情。例如：
		
代码如下：

5.4  购物车模块
在商品详情页面中，将所选的商品添加进购物车中，点击进入购物车界面，我们可以看到所选的商品成功添加进购物车中。


购物车界面分为三块小模块：地址栏信息模块、购物车商品、结算模块。
5.4.1  地址栏信息模块
点击地址栏，可以进入地址栏界面进行操作

如果还没进行地址栏信息填写的话，呈现界面如下：

点击获取收获地址，会触发事件headleChooseAddress,详细代码如下：

5.4.2  购物车商品模块

5.4.3  结算模块
结算模块中包括全选、结算功能，点击其button分别触发allCHecked、headlePay事件

结算功能对应事件headlePay对应代码如下：