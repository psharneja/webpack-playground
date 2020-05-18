import './hello-world-button.scss';

class HelloWorldButton {
  buttoncssClass = 'hello-world-button';
  render() {
    const button = document.createElement("button");
    button.innerHTML = "hello world";
    const body = document.querySelector("body");
    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello World";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };
    button.classList.add(this.buttoncssClass);

    body.appendChild(button);
  }
}

export default HelloWorldButton;

