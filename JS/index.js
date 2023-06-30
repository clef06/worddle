const 정답 = "APPLE";

let attempts = 0;

let index = 0;

let timer;

const handleKeyClick = (event) => {
  const key = event.target.innerText;
  if (key) {
    const keyBlock = event.target;
    keyBlock.style.background = "#6AAA64";

    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    thisBlock.innerText = key.toUpperCase();
    index++;

    if (index === 5) {
      handleEnterKey();
    }
  }
};

const attachKeyClickEvent = () => {
  const keyboardKeys = document.querySelectorAll(".kboard-block");
  keyboardKeys.forEach((key) => {
    key.addEventListener("click", handleKeyClick);
  });
};

function appStart() {
  attachKeyClickEvent();
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color: white; width: 200px; height:100px;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameover();
    clearInterval(timer);
  };
  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
        const keyBlock = document.querySelector(
          `.kboard-block[data-key='${정답_글자}']`
        );
        keyBlock.style.background = "#6AAA64";
        const box_Spinning = [
          { transform: "rotate(0) scale(1)" },
          { transform: "rotate(360deg) scale(0)" },
        ];
        const box_Timing = {
          duration: 2000,
          iterations: 1,
        };
        const move_box = document.querySelector(
          `.board-block[data-index='${attempts}${i}']`
        );
        move_box.animate(box_Spinning, box_Timing);
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        const keyBlock = document.querySelector(
          `.kboard-block[data-key='${입력한_글자}']`
        );
        keyBlock.style.background = "#C9B458";
        const same_box_Spinning = [
          { transform: "rotate(0) scale(0.5)" },
          { transform: "rotate(0) scale(0)" },
        ];
        const same_box_Timing = {
          duration: 500,
          iterations: 1,
        };
        const same_move_box = document.querySelector(
          `.board-block[data-index='${attempts}${i}']`
        );
        same_move_box.animate(same_box_Spinning, same_box_Timing);
      } else {
        block.style.background = "#787c7e";
        const keyBlock = document.querySelector(
          `.kboard-block[data-key='${입력한_글자}']`
        );
        keyBlock.style.background = "#787c7e";

        block.style.color = "white";
      }
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".time");
      timeDiv.innerText = `${분} : ${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
