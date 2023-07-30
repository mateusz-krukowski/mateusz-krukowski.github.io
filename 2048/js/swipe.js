export let startX = 0;
export let startY = 0;
export let endX = 0;
export let endY = 0;

export const swipeThreshold = 50;

function detectSwipeDirection() {
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > swipeThreshold) {
            fireSwipeEvent("swiperight");
        } else if (deltaX < -swipeThreshold) {
            fireSwipeEvent("swipeleft");
        }
    } else {
        if (deltaY > swipeThreshold) {
            fireSwipeEvent("swipedown");
        } else if (deltaY < -swipeThreshold) {
            fireSwipeEvent("swipeup");
        }
    }
}

function fireSwipeEvent(swipeDirection) {
    const event = new CustomEvent("swipe", { detail: swipeDirection });
    document.dispatchEvent(event);
}

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
    detectSwipeDirection();
}

export function setupSwipeListener() {
    const swipeElement = document.body;
    swipeElement.addEventListener('touchstart', handleTouchStart);
    swipeElement.addEventListener('touchend', handleTouchEnd);
}
