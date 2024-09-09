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



}