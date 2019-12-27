function init() {
    // $.material.init();

    var json = { "pages": [{ "name": "页面1", "elements": [
        {
            "type": "multipletext", "name": "height_weight", "title": "您的身高体重为：", "isRequired": true, "items": [{ "name": "height", "isRequired": true, "placeHolder": "请填写数字，如：170", "inputType": "number", "title": "身高（厘米）", "validators": [{ "type": "numeric", "minValue": 0, "maxValue": 300 }] }, { "name": "weight", "isRequired": true, "placeHolder": "请填写数字，如：60", "inputType": "number", "title": "体重（千克）", "validators": [{ "type": "numeric", "minValue": 300, "maxValue": 0 }] }]
        }
    ]}]}

    var options = {
        locale: "zh-cn",
        completedHtml: '<div class="text-center color-999">已填写反馈问卷!</div>'
    }
    options.pages = json.pages
    var model = new Survey.Model(options);
    var css = {
        question: {
            hasError: 'has-error',
        }
    }

    window.survey = model;
    survey.css = css;
    var app = new Vue({
        el: '#surveyElement',
        data: {
            survey: model
        }
    });
}

if(!window["%hammerhead%"]) {
    init();
}
