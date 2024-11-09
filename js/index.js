let dropArea = null;
let objects = document.getElementsByClassName('object');
let button = document.querySelector('.button');
let countGoods = 0;

for (let item of objects) {
    item.ondragstart = () => false;

    let currentW = item.width;
    let currentH = item.height;

    item.addEventListener('pointerdown', (event) => {
        let shiftX = event.clientX - item.getBoundingClientRect().left;
        let shiftY = event.clientY - item.getBoundingClientRect().top;

        let startLeftPos = item.offsetLeft;
        let starRightPos = item.offsetTop;
        let startItemPos = document.getElementById(item.parentNode.id);

        item.style.position = 'absolute';
        item.style.width = `${currentW}px`;
        item.style.height = `${currentH}px`;
        item.style.zIndex = 1000;

        document.body.append(item);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            item.style.left = pageX - shiftX + 'px';
            item.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            item.hidden = true;
            listItems.style.zIndex = 20;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            listItems.style.zIndex = 5;
            item.hidden = false;

            if (!elemBelow) return;
            let droppableBelow = elemBelow.closest('.droppable');
            if (dropArea != droppableBelow) dropArea = droppableBelow;
        }

        document.addEventListener('pointermove', onMouseMove);

        item.addEventListener('pointerup', (ev) => {
            if (dropArea) {
                listItems.append(item);
                item.style.left = ((ev.clientX - dropArea.getBoundingClientRect().left - shiftX)/ dropArea.offsetWidth) * 100 + '%';
                item.style.top = ((ev.clientY - dropArea.getBoundingClientRect().top - shiftY)/ dropArea.offsetHeight) * 100 + '%';
                item.style.zIndex = 1;
                item.style.width = (currentW / dropArea.offsetWidth) * 100 + '%';
                item.style.height = (currentH / dropArea.offsetHeight) * 100 + '%';

                countGoods++;
                if (countGoods > 0) button.classList.toggle('_hidden', false);
            }
            else {
                startItemPos.append(item);

                item.style.width = (currentW / startItemPos.offsetWidth) * 100 + '%';
                item.style.height = (currentH / startItemPos.offsetHeight) * 100 + '%';

                item.style.left = (startLeftPos / startItemPos.offsetWidth) * 100 + '%';
                item.style.top = (starRightPos / startItemPos.offsetHeight) * 100 + '%';
                item.style.zIndex = 'auto';
            }
            document.removeEventListener('pointermove', onMouseMove);
            item.onpointerup = null;
        });
    });
};
