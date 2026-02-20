# fixes/fix_main_py.py

def average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers)

nums = [10, 20, 30, 40]
result = average(nums)

print("Average is: " + str(result))

def write_to_file(filename, text):
    file = open(filename, "w")
    file.write(text)
    file.close()

def read_file(filename):
    with open(filename, "r") as f:
        content = f.read()
    return content

write_to_file("sample.txt", "Hello World")
data = read_file("sample.txt")
print(data)

import random

secret = random.randint(1, 10)

guess = int(input("Guess a number between 1 and 10: "))

if guess == secret:
    print("Correct!")
elif guess > secret:
    print("Too high!")
else:
    print("Too low!")

print("The secret number was: " + str(secret))

def get_price(item, menu):
    if item in menu:
        return menu[item]
    else:
        return None

menu = {
    "apple": 1.5,
    "banana": 0.75,
    "orange": 1.25,
}

item_name = input("Enter item name: ")
price = get_price(item_name, menu)

if price is None:
    print("Item not found")
else:
    print("Price: $" + str(price))

class Student:
    def __init__(self, name, grades=None):
        self.name = name
        self.grades = grades if grades is not None else []

    def add_grade(self, grade):
        self.grades.append(grade)

    def average(self):
        total = 0
        for g in self.grades:
            total += g
        return total / len(self.grades)

s1 = Student("Alice")
s1.add_grade(90)
s1.add_grade(85)

print("Average grade:", s1.average())