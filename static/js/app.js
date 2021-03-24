function handleSubmit() {
// Retrieve ids
  d3.json("samples.json").then((data) => {
    var idValues = []
    var foo = data.samples
    for (i = 0; i < foo.length; i++) {
      idValues.push(foo[i]["id"])
    };
    console.log(idValues)

// Create dropdown
    var dropDown = d3.select("#selDataset");
    var options = dropDown.selectAll("option")
      .data(idValues)
      .enter()
      .append("option");
      options.text(function(d) {
        return d;
        })
          .attr("value", function(d, index) {
        return index;
        });
  });
  

// Handle change
  d3.select("#selDataset").on('change', function() {
    var person = this.value;
    console.log('You selected: ', person);
    buildPlot(person);

    d3.select('tbody').remove();
  });

};

// Build plots
function buildPlot(person) {
  d3.json("samples.json").then((data) => {
    console.log(data)
    var ids = data.samples[person]["otu_ids"];
    var labels = data.samples[person]["otu_labels"];
    var values = data.samples[person]["sample_values"];
    
// Slice data
    values = values.slice(0, 10);
    values =values.sort((a, b) => a - b);

// Define trace
    var trace1 = {
      x: values,
      y: ids,
      text: labels,
      type: "bar",
      orientation: "h"
    };

    var chartData = [trace1];
// Defin layout    
    var layout = {
      title: "Belly button Biodiversity",
      margin: {
        l: 100,
        r: 10,
        t: 50,
        b: 20
      },
      yaxis: {
        type: "category"
      }
    };
// Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", chartData, layout);

// Define trace
    var trace2 = {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        size: values,
        color: ids
      }
      
    };

    var Data = [trace2];
// Define layout    
    var layout = {
      title: "Belly button Biodiversity Bubbles",
      margin: {
        l: 100,
        r: 10,
        t: 50,
        b: 20
      },
      yaxis: {
        type: "category"
      }
    };
// Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble", Data, layout);
      

    var id = data.metadata[person]["id"];
    var ethnicity = data.metadata[person]["ethnicity"];
    var gender = data.metadata[person]["gender"];
    var age = data.metadata[person]["age"];
    var location = data.metadata[person]["location"];
    var bbtype = data.metadata[person]["bbtype"];
    var wfreq = data.metadata[person]["wfreq"];
    buildTable(id, ethnicity, gender, age, location, bbtype, wfreq);

  });
};
// Build table
function buildTable(id, ethnicity, gender, age, location, bbtype, wfreq) {
  var table = d3.select("#sample-metadata");
  table.append("tbody");  
  var tbody = table.select("tbody");
  tbody.append("tr").text("ID: " + id);
  tbody.append("tr").text("Ethnicity: " + ethnicity);
  tbody.append("tr").text("Gender: " + gender);
  tbody.append("tr").text("Age: " + age);
  tbody.append("tr").text("Location: " + location);
  tbody.append("tr").text("BBType: " + bbtype);
  tbody.append("tr").text("WFreq: " + wfreq);
}


// Load inital plots and table
function init() {
  person = 0;
  buildPlot(person);
};



handleSubmit()
init()