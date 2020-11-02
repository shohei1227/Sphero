async function startProgram(){
    while(JudgeNumber == True){
        let answer = new Array(num+2);
        for (x = 0; x < num+2; x++){
            answer[x] = getNumber();
        }
        await speak(String(answer));
        var sum1 = 0;
        var sum2 = 0;
        await Judge();
    }
    //ここから成功の場合の処理
    //　↓　↓　↓　↓　↓　↓　↓　↓
}
async function getNumber(){
    let getNum = 0;
    ansnum = [1,2,3,4,5,6,7,8,9];
    while (true) {
        P = getOrientation().pitch;
        R = getOrientation().roll;
        Y = getOrientation().yaw;

        if (R >= 30) {
            setMainLed({ r: 255, g: 0, b: 0 });
            getNum = getNum + 1;
            if (getNum > 8) {
                getNum = getNum % 9;
            }
            await speak(mode[num]);
        }else if (R <= -30) {
            setMainLed({ r: 0, g: 0, b: 255 });
            getNum = getNum - 1;
            if (getNum < 0) {
                getNum = 9 - (Math.abs(getNum) % 8);
            }
            await speak(mode[getNum]);
        }else if (P > 20 || P < -20){
            await speak(String(ansnum[getNum]) + "ですね")
            break;
        } 
        await delay(0.5);
    }
    gotNum = ansnum[getNum];
    return gotNum;
}
async function Judge(){
    for (i = 0; i <= mode-1 ;i++){
        if (number[i] == ans[i]){
            sum1 += 1;
        }else if(number[i] != ans[i]){
            for (j = 0; j <= mode-1; j++){
                if (number[i] == ans[j]){
                    sum2 += 1;
                }
            }
        }
    }
    if (sum1 == num + 2){
        JudgeNumber = True;
    }else{
        JudgeNumber = False;
        await speak(String(sum1) + "イート、" + String(sum2) + "バイト");
    }
}
