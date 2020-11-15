var modenum = 0;
var gotNum = 0;
var score = 1;

async function setMode(){
	var num = 3000;
	mode = ["easy", "normal", "hard"];
    // mode = [num = 0,num = 1,num = 2]
    while (true) {
		P = getOrientation().pitch;
		R = getOrientation().roll;
        Y = getOrientation().yaw;

		if (R >= 30) {
			setMainLed({ r: 255, g: 0, b: 0 });
			num = num + 1;
			//await speak(String(num));
			modenum = num % 3;
			//await speak(String(modenum));
			await speak(String(mode[modenum]));
		}else if (R <= -30) {
			setMainLed({ r: 0, g: 0, b: 255 });
			num = num - 1;
			//await speak(String(num));
			modenum = num % 3;
			//await speak(String(modenum));
			await speak(String(mode[modenum]));
		}else if (P > 20 || P < -20){
			setMainLed({ r: 0, g: 255, b: 0 });
		    await speak("難易度は" + String(mode[modenum]) + "ですね")
			setMainLed({ r: 0, g: 0, b: 0 });
			break;
        }
        await delay(0.5);
    }
    //digit = num + 2;
}

function setNumber() {
	a = Math.trunc(Math.random() * 9 + 1);
	return a;
}
function ArrayNum(p){　//これだけ後半部分でも使う。
    var empty = new Array(p);
    return empty;
}
function NumberNum(p){
    var number = ArrayNum(p);
    //解答の数字
	for (i = 0; i < p; i++) {
		number[i] = setNumber();
    }
    return number;  
}
function JudgeNumber(p){
    var sum1 = 0;
    var sum2 = 0;
    for (j=0; j < p-1; j++){
        for (k = j+1; k < p; k++){
            sum1 += 1;
            if (number[j] != number[k]){
                sum2 += 1;
            }
        }
    }
    return [sum1, sum2];
}

//　↑　↑　↑　spheroが考える値の決定に必要な関数

//ここからプレイヤーが数を決定する関数
async function getNumber(){
    var getNum = 90000;
	var getnum = 0;
    ansnum = [1,2,3,4,5,6,7,8,9];
    while (true) {
        P = getOrientation().pitch;
        R = getOrientation().roll;
        Y = getOrientation().yaw;

        if (R >= 30) {
            setMainLed({ r: 255, g: 0, b: 0 });
            getNum = getNum + 1;
            getnum = getNum % 9;
            await speak(String(ansnum[getnum]));
        }else if (R <= -30) {
            setMainLed({ r: 0, g: 0, b: 255 });
            getNum = getNum - 1;
            getnum = getNum % 9;
            await speak(String(ansnum[getnum]));
        }else if (P > 20 || P < -20){
			setMainLed({ r: 0, g: 255, b: 0 });
            await speak(String(ansnum[getnum]) + "ですね");
			setMainLed({ r: 0, g: 0, b: 0 });
            break;
        } 
        await delay(0.5);
    }
    gotNum = getnum + 1;
	//await speak(String(gotNum));
}
function JudgeAnswerNumber(p){
    var sumA = 0;
    var sumB = 0;
    for (j=0; j < p-1; j++){
        for (k = j+1; k < p; k++){
            sumA += 1;
            if (answer[j] != answer[k]){
                sumB += 1;
            }
        }
    }
    return [sumA, sumB];
}
async function Judge(p){
    var ans1 = 0;
    var ans2 = 0;
    for (l = 0; l < p ;l++){
        if (number[l] == answer[l]){
            ans1 += 1;
        }else if(number[l] !== answer[l]){
            for (m = 0; m < p; m++){
                if (number[l] == answer[m]){
                    ans2 += 1;
                }
            }
        }
    }
    if (ans1 == p){
        JudgeNumber = "True";
		await speak("正解です");
		await speak("スコアは" + String(score) + "です");
    }else{
        JudgeNumber = "False";
		score += 1;//解答に何回かかかったか
        if (ans1 > 0 && ans2 > 0){
            await speak(String(ans1) + "イート、" + String(ans2) + "バイト");
        }else if (ans1 > 0 && ans2 == 0){
            await speak(String(ans1) + "イート");     
        }else if (ans2 > 0 && ans1 == 0){
            await speak(String(ans2) + "バイト");
        }else if (ans1 == 0&& ans2 == 0){
            await speak("入力された数は含まれていません");
        }
    }
}



//StartProgram

async function startProgram() {
    await speak("ルール説明を行います。省略する場合はスフィロを右に傾けてください。");
    while (true){
        P = getOrientation().pitch;
        R = getOrientation().roll;
        Y = getOrientation().yaw;
        if (R >= 30){
            await speak("省略バージョンです。")
            await setMode();
            var digit = 0;
            digit = modenum + 2;
            await speak("桁数は" + String(digit) + "です");
            //mode == 2 --> easy
            //mode == 3 --> normal
            //mode == 4 --> hard 
            while (true) {
                number = NumberNum(digit);
                //　↑ mode桁の数値をセット
                // 数字が重複していたらループでやり直す
                sum = JudgeNumber(digit);
                if (sum[0] == sum[1]){
                    break;
                }
                await delay(0.01);
            }
            //await speak(String(number)); //sphero が考える値
            
            var Judged = "False" ;
            answer = new Array(digit);
            
            while(Judged == "False"){
                while(true){
                    for (x = 0; x < digit; x++){
                        await getNumber();
                        await speak(String(x + 1) + "桁目に"　+ String(gotNum) + "を入力します")
                        answer[x] = gotNum;
                    }
                    ansSum = JudgeAnswerNumber(digit);
                    if (ansSum[0] == ansSum[1]){
                        break;
                    }else{
                        await speak("入力された数字に同じ数字が含まれています。再度入力、しなおしてください。")
                    }
                }
                await speak(String(answer) + "で解答します。");
                await Judge(digit);
            }
        }else if (R <= -30){
            await speak("これからルールの説明を行います。");
            await speak("なおこのゲームのプレイに必要な時間は、イージーモードで約　分。ノーマルモードで約　分。ハードモードで約　分となっています。");
            await setMode();
            var digit = 0;
            digit = modenum + 2;
            await speak("桁数は" + String(digit) + "です");
            //mode == 2 --> easy
            //mode == 3 --> normal
            //mode == 4 --> hard 
            while (true) {
                number = NumberNum(digit);
                //　↑ mode桁の数値をセット
                // 数字が重複していたらループでやり直す
                sum = JudgeNumber(digit);
                if (sum[0] == sum[1]){
                    break;
                }
                await delay(0.01);
            }
            //await speak(String(number)); //sphero が考える値
            
            var Judged = "False" ;
            answer = new Array(digit);
            
            while(Judged == "False"){
                while(true){
                    for (x = 0; x < digit; x++){
                        await getNumber();
                        await speak(String(x + 1) + "桁目に"　+ String(gotNum) + "を入力します")
                        answer[x] = gotNum;
                    }
                    ansSum = JudgeAnswerNumber(digit);
                    if (ansSum[0] == ansSum[1]){
                        break;
                    }else{
                        await speak("入力された数字に同じ数字が含まれています。再度入力、しなおしてください。")
                    }
                }
                await speak(String(answer) + "で解答します。");
                await Judge(digit);
            }
        }
        await delay(0.01);
    }
}
