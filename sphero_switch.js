async function startProgram() {
	// Write code here

	let num = 0;
	mode = ["easy", "normal", "hard"];

	//await speak("ゲームのモードを選択してください");
	//await speak("最初はeasyにセットしてあります。");
	//await speak("スフィロを左右に動かして難易度を変更できます。");
	//await speak("難易度を選択できたら、スフィロを縦方向に動かしてください");
	
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
		    await speak(String(mode[num]) + "でよろしいでしょうか")
			break;
        }
        
        //await speak(mode);
	
	   
        await delay(0.5);
	}
	
}