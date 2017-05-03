$(document).ready(function(){

  $( "#q" ).autocomplete({
    source: autocomplete_input,
    minLength:2
  }).keyup(function(e){
    if(e.which===13)
    {
      $("#q").autocomplete('close');
    }
    if($('#q').val()=='')
    {
      $("#results").empty();
    //  $('#cor').empty();

    }
  });

$("button").click(function(event){
//console.log("hi");
    var correction=$('#main');
      var cor=$('#cor');
    var inp=document.querySelector('#q').value;
    $.ajax({
    type:'GET',
    url: 'getSuggestion.php',
    data:{query: inp ,type:'spellcheck'},
    //datatype:JSON,
    success: function(response){
    //$('#correction').html=response;
    /*var para=document.createElement("div");
    var t=document.createTextNode(response);
    para.appendChild(t);
    document.body.appendChild(para);*/
    var obj1=JSON.parse(response);
    var ans="Showing results for "+ obj1.toString();
    var output=ans.replace(","," ");
    var check=obj1.toString();
    var show=check.replace(","," ");
        if(show!=inp.toLowerCase())
      {
        var actual_qyery="Do you want to display results for "+inp +" instead";
        cor.text(actual_qyery);
     }
     else {
       {
         cor.text("");
       }
     }
      var newLine1 = document.createElement("br");
      correction.text(output);

    //console.log(typeof(ans));
      callAjax(show);

    }
  });
  return false;
});
        $("#cor").click(function(event){
          var correction=$('#main');
          correction.text("");
            var cor=$('#cor');
          var inp=document.querySelector('#q').value;
          var ans="Showing results for "+ inp;

          cor.text(ans);
          callAjax(inp);
          //return false;

        });
});


function autocomplete_input(req, res){
      var input=req.term;
      var split_term=input.split(" ");
      var len=split_term.length-1;
      //console.log(input);
      $.ajax({
      type:'GET',
      url: 'getSuggestion.php',
      data:{query: split_term[len] ,type:'suggest'},
      success: function(response)
      {
          var suggestions=[];
          var obj=JSON.parse(response);
          var query_term;
          var str=document.querySelector('#q').value
          query_term=split_term[len].substring(0,str.length-1);

          //obj.push(query_term);
          for(i=0;i<obj.suggest.suggest[split_term[len]].suggestions.length;i++)
          {
           //console.log(obj.suggest.suggest[query_term.query].suggestions[i].term);
          suggestions.push(input.substring(0,input.lastIndexOf(' ')+1)+obj.suggest.suggest[split_term[len]].suggestions[i].term);
          }
          //console.log(obj.suggest.suggest[query_term.query].suggestions[2].term);
          console.log(suggestions);
           res(suggestions);
           for(i=0;i<suggestions.length;i++)
                {
                   if(split_term[len]==suggestions[i])
                      {
                         console.log("matched!!!!");
                          var api_url="http://localhost:8983/solr/auto_suggestion/select?indent=on&q="+query_term.query+"&wt=json";
                          callAjax(split_term[len]);
                       }
                }
          },
          error:function(error)
          {
            console.log(error);
          }
      });
  }

function getResults(r)
{
    console.log("inside function");
    $("p").html('');

    for(var i=0;i<10;i++){
     //var str="<a target='_blank' href='"+r.response.docs[i].og_url+"'>"+r.response.docs[i].title + "</a>"

        var para=document.createElement("P");
        var x = document.createElement("A");
        var t;
        if(r.response.docs[i].title!=null)
        t = document.createTextNode(r.response.docs[i].title);
        else
            t = document.createTextNode("");

        var description;
        if(r.response.docs[i].description!=null)
        description=document.createTextNode(r.response.docs[i].description);
        else description=document.createTextNode("");
        var link = document.createElement("A");
        var greenLink;
        if(r.response.docs[i].og_url!=null)
        greenLink=document.createTextNode(r.response.docs[i].og_url);
        else greenLink=document.createTextNode("");
        var newLine = document.createElement("br");
        var newLine1 = document.createElement("br");
para.setAttribute("id","results");
          link.setAttribute("target", "_blank");
        link.setAttribute("href", r.response.docs[i].og_url);
        link.setAttribute("style", "color:green; text-decoration:none");
            link.appendChild(greenLink);


        x.setAttribute("href", r.response.docs[i].og_url);
          x.setAttribute("target", "_blank");
        x.setAttribute("style", "text-decoration:none");
            x.appendChild(t);
        para.setAttribute("style", "margin-left:10%; width:850px;");
        para.appendChild(x);
        para.appendChild(newLine1);
        para.appendChild(link);
        para.appendChild(newLine);
        //if(r.response.docs[i].description==undefined)
        //description=="";
        para.appendChild(description);
        document.body.appendChild(para);
//[^.?!](?<=[.?\s!])best(?=[\s.?!])[^.?!][.?!]

      }
}

function callAjax(q)
{
  console.log("in clall ajax");
console.log($('#q').val());
  $.ajax({
           type:'GET',
            url: 'getSuggestion.php',

            data:{query:q,type:'getResults'},
             success: function(response)
              {
                  var result=JSON.parse(response);
                 console.log(result);
                  getResults(result);
                //document.getElementById("#main").innerHTML+=result;

               }
        });
}
