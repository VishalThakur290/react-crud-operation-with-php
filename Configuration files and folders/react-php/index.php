<?php

    $conn = mysqli_connect('localhost','root','','react');
    $name = $_POST['name'];
    $email = $_POST['email'];
    $class = $_POST['class'];
    
    $sql = "INSERT INTO mydata (name,email,class) VALUES('$name','$email','$class')";

    if(mysqli_query($conn,$sql)){
        echo "Successfully sent.";
    }else{
        echo "Error!, Message not sent.".mysqli_error($conn);
    }

?>