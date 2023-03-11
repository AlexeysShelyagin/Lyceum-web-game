document.addEventListener('keydown', function(event) {
    const box = document.getElementById('block');
    if (isNaN(parseInt(box.style.left))) box.style.left = '0px';
    if (isNaN(parseInt(box.style.top))) box.style.top = '0px';

    if(event.keyCode == 37) {
        box.style.left = parseInt(box.style.left) - 5 + 'px';
    }
    else if(event.keyCode == 39) {
        box.style.left = parseInt(box.style.left) + 5 + 'px';
    }
    else if(event.keyCode == 38) {
        box.style.top = parseInt(box.style.top) - 5 + 'px';
    }
    else if(event.keyCode == 40) {
        box.style.top = parseInt(box.style.top) + 5 + 'px';
    }
});