let ctx, p1_y, p2_y, p1_points, p2_points;
let w = 1280, h = 720, pw = 20, ph = 100, p1_x = 7, p2_x = w - pw - 7; 
let p1_kay = null, p2_key = null;
let ballX, ballY, ballX_ori, ballY_ori; 
let gameStarted = false;
let acceleration = 0.2
let ballSpeedX = 5; // Velocidade inicial da bola ao longo do eixo X 
let ballSpeedY = 5; // Velocidade inicial da bola aolongodo eixo Y 

function init() {
    let c = document.getElementById("canva")
    ctx = c.getContext("2d"); 

    p1_Y = (h / 2 - 50)
    p2_y = (h / 2 - 50)
    
    p1_points = 0 
    p2_points = 0

    draxStartScreen();
     document.addEventListener(kaydown, function screen (event) {
        if (event.kaycode === 32 && !gameStarted) {
            gameStarted = true;
            setInterval(fps, 1000 / 60); // definindio quantos quadros, em média 16,6 ms
        }
     });

     console.log (`${p1_points}`)
     ball()
}
function el(x, y, w, h, color) { /// definindo os parametros para o draw()
    ctx.fillStyle = color; 
    if (w === h) {
        // se a largura e altura forem iguais, desenha um circulo
        ctx.beginPath();
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
        ctx.fill();
    } else {
        // Caso contrário desenha um tiangulo 
        ctx.fillRect(x, y, w, h);
    }
}

function drawStarScreen() {
    el(0, 0, w, h, "#000"); //Backgraund
    ctx.font = "40px arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("pressione a barra de espaço para começar, w / 3 - 50, h / 2");
}
function points() {
    ctx.font = "50px Arial"
    ctx.fillStyle = "#fff"
    ctx.fillText(p1_points, w / 4, 50)
    ctx.fillText(p2_points, 3* (w / 4), 50)
}

function draw() {
    el(0, 0, w, h, "#000"); //Background
    el(p1_x, p1_Y, pw, ph, "#ff0000") //Barra 1
    el(p1_x, p1_Y, pw, ph, "#0000ff") //Barra 2
    el(w / 2 -5, 0, 5, h, "#ff0000")  //Linha
    el(w / 2 -5, 0, 5, h, "#0000ff")  //Linha
    el(h / 2 - 5)
    el(ballX, ballY, 20, 20, "#fff")  //Bola 
    points();                         //Pontos
}

function ball() {
    ballX_ori = Math.pow(2, Math.floor(Math.random() * 2) + 1) - 3
    ballY_ori = Math.pow(2, Math.floor(Math.random() * 2) + 1) - 3
    ballX = w / 2 - 10
    ballY = w / 2 - 10
}

function fps() {
    if  (p1_key == 87 && p1_Y > 0) {
        p1_Y -= 10 //Calcula pra cima 
    } else if (p1_key == 83 && p1_Y + ph < h) {
        p1_y += 10 //Calcula pra baixo 
    }

    if  (p2_key == 104 && p2_Y > 0) {
        p1_Y -= 10 //Calcula pra cima 
    } else if (p1_key == 101 && p1_Y + ph < h) {
        p1_y += 10 //Calcula pra baixo 
    }

    
    //Verificação de colisão 

    if (ballX + 10 >= p1_x && ballX <= p1_x + pw && ballY + 10 >= p1_y && ballY <= p1_y + ph) {
        ballX_ori = 1; 
        ballSpeedX += ballSpeedX > 0 ? acceleration : -acceleration;
    }

    if (ballX + 10 >= p2_x && ballX <= p2_x + pw && ballY + 10 >= p2_y && ballY <= p2_y + ph) {
        ballX_ori = -1; 
        ballSpeedX += ballSpeedX > 0 ? acceleration : -acceleration;
    }

    if (ballX + 10 >= p1_x && ballX <= p1_x + pw && ballY + 10 >= p1_y && ballY <= p1_y + ph) {
        ballX_ori = 1; 
        ballSpeedX += ballSpeedX > 0 ? acceleration : -acceleration;
        ballSpeedY += p2_movementDirection * acceleration * 0,2; // Ajuste o fator do multiplicador conforme o necessário 
    }
    
    if (ballX + 10 >= p2_x && ballX <= p2_x + pw && ballY + 10 >= p2_y && ballY <= p2_y + ph) {
        ballX_ori = -1; 
        ballSpeedX += ballSpeedX > 0 ? acceleration : -acceleration;
        ballSpeedY += p2_movementDirection * acceleration * 0,2; // Ajuste o fator do multiplicador conforme o necessário 
    }

    if (!gameStarted) {
        return; // Se o jogo não estiver iniciado saia da função 
    }

    //Adicione a verificação da pontuação aqui
    if (p1_points >= 5 || p2_points >= 5) {
        gameStarted = false; //Se a pontuaçãp de qualquer jogador atingir 5 pare o jogo 
        drawStartScreen(); // Desenha a tela inicial 
        return; 
    }

    //Colisão do teto e chão    

    if (ballY + 10 >= h || ballY <= 0) ballX_ori *= -1

    
    //Velocidade aplicada na saida
    
    ballX += 7 * ballX_ori 
    ballY += 7 * ballY_ori

    
    //Restante do código fps 

    //Verificação de colisão com as paredes 
    if (ballY + 10 >= h || ballY <= 0) {
        ballSpeedY *= -1; //Inverte a direção se atingir as paredes superior ou inferior 
    }


    //Pontos 
    if (ballX + 10 > w) {
        p1_points++
        ball()
    } 

    draw ()
}

let p1_movementDirection = 0;
let p2_movementDirection = 0;

document.addEventListener("keydown", function (ky) {
    if (ky.keycode == 87) {
        p1_key = ky.keycode; //W
        p1_movementDirection = -1; //Define a direção para cima 
    } else if (ky.keycode == 83) {
        p1_key = ky.keycode; //s
        p1_movementDirection = 1; //Define a direção para baixo 
    }
});

document.addEventListener("keyup", function (ky) {
    if (ky.keycode == p1_key) {
        p1_key = null; //Limpa a tecla precionada 
        p1_movementDirection = 0; //Define a direção como zero para parar o movimento
    }
});

document.addEventListener("keydown", function (ky) {
    if (ky.keycode == 104) {
        p2_key = ky.keycode; //W
        p2_movementDirection = -1; //Define a direção para cima 
    } else if (ky.keycode == 101) {
        p2_key = ky.keycode; //S
        p2_movementDirection = 1; //Define a direção para baixo 
    }
});

document.addEventListener("keyup", function (ky) {
    if (ky.keyCode == p2_kay) {
        p2_key = null; //Limpa a tecla precionada 
        p2_movementDirection = 0; //Define a direção como zero para parar o movimento
    }
});

document.addEventListener(DOMContentLoaded, init);  