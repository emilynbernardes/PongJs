//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro /2;

//variáveis do movimento da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 70;

//variaveis do oponente
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//erro raquete oponente
let chanceDeErrar = 40;

//parametro multijogador
let isJogarSozinho = true;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();  
  movimentarBolinha();
  verificarColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentarMinhaRaquete();
  verificarColisaoRaquete();
  // verificaColisaoRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentarRaqueteOponente(); 
  verificaColisaoRaquete(xRaqueteOponente,     yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}
  
function mostrarBolinha(){
   circle (xBolinha, yBolinha, diametro)
}

function movimentarBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificarColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  } 
}

function mostrarRaquete(x,y){
  rect (x, y, raqueteComprimento, 
        raqueteAltura);
}

function movimentarMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificarColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x,y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
 if (colidiu){
    velocidadeXBolinha *= -1;
   raquetada.play();
 } 
}

function movimentarRaqueteOponente(){
  if(isJogarSozinho)
  {
    movimentarRaqueteOponenteSozinho(); 
  }
  else
  {
    movimentarRaqueteOponenteDupla();
  }
}

function movimentarRaqueteOponenteSozinho(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  
  calculaChanceDeErrar()
}

function calculaChanceDeErrar(){
  if(pontosDoOponente >= meusPontos){
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

function movimentarRaqueteOponenteDupla(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER)
  textSize(20)
  fill(color(128,128,128));
  rect(150, 10, 40, 20)
  fill(255)
  text(meusPontos, 170, 27)
  fill(color(128,128,128));
  rect(450, 10, 40, 20)
  fill(255)
  text(pontosDoOponente,470, 27)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}