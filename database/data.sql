insert into "users" ("userId", "hashedPassword", "username")
values (100, 'password', 'demo');

insert into "todos" ("task", "isCompleted", "userId")
values ('Learn to code', false, 100),
       ('Build projects', false, 100),
       ('Get a job', false, 100);
