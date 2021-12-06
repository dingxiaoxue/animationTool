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
        .a-${animationId}-${index} {${obj2str({ ...obj,top: `${item.start && item.start[1]} !important`,left: `${item.start && item.start[0]} !important`} )}}
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
        // continuekeyframes += `
        // .a-${animationId}-${index}{
        //       width:${item.width};
        //       height:${item.height};
        //       background-image: url('${item["background-image"]}');
        //       background-size: ${item["background-size"]};
        //       position: absolute;
        //       background-position: ${item["background-position"]}; 
        //       top: ${item.start[1]};
        //       z-index: 10;
        //       left: ${item.start[0]};
        //       animation:
        //       run-go${index} ${item["animation-duration"]} ${item["animation-delay"]} ${item["animation-iteration-count"]} linear,run-over${index} ${item["animation-duration"]} ${item["animation-delay"]} ${item["animation-iteration-count"]} ${item["animation-timing-function"]} ${item["animation-duration"]};
        //   }
        //   @keyframes run-go${index} {
        //       0% {
        //           left:${item.start[0]};
        //       }
  
        //       100% {
        //           left: ${item.end[0]};
        //       }
        //   }
        //   @keyframes run-over${index} {
        //       0% {
        //           top: ${item.start[1]};
        //       }
  
        //       100% {
        //           top: ${item.end[1]};
        //       }
        //   }
        //   `;
        // console.log("丁晓雪0", obj)
        // console.log("丁晓雪", obj['animation-name'])
        // console.log("丁晓雪1",index)
        obj['animation-name'] = `run-go${index}, run-over${index}`;
        obj['animation-duration'] = `${item["animation-duration"]}, ${item["animation-duration"]}`;
        obj['animation-delay'] = `${item["animation-delay"]}, ${item["animation-delay"]}`;
        obj['animation-iteration-count'] = `${item["animation-iteration-count"]}, ${item["animation-iteration-count"]}`;
        obj['animation-timing-function'] = `linear, ${item["animation-timing-function"]}`;
        obj['animation-direction'] = item["animation-direction"];
        obj['animation-fill-mode'] = item["animation-fill-mode"];
        continuekeyframes += `
        .a-${animationId}-${index} {${obj2str(obj)}}
        @keyframes run-go${index} {
            0% {
                left:${item.start[0]};
            }
  
            100% {
                left: ${item.end[0]};
            }
        }
        @keyframes run-over${index} {
            0% {
                top: ${item.start[1]};
            }
  
            100% {
                top: ${item.end[1]};
            }
        }
        `;
      }
    });
    console.log("丁晓雪2",continuekeyframes)
    const style = document.createElement("style");
    style.id = `animation-${id}`;
    style.setAttribute("type", "text/css");
    style.innerHTML = continuekeyframes;
    document.head.appendChild(style);
  }