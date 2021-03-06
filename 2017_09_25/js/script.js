function ativarBilheteria(e){
  $("a").removeClass('active');
  $(e).addClass('active')
  $("div").addClass('sumir');
  $("#divBilheteria").removeClass('sumir');
  $("#divBilheteria").addClass('ativar');

  d3.json("movies.json", function(error, json){
      renderBilheteria(json, compareBilheteria);
      d3.selectAll("div.h-bar").classed("customize", true);
  });
}
function ativarOrcamento(e){
  $("a").removeClass('active');
  $(e).addClass('active')
  $("div").addClass('sumir');
  $("#divOrcamento").removeClass('sumir');
  $("#divOrcamento").addClass('ativar');
  d3.json("movies.json", function(error, json){
      renderOrcamento(json, compareOrcamento);
      d3.selectAll("div.h-bar").classed("customize", true);

  });
}
function ativarLucro(e){
  $("a").removeClass('active');
  $(e).addClass('active')
  $("div").addClass('sumir');
  $("#divLucro").removeClass('sumir');
  $("#divLucro").addClass('ativar');
  d3.json("movies.json", function(error, json){
      renderLucro(json, compareLucro);
      d3.selectAll("div.h-bar").classed("customize", true);

  });
}
function ativarGenero(e){
  $("a").removeClass('active');
  $(e).addClass('active')
  $("div").addClass('sumir');
  $("#divGenero").removeClass('sumir');
  $("#divGenero").addClass('ativar');
  d3.json("movies.json", function(error, json){
    renderGenero(json,compareGeneroLucro);
    d3.selectAll("div.h-bar").classed("customize", true);
  });
}

function renderBilheteria(data, compare) {
  d3.select("#bilheteria").selectAll("div.h-bar")
    .data(data)
    .enter()
      .append("div")
        .attr("class", "h-bar")
        .append("span");

  d3.select("#bilheteria").selectAll("div.h-bar")
    .data(data)
      .attr("class", "h-bar")
        .style("width", function (d) {
          return (d.Worldwide_Gross_M/4) + "px";
        })
      .select("span")
        .text(function (d) {
          return d.Film;
        });
  if(compare)
    d3.select("#bilheteria")
      .selectAll("div.h-bar")
        .sort(compare);
}

var compareBilheteria = function (a, b) {
  return a.Worldwide_Gross_M < b.Worldwide_Gross_M? 1:-1;
};

function renderOrcamento(data, compare){
  d3.select("#orcamento").selectAll("div.h-bar")
    .data(data)
    .enter()
      .append("div")
        .attr("class", "h-bar")
          .append("span");

  d3.select("#orcamento").selectAll("div.h-bar")
    .data(data)
      .attr("class","h-bar")
        .style("width", function (d){
          return (d.Budget_M*4) + "px";
        })
      .select("span")
        .text(function(d){
          return d.Film;
        });

  d3.select("#orcamento").selectAll("div").style("background-color","orange");

  if(compare)
    d3.select("#orcamento")
      .selectAll("div.h-bar")
        .sort(compare);
}

var compareOrcamento = function (a, b) {
    return a.Budget_M < b.Budget_M? 1:-1;
};

function renderLucro(data, compare){
  d3.select("#lucro").selectAll("div.h-bar")
    .data(data)
    .enter()
      .append("div")
        .attr("class", "h-bar")
          .append("span");

  d3.select("#lucro").selectAll("div.h-bar")
    .data(data)
      .attr("class","h-bar")
        .style("width", function (d){
          return (d.Worldwide_Gross_M-d.Budget_M)/2 + "px";
        })
      .select("span")
        .text(function(d){
          return d.Film;
        });

  d3.select("#lucro").selectAll("div").style("background-color","green");
  if(compare)
    d3.select("#lucro")
      .selectAll("div.h-bar")
        .sort(compare);
}

var compareLucro = function (a, b) {
    return (a.Worldwide_Gross_M-a.Budget_M) < (b.Worldwide_Gross_M-b.Budget_M)? 1:-1;
};

var generos = [];
var execute = false;
function fillGeneros(data){
  generos = [];
  var a = {
    genero: "",
    lucro: 0
  }
  a.genero = data[0].Genre;
  a.lucro = data[0].Worldwide_Gross_M - data[0].Budget_M;
  generos.push(a);
  data.forEach(function(film){
    contain(generos, film);
  });
  console.log(generos);
}

function contain(v, film){
  var existe = false;
  v.forEach(function(e){
    if(e.genero == film.Genre){
      if(e.genero == film.Genre){
        existe = true;
        e.lucro = e.lucro + film.Worldwide_Gross_M - film.Budget_M;
      }
    }
  });
  if(!(existe)){
    var o = {
      genero: "",
      lucro: 0
    }
    o.genero = film.Genre;
    o.lucro = film.Worldwide_Gross_M - film.Budget_M;
    generos.push(o);
  }
}


function renderGenero(data, compare){
  fillGeneros(data);
  d3.select("#genero").selectAll("div.h-bar")
    .data(generos)
    .enter()
      .append("div")
        .attr("class", "h-bar")
          .append("span");

  d3.select("#genero").selectAll("div.h-bar")
    .data(generos)
      .attr("class","h-bar")
      .style("width", function (d){
        return (d.lucro/10) + "px";
      })
      .select("span")
        .text(function(d){
          return d.genero;
        });

  d3.select("#genero").selectAll("div").style("background-color","#B22222");

  if(compare)
    d3.select("#genero")
      .selectAll("div.h-bar")
        .sort(compare);

}
var compareGeneroLucro = function (a, b) {
  return (a.lucro) < (b.lucro)? 1:-1;
};
