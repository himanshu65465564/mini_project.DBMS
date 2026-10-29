-- sample_data.sql  (run this THIRD)
-- Inserts sample records using add_expense, then tests the procedures.
-- Run as a script in SQL Developer (F5).

SET SERVEROUTPUT ON;

-- Sample records
BEGIN
    add_expense('Lunch at canteen',  120.00, 'Food',      TO_DATE('2026-10-20', 'YYYY-MM-DD'));
    add_expense('Bus ticket',         45.50, 'Travel',    TO_DATE('2026-10-21', 'YYYY-MM-DD'));
    add_expense('Database textbook', 650.00, 'Education', TO_DATE('2026-10-22', 'YYYY-MM-DD'));
    add_expense('Headphones',        899.00, 'Shopping',  TO_DATE('2026-10-23', 'YYYY-MM-DD'));
    add_expense('Stationery',         80.00, 'Other',     TO_DATE('2026-10-24', 'YYYY-MM-DD'));
END;
/

-- Test 1: view all expenses with total
EXEC show_expenses;

-- Test 2: delete the expense with ID 2 (Bus ticket)
EXEC delete_expense(2);

-- Test 3: view again (the total should now be lower)
EXEC show_expenses;

-- Test 4: delete an ID that does not exist
EXEC delete_expense(999);

-- Test 5: plain query for the total and count
SELECT COUNT(*) AS total_expenses, SUM(amount) AS total_spending FROM expenses;

-- Test 6: spending per category
SELECT category, SUM(amount) AS spent FROM expenses GROUP BY category ORDER BY spent DESC;
