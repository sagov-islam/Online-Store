'use strict';
(function() {
    const rangeSlider = document.getElementById('range-slider');
    if (rangeSlider) {
        noUiSlider.create(rangeSlider, {
            start: [500, 100000],
            connect: true,
            step: 1,
            range: {
                'min': 500,
                'max': 100000
            }
        });
    }
    
    let i = 0
    const input0 = document.getElementById('input-0');
    const input1 = document.getElementById('input-1');
    const inputs = [input0, input1];
    
    rangeSlider.noUiSlider.on('update', (values, handle) => {
        inputs[handle].value = Math.round(values[handle]);
    });
    
    const setRangeSlider = (i, value) => {
        let arr = [null, null];
        arr[i] = value;
        rangeSlider.noUiSlider.set(arr);
    };
    
    
    inputs.forEach((item, index) => {
        item.addEventListener('change', (e) => {
            setRangeSlider(index, e.currentTarget.value)
        });
    });
  }());


