-- procedures.sql  (run this SECOND)
-- Run as a script in SQL Developer (F5).

-- 1. Insert an expense
CREATE OR REPLACE PROCEDURE add_expense (
    p_name      IN VARCHAR2,
    p_amount    IN NUMBER,
    p_category  IN VARCHAR2,
    p_date      IN DATE
) AS
BEGIN
    INSERT INTO expenses (expense_id, expense_name, amount, category, expense_date)
    VALUES (expense_seq.NEXTVAL, p_name, p_amount, p_category, p_date);
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Expense added: ' || p_name);
END add_expense;
/

-- 2. Delete an expense using its ID
CREATE OR REPLACE PROCEDURE delete_expense (
    p_id IN NUMBER
) AS
BEGIN
    DELETE FROM expenses WHERE expense_id = p_id;

    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No expense found with ID ' || p_id);
    ELSE
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Expense ' || p_id || ' deleted.');
    END IF;
END delete_expense;
/

-- 3. Show all expenses with the total and the count
CREATE OR REPLACE PROCEDURE show_expenses AS
    v_total  NUMBER := 0;
    v_count  NUMBER := 0;
BEGIN
    FOR e IN (SELECT * FROM expenses ORDER BY expense_date DESC, expense_id) LOOP
        DBMS_OUTPUT.PUT_LINE(
            e.expense_id || ' | ' ||
            TO_CHAR(e.expense_date, 'YYYY-MM-DD') || ' | ' ||
            e.expense_name || ' | ' ||
            e.category || ' | ' ||
            e.amount
        );
        v_total := v_total + e.amount;
        v_count := v_count + 1;
    END LOOP;

    DBMS_OUTPUT.PUT_LINE('Total expenses: ' || v_count);
    DBMS_OUTPUT.PUT_LINE('Total spending: ' || v_total);
END show_expenses;
/
