function obj2str(obj) {
    return Object.keys(obj).filter(item => obj[item]).reduce((prev, cur) => prev += (`${cur}:${obj[cur]};`), '')
  }
  
export function renderingAnimationCSS(continuAnimation, id, animationId) {
    console.log('进来', continuAnimation)
    // 数据格式设置 https://km.sankuai.com/page/1225891684
    // const continuAnimation = {
    //     "background-image": "http://s3plus.meituan.net/v1/mss_0ddf9b250a1b4db28fb1d9ad764b2853/files/ditto/icon/100016bg.png",
    //     "background-size": "auto 1.173rem",
    //     "background-position": "0 0",
    //     "width": "1.173rem",
    //     "height": "1.173rem",
    //     "animation": [{
    //         "animation-property": "background-position",
    //         "animation-count": 11,
    //         "start": "0rem 0rem",
	// 		"end": "1.15rem 0rem",
    //         "animation-duration": "415ms",
    //         "animation-delay": "415ms",
    //         "animation-iteration-count": "3",
    //         "animation-timing-function": "steps(29, end)",
    //         "animation-direction": "",
    //         "animation-fill-mode": "forwards"
    //     },
    //     {
    //         "animation-property": "left",
    //         "start": "5rem",
    //         "end": "1rem",
    //         "animation-duration": "415ms",
    //         "animation-delay": "415ms",
    //         "animation-timing-function": "linear",
    //         "animation-iteration-count": "3",
    //         "animation-fill-mode": "forwards"
    //     },
    //     {
    //         "animation-property": "top",
    //         "start": "6.8rem",
    //         "end": "1rem",
    //         "animation-duration": "415ms",
    //         "animation-delay": "415ms",
    //         "animation-timing-function": "cubic-bezier(.48,.49,.51,.69)",
    //         "animation-iteration-count": "3",
    //         "animation-fill-mode": "forwards"
    //     },
    //     {
    //         "animation-property": "opacity",
    //         "start": "0",
    //         "end": "1",
    //         "animation-duration": "415ms",
    //         "animation-delay": "415ms",
    //         "animation-iteration-count": "3",
    //         "animation-fill-mode": "forwards"
    //     },
    //     {
    //         "animation-property": "default",
    //         "animation-name":"shakeX",
    //         "start": "0",
    //         "end": "1",
    //         "animation-duration": "415ms",
    //         "animation-delay": "415ms",
    //         "animation-iteration-count": "1",
    //         "animation-fill-mode": "forwards"
    //     }
    //     ]
    // }
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
        console.log('item', item)
        //CSS animation 属性是 animation-name，animation-duration, animation-timing-function，animation-delay，animation-iteration-count，animation-direction，animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。
        if (item["animation-property"] != "default") {
            animationData += `run-go${index} ${item["animation-duration"]} ${item["animation-timing-function"] || 'linear'} ${item["animation-delay"]} ${item["animation-iteration-count"]} ${item["animation-direction"] || 'normal'} ${item["animation-fill-mode"]} ${index + 1 < continuAnimation?.animation.length ? ',' : ''}`
            console.log('animationData', animationData)
            keyframes +=
                ` @keyframes run-go${index} {
                0% {
                    ${item["animation-property"]}:${item.start};
                } 
                100% {
                    ${item["animation-property"]}: ${item.end};
                }
            }
            `
            console.log('keyframes', keyframes)
        } else {
            animationData +=`${item["animation-name"] || 'bounce'} ${item["animation-duration"]} ${item["animation-timing-function"] || 'linear'} ${item["animation-delay"]} ${item["animation-iteration-count"]} ${item["animation-direction"] || 'normal'} ${item["animation-fill-mode"]} ${index + 1 < continuAnimation?.animation.length ? ',' : ''}`
        }
    });
    obj = { ...obj, animation: animationData }
    continuekeyframes += `.a-${animationId}{${obj2str(obj)}}${keyframes}`;
    console.log("丁晓雪2",continuekeyframes)
    const style = document.createElement("style");
    style.id = `animation-${id}`;
    style.setAttribute("type", "text/css");
    style.innerHTML = continuekeyframes;
    document.head.appendChild(style);
  }