function obj2str(obj) {
    return Object.keys(obj).filter(item => obj[item]).reduce((prev, cur) => prev += (`${cur}:${obj[cur]};`), '')
  }
  
  export function renderingAnimationCSS(continuAnimation, id, animationId) {
    let continuekeyframes = "";
    if (continuAnimation.length === 0) return;
    continuAnimation.map((item, index) => {
      const obj = {
        width: item.width,
        height:item.height,
        'background-image': item["background-image"] ?`url('${item["background-image"]}')` : "",
        'background-size': item["background-size"],
        position: 'absolute',
        'background-position': item["background-position"],
        top: item.start && item.start[1],
        left: item.start && item.start[0],
        'animation-duration': item["animation-duration"],
        'animation-timing-function': item['animation-count'] ? `steps(${item['animation-count']}, end)` : "",
        'animation-delay': item["animation-delay"],
        'animation-iteration-count': item["animation-iteration-count"],
        'animation-direction': item["animation-direction"],
        'animation-fill-mode': item["animation-fill-mode"]
      };
      if (item["animation-type"] === "gif") {
        obj['animation-name'] = `gif${index}`;
        const count = item['animation-count'];
        continuekeyframes += `
        .a-${animationId}-${index} {${obj2str(obj)}}
        @keyframes gif${index} {
            0% {
                background-position: ${item["background-position"]};
            }
            100% {
                background-position: -${(item.width).replace('rem', '') * count}rem 0;
            }
        }`;
      } else if (item["animation-type"] === "default") {
        // obj['animation-name'] = item["animation-name"];
        continuekeyframes += `
        .a-${animationId}-${index} {${obj2str(obj)}}`;
      } else {
        obj['animation-name'] = `run-go${index}`;
        continuekeyframes += `
         .a-${animationId}-${index} {${obj2str(obj)} animation: run-go${index}, run-over${index} }
        @keyframes run-go${index} {
            0% {
                left:${JSON.parse(item.start)[0]};
            }
  
            100% {
                left: ${JSON.parse(item.end)[0]};
            }
        }
        @keyframes run-over${index} {
            0% {
                top: ${JSON.parse(item.start)[1]};
            }
  
            100% {
                top: ${JSON.parse(item.end)[1]};
            }
        }
        `;
      }
    });
    const style = document.createElement("style");
    style.id = `animation-${id}`;
    style.setAttribute("type", "text/css");
    style.innerHTML = continuekeyframes;
    document.head.appendChild(style);
  }