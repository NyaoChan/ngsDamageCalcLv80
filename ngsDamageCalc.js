window.onload = function () {
	Calc();
	const Input_Contents = document.querySelectorAll('input');
	Input_Contents.forEach(input => input.addEventListener('change', Calc));
	const Select_Contents = document.querySelectorAll('select');
	Select_Contents.forEach(select => select.addEventListener('change', Calc));
	const Calculator = document.getElementById('Calculation');
	Calculator.addEventListener('click', Calc);
}

function Calc() {
	let ToTal_Augment_Potency = '1';
	let Total_Augment_Potency_Floor_Increase = '1';
	const Augment_Potency_Elements = document.getElementsByClassName('Augment_Potency');
	const Augment_Potency_Floor_Increase_Elements = document.getElementsByClassName('Augment_Potency_Floor_Increase');
	const Non_Augment_Potency_Elements = document.getElementsByClassName('Non_Augment_Potency');
	const Non_Augment_Potency_Floor_Increase_Elements = document.getElementsByClassName('Non_Augment_Potency_Floor_Increase');
	const Player_Class_Number = document.getElementById('Player_Class').value.split(',')[0];
	const Player_Lv1_ATK = document.getElementById('Player_Class').value.split(',')[1];
	if(document.getElementById('Player_Level')){
		id = document.getElementById('Player_Level').value;
		if(id >= '76'){
			Player_ATK = Math.round(450 * Math.pow(1.1, ((74) / 5)) + (Player_Lv1_ATK - 450));
			Player_ATK = Player_ATK + (document.getElementById('Player_Level').value - 75) * 6
		}
		else{
			Player_ATK = Math.round(450 * Math.pow(1.1, ((document.getElementById('Player_Level').value - 1) / 5)) + (Player_Lv1_ATK - 450));
		}
	}
	const Enemy_DEF = document.getElementById('Enemy_Def').value.split(',')[0];
	const ATK_Limit = document.getElementById('Enemy_Def').value.split(',')[1];
	const WeaponVariance = document.getElementById('Weapon_Variance').value;
	const Fi_Addoon = (parseFloat(document.getElementById('Addon_Skill_Fi').value) / 100) + parseFloat(1);
	const FixaTermina = (parseFloat(document.getElementById('Fixa_Termina').value) / 100) + parseFloat(1);
	const CrtRate = (parseFloat(document.getElementById('Crt_Rate').value) / 100);
	const CrispFoodBoost = (parseFloat(document.getElementById('Crisp_Food_Boost').value) / 100) + parseFloat(1);
	const Element_Weakness_Potency = 1.2;
	const Crt_Potency = 1.2;
	const PAMultiplier = parseFloat(document.getElementById('PA').value) / 100;

	for (let i = 0; i < Augment_Potency_Elements.length; i++) {
		ToTal_Augment_Potency = Math.round((ToTal_Augment_Potency * (parseFloat(100) + parseFloat(Augment_Potency_Elements[i].value)) / 100) * 100000) / 100000;
	};
	for (let i = 0; i < Augment_Potency_Floor_Increase_Elements.length; i++) {
		Total_Augment_Potency_Floor_Increase = Math.round((Total_Augment_Potency_Floor_Increase * ((parseFloat(100) + parseFloat(Augment_Potency_Floor_Increase_Elements[i].value)) / 100)) * 100000) / 100000;
	};
	let Total_Potency = ToTal_Augment_Potency;
	let Total_Potency_Floor_Increase = Total_Augment_Potency_Floor_Increase;
	for (let i = 0; i < Non_Augment_Potency_Elements.length; i++) {
		Total_Potency = ((Total_Potency * ((parseFloat(100) + parseFloat(Non_Augment_Potency_Elements[i].value)) / 100)) * 10000) / 10000;
	};
	for (let i = 0; i < Non_Augment_Potency_Floor_Increase_Elements.length; i++) {
		Total_Potency_Floor_Increase = ((Total_Potency_Floor_Increase * ((parseFloat(100) + parseFloat(Non_Augment_Potency_Floor_Increase_Elements[i].value)) / 100)) * 10000) / 10000;
	};
	Total_Potency = ((Total_Potency * ((parseFloat(100) + parseFloat(document.getElementById('Fixa_Attack').value)) / 100)) * 10000) / 10000;
	Potency.value = Math.floor((ToTal_Augment_Potency - 1) * 1000) / 10 + "%";
	if (parseFloat(Math.floor(Total_Augment_Potency_Floor_Increase * 1000 * WeaponVariance)) >= parseFloat(1000)) {
		document.getElementById('Potency_Floor_Increase').value = "100%";
	}
	else {
		document.getElementById('Potency_Floor_Increase').value = Math.floor(Total_Augment_Potency_Floor_Increase * 1000 * document.getElementById('Weapon_Variance').value) / 10 + "%～";
	};
	let WeaponATK;
	if ((Total_Augment_Potency_Floor_Increase * WeaponVariance) >= 1) {
		WeaponATK = parseFloat(document.getElementById('Weapon_ATK').value);
	}
	else {
		WeaponATK = Math.round(parseFloat(document.getElementById('Weapon_ATK').value) * Total_Augment_Potency_Floor_Increase * WeaponVariance);
	};
	let CrtWeaponATK = parseFloat(document.getElementById('Weapon_ATK').value);
	if ((Player_ATK + WeaponATK) >= ATK_Limit) {
		let Min_Result_temp =
			Math.round((ATK_Limit - Enemy_DEF) * Total_Potency * PAMultiplier / 5);
		let Element_Weakness_Min_Result_temp =
			Math.round((ATK_Limit - Enemy_DEF) * Total_Potency * Element_Weakness_Potency * CrispFoodBoost * PAMultiplier / 5);
		let Max_Result_temp =
			Math.round((ATK_Limit - Enemy_DEF) * Total_Potency * PAMultiplier / 5);
		let Element_Weakness_Max_Result_temp =
			Math.round((ATK_Limit - Enemy_DEF) * Total_Potency * Element_Weakness_Potency * CrispFoodBoost * PAMultiplier / 5);
		let Crt_Result_temp =
			Math.round((ATK_Limit - Enemy_DEF) * Total_Potency * FixaTermina * Fi_Addoon * Crt_Potency * PAMultiplier / 5);
		let Element_Weakness_Crt_Result_temp =
			Math.round((ATK_Limit - Enemy_DEF) * Total_Potency * FixaTermina * Fi_Addoon * Crt_Potency * Element_Weakness_Potency * CrispFoodBoost * PAMultiplier / 5);

		document.getElementById('Min_Result').value = Min_Result_temp;
		document.getElementById('Element_Weakness_Min_Result').value = Element_Weakness_Min_Result_temp;
		document.getElementById('Max_Result').value = Max_Result_temp;
		document.getElementById('Element_Weakness_Max_Result').value = Element_Weakness_Max_Result_temp;
		document.getElementById('Crt_Result').value = Crt_Result_temp;
		document.getElementById('Element_Weakness_Crt_Result').value = Element_Weakness_Crt_Result_temp;

		let Avg_Result_temp =
			Math.round(((parseFloat(1) - CrtRate) * (Min_Result_temp + Max_Result_temp)) / parseFloat(2) + (CrtRate * Crt_Result_temp));
		document.getElementById('Avg_Result').value = Avg_Result_temp;
	}
	else {
		let Min_Result_temp =
			Math.round((WeaponATK + Player_ATK - Enemy_DEF) * Total_Potency * PAMultiplier / 5);
		let Element_Weakness_Min_Result_temp =
			Math.round((WeaponATK + Player_ATK - Enemy_DEF) * Total_Potency * Element_Weakness_Potency * CrispFoodBoost * PAMultiplier / 5);
		let Max_Result_temp =
			Math.round((CrtWeaponATK + Player_ATK - Enemy_DEF) * Total_Potency * PAMultiplier / 5);
		let Element_Weakness_Max_Result_temp =
			Math.round((CrtWeaponATK + Player_ATK - Enemy_DEF) * Total_Potency * Element_Weakness_Potency * CrispFoodBoost * PAMultiplier / 5);
		let Crt_Result_temp =
			Math.round((CrtWeaponATK + Player_ATK - Enemy_DEF) * Total_Potency * FixaTermina * Fi_Addoon * Crt_Potency * PAMultiplier / 5);
		let Element_Weakness_Crt_Result_temp =
			Math.round((CrtWeaponATK + Player_ATK - Enemy_DEF) * Total_Potency * FixaTermina * Fi_Addoon * Crt_Potency * Element_Weakness_Potency * CrispFoodBoost * PAMultiplier / 5);

		document.getElementById('Min_Result').value = Min_Result_temp;
		document.getElementById('Element_Weakness_Min_Result').value = Element_Weakness_Min_Result_temp;
		document.getElementById('Max_Result').value = Max_Result_temp;
		document.getElementById('Element_Weakness_Max_Result').value = Element_Weakness_Max_Result_temp;
		document.getElementById('Crt_Result').value = Crt_Result_temp;
		document.getElementById('Element_Weakness_Crt_Result').value = Element_Weakness_Crt_Result_temp;

		let Avg_Result_temp =
			Math.round(((parseFloat(1) - CrtRate) * (Min_Result_temp + Max_Result_temp)) / parseFloat(2) + (CrtRate * Crt_Result_temp));
		document.getElementById('Avg_Result').value = Avg_Result_temp;
	};
}

























































function ResultViewChange(){
	if(document.getElementById('ResultViewStyle')){
		id = document.getElementById('ResultViewStyle').value;
		if(id == 'Style_00'){
			document.getElementById('Max_Result_Title').style.display = "none";
			document.getElementById('Max_Result').style.display = "none";
			document.getElementById('Crt_Result_Title').style.display = "none";
			document.getElementById('Crt_Result').style.display = "none";
			document.getElementById('Avg_Result_Title').style.display = "none";
			document.getElementById('Avg_Result').style.display = "none";
			document.getElementById('Element_Weakness_Min_Result_Title').style.display = "none";
			document.getElementById('Element_Weakness_Min_Result').style.display = "none";
			document.getElementById('Element_Weakness_Max_Result_Title').style.display = "none";
			document.getElementById('Element_Weakness_Max_Result').style.display = "none";
			document.getElementById('Element_Weakness_Crt_Result_Title').style.display = "none";
			document.getElementById('Element_Weakness_Crt_Result').style.display = "none";
			document.getElementById('Element_Weakness_Avg_Result_Title').style.display = "none";
			document.getElementById('Element_Weakness_Avg_Result').style.display = "none";
		}
		else if(id == 'Style_01'){
			document.getElementById('Max_Result_Title').style.display = "";
			document.getElementById('Max_Result').style.display = "";
			document.getElementById('Crt_Result_Title').style.display = "";
			document.getElementById('Crt_Result').style.display = "";
			document.getElementById('Avg_Result_Title').style.display = "";
			document.getElementById('Avg_Result').style.display = "";
			document.getElementById('Element_Weakness_Min_Result_Title').style.display = "none";
			document.getElementById('Element_Weakness_Min_Result').style.display = "none";
			document.getElementById('Element_Weakness_Max_Result_Title').style.display = "none";
			document.getElementById('Element_Weakness_Max_Result').style.display = "none";
			document.getElementById('Element_Weakness_Crt_Result_Title').style.display = "none";
			document.getElementById('Element_Weakness_Crt_Result').style.display = "none";
			document.getElementById('Element_Weakness_Avg_Result_Title').style.display = "none";
			document.getElementById('Element_Weakness_Avg_Result').style.display = "none";
		}
		else if(id == 'Style_02'){
			document.getElementById('Max_Result_Title').style.display = "";
			document.getElementById('Max_Result').style.display = "";
			document.getElementById('Crt_Result_Title').style.display = "";
			document.getElementById('Crt_Result').style.display = "";
			document.getElementById('Avg_Result_Title').style.display = "";
			document.getElementById('Avg_Result').style.display = "";
			document.getElementById('Element_Weakness_Min_Result_Title').style.display = "";
			document.getElementById('Element_Weakness_Min_Result').style.display = "";
			document.getElementById('Element_Weakness_Max_Result_Title').style.display = "";
			document.getElementById('Element_Weakness_Max_Result').style.display = "";
			document.getElementById('Element_Weakness_Crt_Result_Title').style.display = "";
			document.getElementById('Element_Weakness_Crt_Result').style.display = "";
			document.getElementById('Element_Weakness_Avg_Result_Title').style.display = "";
			document.getElementById('Element_Weakness_Avg_Result').style.display = "";
		}
	}
}