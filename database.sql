CREATE TABLE tasks (
    "id" SERIAL PRIMARY KEY,
    "tasks" VARCHAR (100) NOT NULL,
    "status" BOOLEAN DEFAULT 'FALSE'
);

INSERT INTO "tasks" ("tasks")
VALUES ('Clean bathroom');

INSERT INTO "tasks" ("tasks")
VALUES ('Do Dishes');

INSERT INTO "tasks" ("tasks")
VALUES ('Do Laundry');

INSERT INTO "tasks" ("tasks")
VALUES ('Mow Lawn');

INSERT INTO "tasks" ("tasks")
VALUES ('Oil Change');

INSERT INTO "tasks" ("tasks")
VALUES ('Vacuum');
