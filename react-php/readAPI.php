<?php

    $conn = mysqli_connect('localhost','root','','react');
    
    $sql = "SELECT * FROM mydata";
    $arr = Array();

    if(mysqli_query($conn,$sql)){
        //echo "Successfully sent.";
        $table = mysqli_query($conn,$sql);
        $i = 0;
        while($row = mysqli_fetch_assoc($table)){
            $arr[$i] = $row;
            $i++;
        }
        $data = json_encode($arr);
        echo ($data);
    }else{
        echo "Error!, Message not sent.".mysqli_error($conn);
    }

?>