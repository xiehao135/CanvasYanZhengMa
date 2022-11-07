let verifyCode = "";

function randomNumber(min,max){
    return Math.floor(Math.random()*(max+1-min))+min;
}

function randomColor(min,max){
    const r = randomNumber(min,max);
    const g = randomNumber(min,max);
    const b = randomNumber(min,max);
    return `rgb(${r},${g},${b})`;
}

function drawYZM(selector, width, height){
    verifyCode = "";
    const w = width;
    const h = height;
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    //填充背景颜色
    ctx.fillStyle = randomColor(180,230);
    ctx.fillRect(0,0,w,h);
    
    // 随机字符串
    const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(let i = 0; i < 4; i++){
        // 取出随机的字母或者数字
        const writtenChar = pool.charAt(randomNumber(0,pool.length-1));
        verifyCode += writtenChar;
        // 随机字体大小
        const fs = randomNumber(18,40);
        // 随机字母数字旋转的角度
        const deg = randomNumber(-30,30);
        ctx.font = fs + 'px Simhei';
        ctx.textBaseline = 'top';
        // 设置字体的填充颜色
        ctx.fillStyle = randomColor(80,150);
        ctx.save();
        // 设置每个随机字母/数字的位置
        ctx.translate(30*i+5,5);
        // 设置旋转角度
        ctx.rotate(deg*Math.PI/180);
        ctx.fillText(writtenChar,0,0);
        ctx.restore();
    }
    
    // 随机生成干扰线
    for(let i = 0; i < 5; i++){
        ctx.beginPath();
        ctx.moveTo(randomNumber(0,w),randomNumber(0,h));
        ctx.lineTo(randomNumber(0,w),randomNumber(0,h));
        ctx.strokeStyle = randomColor(180,230);
        ctx.closePath();
        ctx.stroke();
    }
    
    
    // 随机生成40个干扰小圆点
    for(let i = 0; i < 40; i++){
        ctx.beginPath();
        ctx.arc(randomNumber(0,w),randomNumber(0,h),1,0,2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = randomColor(150,200);
        ctx.fill();
    }   
}

drawYZM('#canvas', 120, 40)

// 换一张图片
function ChangeImg(){
    drawYZM('#canvas', 120, 40);
}
const bt = document.querySelector('#changeImgButton');
bt.addEventListener('click',ChangeImg);

// 确认
function inputCode(){
    const codeValue = document.querySelector('#code').value;
    if(codeValue === verifyCode){
        window.alert("验证码正确");
    }else{
        document.querySelector('#code').value = "";
        drawYZM('#canvas', 120, 40);
        window.alert("验证码错误");
    }
}
const confirmBt = document.querySelector('#confirmButton');
confirmBt.addEventListener('click',inputCode);