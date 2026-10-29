-- create_tables.sql  (run this FIRST)
-- Creates the EXPENSES table and a sequence for expense IDs.

CREATE SEQUENCE expense_seq START WITH 1 INCREMENT BY 1;

CREATE TABLE expenses (
    expense_id    NUMBER         PRIMARY KEY,
    expense_name  VARCHAR2(100)  NOT NULL,
    amount        NUMBER(10,2)   NOT NULL CHECK (amount > 0),
    category      VARCHAR2(20)   NOT NULL
                  CHECK (category IN ('Food','Travel','Education','Shopping','Other')),
    expense_date  DATE           NOT NULL
);
