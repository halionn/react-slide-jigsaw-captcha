##### react-slide-captcha
http://dun.163.com/trial/jigsaw-wap

1. jpg都没问题，png显示不出来，改用静态测试没问题。去掉url-loader就好了，后面再解决。
2. pc端拖动一个区块使用mousedown->mousemove-mouseup
移动端使用touchmove->touchend即可，可能为了和pc端处理保持一致，所以用了touchstart->touchmove-touchend
3. 结论，可以看出163不同尺寸获取的是不同的图片。这里我考虑只统一获取iphon6下的尺寸图片，用自适应flexible显示，提交坐标时提交x方向移动的百分比，或者用固定的尺寸乘以该百分比提交
4. 可通过dom的clientWidth获取元素的宽度
```
this.refs.ctrl.clientWidth
```
5. 希望手机访问webpack-dev-server，首先查看本机ip，然后在npm启动命令后加 -- ip即可，比如
```
"start": "set NODE_ENV=dev&webpack-dev-server --progress --colors --host 10.11.19.176",
```
注意，我机子在99bill的ip经常变，所以要具体看一下。要修改package.json里的ip和
webpack.config.js中mock api的ip,还有mock数据中的图片url ip
6. 向服务端发送offsetx/总可滑动距离，的百分比，这样各个尺寸都一致,
服务端支持左右各偏移0.05个百分点的模糊匹配





待完善:
1. 高度自适应 (完成)
2. 拼图图片会比slider按钮宽一些，如果移动的距离一致，slider到头时，拼图会超出
边框，解决和slider的解决方法一致。获取图片宽度和拼图宽度，计算最大可移动距离，超出就按最大算即可。
最后提交的距离还是按slider的来提交。

待做：
1. 拖动 (完成)
2. onTouchStart是否不需要 (完成)
3. 宽屏拖动时距离问题 (完成)
4. 不可向左拖动(完成)，向右拖动时不可超出可拖范围 (完成)
5. 图片url获取接口 (完成)
6. 图片刷新、加载效果
7. 拖动结束立即发送坐标到服务端验证是否匹配 (完成)
8. 改用webpack3 (完成)