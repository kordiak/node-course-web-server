const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((request,respond,next)=>
{
  var now = new Date().toString();
  var log =`${now} ${request.method} ${request.url} `;
  fs.appendFile('server.log',log + '\n', (error) =>
{
  console.log('Unable to create log file');
});
  console.log(log);

  next();
});

app.use((req,res,next)=>
{
  res.render('maintenance.hbs');
});

hbs.registerHelper('getYear',() => { return new Date().getFullYear()});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/',( request, respond ) =>
{
  respond.render('home.hbs',
  {
    pageTitle: 'Home page',
    welcomeMessage: 'Hello and welcome to the gardens world',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', ( request, respond ) =>
{
  respond.render('about.hbs',
  {
    pageTitle: 'about page',
    currentYear: new Date().getFullYear()
  })
});

app.get('/bad', (request, respond) =>
{
  respond.send
  (
  {
    errorMessage: ' Unable to reach that site'
  }
  )
});


app.listen(3000, ()=>
{
  console.log('Server is up');
});
