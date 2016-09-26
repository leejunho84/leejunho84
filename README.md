#requireJS#
requireJs Modules [http://leejunho84.github.io/leejunho84/](http://leejunho84.github.io/leejunho84/)

**디렉토리 구조**
```
├── js
   ├── common
   │     ├── base.js
   │     └── plugin.js
   ├── controller
   │     ├── controll_common.js
   │     └── controll_main.js
   ├── lib
   │     └── 외부 라이브러리 ...
   ├── modules
   │     ├── module_canvas.js
   │     ├── module_carousel.js
   │     ├── module_colorMixer.js
   │     ├── module_colorPicker.js
   │     ├── module_coverFlowCounter.js
   │     ├── module_diff.js
   │     ├── module_freeLayer.js
   │     ├── module_pagiNation.js
   │     ├── module_slider.js
   │     ├──    ...
   │
   ├── require_index.js
   └── require.js

```


## module list

### slider ColorPicker
배열로 받은 컬러값의 사이 컬러값 계산

```javascript
var arrColor = ['#f7a2c9', '#fa9f9a'];
var colorPicker = new ColorPicker('.colorMixerSect', arrColor, 5).init().addSlider();
```


### Swiper

```javascript
var swipes = new Swipe($('.swiper-container')).init();
var carousel = new Carousel($('.carousel')).init();
var illusion = new Illusion('#circle');
```


### PagiNation

```javascript
var pagiNation = PagiNation('.paging', {
    totalList:1000,     // 총 리스트 수
    pagePerView:30,     // 페이지당 리스트 수
    pagePerBlock:10,    // 블럭수 
    onPageChangeStart:function(pagiNation){
        //페이지 이동 callbackFunc
        console.log('currentPage : ' + pagiNation.getCurrentPage());
        pagiNation.setPaging();
    }
}).init();
```


### pinterest style layout

```javasciprt
var freeLayer = new FreeLayer();
freeLayer.setLayerOptions({
    lineNum : 4,                // 페이지 내에 라인수
    listMargin: 10
    container : '.container',
    list : '.list',
    listWidth : 280,
}).init('.free-layer-box').setLayerPos();
```
