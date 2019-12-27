function rowsWithValue(params) {
  console.log(params)
  if (!params && params.length < 2)
    return false;
  var matrixValue = params[0];
  var value = params[1];
  var rowCount = 0;
  for (var key in matrixValue) {
    if (matrixValue[key] == value)
      rowCount++;
  }
  return rowCount;
}
function getItem () {
  return [1,2,3]
}
Survey
  .FunctionFactory
  .Instance
  .register("rowsWithValue", rowsWithValue);

Survey
  .FunctionFactory
  .Instance
  .register("getItem", rowsWithValue);

Survey
  .StylesManager
  .applyTheme("modern");

var json = {
  questions: [
    {
      "type": "panel",
      "name": "面板2",
      "elements": [
        {
          "type": "dropdown",
          "name": "city1",
          "startWithNewLine": false,
          "isRequired": true,
          "choices": 'getItem()',
          "optionsCaption": "请选择市..."
        }
      ],
      "title": "请问您的祖籍是？",
      "isRequired": true
    },
    {
      "type": "matrix",
      "name": "ee",
      "isRequired": true,
      "columns": [
        "Column 1",
        "Column 2",
        "Column 3"
      ],
      "rows": [
        "Row 1",
        "Row 2"
      ]
    },
    {
      type: "matrix",
      name: "quality",
      title: "Please indicate if you agree or disagree with the following statements",
      columns: [
        {
          value: "agree",
          text: "Agree"
        }, {
          value: "disagree",
          text: "Disagree"
        }
      ],
      rows: [
        {
          value: "affordable",
          text: "Product is affordable"
        }, {
          value: "doeswhatitclaims",
          text: "Product does what it claims"
        }, {
          value: "betterthanother",
          text: "Product is better than other products on the market"
        }, {
          value: "easytouse",
          text: "Product is easy to use"
        }
      ]
    }, {
      type: "comment",
      name: "disappointedComment",
      title: "We are really sorry that our products doesn't suite your needs. Could provide us with some comments to help us imporove it?",
      visibleIf: "rowsWithValue({ee},{quality}, 'disagree') >= 3"
    }, {
      type: "comment",
      name: "approvedComment",
      title: "Thank you for appreciating our product. Could provide us with some comments to make it event better?",
      // visibleIf: "rowsWithValue({quality}, 'agree') >= 3"
    }
  ]
};

window.survey = new Survey.Model(json);

survey
  .onComplete
  .add(function (result) {
    document
      .querySelector('#surveyResult')
      .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
  });

$("#surveyElement").Survey({ model: survey });