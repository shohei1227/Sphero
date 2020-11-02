async function startProgram() {
	// Write code here
	let num = 0;
	mode = ["easy", "normal", "hard"];

	await speak("ゲームのモードを選択してください");
	await speak("最初はeasyにセットしてあります。");
	await speak("スフィロを左右に動かして難易度を変更できます。");
	await speak("難易度を選択できたら、スフィロを縦方向に動かしてください");
	
	while (true) {
		P = getOrientation().pitch;
		R = getOrientation().roll;
		Y = getOrientation().yaw;

		if (R >= 30) {
			setMainLed({ r: 255, g: 0, b: 0 });
			num = num + 1;
			if (num > 2) {
				num = num % 3;
			}
			await speak(mode[num]);
		}else if (R <= -30) {
			setMainLed({ r: 0, g: 0, b: 255 });
			num = num - 1;
			if (num < 0) {
				num = 3 - (Math.abs(num) % 3);
			}
			await speak(mode[num]);
		}else if (P > 20 || P < -20){
		    await speak(String(mode[num]) + "ですね")
			break;
        	}	
        await delay(0.5);
	}
	mode = num + 2; 
	// mode -->> 2 easy
	// mode -->> 3 normal
	// mode -->> 4 hard
    let number = new Array(mode);
	while (true) {
		for (i = 0; i <= (mode - 1); i++) {
			number[i] = setNumber();
		}
		if (mode == 2){
			if(number[0] !== number[1]){
				break;
			}
		}else if (mode == 3) {
			if (number[0] !== number[1] && number[0] !== number[2] && number[1] !== number[2]) {
				break;
			}
		}else if (mode == 4){
            		if (number[0] != number[1] && number[0] !== number[2] && number[0] !== number[3] && number[1] !== number[2] && number[1] !== number[3] && number[2] !== number[3]){
                		break;
            		}	
		}
		await delay(0.01);
	}
	//await speak(String(number)); sphero が考える値
	//ここからプレイヤーの予想
	JudgeNumber == "False";
	while(JudgeNumber == "True"){
        	let answer = new Array(mode);
        	for (x = 0; x < mode; x++){
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

function setNumber() {
	a = Math.trunc(Math.random() * 9 + 1);
	return a;
}
function getNumber(){
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
            await speak(ansnum[getNum]);
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
        if (number[i] == answer[i]){
            sum1 += 1;
        }else if(number[i] !== answer[i]){
            for (j = 0; j <= mode-1; j++){
                if (number[i] == ans[j]){
                    sum2 += 1;
                }
            }
        }
    }
    if (sum1 == mode){
        JudgeNumber = "True";
    }else{
        JudgeNumber = "False";
        if (sum1 > 0 && sum2 > 0){
            await speak(String(sum1) + "イート、" + String(sum2) + "バイト");
        }else if (sum1>0&&sum2==0){
            await speak(String(sum1) + "イート");     
        }else if (sum2> 0 && sum1== 0){
            await speak(String(sum2) + "バイト");
        }else if (sum1 == 0&& sum2 == 0){
            await speak("入力された数は含まれていません");
        }
        
    }
}
