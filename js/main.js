﻿$(function () {
    $('#slider-size').slider({
        min: 8,
        max: 256,
        step: 1,
        value: 64,
        change: function (event, ui) {
            $('#size').text(ui.value);
            ajaxLoader.setSize(ui.value);
        }
    });
    $('#slider-factor').slider({
        min: 0.05,
        max: 1.0,
        step: 0.05,
        value: 0.25,
        change: function (event, ui) {
            $('#factor').text(ui.value);
            ajaxLoader.setFactor(ui.value);
        }
    });
    $('#slider-speed').slider({
        min: 0.1,
        max: 3.0,
        step: 0.1,
        value: 1.0,
        change: function (event, ui) {
            $('#speed').text(ui.value);
            ajaxLoader.setSpeed(ui.value);
        }
    });
    $('#color').on('change', function (event) {
        ajaxLoader.setColor(event.target.value);
    });
    var opts = {
        size: 64,           
        factor: 0.25,       
        color: '#4080FF',   
        speed: 1,           
        clockwise: true     
    };
    var ajaxLoader = new AjaxLoader('spinner', opts);
    ajaxLoader.show();
    sh_highlightDocument();
});