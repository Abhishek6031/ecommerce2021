CREATE DATABASE "testE"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE "templateShedules" (
"id" SERIAL PRIMARY KEY,
 "date" text null,
    "employeeId" text null,
    "name" text null,
    "workingType" text null,
    "start" text  null,
    "end" text null,
    "storeId" text null,
    "storeName" text null,
    "createdAt" timestamp without time zone default (now() at time zone 'utc')
  
)

CREATE TABLE public."Reimbursements"
(
    "id" SERIAL PRIMARY KEY,
    type text,
    "dateFrom" date,
    "dateTo" date,
    purpose text,
    mode text,
    km bigint,
    "invNo" bigint,
    amt bigint,
"hotelName" text,
"createdAt" timestamp without time zone default (now() at time zone 'utc')	
    
)