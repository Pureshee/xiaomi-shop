// 获取轮播框元素
let idxBanner = document.querySelector('.idx-banner')
let btn = document.querySelectorAll(".btn");
let bannerList = document.querySelector(".banner-list");
let bannerLi = document.getElementsByClassName('banner-li');
let bannerLiDot = document.getElementsByClassName('banner-li-dot')


// 图片宽度
let imgLi = bannerLi[0].offsetWidth;
// 图片数量
let imgNum = bannerLi.length;

// 轮播图总宽度
bannerList.style.width = imgNum*imgLi + 'px';
// 小圆点初始状态
let i = 0;
bannerLiDot[i].style.backgroundColor = 'red';
function setDot(step){
  bannerLiDot[i].style.backgroundColor = '#fff';
  i = i + step;
  if(i>3){
    i=0;
  } else if(i<0){
    i=3
  }
  bannerLiDot[i].style.backgroundColor = 'red';
}


let state = true; // 防抖
// 添加点击事件
for(let item of btn){
  item.addEventListener('click',function(){
    if(state){
      if(this.className == 'btn btn-right'){
        state = false;
        nextimg();
      } else if(this.className == 'btn btn-left'){
        state = false;
        preimg();
      }
    }
  })
}

// 下一张
function nextimg(){
  setDot(1)
  let left = 0;
  let preId = setInterval(()=>{
    bannerList.style.left = left + 'px';
    left -=5;
    if(left <= -imgLi){
      clearInterval(preId)
      bannerList.appendChild(bannerLi[0])
      bannerList.style.left = 0
      state = true
    }
  })

}
//上一张
function preimg(){
  setDot(-1)
  let left = -imgLi
  bannerList.insertBefore(bannerLi[bannerLi.length-1],bannerLi[0])
  bannerList.style.left = left + 'px'
  let preId = setInterval(()=>{
    bannerList.style.left = left + 'px'
    left +=5
    if(left >= 0){
      clearInterval(preId)
      bannerList.style.left = 0
      state = true
    }
  })
}

// 自动轮播
let autoPlay = setInterval(()=>{
  state = false;
  nextimg()
},2000)
// 移入鼠标暂停轮播
idxBanner.addEventListener('mouseenter',()=>{
  clearInterval(autoPlay)
})
// 移出鼠标继续轮播
idxBanner.addEventListener('mouseleave',()=>{
  autoPlay = setInterval(()=>{
    state = false;
    nextimg()
  },2000)
})

