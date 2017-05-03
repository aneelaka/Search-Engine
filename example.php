
<html>
  <head>
    <title>PHP Solr Client Example</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/resources/demos/style.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  </head>
<style>
#grey{
background-color: #F0F0F0;
}
#q, #label
{
float:left;
}
#label
{
font-size:40px;
}
#q
{
line-height:50px;
}
button
{
width:200px;
height:60px;
color:white;
background-color: #3333ff;
border-radius:10px;
}
body{
padding:0px;
margin:0px;
}
#main, #cor
{
  margin-left: 10%;
  //color:blue;
  //text-decoration: underline;
}
</style>
  <body>
<div id=grey>
<br>
<br>
    <form  accept-charset="utf-8" method="post">
      <label for="q" id="label">&nbsp;Search&nbsp; &nbsp; </label>
<div class="ui-widget">

      <input id="q" name="q" type="text" style="width:800px"></div>
      &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; <button type="buttton">Submit</button>
    </form>
<br>
<br>
<br>
<br>
</div>
<br>
<br>
<div id="main">

</div>
<div id="cor"></div>

  </body>
<script src="suggest.js"></script>
</html>
