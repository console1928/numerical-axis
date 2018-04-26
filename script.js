var numericalAxis = {
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    },

    createArrowImg: function (number) {
        var arrowImg = document.createElement("img");
        arrowImg.setAttribute("src", "arrow.png");
        arrowImg.className = "arrow";
        arrowImg.style.width = number * 39.22 + "px";
        return arrowImg;
    },

    createInputElement: function (number) {
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("tabindex", "-1");
        input.className = "input";
        input.style.bottom = 67 + number * 12 + "px";
        return input;
    },

    init: function () {
        var numberA = numericalAxis.getRandomInt(6, 9),
            numberB = numericalAxis.getRandomInt(11 - numberA, 14 - numberA),
            firstArrow = numericalAxis.createArrowImg(numberA),
            secondArrow = numericalAxis.createArrowImg(numberB),
            firstInput = numericalAxis.createInputElement(numberA),
            secondInput = numericalAxis.createInputElement(numberB),
            wrapper = document.querySelector(".wrapper"),
            answer = document.querySelector(".answer");
        answer.value = "";
        answer.placeholder = "?";
        document.querySelector(".task").innerHTML = numberA + " + " + numberB + " = ";
        wrapper.appendChild(firstArrow);
        firstInput.style.left = firstArrow.offsetWidth / 2 + 33 + "px";
        wrapper.appendChild(firstInput);
        firstInput.focus();
        firstInput.onkeyup = function (event) {
            if (firstInput.value == numberA) {
                firstInput.disabled = true;
                firstInput.style.border = "none";
                firstInput.style.background = "none";
                firstInput.style.textShadow = "0 0 0 #000";
                secondArrow.style.left = firstArrow.offsetWidth + 33 + "px";
                wrapper.appendChild(secondArrow);
                secondInput.style.left = firstArrow.offsetWidth + secondArrow.offsetWidth / 2 + 33 + "px";
                wrapper.appendChild(secondInput);
                secondInput.focus();
                secondInput.onkeyup = function (event) {
                    if (secondInput.value == numberB) {
                        secondInput.disabled = true;
                        secondInput.style.border = "none";
                        secondInput.style.background = "none";
                        secondInput.style.textShadow = "0 0 0 #000";
                        answer.style.pointerEvents = "auto";
                        answer.placeholder = "";
                        answer.style.border = "2px solid #bbb";
                        answer.style.borderRadius = "5px";
                        answer.focus();
                        answer.onkeyup = function (event) {
                            if (answer.value == numberA + numberB) {
                                answer.style.pointerEvents = "none";
                                answer.style.border = "none";
                                answer.style.background = "none";
                                answer.style.textShadow = "0 0 0 #000";
                                firstArrow.parentNode.removeChild(firstArrow);
                                secondArrow.parentNode.removeChild(secondArrow);
                                firstInput.parentNode.removeChild(firstInput);
                                secondInput.parentNode.removeChild(secondInput);
                                document.querySelector(".confirmation").style.display = "block";
                                setTimeout(function () {
                                    numericalAxis.init();
                                    document.querySelector(".confirmation").style.display = "none";
                                }, 1500);
                            } else if (answer.value.length > 1 && answer.value != numberA + numberB) {
                                answer.style.textShadow = "0 0 0 #f00";
                            }
                        };
                    } else {
                        secondInput.style.textShadow = "0 0 0 #f00";
                    }
                };
            } else {
                firstInput.style.textShadow = "0 0 0 #f00";
            }
        };
    }
}

numericalAxis.init();
