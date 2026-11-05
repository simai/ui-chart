// Гистограмма по складам, стопкой: the example «histogram-stacked» of package/src/smart/chart-bar/examples.json.
// Lists and objects are properties; the page sets them once the element is defined.
customElements.whenDefined('sf-chart-bar').then(() => {
  const chart = document.getElementById('chart');
  chart.names = {"north":"Север","south":"Юг"};
  chart.items = [
    {"hours":5,"store":"south"},
    {"hours":8,"store":"north"},
    {"hours":9,"store":"north"},
    {"hours":11,"store":"south"},
    {"hours":12,"store":"north"},
    {"hours":12,"store":"north"},
    {"hours":14,"store":"south"},
    {"hours":15,"store":"north"},
    {"hours":16,"store":"north"},
    {"hours":17,"store":"south"},
    {"hours":18,"store":"north"},
    {"hours":18,"store":"north"},
    {"hours":19,"store":"south"},
    {"hours":20,"store":"north"},
    {"hours":21,"store":"north"},
    {"hours":22,"store":"south"},
    {"hours":23,"store":"north"},
    {"hours":24,"store":"north"},
    {"hours":26,"store":"south"},
    {"hours":27,"store":"north"},
    {"hours":29,"store":"north"},
    {"hours":31,"store":"south"},
    {"hours":33,"store":"north"},
    {"hours":36,"store":"north"},
    {"hours":38,"store":"south"},
    {"hours":41,"store":"north"},
    {"hours":44,"store":"north"},
    {"hours":47,"store":"south"},
    {"hours":52,"store":"north"},
    {"hours":61,"store":"north"},
  ];
});
