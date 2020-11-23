var modenum = 0;
var gotNum = 0;
var score = 1;
var digit = 0;

async function setMode() {
	await speak("最初に難易度を設定してください");
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
		} else if (R <= -30) {
			setMainLed({ r: 0, g: 0, b: 255 });
			num = num - 1;
			//await speak(String(num));
			modenum = num % 3;
			//await speak(String(modenum));
			await speak(String(mode[modenum]));
		} else if (P > 18 || P < -18) {
			setMainLed({ r: 0, g: 255, b: 0 });
			await speak("難易度は" + String(mode[modenum]) + "ですね")
			setMainLed({ r: 0, g: 0, b: 0 });
			break;
		}
		await delay(0.5);
	}
	//digit = num + 2;
}
async function setModeR() {
	await speak("最初に難易度を設定してください");
	await speak("すふぃろを横に傾けることによって難易度の変更を行うことができます。")
	await speak("難易度の変更が終わったらすふぃろを縦方向に傾けてください。難易度が確定されます。")
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
		} else if (R <= -30) {
			setMainLed({ r: 0, g: 0, b: 255 });
			num = num - 1;
			//await speak(String(num));
			modenum = num % 3;
			//await speak(String(modenum));
			await speak(String(mode[modenum]));
		} else if (P > 18 || P < -18) {
			setMainLed({ r: 0, g: 255, b: 0 });
			await speak("難易度は" + String(mode[modenum]) + "ですね");
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

function ArrayNum(p) {　 //これだけ後半部分でも使う。
	var empty = new Array(p);
	return empty;
}

function NumberNum(p) {
	var number = ArrayNum(p);
	//解答の数字
	for (i = 0; i < p; i++) {
		number[i] = setNumber();
	}
	return number;
}

function JudgeNumber(p) {
	var sum1 = 0;
	var sum2 = 0;
	for (j = 0; j < p - 1; j++) {
		for (k = j + 1; k < p; k++) {
			sum1 += 1;
			if (number[j] != number[k]) {
				sum2 += 1;
			}
		}
	}
	return [sum1, sum2];
}

//　↑　↑　↑　spheroが考える値の決定に必要な関数

//ここからプレイヤーが数を決定する関数
async function getNumber() {
	var getNum = 90000;
	var getnum = 0;
	ansnum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	while (true) {
		P = getOrientation().pitch;
		R = getOrientation().roll;
		Y = getOrientation().yaw;

		if (R >= 30) {
			setMainLed({ r: 255, g: 0, b: 0 });
			getNum = getNum + 1;
			getnum = getNum % 9;
			await speak(String(ansnum[getnum]));
		} else if (R <= -30) {
			setMainLed({ r: 0, g: 0, b: 255 });
			getNum = getNum - 1;
			getnum = getNum % 9;
			await speak(String(ansnum[getnum]));
		} else if (P > 20 || P < -20) {
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

function JudgeAnswerNumber(p) {
	var sumA = 0;
	var sumB = 0;
	for (j = 0; j < p - 1; j++) {
		for (k = j + 1; k < p; k++) {
			sumA += 1;
			if (answer[j] != answer[k]) {
				sumB += 1;
			}
		}
	}
	return [sumA, sumB];
}
async function goRed() {
	let m = 0;
	for (m = 0; m <= 255; m += 25, 5) {
		setMainLed({ r: 255 - m, g: 0 + m });
		await spin(360, 0.1);
	}
}
async function Judge(p) {
	var ans1 = 0;
	var ans2 = 0;
	for (l = 0; l < p; l++) {
		if (number[l] == answer[l]) {
			ans1 += 1;
		} else if (number[l] !== answer[l]) {
			for (m = 0; m < p; m++) {
				if (number[l] == answer[m]) {
					ans2 += 1;
				}
			}
		}
	}
	if (ans1 == p) {
		JudgeNumber = "True";
		//ここからながい
		await speak("正解です");
		await Sound.Game.WinBig.play(true);
		await goRed();
		await delay(0.5);
		await speak("スコアは" + String(score) + "です");
		//await speak(p);
		await speak("おめでとうございます");
		if (p == 2) {
			if (score <= 3) {
				await Sound.Personality.Celebrate.play(true);
				await speak("素晴らしい！あなたは天才です");
			} else if (score <= 8) {
				await Sound.Personality.Yawn.play(true);
				await speak("普通ですね");
			} else {
				await Sound.Personality.LaughNice.play(true);
				await speak("もう少し早く頑張りましょうね");
			}
		} else if (p == 3) {
			if (score <= 4) {
				await Sound.Personality.Celebrate.play(true);
				await speak("素晴らしい！あなたは天才です");
			} else if (score <= 10) {
				await Sound.Personality.Yawn.play(true);
				await speak("普通ですね");
			} else {
				await Sound.Personality.LaughNice.play(true);
				await speak("もう少し早く頑張りましょうね");
			}
		} else if (p == 4) {
			if (score <= 5) {
				await Sound.Personality.Celebrate.play(true);
				await speak("素晴らしい！あなたは天才です");
			} else if (score <= 12) {
				await Sound.Personality.Yawn.play(true);
				await speak("普通ですね");
			} else {
				await Sound.Personality.LaughNice.play(true);
				await speak("もう少し早く頑張りましょうね");
			}
		}
		await delay(2);
		exitProgram();
	} else {
		await Sound.Game.Error
		JudgeNumber = "False";
		score += 1; //解答に何回かかかったか
		if (ans1 > 0 && ans2 > 0) {
			await speak(String(ans1) + "イート、" + String(ans2) + "バイト");

		} else if (ans1 > 0 && ans2 == 0) {
			await speak(String(ans1) + "イート");
			setMainLed({ r: 60, g: 60, b: 60 });
			await delay(1);
			setMainLed({ r: 0, g: 0, b: 0 });
		} else if (ans2 > 0 && ans1 == 0) {
			await speak(String(ans2) + "バイト");
			setMainLed({ r: 25, g: 25, b: 25 });
			await delay(1);
			setMainLed({ r: 0, g: 0, b: 0 });
		} else if (ans1 == 0 && ans2 == 0) {
			await speak("入力された数は含まれていません");
			for (let a = 0; a <= 3; a++) {
				setMainLed({ r: 255, g: 0, b: 0 });
				await delay(0.5);
				setMainLed({ r: 0, g: 0, b: 0 });
				await delay(0.5);
			}
			await delay(0.5);
		}
	}
}



//StartProgram

async function startProgram() {
	setStabilization(false);
	setBackLed(200);
	await delay(1);
	await speak("まずは青いライトが正面に来るように向きを調整してください。");
	await delay(1);
	await speak("ルール説明を行います。省略する場合はスフィロを右に傾けてください。るーるの説明を聞く場合は左に傾けてください");
	
	//ruleなし
	while (true) {
		P = getOrientation().pitch;
		R = getOrientation().roll;
		Y = getOrientation().yaw;
		if (R >= 30) {
			setMainLed({ r: 255, g: 0, b: 0 });
			await speak("省略バージョンで行います。");
			setMainLed({ r: 0, g: 0, b: 0 });
			await setMode();
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
				if (sum[0] == sum[1]) {
					break;
				}
				await delay(0.01);
			}

			//await speak(String(number)); //sphero が考える値
			
			var Judged = "False";
			answer = new Array(digit);
			await speak("数の入力を行ってください")
			while (Judged == "False") {
				while (true) {
					for (x = 0; x < digit; x++) {
						await speak(String(x + 1) + "桁目");
						await getNumber();
						await speak(String(x + 1) + "桁目に"　 + String(gotNum) + "を入力します");
						answer[x] = gotNum;
					}
					ansSum = JudgeAnswerNumber(digit);
					if (ansSum[0] == ansSum[1]) {
						break;
					} else {
						setMainLed({r:255, g:0, b:0});
						await speak("入力された数字に同じ数字が含まれています。再度入力、しなおしてください。");
						setMainLed({r:0, g:0, b:0});
						await delay(0.8);
					}
				}
				await speak(String(answer) + "で解答します。");
				await delay(1);
				await Judge(digit);
			}

			
			//ruleあり	
		} else if (R <= -30) {
			setMainLed({ r: 0, g: 0, b: 255 });
			await speak("これからルールの説明を行います。");
			setMainLed({ r: 0, g: 0, b: 0 });
			await speak("なおこのゲームのプレイに必要な時間は、イージーモードで約4分。ノーマルモードで約5分。ハードモードで約6分となっています。");
			await setModeR();
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
				if (sum[0] == sum[1]) {
					break;
				}
				await delay(0.01);
			}

			//await speak(String(number)); //sphero が考える値

			await speak("これからゲームのルール説明をします。このゲームはすふぃろが決めた数字を当てるゲームです。先ほど決定した難易度によって今回当てる数字の桁数が決まっています。");
			await speak("これから、プレイヤーには難易度の選択と同じようにして数字の入力を行ってもらいます。数字が確定されると、すふぃろが判定します。");
			await speak("判定には、「イート」と「バイト」が用いられます。「イート」は入力した数字が答えの数字に含まれ、かつ桁数が一致しているときを指します。「バイト」は入力した数字が答えの数字に含まれるが、桁数が異なるときを指します。")
			await speak("理解できましたか。より具体的な例を聞きたい場合はすふぃろを右に傾けてください");
			while (true) {
				P = getOrientation().pitch;
				R = getOrientation().roll;
				Y = getOrientation().yaw;
				if (R >= 30) {
					setMainLed({ r: 255, g: 0, b: 0 });
					await speak("では、具体例を用いて説明します。");
					await speak("答えの数字が123、だと仮定します。この時145、を入力した場合には、１が答えに含まれ、かつ、どちらも100の位であるため、１イートと判定されます。");
					await speak("また892、と入力した場合には、2が桁数は異なるが、含まれるため、1バイトと判定されます。");
					await speak("213、と入力されたときには3が桁数が同じで、1と2は桁数が異なるため、1イート2バイトと判定されます。");
					await speak("このようにして、数を当てていってください。");
					setMainLed({ r: 0, g: 0, b: 0 });
					break;
				} else if (R <= -30 || P >= 20 || P <= -20) {
					setMainLed({ r: 255, g: 255, b: 0 });
					await delay(0.8);
					setMainLed({ r: 0, g: 0, b: 0 });
					break;
				}
				await delay(0.1);
			}

			await speak("それでは数の入力を始めてください");
			var Judged = "False";
			answer = new Array(digit);

			while (Judged == "False") {
				while (true) {
					for (x = 0; x < digit; x++) {
						await speak(String(x + 1) + "桁目");
						await getNumber();
						await speak(String(x + 1) + "桁目に"　 + String(gotNum) + "を入力します");
						answer[x] = gotNum;
					}
					ansSum = JudgeAnswerNumber(digit);
					if (ansSum[0] == ansSum[1]) {
						break;
					} else {
						setMainLed({r:255, g:0, b:0});
						await speak("入力された数字に同じ数字が含まれています。再度入力、しなおしてください。");
						setMainLed({r:0, g:0, b:0});
						await delay(0.8);
					}
				}
				await speak(String(answer) + "で解答します。");
				await Judge(digit);
			}
		}
		await delay(0.01);
	}
}
