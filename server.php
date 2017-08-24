<?php
/**
 * Created by PhpStorm.
 * User: bad4iz
 * Date: 23.08.17
 * Time: 10:01
 */

require_once 'vendor/autoload.php';


//for ($i=0; $i<6000; $i++){
//    $line = "12.08.2017 1:01:59;0.2;". $i .".0;-0.88;12.10;3.00;0.1;27.0;0;57.0;59.0;0;61.0;52.0;120.31;0.00;120594156.6;19753574.3;0;33200212.51;2;-2;1;0,102;1,455;0,296;0; \n\t";
//    file_put_contents('data/data2.txt', $line,FILE_APPEND | LOCK_EX);
//}

$arrLine = file('data/data2.txt');


$tmp = [];
foreach ($arrLine as $item) {
    $meters = explode(";", $item);
    if(isset($meters[2])) {
        $it = round($meters[2]);
        $tmp[$it]['num'] = $it;
        $tmp[$it]['count'] = isset($tmp[$it]['count'])?($tmp[$it]['count'] + 1):1;
    }
}

echo json_encode($tmp);


