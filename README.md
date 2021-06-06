# Guia-de-perguntas
WebApp feito com Node.Js

**Instalação do Nodemon**
*a função do nodemon é de não precisar toda vez dar reset no servidor para visualizar mudanças realizadas no código*
> npm install -g nodemon -> instalar globalmente npm install 
> npm install nodemon --save -> para instalar no diretório atual

**Instalação do Ejs**
*Ejs é a view engine*
> npm install ejs --save -> para instalar no diretório atual

***Setar o Ejs para renderizar HTML e usar arquivos estaticos***
```
app.set('view engine', 'ejs');
app.use(express.static('public'));
```

**Instalação do body-parser**
> npm install body-parser --save -> para instalar no diretório atual