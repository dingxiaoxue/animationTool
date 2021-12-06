function obj2str(obj) {
  return Object.keys(obj).filter(item => obj[item]).reduce((prev, cur) => prev += (`${cur}:${obj[cur]};`), '')
}

export function renderingAnimationCSS(continuAnimation, id, animationId) {
  console.log('进入css3动画设置', continuAnimation)
  // 数据格式设置 https://km.sankuai.com/page/1225891684
  let obj = {
      width: continuAnimation?.width,
      height:continuAnimation?.height,
      'background-image': continuAnimation["background-image"] ?`url('${continuAnimation["background-image"]}')` : "",
      'background-size': continuAnimation["background-size"],
      position: 'absolute',
      'background-position': continuAnimation["background-position"],
  };
  let continuekeyframes = '';
  let animationData = '';
  let keyframes = '';
  continuAnimation?.animation?.map((item, index) => {
      console.log('进入css3动画设置当前行item', item)
      //CSS animation 属性是 animation-name，animation-duration, animation-timing-function，animation-delay，animation-iteration-count，animation-direction，animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。
      if (item["animation-property"] != "default") {
          animationData += `keyframe-${animationId}-${index} ${item["animation-duration"]} ${item["animation-timing-function"] || 'linear'} ${item["animation-delay"]} ${item["animation-iteration-count"]} ${item["animation-direction"] || 'normal'} ${item["animation-fill-mode"]} ${index + 1 < continuAnimation?.animation.length ? ',' : ''}`
          console.log('进入css3动画设置animationData', animationData)
          keyframes +=
              ` @keyframes keyframe-${animationId}-${index} {
              0% {
                  ${item["animation-property"]}:${item.start};
              } 
              100% {
                  ${item["animation-property"]}: ${item.end};
              }
          }
          `
          console.log('进入css3动画设置keyframes', keyframes)
      } else {
          animationData +=`${item["animation-name"] || 'bounce'} ${item["animation-duration"]} ${item["animation-timing-function"] || 'linear'} ${item["animation-delay"]} ${item["animation-iteration-count"]} ${item["animation-direction"] || 'normal'} ${item["animation-fill-mode"]} ${index + 1 < continuAnimation?.animation.length ? ',' : ''}`
      }
  });
  obj = { ...obj, animation: animationData }
  continuekeyframes += `.a-${animationId}{${obj2str(obj)}}${keyframes}`;
  console.log("css3动画设置结果丁晓雪2",continuekeyframes)
  const style = document.createElement("style");
  style.id = `animation-${id}`;
  style.setAttribute("type", "text/css");
  style.innerHTML = continuekeyframes;
  document.head.appendChild(style);
}