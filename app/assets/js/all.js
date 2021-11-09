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
const list = document.querySelector('.list');
const selectLocation = document.querySelector('.category-group');
const total = document.querySelector('.js-totalNum');
let data =[
  {
    location: '台北',
    title: '綠島自由行套裝行程',
    description: '嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。',
    rating: 8.6,
    inStock: 8,
    price: 1280,
    imgUrl: './assets/images/1.png'
  },
  {
    location: '台北',
    title: '清境高空觀景步道二日遊',
    description: '清境農場青青草原數十公頃碧草，餵食著數以百計的綿羊和牛群，中央山脈最高的北三段群峰形成一堵如帶的高牆，攔住清晨的薄霧山嵐，成就了從花蓮翻山而來的雲瀑在濁水溪谷積成雲海，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。',
    rating: 8.2,
    inStock: 12,
    price: 2580,
    imgUrl: './assets/images/2.png'
  },
  {
    location: '台中',
    title: '南庄度假村露營車二日遊',
    description: '南庄雲水豪華露營車，快來擁有最愜意的露營體驗吧！ 一泊一食，輕鬆享受露營車樂趣。 獨立衛浴與私人戶外露臺。 入住豪華露營車還能使用戶外SPA大眾湯，感受美人湯魅力。',
    rating: 9.2,
    inStock: 2,
    price: 2480,
    imgUrl: './assets/images/3.png'
  },
  {
    location: '台中',
    title: '山林悠遊雙人套票',
    description: '山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點，帶您飽覽南投瑰麗的自然環境，體驗變化無窮的地形景觀，喜歡挑戰高空的您一定不可錯過。 （含雙龍瀑布入場券 x2）',
    rating: 9.3,
    inStock: 0,
    limit: '限時搶購',
    price: 880,
    imgUrl: './assets/images/4.png'
  },
  {
    location: '台中',
    title: '漁樂碼頭釣魚體驗套票',
    description: '台中全新親子景點寶熊漁樂碼頭，為知名釣具公司「OKUMA」所創立的觀光工廠。一樓藍白希臘漁村風商店街免費參觀。二樓釣魚故事館則設立全台唯一虛擬釣場，透過導覽讓你知道如何釣魚、魚餌怎麼區分，寓教於樂的台中景點！',
    rating: 8.2,
    inStock: 5,
    price: 1280,
    imgUrl: './assets/images/5.png'
  },
  {
    location: '高雄',
    title: '熊森公園親子二日遊套票',
    description: '來自日本最受歡迎的兒童遊樂園《 BearSon Park 熊森公園》於全世界有800多家據點，在全世界、日本及台灣，很多小孩的童年都在遊戲愛樂園裡一同成長，提供兒童一個最富教育性及娛樂性的休憩遊樂天地！',
    rating: 8.6,
    inStock: 3,
    price: 2480,
    imgUrl: './assets/images/6.png'
  }
];

//資料渲染
function renderData(inputData){
  //渲染當前票券資訊
  let str ='';
  inputData.forEach(item => {
    let content =`<li class="col-md-6 col-lg-4 mb-4">
        <div class="card d-flex flex-column h-100">
            <div class="card-tag-top">${item.location}</div>
            <img src="${item.imgUrl}" alt="product img" class="card-img-top">
            <div class="card-body d-flex flex-column justify-content-between position-relative h-100">
              <div className="h-100">
                <div class="card-tag-middle">${item.rating}</div>
                <h3 class="text-primary h4 border-0 border-bottom border-primary lh-base | mb-6">${item.title}</h3>
                <p class="mb-4">${item.description}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center flex-wrap gap-1">
                  <p class="text-primary align-middle text-nowarp ${item.inStock!== 0 ? 'd-block': 'd-none'}">
                      <span class="material-icons-outlined me-1 align-middle card-icon">
                      error
                      </span>
                      剩下最後 <span>${item.inStock}</span> 組
                  </p>
                  <p class="text-primary align-middle text-nowarp ${item.inStock!== 0 ? 'd-none': 'd-block'}">
                      <span class="material-icons-outlined me-1 align-middle card-icon">
                      error
                      </span>
                      ${item.limit}
                  </p>
                  <p class="text-primary align-middle text-nowarp">
                      TWD <span class="h2 mb-0 ms-1 align-middle">$${item.price}</span>
                  </p>
              </div>
          </div>
          </div>
      </li>
    `;
    str += content ;
  });
  list.innerHTML = str;

  //渲染地區資料
  let selectGroup = data.map(item => item.location);
  let newSelectGroup = selectGroup.filter((item,index)=> selectGroup.indexOf(item)=== index);
  let selectStr= '<option value="全部地區" selected>全部地區</option>'
  
  newSelectGroup.forEach(item =>{
    let content =`
    <option value="${item}">${item}</option>
    `;
    selectStr += content;
  })
  selectLocation.innerHTML = selectStr;

}

renderData(data);

// 顯示地區資料篩選
function switchLocation(e){
  //console.log(e.target.value);
  let filterData = [];
  data.filter(item =>{
    if(e.target.value === '全部區域'){
      filterData = data;
    }else if(e.target.value === item.location){
      filterData.push(item);
    };
  });
  let totalNum = filterData.length;

  
  renderData(filterData);
  selectLocation.value = e.target.value;
  total.textContent = totalNum;
  
};

selectLocation.addEventListener("change", switchLocation);