<?php

$filename = $_GET['data'];

function extractFile($filename) {
	$file = fopen($filename, "r");
	while (!feof($file)) {
		$result[] = (fgetcsv($file));
	}
	return json_encode($result);
	fclose($file);
}

switch($filename) {
	case 1:
		print_r(extractFile('https://raw.githubusercontent.com/Cirrolytix/aedes_unicef_2022/main/dpg_extraction/regionsDataDict.csv'));
		break;
	default: 
		break;
}
