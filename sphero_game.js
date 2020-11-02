mode = 3

function setNumber() {
	a = Math.trunc(Math.random() * 9 + 1);
	return a;
}

async function startProgram() {
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
            if (number[0] != number[1] && number[0] !== number[2] && number[0] !== number[3] && number[1] !== number[2] &&
                number[1] !== number[3] && number[2] !== number[3]){
                break;
            }	
		}
		await delay(0.01);
	}
	await speak(String(number));
}