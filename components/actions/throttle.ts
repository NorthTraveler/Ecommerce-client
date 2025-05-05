export function throttle(func, wait) {
    let lastTime = 0;
    return function() {
      const context = this;
      const args = arguments;
      const currentTime = +new Date();
      if (currentTime - lastTime > wait) {
        func.apply(context, args);
        lastTime = currentTime;
      } };}

export function debounce(func, wait) {
  let timeout = null;
    return function() {
      const context = this;
      const args = arguments;
      if (timeout) clearTimeout(timeout);
        timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
   }
      
