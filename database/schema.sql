set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."todos" (
  "todoId"      serial,
  "userId"      int           not null,
  "task"        text           not null,
  "isCompleted" boolean        not null,
  "createdAt"   timestamptz(6) not null default now(),
  "updatedAt"   timestamptz(6) not null default now(),
  primary key ("todoId")
);

create table "public"."users" (
  "userId"          serial,
  "username"        text            not null UNIQUE,
  "hashedPassword"  text            not null,
  "createdAt"   timestamptz(6)      not null default now(),
  PRIMARY KEY ("userId")
)
