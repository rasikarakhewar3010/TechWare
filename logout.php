<?php
session_start();
session_unset();
session_destroy();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Logout</title>
    
</head>
<body>
    <h2>Logout Successful</h2>
    <p>If you want to log in again, click the button below:</p>
    <form action="login.php" method="post">
        <button type="submit">Login</button>
    </form>
</body>
</html>