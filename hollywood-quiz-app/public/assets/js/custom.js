fixHight();
window.addEventListener("resize", () => {
    fixHight();
});
function fixHight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function animateSpawn() {
    var charDom = $(".character-spawn");
    $(charDom).removeClass("d-none");
    animateClasses($(".character-spawn"), 0, 49, "spawn_{}", 30, function () {
        $(charDom).removeClass();
        $(charDom).addClass("character-blink blinking_00020");
        animateCharBlinkLoop();
    });
}

function animateCharBlinkLoop() {
    window.setTimeout(function () {
        animateClasses(
            $(".character-blink"), 0, 20, "blinking_{}", 30, animateCharBlinkLoop
        );
    }, 2000);
}

function beginAnimationClock(){
    $('.quizwood').fadeOut();
    let dom = $('.character-blink');
    if(!dom.length){
        dom = $('.character-spawn');
    }
    
    $(dom).replaceWith('<div class="clock"></div>');

    animateClockLoop();

} 

function animateClockLoop(){
    animateClasses($('.clock'), 1, 330, 'clock_full_{}', 25, animateClockLoop, 1, true)
}

function animateThemeIntro(){
    animateClasses($('.quizwood'), 7, 97, 'quizwood_{}', 30, function(){});
}

function animateClasses(dom, start, end, cssClass, framerate, afterFinish, incrementBy = 1, isRemoveLastClass = false) {
    let i = start + incrementBy;
    if(dom.length <= 0){
        return;
    }
    var currentClass = "";
    var prevClass = "";
    let interval = setInterval(function () {
        if (i <= end) {
            var padNum = pad(i, 5);
            var padLast = pad((i - incrementBy), 5);
            currentClass = cssClass.replace("{}", padNum);
            prevClass = cssClass.replace("{}", padLast);

            // remove last class
            $(dom).removeClass(prevClass);
            // add new class
            $(dom).addClass(currentClass);

        } else {
            if(isRemoveLastClass){
                $(dom).removeClass(currentClass);
                $(dom).removeClass(prevClass);
            }

            clearInterval(interval);
            afterFinish();
        }

        i += incrementBy;
    }, framerate);
}

function trophiesAnimation(){
    animateClasses($('.trophies-background'), 1, 55, 'trophies_full_{}', 50, function(){});
}

function pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

let images = [];
function preload(arg, cb) {
    let loadedImageCount = 0;
    for (i = 0; i < arg.length; i++) {
        images[i] = new Image();
        images[i].onload = function () {
            loadedImageCount++;
            if (loadedImageCount == arg.length) {
                cb();
            }
        };
        images[i].src = arg[i];
    }
}

preload(
    [
        "/assets/images/animations/clock_animate.png",
        "/assets/images/animations/character_hollywood_blink.png",
        "/assets/images/animations/character_hollywood_spawn.png"
    ],
    function () { }
);
