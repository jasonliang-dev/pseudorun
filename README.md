# Pseudocode Cheatsheet

The content below is for pseudocode reference.

### Variable Declaration

Assign the value 10 to the variable `num`.

```
Set num to 10
```

> Alternative `num <-- 10`

### Comments

Write a comment by using `//`.

```
// This line will be ignored
Set x to "This line will be executed"
```

### Output

Display a value to output.

```
Write "Hello There!"
```

> Alternatives to `Write`: `Print`, `Display`, `Output`

### Input

Read the value given by the user and store it in a variable `x`.

```
Read x
```

A message can be displayed to the user when asking for input.

```
Read name "Enter your name"
Write "Hello " + name + "!"
```

> Alternatives to `Read`: `Get`, `Input`

### Increment/Decrement

Add or subtract 1 to a variable.

```
Read x
Read y
Increment x
Decrement y
```

### Conditions

A condition is a part of code that will evaluate to either true or false when ran.

| Example           | Description                                |
|-------------------|--------------------------------------------|
| `x = 10`          | True if x is equal to 10                   |
| `x != 10`         | True if x is not equal to 10               |
| `x > 10`          | True if x is greater than 10               |
| `x < 10`          | True if x is less than 10                  |
| `x >= 10`         | True if x is greater than or equal to 10   |
| `x <= 10`         | True if x is less than or equal to 10      |
| `cond1 and cond2` | True if both cond1 and cond2 is true       |
| `cond1 or cond2`  | True if either cond1 or cond2 is true      |
| `not cond1`       | cond1 becomes false if true and vice versa |

> Alternatives to `=`: `equals`, `is equal to`

### If/Else

`If` statements runs the code that is indented below it if the condition in brackets is true.

```
Read day
If (day = "Wednesday")
    Print "We have a lab today"
```

`Else` statements runs the code that is indented below it if the above `If` statement was false.

```
Read num
If (num % 2 = 0)
    Print "Number is even"
Else
    Print "Number is odd"
```

Additionally, there are `ElseIf` statements which runs the indented block bellow it if the above `If` statement was false and if the condition in brackets is true.

```
Read day
If (day = "Tuesday" OR day = "Thursday")
    Print "Lecture today"
ElseIf (day = "Wednesday")
    Print "Lab today"
Else
    Print "No class today"
```

> Alternatives to `ElseIf`: `Elif`, `Else If`

### Loop

Create a loop by using `While`. The code inside the loop will continue to run as long as the condition within the brackets is true.

```
Set count to 1
While (count <= 10)
    Print count
    Increment count
```

### Functions

Functions contain a block of code that can be ran whenever it is called. Functions can return a value which can be assigned to a variable.

```
Function clamp(number, min, max)
    If (number > max)
        number <-- max
    Else If (number < min)
        number <-- min
    Return number

Set x to clamp(10, -10, 5)
Print x
```

### Arrays

An array is a collection of values where a single value can be located by an index.

Arrays can be created like so:

```
array myArray[size]
```

> Alternatives to `array`: `boolean`, `integer`, `float`, `string`

Declaring an array using `integer`, or some other data type does not necessarily mean that the array can only be populated with only one date type. This is because arrays in JavaScript can contain values with multiple data types.
