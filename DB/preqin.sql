-- Database: preqin

-- DROP DATABASE IF EXISTS preqin;

CREATE DATABASE preqin
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


CREATE SEQUENCE investor_investor_id_seq START WITH 1;
CREATE TYPE investor_types AS ENUM('fund manager','asset manager','wealth manager','bank');
CREATE TYPE investor_countries AS ENUM('Singapore','United States','United Kingdom','China');
CREATE TYPE asset_classes AS ENUM('Infrastructure','Hedge Funds','Private Equity','Natural Resources','Real Estate','Private Debt');
CREATE TYPE currencies AS ENUM('GBP');

-- DROP TABLE IF EXISTS public.investor;

CREATE TABLE IF NOT EXISTS public.investor
(
    investor_id integer NOT NULL DEFAULT nextval('investor_investor_id_seq'::regclass),
    investor_name varchar (50) COLLATE pg_catalog."default" NOT NULL,
    investor_type investor_types NOT NULL,
    investor_country investor_countries NOT NULL,
    investor_date_added date NOT NULL,
    investor_last_update timestamp without time zone NOT NULL DEFAULT now(),
    commitment_asset_class asset_classes NOT NULL,
    commitment_amount integer NOT NULL,
    commitment_currency currencies NOT NULL,
    CONSTRAINT investor_pkey PRIMARY KEY (investor_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.investor
    OWNER to postgres;
-- Index: idx_investor_name

-- DROP INDEX IF EXISTS public.idx_investor_name;

CREATE INDEX IF NOT EXISTS idx_investor_name
    ON public.investor USING btree
    (investor_name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;