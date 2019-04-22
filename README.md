### 这是一款基于react的日历组件

#### 使用方式

``` javascript
npm install react-calendar-zw
import Mycalendar from 'react-calendar-zw';
```

* 组件调用:

``` html
<Mycalendar
isShow={isShow}
currentDate={inpValue}
datePickCallBack={this.datePickCallBack}
clearBtnCallBack={this.clearBtnCallBack}
/>
``` 

* 查看效果
``` javascript
npm run dev
```
``` html
在浏览器中打开http://localhost:8080/即可查看效果
```

* 预览

#### 普通日历
![预览](./review.png?raw=true '预览')![预览](./year.png?raw=true '选择年')![预览](./month.png?raw=true '选择月')

#### 可显示内容的日历
![预览](./hasInfo.png?raw=true '预览')


#### 组件可配置项 props

名称|类型|必填|默认值|含义
---|:--:|:--:|:--:|---
isShow|boolean|no|false|控制日历显示隐藏
currentDate|string|no|当前日期(new Date())|日历选中的时间
language|string|no|'cn'|语言(支持'cn','en')
minDate|date string|no|无|控制日历最小可选日期(format:'YYYY/MM/HH','YYYY-MM-HH')
maxDate|date string|no|无|控制日历最大可选日期(format:'YYYY/MM/HH','YYYY-MM-HH')
footerBtns|array|no|['clear', 'now', 'confirm']|日历底部显示按钮(空数组表示不显示)
datePickCallBack|function|no|无|选择日期后的回调方法
clearBtnCallBack|function|no|无|日历底部'清空'按钮点击回调方法,注意：配置了footerBtns=['clear'],则必须配置此方法
isShowDateInfo|boolean|no|false|当日期中需要显示内容时,配置此属性为true,切换日历样式
highLightData|object|no|null|放置日期中显示的内容数据(格式:{date:value}),与isShowDateInfo配合使用
getDateInfoCallBack|function|no|no|切换日期时用于获取日期内容的回调方法,一般用于更新highLightData数据