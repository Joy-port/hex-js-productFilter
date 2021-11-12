"use strict";

// 版型資料設計
// 地區用 change 監聽
// 上方新增的地區跟下方篩選的地區都寫死選項（依照目前提供的 JSON data area 欄位）
// 地區的篩選下拉需要加上『全部地區』option
// 不需要有「清除資料」的按鈕
// 預設資料為 3 筆（內容需依照目前提供的 JSON data）
// 篩選後會顯示『搜尋資料為 ? 筆』
// 描述欄位使用 textarea
// 星級區間是 1-10 分
// 金額、組數、星級的 type 為 Number
var list = document.querySelector('.list');
var selectLocation = document.querySelector('.category-group');
var total = document.querySelector('.js-totalNum');
var form = document.querySelector('.search-lists');
var submitBtn = document.querySelector('.js-btn');
var formLocation = document.querySelector('.js-location');
var formInput = Array.from(form.querySelectorAll('.input-primary')); //week 5 data

var data = [{
  location: '台北',
  title: '綠島自由行套裝行程',
  description: '嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。',
  rating: 8.6,
  inStock: 8,
  price: 1280,
  imgUrl: './assets/images/1.png'
}, {
  location: '台北',
  title: '清境高空觀景步道二日遊',
  description: '清境農場青青草原數十公頃碧草，餵食著數以百計的綿羊和牛群，中央山脈最高的北三段群峰形成一堵如帶的高牆，攔住清晨的薄霧山嵐，成就了從花蓮翻山而來的雲瀑在濁水溪谷積成雲海，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。',
  rating: 8.2,
  inStock: 12,
  price: 2580,
  imgUrl: './assets/images/2.png'
}, {
  location: '台中',
  title: '南庄度假村露營車二日遊',
  description: '南庄雲水豪華露營車，快來擁有最愜意的露營體驗吧！ 一泊一食，輕鬆享受露營車樂趣。 獨立衛浴與私人戶外露臺。 入住豪華露營車還能使用戶外SPA大眾湯，感受美人湯魅力。',
  rating: 9.2,
  inStock: 2,
  price: 2480,
  imgUrl: './assets/images/3.png'
}, {
  location: '台中',
  title: '山林悠遊雙人套票',
  description: '山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點，帶您飽覽南投瑰麗的自然環境，體驗變化無窮的地形景觀，喜歡挑戰高空的您一定不可錯過。 （含雙龍瀑布入場券 x2）',
  rating: 9.3,
  inStock: 0,
  limit: '限時搶購',
  price: 880,
  imgUrl: './assets/images/4.png'
}, {
  location: '台中',
  title: '漁樂碼頭釣魚體驗套票',
  description: '台中全新親子景點寶熊漁樂碼頭，為知名釣具公司「OKUMA」所創立的觀光工廠。一樓藍白希臘漁村風商店街免費參觀。二樓釣魚故事館則設立全台唯一虛擬釣場，透過導覽讓你知道如何釣魚、魚餌怎麼區分，寓教於樂的台中景點！',
  rating: 8.2,
  inStock: 5,
  price: 1280,
  imgUrl: './assets/images/5.png'
}, {
  location: '高雄',
  title: '熊森公園親子二日遊套票',
  description: '來自日本最受歡迎的兒童遊樂園《 BearSon Park 熊森公園》於全世界有800多家據點，在全世界、日本及台灣，很多小孩的童年都在遊戲愛樂園裡一同成長，提供兒童一個最富教育性及娛樂性的休憩遊樂天地！',
  rating: 8.6,
  inStock: 3,
  price: 2480,
  imgUrl: './assets/images/6.png'
} // {
//   "id": 0,
//   "name": "肥宅心碎賞櫻3日",
//   "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//   "area": "高雄",
//   "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//   "group": 87,
//   "price": 1400,
//   "rate": 10
// },
// {
//   "id": 1,
//   "name": "貓空纜車雙程票",
//   "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//   "area": "台北",
//   "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//   "group": 99,
//   "price": 240,
//   "rate": 2
// },
// {
//   "id": 2,
//   "name": "台中谷關溫泉會1日",
//   "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//   "area": "台中",
//   "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//   "group": 20,
//   "price": 1765,
//   "rate": 7
// }
]; //week 6 data

var url = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json'; // Make a request for a user with a given ID

function getApi() {
  axios.get(url).then(function (res) {
    // handle success
    data = res.data.data;
    console.log(data);
    renderData(data);
    renderSelect(data);
  })["catch"](function (error) {
    // handle error
    console.log(error);
  });
} //資料渲染


function renderData(inputData) {
  //渲染當前票券資訊
  var str = '';
  inputData.forEach(function (item) {
    var content = "<li class=\"col-md-6 col-lg-4 mb-4\">\n        <div class=\"card d-flex flex-column h-100\">\n            <div class=\"card-tag-top\">".concat(item.area, "</div>\n            <img src=\"").concat(item.imgUrl, "\" alt=\"product img\" class=\"card-img-top\">\n            <div class=\"card-body d-flex flex-column justify-content-between position-relative h-100\">\n              <div className=\"h-100\">\n                <div class=\"card-tag-middle\">").concat(item.rate, "</div>\n                <h3 class=\"text-primary h4 border-0 border-bottom border-primary lh-base | mb-6\">").concat(item.name, "</h3>\n                <p class=\"mb-4\">").concat(item.description, "</p>\n              </div>\n              <div class=\"d-flex justify-content-between align-items-center flex-wrap gap-1\">\n                  <p class=\"text-primary align-middle text-nowarp ").concat(item.group !== 0 ? 'd-block' : 'd-none', "\">\n                      <span class=\"material-icons-outlined me-1 align-middle card-icon\">\n                      error\n                      </span>\n                      \u5269\u4E0B\u6700\u5F8C <span>").concat(item.group, "</span> \u7D44\n                  </p>\n                  <p class=\"text-primary align-middle text-nowarp ").concat(item.group !== 0 ? 'd-none' : 'd-block', "\">\n                      <span class=\"material-icons-outlined me-1 align-middle card-icon\">\n                      error\n                      </span>\n                      ").concat(item.limit, "\n                  </p>\n                  <p class=\"text-primary align-middle text-nowarp\">\n                      TWD <span class=\"h2 mb-0 ms-1 align-middle\">$").concat(item.price, "</span>\n                  </p>\n              </div>\n          </div>\n          </div>\n      </li>\n    ");
    str += content;
  });
  list.innerHTML = str;
}

function renderSelect(inputData) {
  //渲染地區資料
  var str = '';
  var selectGroup = inputData.map(function (item) {
    return item.area;
  });
  var newSelectGroup = selectGroup.filter(function (item, index) {
    return selectGroup.indexOf(item) === index;
  });
  var selectStr = '<option value="全部地區" selected>全部地區</option>';
  newSelectGroup.forEach(function (item) {
    var content = "\n    <option value=\"".concat(item, "\">").concat(item, "</option>\n    ");
    str += content;
  });
  selectLocation.innerHTML = selectStr + str;
  formLocation.innerHTML = "<option selected disabled value=\"\">\u8ACB\u9078\u64C7\u666F\u9EDE\u5730\u5340</option>" + str;
  total.textContent = inputData.length;
} // 顯示地區資料篩選


function switchLocation(e) {
  //console.log(e.target.value);
  var filterData = [];

  if (e.target.value === '全部地區') {
    filterData = data;
  } else {
    filterData = data.filter(function (item) {
      return e.target.value === item.area;
    });
  }

  ;
  selectLocation.value = e.target.value;
  var totalNum = filterData.length;
  total.textContent = totalNum;
  renderData(filterData);
}

; //新增商品

function addProduct(e) {
  e.preventDefault();

  if (!e.target.classList.contains('js-btn')) {
    return;
  }

  ;
  var valueAry = formInput.map(function (item) {
    return item.value;
  });
  var product = {
    title: valueAry[0],
    imgUrl: valueAry[1],
    location: valueAry[2],
    price: format(valueAry[3]),
    inStock: valueAry[4],
    rating: valueAry[5],
    description: valueAry[6],
    id: new Date().getTime()
  };
  data.push(product);
  formInput.forEach(function (item, index) {
    item.value = "";
    formInput[index].classList.remove('is-valid');
  });
  formLocation.value = "請選擇景點地區";
  submitBtn.classList.add('disabled');
  renderData(data);
} //加入千分位符號


function format(value) {
  var reg = /\d{1,3}(?=(\d{3})+$)/g;
  return (value + '').replace(reg, '$&,');
}

; //表單驗證

function checkValidation() {
  formInput.forEach(function (item, index) {
    if (item.value.trim() === '') {
      formInput[index].classList.add('is-invalid');
    } else {
      formInput[index].classList.remove('is-invalid');
      formInput[index].classList.add('is-valid');
    }

    ;

    if (item.classList.contains('is-invalid')) {
      submitBtn.classList.add('disabled');
    } else {
      submitBtn.classList.remove('disabled');
    }

    ;
  });
  var input = formInput[5].value; //判斷票數數量

  if (parseInt(input) > 0 && parseInt(input) <= 10) {
    formInput[index].classList.remove('is-invalid');
    formInput[5].classList.add('is-valid');
  } else {
    formInput[5].classList.add('is-invalid');
  }

  ;
} //預設渲染


function init() {
  getApi();
  selectLocation.addEventListener("change", switchLocation);
  formInput.forEach(function (item) {
    return item.addEventListener('keyup', checkValidation);
  });
  submitBtn.addEventListener("click", checkValidation);
  submitBtn.addEventListener("click", addProduct);
}

init();
//# sourceMappingURL=all.js.map
