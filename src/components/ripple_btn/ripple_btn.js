import './ripple_btn.scss'

export function Ripple_btn(){
  function createRipple(event) {
    const button = event.currentTarget;
  
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth/1.5, button.clientHeight/1.5);
    const radius = diameter/2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.pageX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.pageY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
  
    const ripple = button.getElementsByClassName("ripple")[0];
  
    if (ripple) {
      ripple.remove();
    }
  
    button.appendChild(circle);
  }
  const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", createRipple);
  }
}
