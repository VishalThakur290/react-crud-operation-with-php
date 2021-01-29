<?php

    $conn = mysqli_connect('localhost','root','','react');
    $name = $_POST['name'];
    $email = $_POST['email'];
    $class = $_POST['class'];
    $id = $_POST['id'];
    
    $sql = "UPDATE mydata SET name='$name', email='$email', class='$class' WHERE id='$id'";

    if(mysqli_query($conn,$sql)){
        echo "Successfully updated.";
    }else{
        echo "Error!, Message not sent.".mysqli_error($conn);
    }

?>