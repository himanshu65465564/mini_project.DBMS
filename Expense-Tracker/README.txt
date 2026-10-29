=====================================================
 EXPENSE TRACKER  -  MCA Project
 HTML + CSS + JavaScript (frontend)  |  Oracle PL/SQL (database)
=====================================================

1. FOLDER STRUCTURE
-------------------
Expense-Tracker/
  Frontend/
    HTML/index.html
    CSS/style.css
    JS/script.js
  PL-SQL/
    create_tables.sql
    procedures.sql
    sample_data.sql
  README.txt


2. HOW TO RUN THE FRONTEND
--------------------------
1. Open the folder Frontend/HTML/.
2. Double-click index.html (it opens in Chrome, Edge or Firefox).
3. No server or internet is needed.
Try it: add an expense, refresh the page (it stays), delete it.


3. HOW TO RUN AND TEST THE DATABASE (Oracle SQL Developer)
----------------------------------------------------------
1. Open SQL Developer and connect to your Oracle database.
2. Open PL-SQL/create_tables.sql and press F5 (Run Script).
   -> creates the EXPENSES table and EXPENSE_SEQ sequence.
3. Open PL-SQL/procedures.sql and press F5.
   -> creates add_expense, delete_expense and show_expenses.
4. Open PL-SQL/sample_data.sql and press F5.
   -> inserts 5 sample records and runs the test commands.
5. Open View > Dbms Output, click the green + and select your
   connection to see the output of the procedures.

You can also call the procedures yourself:
   SET SERVEROUTPUT ON;
   EXEC add_expense('Tea', 15, 'Food', SYSDATE);
   EXEC show_expenses;
   EXEC delete_expense(1);

Run the scripts in this order only: create_tables, procedures, sample_data.
To start again, run:  DROP TABLE expenses;  DROP SEQUENCE expense_seq;
(sample_data.sql uses ID 2 for the delete test, so run it on a fresh table.)


4. IMPORTANT LIMITATION: FRONTEND AND DATABASE ARE SEPARATE
-----------------------------------------------------------
A web page made only of HTML, CSS and JavaScript cannot connect to Oracle
or run PL/SQL procedures. A middle layer (a backend such as Java, Node.js
or Oracle REST Data Services) is needed for that, and this project does not
use one.

So:
 - The web page stores its expenses in the browser's localStorage.
 - The Oracle database holds its own EXPENSES table, managed by PL/SQL.
 - The two are NOT connected and do NOT synchronize automatically.
 - localStorage data belongs to one browser on one computer and is lost
   if the user clears browser data.
 - There is no login, so the data is not private or multi-user.

Future improvement: add a backend or REST layer so the page can call the
database procedures.


5. PROJECT DESCRIPTION (for the project report)
-----------------------------------------------
Expense Tracker is a small web application that helps a user record daily
expenses, view them in a table, delete them and see the total spending.
The frontend is built with HTML, CSS and JavaScript and saves data in
localStorage. A separate Oracle database component provides the EXPENSES
table and PL/SQL procedures that show how the same operations are done in a
database.

Objectives
 - Build a simple, responsive user interface with plain HTML and CSS.
 - Implement validation and calculations using plain JavaScript.
 - Keep data after a page refresh using localStorage.
 - Design a table with a primary key and constraints in Oracle.
 - Write PL/SQL procedures to insert, delete and report on expenses.

Features
 - Add an expense (name, amount, category, date) with validation.
 - View all expenses in a table (newest date first).
 - Delete an expense.
 - Automatic total spending and number of expenses.
 - Categories: Food, Travel, Education, Shopping, Other.
 - Success and error messages; works on laptop and mobile screens.

Technologies: HTML5, CSS3, JavaScript, localStorage,
Oracle SQL and PL/SQL, Oracle SQL Developer.


6. VIVA QUESTIONS AND ANSWERS
-----------------------------
Q1. What is localStorage?
A.  A browser feature that stores small key-value text data on the user's
    computer. It stays after refresh or closing the browser. We save the
    expense list as JSON text.

Q2. Why is the frontend not connected to Oracle?
A.  Browser JavaScript cannot talk directly to Oracle. A backend or REST
    layer is needed, and the project rules did not allow one. So the two
    parts are separate, and the README says so.

Q3. How is the total calculated?
A.  In showExpenses(), JavaScript loops over every expense and adds its
    amount to a variable called total.

Q4. How does delete work in JavaScript?
A.  Each expense has a unique id. deleteExpense() uses filter() to keep all
    expenses except the one with that id, saves the list, and redraws the
    table.

Q5. What is a primary key?
A.  A column (here expense_id) whose values are unique and never NULL, so
    each row can be identified.

Q6. Why do you use a sequence?
A.  expense_seq.NEXTVAL gives a new unique number for every insert, so we
    never type IDs by hand.

Q7. What constraints are used in the EXPENSES table?
A.  PRIMARY KEY, NOT NULL on all columns, CHECK (amount > 0), and CHECK on
    category so only the five allowed values can be saved.

Q8. What is a PL/SQL procedure?
A.  A named block of PL/SQL code stored in the database that can be called
    again and again, for example add_expense.

Q9. Why COMMIT after insert and delete?
A.  COMMIT makes the change permanent. Without it the change can be lost
    on rollback or when the session ends.

Q10. What is SQL%ROWCOUNT?
A.  The number of rows affected by the last SQL statement. delete_expense
    uses it to detect that no expense had the given ID.

Q11. How is the form validated?
A.  validateInputs() checks the name is not empty, the amount is a number
    above 0, a category is chosen and a date is chosen. It returns an error
    text that is shown to the user.

Q12. Why textContent instead of innerHTML for expense names?
A.  textContent treats the text as plain text, so a name like <b>x</b>
    cannot inject HTML or script into the page.
