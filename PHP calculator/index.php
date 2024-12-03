<!DOCTYPE html>
<html>
<head>
    <title>Simple Calculator</title>
</head>
<body>
    <form method="post" action="">
        <input type="number" name="num1" placeholder="Enter first number" required>
        <select name="operator">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
        </select>
        <input type="number" name="num2" placeholder="Enter second number" required>
        <input type="submit" name="calculate" value="Calculate">
    </form>

    <?php
    if(isset($_POST['calculate'])) {
        $num1 = $_POST['num1'];
        $num2 = $_POST['num2'];
        $operator = $_POST['operator'];
        $result = 0;

        switch($operator) {
            case '+':
                $result = $num1 + $num2;
                break;
            case '-':
                $result = $num1 - $num2;
                break;
            case '*':
                $result = $num1 * $num2;
                break;
            case '/':
                if($num2 != 0) {
                    $result = $num1 / $num2;
                } else {
                    echo "Cannot divide by zero!";
                    exit();
                }
                break;
        }
        
        echo "<h3>Result: $num1 $operator $num2 = $result</h3>";
    }
    ?>
</body>
</html>