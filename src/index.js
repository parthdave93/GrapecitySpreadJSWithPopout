// import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import 'flexlayout-react/style/light.css';
import { Layout, Actions, Model, DockLocation } from 'flexlayout-react';
import React, { lazy, ReactNode, Suspense } from "react";
import { SpreadSheets } from "@grapecity/spread-sheets-react";
import "@grapecity/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css";
import * as GC from "@grapecity/spread-sheets";




GC.Spread.Sheets.LicenseKey = "licence";

var json = {
  global: { tabEnableClose: true, tabEnableFloat: true },
  borders: [
    {
      "type": "border",
      "location": "bottom",
      "size": 100,
      "children": [
        {
          "type": "tab",
          "name": "four",
          "component": "text"
        }
      ]
    },
    {
      "type": "border",
      "location": "left",
      "size": 100,
      "children": []
    }
  ],
  layout: {
    "type": "row",
    "weight": 100,
    "children": [
      {
        "type": "tabset",
        "weight": 50,
        "selected": 0,
        "children": [
          {
            "type": "tab",
            "name": "One",
            "component": "sheet"
          }
        ]
      },
      {
        "type": "tabset",
        "weight": 50,
        "selected": 0,
        "children": [
          {
            "type": "tab",
            "name": "Two",
            "component": "text"
          },
          {
            "type": "tab",
            "name": "Three",
            "component": "text"
          }
        ]
      }
    ]
  }
};

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = { model: Model.fromJson(json) };
  }

  factory(node) {
    var component = node.getComponent();
    if (component === "text") {
      return (<div id="ss" />);
    } else if (component == "sheet") {
      return <SpreadSheets
        workbookInitialized={this.designerInitialized}
        styleInfo={
          {
            width: "100%",
            height: "100%"
          }
        } />;
    }
  }

  designerInitialized = (spread) => {
    // let spread = designer.getWorkbook();
    spread.options.useTouchLayout = true;
    // this.designer = designer;
    this.spread = spread;
    this.spread.refresh();
  }

  render() {
    return (
      <Layout
        model={this.state.model}
        factory={this.factory.bind(this)} />
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);

window.onload = function () {
  //初期化
}

