<?php

    $conn = mysqli_connect('localhost','root','','react');
    $id = $_POST['id'];
    
    $sql = "DELETE FROM mydata WHERE id='$id'";

    if(mysqli_query($conn,$sql)){
        echo "Successfully Deleted.";
    }else{
        echo "Error! ".mysqli_error($conn);
    }

?>