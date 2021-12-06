<script lang="ts">
  import ditto from "ditto-core";
  import { jsonString2Style, object2Style } from "ditto-tools";
  import { onDestroy, onMount } from "svelte";
  import { renderingAnimationCSS } from './animation';
  import "./index.css";

  const usebindEventing = ditto.$event.usebindEventing;

  export let childConfig;
  const isEditor = window.isEditor;

  const { props, id, childId } = childConfig || {};

  const animationId = childId && childId.replace(".", "-");

  let animationClass = "";

  let i = 0;
  // 相互转化 single[0]= addAnimation
  const {
    aEvent = {0: "direct"},
    continuAnimation,
    // singleAnimation,
    ...stylePropsObj
  } = props || {};

  // let classAddAnimation = "";
  let isAnimating = false;
  console.log("stylePropsObj==", stylePropsObj);
  $: style = object2Style(stylePropsObj);

  let el;

  let continuAnimations = [];

  try {
    if(continuAnimation) {
      continuAnimations = JSON.parse(continuAnimation);
      console.log("continuAnimations===", continuAnimations);
    }
  } catch(e) {
    console.log("解析错误", e);
  }

  let pfx = ["webkit", "moz", "MS", "o", ""];
  function prefixedEventListener(element, type, callback, addOrRemove) {
    for (var p = 0; p < pfx.length; p++) {
      if (!pfx[p]) type = type.toLowerCase();
      element[addOrRemove](pfx[p] + type, callback, false);
    }
  }

  function handleAniation(isEvent) {
    console.log("动画回调！！！！", i);

    if(!isEvent && animationClass) {
      return;
    }
    animationClass = `a-${animationId}`;
  }
  let bindGlobalState;
  onMount(() => {
    // 生成
    renderingAnimationCSS(continuAnimations, childId, animationId);
    prefixedEventListener(
      el,
      "animationend",
      handleAniation,
      "addEventListener"
    );

    if(continuAnimations.length === 0) {
      // 如果没有动画就不监听，不触发
      return;
    }

    if(aEvent && aEvent[0]) {
      // 当配置存在，并且如果是直接的形式则直接触发
      if(aEvent[0] === 'direct') {
        handleAniation(true);
        // classAddAnimation = singleName;
      } else if(aEvent[0] === 'click') {
        bindGlobalState = ditto?.globalState?.subscribe(state => {
          console.log("state===", state, childId);
          if(state[`ae-${childId}`] === '1') {
            console.log("触发！！！！");
            handleAniation(false);
            // classAddAnimation = singleName;
          }
        })
      }
    }
  });
  onDestroy(() => {
    // 清除 handleAniation
    // 清除 style
    if(bindGlobalState) {
      bindGlobalState();
    }
    var styleTag = document.getElementById(`animation-${childId}`);
    if(styleTag) {
      document.head.removeChild(styleTag);
    }
    prefixedEventListener(
      el,
      "animationend",
      handleAniation,
      "removeEventListener"
    );
  });

</script>

<div {style} class={`absolute w-28 h-28 ${animationClass}`} bind:this={el} use:usebindEventing {id}>
  <slot>
    <div>我是组件容器</div>
  </slot>
</div>
