let snowflakesCount = 100; // Snowflake count, can be overwritten by attrs
let baseCss = ``;

const snowWrapper = document.getElementById('snow');
if( ! snowWrapper ) throw '';

// set global attributes
if (typeof SNOWFLAKES_COUNT !== 'undefined') {
  snowflakesCount = SNOWFLAKES_COUNT;
}
if (typeof BASE_CSS !== 'undefined') {
  baseCss = BASE_CSS;
}

let wrapperHeightPx = null;
let wrapperHeightVh = null;

function setHeightVariables() {
  wrapperHeightPx = $(snowWrapper).height();
  wrapperHeightVh = (100 * wrapperHeightPx / window.innerHeight);
}

// get params set in snow div
function getSnowAttributes() {
  snowflakesCount = Number(
    snowWrapper.attributes?.count?.value || snowflakesCount
  );
}

// This function allows you to turn on and off the snow
function showSnow(value) {
  if (value) {
    snowWrapper.style.display = "block";
  }
  else {
    snowWrapper.style.display = "none";
  }
}

// Creating snowflakes
function spawnSnow(snowDensity = 200) {
  snowDensity -= 1;

  for (let i = 0; i < snowDensity; i++) {
    let board = document.createElement('div');
    board.className = "snowflake";

    snowWrapper.appendChild(board);
  }
}

// Append style for each snowflake to the head
function addCss(rule) {
  let css = document.createElement('style');
  css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css);
}

// Math
function randomInt(value = 100) {
  return Math.floor(Math.random() * value) + 1;
}

function randomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Create style for snowflake
function spawnSnowCSS(snowDensity = 200) {
  let snowflakeName = "snowflake";
  let rule = baseCss;

  for (let i = 1; i < snowDensity; i++) {
    let randomX = parseFloat(Math.random() * 100).toFixed(2); // vw
    let randomOffset = Math.random() * 10 // vw;
    let randomXEnd = parseFloat(randomX + randomOffset).toFixed(2);
    let randomXEndYoyo = randomX + (randomOffset / 2);
    let randomYoyoTime = getRandomArbitrary(0.3, 0.8);
    let randomYoyoY = randomYoyoTime * wrapperHeightVh; // vh
    let randomScale = parseFloat(Math.random()).toFixed(2);
    let fallDuration = randomIntRange(10, wrapperHeightVh / 10 * 3); // s
    let fallDelay = randomInt(wrapperHeightVh / 10 * 3) * -1; // s
    let opacity = Math.random().toFixed(2);

    rule += `
      .${snowflakeName}:nth-child(${i}) {
        opacity: ${opacity};
        transform: translate(${randomX}vw, -10px) scale(${randomScale});
        animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
      }
      @keyframes fall-${i} {
        ${randomYoyoTime * 100}% {
          transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
        }
        to {
          transform: translate(${randomXEndYoyo}vw, ${wrapperHeightVh}vh) scale(${randomScale});
        }
      }
    `
  }
  addCss(rule);
}

// Load the rules and execute after the DOM loads
createSnow = function () {
  setHeightVariables();
  getSnowAttributes();
  spawnSnowCSS(snowflakesCount);
  spawnSnow(snowflakesCount);
};


// export createSnow function if using node or CommonJS environment
if (typeof module !== 'undefined') {
  module.exports = {
    createSnow,
    showSnow,
  };
}
else {
  window.onload = createSnow;
}

// TODO add option to easily re-render scenery. For example when window resizes.
// this should be easy as CSS rerenders after display block -> none -> block;
// TODO add progress bar for slower clients
